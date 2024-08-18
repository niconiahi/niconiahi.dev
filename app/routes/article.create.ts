import { type ActionFunctionArgs, json } from "@remix-run/cloudflare"
import { object, parse, string } from "valibot"

import { getQueryBuilder } from "~/utils/query-builder.server"

const ArticleSchema = object({
  title: string(),
  description: string(),
  slug: string(),
  html: string(),
  hash: string(),
})

export async function action({ context, request }: ActionFunctionArgs) {
  const { description, hash, html, slug, title } = parse(
    ArticleSchema,
    await request.json(),
  )
  const queryBuilder = getQueryBuilder(context)

  const { insertId } = await queryBuilder
    .insertInto("article")
    .values({
      description,
      hash,
      html,
      slug,
      title,
    })
    .executeTakeFirst()

  if (insertId === undefined) {
    return json({ error: "error creating the article" })
  }

  const article = await queryBuilder
    .selectFrom("article")
    .select("slug")
    .where("id", "=", Number(insertId))
    .executeTakeFirst()

  return json(article)
}
