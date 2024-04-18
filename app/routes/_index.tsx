import type {
  HeadersFunction,
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/cloudflare"
import { json } from "@remix-run/cloudflare"
import { Link, useLoaderData } from "@remix-run/react"
import { array, object, parse, string } from "valibot"
import IconLink from "~/components/icon-link"
import TwitterIcon from "~/icons/twitter"
import GithubIcon from "~/icons/github"
import homeCss from "~/styles/home.css?url"
import { getOrigin } from "~/utils/routes"
import { getEnv } from "~/utils/env.server"

const ArticlesSchema = array(
  object({
    slug: string(),
    title: string(),
  }),
)

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: homeCss }]
}

export const meta: MetaFunction = () => {
  return [
    {
      title: "niconiahi the dev",
      description: "Get to know me and what I've been writing about",
    },
  ]
}

export const headers: HeadersFunction = ({ loaderHeaders }) => ({
  "Cache-Control": loaderHeaders.get("Cache-Control") ?? "no-cache",
})

export async function loader({ context }: LoaderFunctionArgs) {
  const env = getEnv(context)
  const origin = getOrigin(env)
  const articles = parse(
    ArticlesSchema,
    await (await fetch(`${origin}/article/get/all`)).json(),
  )
  const interests = [
    "remix.run",
    "Tailwind",
    "Zod",
    "serverless",
    "Planescale",
    "Web3",
    "Ethereum",
    "clean code",
  ]

  return json(
    {
      articles,
      interests,
    },
    {
      headers: {
        "Cache-Control": "s-maxage=10800",
      },
    },
  )
}

const EXTERNAL_ROUTES = {
  twitter: "https://twitter.com/niconiahi",
  github: "https://github.com/niconiahi",
}

export default function Index() {
  const { articles, interests } = useLoaderData<typeof loader>()

  return (
    <main className="mx-auto grid w-full grid-cols-2 grid-rows-2 gap-y-8 bg-gray-50 pt-4 md:w-3/5 md:pt-20">
      <section className="col-span-1">
        <h2 className="mb-2">Me</h2>
        <p>Nicolas Accetta</p>
        <p>Buenos Aires, Argentina</p>
        <p>web developer</p>
        <p>crazy about details</p>
        <div className="mt-2 flex items-center space-x-1">
          <IconLink
            isExternal
            to={EXTERNAL_ROUTES.twitter}
            aria-label="Contact me on Twitter"
          >
            <TwitterIcon className="h-6 w-6" />
          </IconLink>
          <IconLink
            isExternal
            to={EXTERNAL_ROUTES.github}
            aria-label="Contact me on Twitter"
          >
            <GithubIcon className="h-6 w-6" />
          </IconLink>
        </div>
      </section>
      <section className="col-span-1">
        <h2 className="mb-2">Interests</h2>
        <div className="interests-grid grid gap-1">
          {interests.map(interest => (
            <span
              key={`interest-${interest}`}
              className="flex justify-center rounded-md bg-gray-300 px-1 py-0.5"
            >
              {interest}
            </span>
          ))}
        </div>
      </section>
      <section className="col-span-2 h-fit">
        <h2 className="mb-2">Articles</h2>
        <ul>
          {articles.map(article => (
            <li key={article.slug}>
              <article>
                <Link
                  reloadDocument
                  to={`/article/${article.slug}`}
                >
                  {article.title}
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
