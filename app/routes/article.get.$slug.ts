import type { LoaderArgs } from "@remix-run/cloudflare"

export function loader({ context }: LoaderArgs) {
  console.log("context", context)
  // 	slug          String   @id
  // 	hash          String
  // 	title         String
  // 	description   String
  // 	html          String   @db.LongText
  // 	createdAt     DateTime @default(now())
  // 	updatedAt     DateTime @updatedAt
}
