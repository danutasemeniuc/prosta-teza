import compression from 'compression'
import express from 'express'
import helmet from 'helmet'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger.js'
import { corsMiddleware } from './middleware/cors.js'
import { errorHandler } from './middleware/errorHandler.js'
import { requestLogger } from './middleware/requestLogger.js'
import routes from './routes/index.js'

const app = express()

// Security middleware
app.use(helmet())
app.use(corsMiddleware)

// Body parsing middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Compression middleware
app.use(compression())

// Request logging
app.use(requestLogger)

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Routes
app.use(routes)

// Error handling middleware (must be last)
app.use(errorHandler)

export default app
