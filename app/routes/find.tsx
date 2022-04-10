import { ReactElement } from "react"
import { Link, Outlet } from "remix"

import { Github } from "~/icons"
import { IconLink } from "~/components"
import { EXTERNAL_ROUTES, ROUTES } from "~/constants"

export default function Find(): ReactElement {
  return (
    <div className="flex flex-1">
      <section className="min-w-60 flex flex-col bg-gray-100 dark:bg-gray-900 h-screen p-4 border-r-2 border-gray-900">
        <header className="mb-8">
          <Link to={ROUTES.home}>
            <h1 className="text-3xl text-black dark:text-gray-100 magic-underline px-2">
              niconiahi
            </h1>
          </Link>
        </header>
        <nav className="flex flex-1">
          <ul className="flex flex-col w-full">
            <Link
              className="w-full p-2 rounded transition text-gray-500 hover:bg-gray-700 hover:text-gray-100 dark:text-gray-500 dark:hover:text-gray-100"
              to="bio"
            >
              Bio
            </Link>
            <Link
              className="w-full p-2 rounded transition text-gray-500 hover:bg-gray-700 hover:text-gray-100 dark:text-gray-500 dark:hover:text-gray-100"
              to="projects"
            >
              Projects
            </Link>
          </ul>
        </nav>
        <footer className="flex items-center justify-start align-center px-2">
          <IconLink
            isExternal
            className="transform -translate-x-2"
            href={EXTERNAL_ROUTES.github}
            label="Github"
          >
            <Github className="h-8 w-8" />
          </IconLink>
        </footer>
      </section>
      <Outlet />
    </div>
  )
}
