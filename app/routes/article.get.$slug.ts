import { json, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import type { DB } from "db/types";
import { Kysely } from "kysely";
import { D1Dialect } from "kysely-d1";
import { object, parse, string } from "valibot";

interface Env {
  DB: D1Database;
}
const ArticleSchema = object({
  slug: string(),
});

export async function loader({ context, request }: LoaderFunctionArgs) {
  const { slug } = parse(ArticleSchema, await request.json());
  const env = context.env as Env;
  const db = new Kysely<DB>({
    dialect: new D1Dialect({ database: env.DB }),
  });
  const article = await db
    .selectFrom("article")
    .select(["title", "html", "description"])
    .where("slug", "=", slug)
    .executeTakeFirst();

  if (!article) {
    throw new Response(null, {
      status: 404,
      statusText: "Article not found",
    });
  }

  return json({ article });
}
