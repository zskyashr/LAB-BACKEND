// src/articles/articles.service.ts (lengkap)

import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  // CREATE — Membuat artikel baru
  create(createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({ data: createArticleDto });
  }

  // READ — Mengambil semua artikel yang sudah dipublikasikan
  findAll() {
    return this.prisma.article.findMany({ where: { published: true } });
  }

  // READ — Mengambil semua artikel draft (belum dipublikasikan)
  findDrafts() {
    return this.prisma.article.findMany({ where: { published: false } });
  }

  // READ — Mengambil satu artikel berdasarkan ID
  findOne(id: number) {
    return this.prisma.article.findUnique({ where: { id } });
  }

  // UPDATE — Memperbarui artikel berdasarkan ID
  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  // DELETE — Menghapus artikel berdasarkan ID
  remove(id: number) {
    return this.prisma.article.delete({ where: { id } });
  }
}