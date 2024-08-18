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
import GithubIcon from "~/icons/github"
import TwitterIcon from "~/icons/twitter"
import homeCss from "~/styles/home.css?url"
import { getEnv } from "~/utils/env.server"
import { getOrigin } from "~/utils/routes"

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

interface Project {
  links: {
    github: string
    demo?: string
  }
  title: string
  notes: string[]
}

export async function loader({ context }: LoaderFunctionArgs) {
  const env = getEnv(context)
  const origin = getOrigin(env)
  const articles = parse(
    ArticlesSchema,
    await (await fetch(`${origin}/article/get/all`)).json(),
  )
  const stack = [
    {
      label: "remix.run",
      link: "https://remix.run/",
    },
    {
      label: "tailwind",
      link: "https://tailwindcss.com/",
    },
    {
      label: "valibot",
      link: "https://valibot.dev/",
    },
    {
      label: "cloudflare pages",
      link: "https://pages.cloudflare.com/",
    },
    {
      label: "cloudflare d1",
      link: "https://developers.cloudflare.com/d1/",
    },
    {
      label: "cloudflare durable objects",
      link: "https://developers.cloudflare.com/durable-objects/",
    },
    {
      label: "cloudflare r2",
      link: "https://developers.cloudflare.com/r2/",
    },
    {
      label: "cloudflare workers",
      link: "https://developers.cloudflare.com/workers/",
    },
    {
      label: "kysely",
      link: "https://kysely.dev/",
    },
    {
      label: "go",
      link: "https://go.dev/",
    },
    {
      label: "lucia",
      link: "https://lucia-auth.com/",
    },
    {
      label: "pnpm",
      link: "https://pnpm.io/",
    },
    {
      label: "pnpm workspaces",
      link: "https://pnpm.io/workspaces/",
    },
    {
      label: "htmx",
      link: "https://htmx.org/",
    },
    {
      label: "viem",
      link: "https://viem.sh/",
    },
    {
      label: "web apis",
      link: "https://developer.mozilla.org/en-US/docs/Web/API/",
    },
    {
      label: "vitest",
      link: "https://vitest.dev/",
    },
  ]

  const projects: Project[] = [
    {
      links: {
        github: "https://github.com/niconiahi/ethernauta",
      },
      title: "Blockchain client called Ethernauta",
      notes: [
        "I managed to go deep into technical documentation by reading and interpreting definition documents for the Ethereum and Solana ecosystems",
        "I managed to translate descriptions into completely type-safe interfaces ready to be used with a blockchain provider",
        "It has worked as a proof-of-concept on how to create a mono-repository in a simple yet effective way which solved a real problem: in this case, a blockchain client (JSON-RPC client)",
        "It leverages the use of tree-shaking to its highest expresion in order to provide minimalistic bundles to the client, effectively making much faster the app consuming it",
        "It's dependency-free, meaning that I have complete control over the behaviour of the library. I prefer my code to be written this way. With this I get to learn how to design software. I do reach for libraries but for much more specific and highly complicated stuff",
        "Some of the many methods that are exposed have tests associated with them, effectively setting precedent on how to test other methods",
      ],
    },
    {
      links: {
        github: "https://github.com/niconiahi/remix-peer-video-call-demo",
        demo: "https://remix-peer-video-call-demo.pages.dev/",
      },
      title: "Peer to peer videoconference call application",
      notes: [
        "The goal of this project is to create a peer to peer videocall conference application. No installation needed, just using browser native APIs",
        "The initial idea here was to do a deep dive into a Web API that I was requiring to understand fully in order to use it for another project: a web torrent client. This technology is called WebRTC and it's used to create a channel in which pairs can share data with each other once established",
        "As it was too difficult to grasp the full comprehension of it, I started slowly by first creating a system in which I could establish the connection within the same browser window",
        "After having succeeded in that first system, I moved on to creating a more complex system which I used understand which actions did one user needed to do and what the other needed to do. With this I have a cristal clear understanding of how's the interaction to establish a WebRTC connection for two users in different browser's windows",
        "The last step in this project, not yet finished, is to add a singaling system so that this connection between the two peers is done automatically. A signaling system is no other than a WebSocket connection that sends messages from one end to the other. In this case, the signaling system is being implemented using Cloudflare, for which I need to implement a Cloudflare Worker that makes use Cloudflare's Durable Objects to persist connections, so that I can then broadcast to every connection the corresponding peer events",
        "This last step is being implemented using state machines, for which when finished, there will be a state machine that knows how to establish a WebRTC connection. Super powerful",
      ],
    },
    {
      links: {
        github: "https://github.com/niconiahi/ariabones",
        demo: "https://ariabones.pages.dev",
      },
      title: "Web components that are completely WAI-ARIA compliant",
      notes: [
        "The goal of this project is to implement, via Web Components, the components that are defined by the W3C's patterns",
        "It should have no dependencies and it should work as a base building block for frameworks to build upon",
        "The component are unstyled and absolutely accesible",
      ],
    },
    {
      links: {
        github: "https://github.com/niconiahi/olga",
        demo: "https://olga.media",
      },
      title: "Youtube video's chapters visualizer for a streaming channel",
      notes: [
        "The goal of this project was to easily visualize the different chapters a video has, in a non-YouTube environment. This is imposible to do today as you would have to check each and every video to see. Discoverability is directly non-existent: you can't search through chapters",
        "There are many many videos a YouTube channel may have so I needed a way to automatically scrap the data for each of the videos, so that's what I did. I have a page in which I give it a starting date and an ending date and the program will gather the data for all the videos found wihtin that range",
        "It is usual that a streaming channel has several shows that it airs. Because of that, the notion of this entity was introduced in the system. For a given day, there might have been multiple shows that were aired. As long as the show is known by the system, it will extract the chapters for it",
      ],
    },
    {
      links: {
        github: "https://github.com/niconiahi/gig.dance",
        demo: "https://gig-dance.fly.dev",
      },
      title: "Minimalistic Go application",
      notes: [
        "The goal of this repo was to get a feeling of Go's templating engine to produce components",
        "Another goal of this repo was to lay a structure of a webserver similar to what Remix's is",
        "It lays the ground of the structure required by a page to load: it needs a loader to load data, templates to be used as components and which files need to be loaded to create such templates. With these three, a page is composed. Very simple, very powerful",
        "The value in this project is not on the UI but solely on the proposed structure",
      ],
    },
    {
      links: {
        github: "https://github.com/niconiahi/go-htmx-demo",
        demo: "https://go-htmx-demo-niconiahi.fly.dev",
      },
      title: "htmx + Go proof-of-concept application",
      notes: [
        "The goal of this repo was to get a feeling of htmx's fetching patterns capabilities to surgically update the DOM",
        "This was also the first Go application I created and deployed. It's only a webserver with two endpoints but it was a great learning experience",
        "Go is awesome",
        "htmx is equally awesome",
      ],
    },
    {
      links: {
        github: "https://github.com/niconiahi/qiuar",
        demo: "https://qiuar.pages.dev/",
      },
      title: "QR generating library",
      notes: [
        "The goal of this project was to deep dive into a technical definition of some well established pattern. There are tons of formal documentation on how to generate, read and interpret a QR",
        "Another goal was to make, what would be the most successful QR generating library of the time, clearer in terms of codebase. I found myself reading and not understanding a thing, even though the wikidedia defintion didn't seem as complicated",
        "I thought it was the perfect place to use tests as the result was extremly specific so that's what I did. Every function, up until now, of the current library implementation is tested. This gives me extreme confidence while touching and trying new things out. I love it",
      ],
    },
    {
      links: {
        github: "https://github.com/niconiahi/animatronik",
        demo: "https://animatronik.pages.dev/",
      },
      title: "Share and store your animated SVG collectible",
      notes: [
        "The goal of this project was to merge the knowledge of ERC721 blockchain collectibles with my knowledge of HTML and CSS",
        "This project includes the first finished and successful state machine. This machine knows how to handle sending a transaction to the blockchain, including the possible successful and error states",
        "I created a first smart contract, deployed it to the blockchain and consumed it from the application",
        "I also store the data required by the collectible in a decentralized storage center. A reference to this data is stored in each collectible found in the contract",
        "It was also a goal not to use React state but instead using some form of signal to fine-grain update the UI. For this I used Jotai. Preventing re-renders feels good",
      ],
    },
    {
      links: {
        github: "https://github.com/niconiahi/remix-siwe-demo",
        demo: "https://remix-siwe-demo.pages.dev/",
      },
      title: "Cryptographically-protected authentication flow demo",
      notes: [
        "The goal of this project was to recreate an already existent demo but which was poorly structured and unclear. Also it was using no frameworks to demostrate the flow, which is kind of an archaic way of doing it (not even vanilla Vite). This made it really unclear how this would fit with the modern days of metaframeworks",
        "It only has one dependency which is the official one provided by the team who implemented the Sign in with Ethereum protocol. Using the user's private and public keys, it validates and creates a session",
        "To demostrate simplicity only HTML form submissions are used to handle mutations. These submissions are validated and handled using Remix's actions",
      ],
    },
    {
      links: {
        github: "https://github.com/niconiahi/remix-d1-kysely-demo",
        demo: "https://remix-d1-kysely-demo.pages.dev/",
      },
      title: "Minimalistic application showcasing Kysely query builder with Cloudflare D1 database",
      notes: [
        "The goal of this project was to create a detailed documentation on how to setup all the configuration required to connect Kysely query builder with Cloudflare's D1 SQLite database along with an example query and mutation to the SQLite database",
        "This was also my first time using a query builder which was my approach of choice between this one and an ORM. I was intending to use raw SQQL to learn but the autocompletion of a query builder was a dealbreaker. I intend to jump on using raw SQL at some point but not today",
        "This was also my first using D1, so I was answering many questions on how the DX would be. The rough edges it would have and that. Nowadays, with workerd, Remix seemesly integrates with Cloudflare D1. The experience is awesome",
      ],
    },
    {
      links: {
        github: "https://github.com/niconiahi/gorkerd",
      },
      title: "Go webserver running on a workerd environment using Svelte as template engine",
      notes: [
        "The goal of this project was a little bit ambitious as it was to create a ultra minimal representation of what would be a framework which stack is: Go + Cloudflare (through workerd) as deployment + JS templating engine (through Svelte. Solid was also thought)",
        "The structure should be simple: a loader that is in charge to gather the data, a root html that composes from components and a handler that is in charge of rendering such root with the already gathered data",
        "The difficulty here resides in that there has to be a process where the Svelte components are compiled down to Javascript in order to be injected by Go when responding to a given route call",
        "Another difficulty resides in that this has to be compiled to WebAssembly (through the use of tinygo) due to the limited memory available inside the workerd instance",
        "The last difficulty of this project is to grab this .wasm file and run it in a workerd environment. I don't know yet how to do this but it should be possible as workerd knows how to receive Requests and send Responses, and the Wasm binary does exactly that. That's the premise of this project",
      ],
    },
  ]

  return json(
    {
      articles,
      stack,
      projects,
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
  const { articles, stack, projects } = useLoaderData<typeof loader>()

  return (
    <main className="mx-auto grid w-full grid-cols-2 gap-y-8 bg-gray-50 py-4 md:w-3/5 md:py-20 px-2">
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
        <h2 className="mb-2">Tech stack</h2>
        <div className="interests-grid grid gap-1">
          {stack.map(s => (
            <a
              key={`interest-${s.label}`}
              href={s.link}
              target="_blank"
              className="flex justify-center rounded-md bg-gray-300 px-1 py-0.5"
            >
              {s.label}
            </a>
          ))}
        </div>
      </section>
      <section className="col-span-2 h-fit">
        <h2 className="mb-2">Projects</h2>
        <p className="mb-4 text-gray-700 p-2 bg-gray-200 border-2 border-gray-300">These are little notes of the most representative things I've learned from each project. You should know that you can check the README of each project in Github by clicking the available link. In those you can find a more technical public-facing description of the project</p>
        <ul className="space-y-4">
          {projects.map((project) => {
            return (
              <article className="space-y-2" key={`project-${project.title}`}>
                <div className="flex flex-col justify-between w-full items-center md:flex-row">
                  <h5 className="font-bold">{project.title}</h5>
                  <nav className="space-x-2">
                    {project.links?.demo
                      ? (
                        <a target="_blank" href={project.links.demo}>See demo</a>
                        )
                      : null}
                    <a target="_blank" href={project.links.github}>Check it out on Github</a>
                  </nav>
                </div>
                <ul className="space-y-2">
                  {project.notes.map((note) => {
                    return (
                      <li key={`note-${project.title}-${note.slice(0, 20)}`}>
                        <p>{note}</p>
                      </li>
                    )
                  })}
                </ul>
              </article>
            )
          })}
        </ul>
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
