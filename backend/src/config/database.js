import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import pg from 'pg'
import { config } from './environment.js'
import { logger } from './logger.js'

const pool = new pg.Pool({
  connectionString: config.database.url,
})

const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({
  adapter,
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
})

prisma.$on('query', (e) => {
  logger.debug(`Query: ${e.query}`)
  logger.debug(`Duration: ${e.duration}ms`)
})

prisma.$on('error', (e) => {
  logger.error(e)
})

export { prisma }
