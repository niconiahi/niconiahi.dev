import { json, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import type { DB } from "db/types";
import { Kysely } from "kysely";
import { D1Dialect } from "kysely-d1";
import { object, parse, string } from "valibot";

interface Env {
  DB: D1Database;
}
const ParamsSchema = object({
  slug: string(),
});

export async function loader({ context, params }: LoaderFunctionArgs) {
  const { slug } = parse(ParamsSchema, params);
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
    return json(null);
  }

  return json(article);
}
