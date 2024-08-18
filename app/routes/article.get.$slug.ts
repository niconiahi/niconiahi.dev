import { type LoaderFunctionArgs, json } from "@remix-run/cloudflare"
import { object, parse, string } from "valibot"

import { getQueryBuilder } from "~/utils/query-builder.server"

const ParamsSchema = object({
  slug: string(),
})

export async function loader({ context, params }: LoaderFunctionArgs) {
  const { slug } = parse(ParamsSchema, params)
  const queryBuilder = getQueryBuilder(context)
  const article = await queryBuilder
    .selectFrom("article")
    .select(["title", "html", "description"])
    .where("slug", "=", slug)
    .executeTakeFirst()

  if (!article) {
    return json(null)
  }

  return json(article)
}
