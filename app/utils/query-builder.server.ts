import type { AppLoadContext } from "@remix-run/cloudflare"
import type { DB } from "db/types"
import { Kysely } from "kysely"
import { D1Dialect } from "kysely-d1"
import { getEnv } from "~/utils/env.server"

export function getQueryBuilder(context: AppLoadContext) {
  const env = getEnv(context)
  return new Kysely<DB>({
    dialect: new D1Dialect({ database: env.DB }),
  })
}
