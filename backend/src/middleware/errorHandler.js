import { logger } from '../config/logger.js'
import { AppError } from '../utils/errors.js'

export function errorHandler(err, req, res, _next) {
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
  })

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.errors && { errors: err.errors }),
    })
  }

  // Default error
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  })
}
