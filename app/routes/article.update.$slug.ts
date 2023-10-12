import { json, type ActionFunctionArgs } from "@remix-run/cloudflare";
import type { DB } from "db/types";
import { Kysely } from "kysely";
import { D1Dialect } from "kysely-d1";
import { object, parse, string } from "valibot";

interface Env {
  DB: D1Database;
}
const ArticleSchema = object({
  html: string(),
});
const ParamsSchema = object({
  slug: string(),
});

export async function action({ context, request, params }: ActionFunctionArgs) {
  const { slug } = parse(ParamsSchema, params);
  const { html } = parse(ArticleSchema, await request.json());
  const env = context.env as Env;
  const db = new Kysely<DB>({
    dialect: new D1Dialect({ database: env.DB }),
  });

  await db
    .updateTable("article")
    .set({ html })
    .where("slug", "=", slug)
    .executeTakeFirst();

  const article = await db
    .selectFrom("article")
    .select("article.slug")
    .where("slug", "=", slug)
    .executeTakeFirst();

  return json({ article });
}
