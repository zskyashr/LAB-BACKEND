// src/prisma/prisma.service.ts

import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  constructor() {
      // pass the adapter identifier (cast to any to satisfy TS). Prisma v7 expects
      // an `adapter` or `accelerateUrl` when using the "client" engine.
      super({ adapter: 'postgresql' } as any);
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}