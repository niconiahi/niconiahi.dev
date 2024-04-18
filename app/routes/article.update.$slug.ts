import { type ActionFunctionArgs, json } from "@remix-run/cloudflare"
import { object, parse, string } from "valibot"
import { getQueryBuilder } from "~/utils/query-builder.server"

const ArticleSchema = object({
  html: string(),
})
const ParamsSchema = object({
  slug: string(),
})

export async function action({ context, request, params }: ActionFunctionArgs) {
  const { slug } = parse(ParamsSchema, params)
  const { html } = parse(ArticleSchema, await request.json())
  const queryBuilder = getQueryBuilder(context)

  await queryBuilder
    .updateTable("article")
    .set({ html })
    .where("slug", "=", slug)
    .executeTakeFirst()

  const article = await queryBuilder
    .selectFrom("article")
    .select("article.slug")
    .where("slug", "=", slug)
    .executeTakeFirst()

  return json(article)
}
