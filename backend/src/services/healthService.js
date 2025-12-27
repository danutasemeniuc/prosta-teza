import { prisma } from '../config/database.js'

export async function checkDatabaseConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`
    return { status: 'connected' }
  }
  catch (error) {
    return { status: 'disconnected', error: error.message }
  }
}

export async function getHealthStatus() {
  const database = await checkDatabaseConnection()

  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database,
  }
}
