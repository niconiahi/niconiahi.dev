import cron from "node-cron"
import type { ScheduledTask } from "node-cron"

// import { db } from "database"
// import { Project } from "etl/types"
// import { subgraph } from "etl/helpers"

// type Increment = {
//   count: string
// }

// type IncrementsResponse = {
//   increments: Increment[]
// }

export function getIncrementJob(): ScheduledTask {
  return cron.schedule("15 * * * * *", async () => {
    console.log("Running increment job =>")
    // const { block } = db.increment.findUnique({ where: block.greatest() })
    // const { number: lastBlockNumber } = block

    //     async function getNextIncrements(): Promise<Increment[]> {
    //       const query = `
    // query NextIncrements ($lastBlockNumber: BigInt!) {
    //   increments(
    //     orderBy: blockNumber,
    //     orderDirection: desc,
    //     where: {blockNumber_gt: $lastBlockNumber}
    //   ) {
    //     count
    //   }
    // }`

    //       return subgraph<IncrementsResponse>(query, Project.Counter, { lastBlockNumber }).then(
    //         ({ increments }) => increments,
    //       )
    //     }

    // const nextIncrements = await getNextIncrements()

    // await db.increment.saveMany(nextIncrements)
  })
}
