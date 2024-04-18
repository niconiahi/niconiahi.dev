import type { Env } from "~/utils/env.server"

export const PRODUCTION_ORIGIN = "https://niconiahi.pages.dev"
export const DEVELOPMENT_ORIGIN = "http://localhost:8788"

export function getOrigin(env: Env) {
  console.log('env', env)
  return PRODUCTION_ORIGIN
  // return env.ENVIRONMENT === "development"
  //   ? DEVELOPMENT_ORIGIN
  //   : PRODUCTION_ORIGIN
}
