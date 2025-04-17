import { PrismaClient } from '@prisma/client'
import { getNodeEnv } from '@/app/action/env'
// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
   globalForPrisma.prisma ||
   new PrismaClient({
      log: (await getNodeEnv()).env === 'development' ? ['query', 'error', 'warn'] : ['error'],
   })

if ((await getNodeEnv()).env !== 'production') globalForPrisma.prisma = prisma
