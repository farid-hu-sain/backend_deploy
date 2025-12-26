import { PrismaPg } from "../node_modules/@prisma/adapter-pg/dist/index";
import { Pool } from "pg";
import { PrismaClient } from "./generated/client";
import config from './utils/env'

let prisma: PrismaClient

const getPrisma = () => {
    if (!prisma) {
        const pool = new Pool({ connectionString: config.DATABASE_URL })
        const adapter = new PrismaPg(pool)
        prisma = new PrismaClient({ adapter })
    }
    return prisma
}

const prismaIntance = getPrisma()
export default prismaIntance