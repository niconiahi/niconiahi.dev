import { getIncrementJob } from "./jobs"

async function start() {
  console.log("Starting ETL =>")

  getIncrementJob().start()
}

await start()

export {}
