import { getNodeEnv } from '@/app/action/env'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
   globalForPrisma.prisma ||
   new PrismaClient({
      adapter,
      log: (await getNodeEnv()).env === 'development' ? ['query', 'error', 'warn'] : ['error'],
   })

if ((await getNodeEnv()).env !== 'production') globalForPrisma.prisma = prisma
