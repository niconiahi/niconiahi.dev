import { PrismaClient } from "@prisma/client"

const db: PrismaClient = new PrismaClient()
db.connect()

export { db }
