import { type LoaderFunctionArgs, json } from "@remix-run/cloudflare"
import { getQueryBuilder } from "~/utils/query-builder.server"

export async function loader({ context }: LoaderFunctionArgs) {
  const queryBuilder = getQueryBuilder(context)
  const articles = await queryBuilder
    .selectFrom("article")
    .select(["slug", "title"])
    .execute()
  return json(articles)
}
