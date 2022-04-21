import { ReactElement } from "react"
import { json, Link, Outlet, useLoaderData, LoaderFunction } from "remix"

import { firstLetterToUpper } from "~/helpers"
import {
  XyzProvider,
  TransactionProvider,
  TransactionToastProvider,
} from "~/providers"

enum ProjectType {
  Web3,
}

type Project = {
  path: string
  type: ProjectType
}

type LoaderData = {
  projects: Project[]
  currentProject?: Project
}

export const loader: LoaderFunction = () => {
  const projects: Project[] = [
    { path: "counter", type: ProjectType.Web3 },
    {
      path: "waver",
      type: ProjectType.Web3,
    },
    {
      path: "transfers",
      type: ProjectType.Web3,
    },
    {
      path: "mint",
      type: ProjectType.Web3,
    },
    {
      path: "indexing",
      type: ProjectType.Web3,
    },
  ]

  return json<LoaderData>({ projects })
}

export default function Index(): ReactElement {
  const { projects } = useLoaderData<LoaderData>()

  return (
    <>
      <section className="flex">
        <nav className="h-full min-w-60 border-r-2 border-gray-900 p-4">
          <ul className="flex flex-col">
            {projects.map(({ path }) => (
              <Link
                key={`project-item-${path}`}
                className="w-full p-2 rounded transition text-gray-500 hover:bg-gray-700 hover:text-gray-100 dark:text-gray-500 dark:hover:text-gray-100"
                to={path}
              >
                {firstLetterToUpper(path)}
              </Link>
            ))}
          </ul>
        </nav>
      </section>
      <XyzProvider>
        <TransactionProvider>
          <TransactionToastProvider>
            <main className="flex flex-col items-center justify-start w-full flex-1 overflow-y-scroll relative h-screen space-y-4 p-4">
              <Outlet />
            </main>
          </TransactionToastProvider>
        </TransactionProvider>
      </XyzProvider>
    </>
  )
}
