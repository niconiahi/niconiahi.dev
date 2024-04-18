import { type LoaderFunctionArgs, json } from "@remix-run/cloudflare"
import { getQueryBuilder } from "~/utils/query-builder.server"

export async function loader({ context }: LoaderFunctionArgs) {
  const queryBuilder = getQueryBuilder(context)
  console.log('queryBuilder', queryBuilder)
  const articles = await queryBuilder
    .selectFrom("article")
    .select(["slug", "title"])
    .execute()
  console.log('articles', articles)

  return json(articles)
}
