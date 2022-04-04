import { ReactElement } from "react"
import { json, Link, LoaderFunction, Outlet, useLoaderData } from "remix"

import { firstLetterToUpper } from "~/helpers"

enum ProjectType {
  Web3,
}

type Project = {
  path: string
  type: ProjectType
}

type LoaderData = {
  projects: Project[]
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
    {
      path: "images",
      type: ProjectType.Web3,
    },
  ]

  return json<LoaderData>({ projects })
}

export default function Index(): ReactElement {
  const { projects } = useLoaderData<LoaderData>()

  return (
    <>
      <nav className="min-w-60 border-r border-gray-700 p-4">
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
      <main className="flex items-center justify-center w-full h-full">
        <Outlet />
      </main>
    </>
  )
}
