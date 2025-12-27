import winston from 'winston'
import { config } from './environment.js'

const logger = winston.createLogger({
  level: config.logLevel,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ level, message, timestamp, stack, ...meta }) => {
          // Handle objects in message
          const msg = typeof message === 'object' ? JSON.stringify(message) : message

          // Include metadata if present
          const metaStr = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : ''

          if (stack) {
            return `${timestamp} ${level}: ${msg}${metaStr}\n${stack}`
          }
          return `${timestamp} ${level}: ${msg}${metaStr}`
        }),
      ),
    }),
  ],
})

export { logger }
