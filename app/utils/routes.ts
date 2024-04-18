import type { Env } from "~/utils/env.server"

export const ROUTES = {
  getArticles() {
    return `article/get/all`
  },
  getArticle(slug: string) {
    return `article/get/${slug}`
  },
}

export const PRODUCTION_ORIGIN = "https://niconiahi.pages.dev"
export const DEVELOPMENT_ORIGIN = "http://localhost:8788"

export function getOrigin(env: Env) {
  return env.ENVIRONMENT === "development"
    ? DEVELOPMENT_ORIGIN
    : PRODUCTION_ORIGIN
}
