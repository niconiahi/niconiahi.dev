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
  const { description, hash, html, slug, title } = parse(
    ArticleSchema,
    await request.json(),
  );
  const env = context.env as Env;
  const db = new Kysely<DB>({
    dialect: new D1Dialect({ database: env.DB }),
  });

  const { insertId } = await db
    .insertInto("article")
    .values({
      description,
      hash,
      html,
      slug,
      title,
    })
    .executeTakeFirst();

  if (insertId === undefined) {
    return json({ error: "error creating the article" });
  }

  const article = await db
    .selectFrom("article")
    .select("slug")
    .where("id", "=", Number(insertId))
    .executeTakeFirst();

  return json({ article });
}
