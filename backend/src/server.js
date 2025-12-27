import app from './app.js'
import { prisma } from './config/database.js'
import { config } from './config/environment.js'
import { logger } from './config/logger.js'

const server = app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`)
  logger.info(`Environment: ${config.env}`)
  logger.info(`API documentation available at http://localhost:${config.port}/api-docs`)
})

// Graceful shutdown
async function gracefulShutdown() {
  logger.info('Shutting down gracefully...')

  server.close(async () => {
    logger.info('HTTP server closed')

    try {
      await prisma.$disconnect()
      logger.info('Database connection closed')
      process.exit(0)
    }
    catch (error) {
      logger.error('Error during shutdown:', error)
      process.exit(1)
    }
  })

  // Force shutdown after 10 seconds
  setTimeout(() => {
    logger.error('Forced shutdown after timeout')
    process.exit(1)
  }, 10000)
}

process.on('SIGTERM', gracefulShutdown)
process.on('SIGINT', gracefulShutdown)
