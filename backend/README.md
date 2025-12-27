# Prosta Teza Backend

Express.js API with Prisma ORM and PostgreSQL.

## 🚀 Tech Stack

- **Express 5** - Web framework
- **Prisma** - Next-generation ORM
- **PostgreSQL** - Database
- **Swagger** - API documentation
- **Winston** - Logging
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Express Validator** - Request validation

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/              # Configuration files
│   │   ├── database.js      # Prisma client setup
│   │   ├── environment.js   # Environment variables
│   │   ├── logger.js        # Winston logger
│   │   └── swagger.js       # Swagger configuration
│   ├── controllers/         # Request handlers
│   │   ├── healthController.js
│   │   └── index.js
│   ├── services/            # Business logic
│   │   ├── healthService.js
│   │   └── index.js
│   ├── routes/              # API routes
│   │   ├── healthRoutes.js
│   │   └── index.js
│   ├── middleware/          # Express middleware
│   │   ├── cors.js
│   │   ├── errorHandler.js
│   │   ├── requestLogger.js
│   │   └── validation.js
│   ├── utils/               # Utilities
│   │   ├── errors.js        # Custom error classes
│   │   └── response.js      # Response formatters
│   ├── prisma/              # Prisma files
│   │   └── schema.prisma    # Database schema
│   ├── app.js               # Express app setup
│   └── server.js            # Server entry point
├── .env                     # Environment variables
├── .env.example             # Environment template
├── package.json
└── nodemon.json             # Nodemon configuration
```

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm run lint         # Lint code with ESLint
npm run format       # Format code with Prettier
npm run db:migrate   # Run database migrations
npm run db:generate  # Generate Prisma Client
npm run db:studio    # Open Prisma Studio
```

## 🔌 API Endpoints

### Health Check

```
GET /api/health
```

Returns API health status and database connection info.

**Response:**

```json
{
  "success": true,
  "message": "Health check successful",
  "data": {
    "status": "ok",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "uptime": 123.456,
    "database": {
      "status": "connected"
    }
  }
}
```

## 📖 API Documentation

Interactive Swagger documentation is available at:

**http://localhost:5000/api-docs**

## 🗄️ Database

### Prisma Schema

The database schema is defined in [src/prisma/schema.prisma](src/prisma/schema.prisma).

Current models:

- **User** - Prepared for future JWT authentication

### Migrations

Create a new migration:

```bash
npm run db:migrate
```

Generate Prisma Client after schema changes:

```bash
npm run db:generate
```

### Database GUI

Access Prisma Studio:

```bash
npm run db:studio
```

## 🔐 Environment Variables

Required environment variables (see `.env.example`):

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/prosta_teza
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=debug
```

## 🏗️ Architecture

### Request Flow

```
Request → Routes → Middleware → Controllers → Services → Prisma → Database
```

### Layers

1. **Routes** - Define API endpoints and attach middleware
2. **Middleware** - Handle cross-cutting concerns (logging, validation, auth)
3. **Controllers** - Handle HTTP requests/responses
4. **Services** - Contain business logic
5. **Prisma** - Database access layer

### Error Handling

All errors are caught by the global error handler and returned in a consistent format:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [] // Optional validation errors
}
```

### Custom Error Classes

- `AppError` - Base error class
- `ValidationError` - 400 Bad Request
- `NotFoundError` - 404 Not Found
- `UnauthorizedError` - 401 Unauthorized
- `ForbiddenError` - 403 Forbidden

## 🔒 Security

- **Helmet** - Security headers
- **CORS** - Configured for frontend origin
- **Input Validation** - Express-validator
- **Error Handling** - No stack traces in production
- **Environment Variables** - Secrets in `.env` (gitignored)

## 📝 Logging

Winston logger with different log levels:

- `error` - Error messages
- `warn` - Warning messages
- `info` - Informational messages
- `debug` - Debug messages

Log level is controlled by `LOG_LEVEL` environment variable.

## 🚀 Adding New Features

### 1. Create a new model in Prisma schema

```prisma
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 2. Run migration

```bash
npm run db:migrate
```

### 3. Create service

```javascript
// src/services/postService.js
import { prisma } from '../config/database.js'

export async function getAllPosts() {
  return await prisma.post.findMany({
    include: { author: true },
  })
}

export async function createPost(data) {
  return await prisma.post.create({ data })
}
```

### 4. Create controller

```javascript
// src/controllers/postController.js
import { createPost, getAllPosts } from '../services/postService.js'
import { successResponse } from '../utils/response.js'

export async function getPosts(req, res, next) {
  try {
    const posts = await getAllPosts()
    res.json(successResponse(posts))
  }
  catch (error) {
    next(error)
  }
}

export async function addPost(req, res, next) {
  try {
    const post = await createPost(req.body)
    res.status(201).json(successResponse(post, 'Post created'))
  }
  catch (error) {
    next(error)
  }
}
```

### 5. Create routes with Swagger docs

```javascript
// src/routes/postRoutes.js
import { Router } from 'express'
import { body } from 'express-validator'
import { addPost, getPosts } from '../controllers/postController.js'
import { validate } from '../middleware/validation.js'

const router = Router()

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of posts
 */
router.get('/posts', getPosts)

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created
 */
router.post(
  '/posts',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    validate,
  ],
  addPost
)

export default router
```

### 6. Register routes

```javascript
// src/routes/index.js
import postRoutes from './postRoutes.js'

router.use('/api', postRoutes)
```

## 📚 Learn More

- [Express Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Swagger Documentation](https://swagger.io/docs/)
- [Winston Documentation](https://github.com/winstonjs/winston)
