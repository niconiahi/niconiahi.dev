import { json, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import type { DB } from "db/types";
import { Kysely } from "kysely";
import { D1Dialect } from "kysely-d1";
import { object, parse, string } from "valibot";
import { NICONIAHI_DEV_URL, ROUTES } from "~/utils/routes";

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

  const articles = await db
    .selectFrom("article")
    .select(["title", "html", "description"])
    .execute();
  console.log("loader ~ articles:", articles);

  // const response = await fetch(
  //   `${NICONIAHI_DEV_URL}${ROUTES.getArticle(slug)}`,
  //   {
  //     headers: { "Content-Type": "application/json" },
  //   },
  // );
  // console.log("loader ~ response:", response);

  console.log("loader ~ article:", article);

  return json(article ?? null);
}
