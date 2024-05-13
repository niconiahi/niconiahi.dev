import type { Env } from "~/utils/env.server"

export const PRODUCTION_ORIGIN = "https://niconiahi.pages.dev"
export const DEVELOPMENT_ORIGIN = "http://localhost:5173"

export function getOrigin(env: Env) {
  return env.ENVIRONMENT === "development"
    ? DEVELOPMENT_ORIGIN
    : PRODUCTION_ORIGIN
}
