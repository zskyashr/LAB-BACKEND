// prisma/seed.ts

// Simple seeder using `pg` to avoid Prisma v7 constructor requirements.
import { Client } from 'pg';
import 'dotenv/config';

const url = process.env.DATABASE_URL;
if (!url) {
  console.error('DATABASE_URL is not set in the environment');
  process.exit(1);
}

const client = new Client({ connectionString: url });

async function main() {
  await client.connect();

  await client.query(`
    CREATE TABLE IF NOT EXISTS "Article" (
      id SERIAL PRIMARY KEY,
      title TEXT UNIQUE NOT NULL,
      description TEXT,
      body TEXT NOT NULL,
      published BOOLEAN DEFAULT FALSE,
      "createdAt" TIMESTAMPTZ DEFAULT now(),
      "updatedAt" TIMESTAMPTZ DEFAULT now()
    );
  `);

  const upsert = async (title: string, description: string | null, body: string, published: boolean) => {
    const sql = `
      INSERT INTO "Article" (title, description, body, published, "updatedAt")
      VALUES ($1, $2, $3, $4, now())
      ON CONFLICT (title) DO UPDATE SET
        description = EXCLUDED.description,
        body = EXCLUDED.body,
        published = EXCLUDED.published,
        "updatedAt" = now()
      RETURNING *;
    `;
    const res = await client.query(sql, [title, description, body, published]);
    return res.rows[0];
  };

  const post1 = await upsert(
    'Prisma Adds Support for MongoDB',
    "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
    'Support for MongoDB has been one of the most requested features since the initial release of...',
    false,
  );

  const post2 = await upsert(
    "What's new in Prisma? (Q1/22)",
    'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
    'Our engineers have been working hard, issuing new releases with many improvements...',
    true,
  );

  console.log({ post1, post2 });

  await client.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});