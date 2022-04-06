import { ReactElement } from "react"
import { json, Link, Outlet, useLoaderData, LoaderFunction } from "remix"

import { useXyz } from "~/hooks"
import { firstLetterToUpper, truncateString } from "~/helpers"

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

export const loader: LoaderFunction = ({ request }) => {
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

  const { url } = request

  const projectName = getProjectName(url)
  const currentProject = projects.find(
    (project) => project.path === projectName,
  )

  return json<LoaderData>({ projects, currentProject })
}

export default function Index(): ReactElement {
  const { account } = useXyz()
  const { projects, currentProject } = useLoaderData<LoaderData>()

  return (
    <>
      <nav className="min-w-60 border-r border-gray-700 p-4">
        {account && currentProject?.type === ProjectType.Web3 ? (
          <div className="absolute top-4 right-4 border-2 p-2 border-gray-900 rounded-md flex space-x-2 items-center justify-center">
            <div className="w-2 h-2 bg-green-400 rounded outline outline-1 outline-gray-900" />
            <h1>{truncateString(account)}</h1>
          </div>
        ) : null}
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

function getProjectName(url: string): string | undefined {
  const regex = /([^\/]+$)/

  const matches = url.match(regex)

  if (!matches) return undefined

  const [projectName] = matches

  return projectName
}
