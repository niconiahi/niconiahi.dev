import { useFetcher } from "@remix-run/react"
import type { ReactElement } from "react"

export default function RouteTransition(): ReactElement {
  const fetcher = useFetcher()
  console.log("PageTransition ~ fetcher", fetcher)

  return <p>transition</p>
}
