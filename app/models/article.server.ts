// import type { Article } from "@prisma/client";

// export async function getArticles() {
//   return prisma.article.findMany();
// }

// export async function getArticle(slug: string) {
//   return prisma.article.findUnique({ where: { slug } });
// }

// export async function createArticle(
//   article: Pick<Article, "slug" | "title" | "html" | "hash" | "description">
// ) {
//   return prisma.article.create({ data: article });
// }

// export async function updateArticle(
//   slug: string,
//   article: Partial<Omit<Article, "createdAt" | "updatedAt">>
// ) {
//   return prisma.article.update({ data: article, where: { slug } });
// }
