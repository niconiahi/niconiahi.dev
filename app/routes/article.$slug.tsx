import type {
  HeadersFunction,
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/cloudflare"
import { json } from "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react"
import highlightCss from "highlight.js/styles/github.css?url"
import { object, parse, string } from "valibot"
import articleCss from "~/styles/article.css?url"
import IconLink from "~/components/icon-link"
import ArrowLeftIcon from "~/icons/arrow-left"
import { ROUTES, getOrigin } from "~/utils/routes"
import { getEnv } from "~/utils/env.server"

const ParamsSchema = object({
  slug: string(),
})
const ArticleSchema = object({
  html: string(),
  title: string(),
  description: string(),
})

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: articleCss },
    { rel: "stylesheet", href: highlightCss },
  ]
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data)
    return []

  return [
    {
      title: `${data.title} by niconiahi`,
      description: data.description,
    },
  ]
}

export const headers: HeadersFunction = ({ loaderHeaders }) => ({
  "Cache-Control": loaderHeaders.get("Cache-Control") ?? "no-cache",
})

export async function loader({ params, context }: LoaderFunctionArgs) {
  const env = getEnv(context)
  const origin = getOrigin(env)
  const { slug } = parse(ParamsSchema, params)
  const { description, html, title } = parse(
    ArticleSchema,
    await (
      await fetch(`${origin}/${ROUTES.getArticle(slug)}`)
    ).json(),
  )

  return json(
    {
      title,
      html,
      description,
    },
    {
      headers: {
        // https://stackoverflow.com/questions/7071763/max-value-for-cache-control-header-in-http
        "Cache-Control": "s-maxage=31536000",
      },
    },
  )
}

export default function ArticleSlug() {
  const { html } = useLoaderData<typeof loader>()

  return (
    <>
      <IconLink
        to="/"
        className="fixed bottom-4 right-0 w-min rounded-r-none border-y-2 border-l-2 border-gray-500 bg-gray-50 pr-4 md:p-3 md:pr-6"
      >
        <ArrowLeftIcon className="h-6 w-6 md:h-8 md:w-8" />
      </IconLink>
      <main
        className="mx-auto w-[48rem] max-w-full space-y-4 px-4 py-4 md:max-w-4xl md:space-y-6 md:py-20"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  )
}
