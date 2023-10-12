import { json, type ActionFunctionArgs } from "@remix-run/cloudflare";
import type { DB } from "db/types";
import { Kysely } from "kysely";
import { D1Dialect } from "kysely-d1";
import { object, parse, string } from "valibot";

interface Env {
  DB: D1Database;
}
const ArticleSchema = object({
  title: string(),
  description: string(),
  slug: string(),
  html: string(),
  hash: string(),
});

export async function action({ context, request }: ActionFunctionArgs) {
  console.log("action ~ await request.json():", await request.json());
  const { description, hash, html, slug, title } = parse(
    ArticleSchema,
    await request.json(),
  );
  const env = context.env as Env;
  const db = new Kysely<DB>({
    dialect: new D1Dialect({ database: env.DB }),
  });

  const update = await db
    .insertInto("article")
    .values({
      description,
      hash,
      html,
      slug,
      title,
    })
    .executeTakeFirst();

  if (update.numInsertedOrUpdatedRows ?? 0 > 0) {
    console.log("error updating the article =>", slug);
    return;
  }

  const article = await db
    .selectFrom("article")
    .select("article.slug")
    .where("slug", "=", slug)
    .executeTakeFirst();

  return json({ article });
}
