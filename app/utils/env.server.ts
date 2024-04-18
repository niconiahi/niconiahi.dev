import type { AppLoadContext } from "@remix-run/cloudflare"

export interface Env {
  ENVIRONMENT: string
  DB: D1Database
}

export function getEnv(context: AppLoadContext): Env {
  return context.cloudflare.env
}
