import swaggerJsdoc from 'swagger-jsdoc'
import { config } from './environment.js'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Prosta Teza API',
      version: '0.1.0',
      description: 'API documentation for Prosta Teza backend',
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
}

export const swaggerSpec = swaggerJsdoc(options)
