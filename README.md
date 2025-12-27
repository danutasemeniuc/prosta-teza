# Prosta Teza

A modern fullstack application built with Vue.js, Express, and PostgreSQL.

## 🚀 Tech Stack

### Frontend
- **Vue 3** - Progressive JavaScript framework
- **Vue Router** - Official router for Vue.js
- **Pinia** - State management
- **Axios** - HTTP client
- **Vite** - Next generation frontend tooling
- **FSD Architecture** - Feature-Sliced Design for scalable code organization

### Backend
- **Express** - Fast, minimalist web framework for Node.js
- **Prisma** - Next-generation ORM
- **PostgreSQL** - Advanced open-source relational database
- **Swagger** - API documentation
- **Winston** - Logging library
- **Helmet** - Security middleware

### DevOps & Tools
- **Docker** & **Docker Compose** - Containerization
- **pgAdmin** - PostgreSQL administration tool
- **ESLint** & **Prettier** - Code linting and formatting
- **GitHub Actions** - CI/CD pipeline

## 📁 Project Structure

```
prosta-teza/
├── frontend/                   # Vue.js application (FSD architecture)
│   ├── src/
│   │   ├── app/               # App initialization, providers, global styles
│   │   ├── pages/             # Route-level components
│   │   ├── widgets/           # Complex UI blocks
│   │   ├── features/          # User interactions
│   │   ├── entities/          # Business entities
│   │   └── shared/            # Reusable code (UI, API, utils)
│   └── package.json
├── backend/                    # Express API
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   ├── controllers/       # Request handlers
│   │   ├── services/          # Business logic
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Express middleware
│   │   ├── utils/             # Utility functions
│   │   └── prisma/            # Prisma schema and migrations
│   └── package.json
├── .github/workflows/         # CI/CD pipelines
├── docker-compose.yml         # Docker services configuration
└── package.json               # Root workspace configuration
```

## 🛠️ Prerequisites

- **Node.js** >= 20.x
- **npm** >= 10.x
- **Docker** & **Docker Compose**
- **Git**

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone git@github.com:danutasemeniuc/prosta-teza.git
cd prosta-teza
```

### 2. Environment Setup

Create environment files from templates:

```bash
# Root environment (for Docker)
cp .env.example .env

# Backend environment
cp backend/.env.example backend/.env

# Frontend environment
cp frontend/.env.example frontend/.env
```

### 3. Install Dependencies

```bash
# Install all workspace dependencies
npm install
```

### 4. Start Database

```bash
# Start PostgreSQL and pgAdmin
docker compose up -d
```

### 5. Run Database Migrations

```bash
# Generate Prisma Client and run migrations
npm run db:generate
npm run db:migrate
```

### 6. Start Development Servers

**Option 1 - Start Both (Recommended):**
```bash
npm run dev
```

**Option 2 - Start Separately:**

Terminal 1 - Backend:
```bash
npm run dev:backend
```

Terminal 2 - Frontend:
```bash
npm run dev:frontend
```

### 7. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api-docs
- **pgAdmin**: http://localhost:5050

## 📝 Available Scripts

### Root Level

```bash
npm run dev               # Start both frontend and backend (recommended)
npm run dev:frontend      # Start frontend development server only
npm run dev:backend       # Start backend development server only
npm run build:frontend    # Build frontend for production
npm run lint              # Lint all workspaces
npm run format            # Format all workspaces
npm run db:migrate        # Run database migrations
npm run db:generate       # Generate Prisma Client
npm run db:studio         # Open Prisma Studio (database GUI)
```

### Frontend

```bash
cd frontend
npm run dev               # Start development server
npm run build             # Build for production
npm run preview           # Preview production build
npm run lint              # Lint code
npm run format            # Format code
```

### Backend

```bash
cd backend
npm run dev               # Start development server with nodemon
npm start                 # Start production server
npm run lint              # Lint code
npm run format            # Format code
npm run db:migrate        # Run database migrations
npm run db:generate       # Generate Prisma Client
npm run db:studio         # Open Prisma Studio
```

## 🗄️ Database Management

### Access pgAdmin

1. Navigate to http://localhost:5050
2. Login with credentials from `.env`:
   - Email: admin@admin.com
   - Password: admin

### Register PostgreSQL Server in pgAdmin

1. Right-click "Servers" → "Register" → "Server"
2. **General** tab:
   - Name: Prosta Teza
3. **Connection** tab:
   - Host: postgres (Docker service name)
   - Port: 5432
   - Database: prosta_teza
   - Username: postgres
   - Password: postgres (from `.env`)

### Prisma Studio

For a modern database GUI, use Prisma Studio:

```bash
npm run db:studio
```

Access at: http://localhost:5555

## 🏗️ Feature-Sliced Design (FSD)

The frontend follows FSD architecture for better code organization and scalability.

### Layer Hierarchy (top to bottom)

1. **app** - Application initialization, routing, global styles
2. **pages** - Route-level components (one per page)
3. **widgets** - Complex, self-contained UI blocks
4. **features** - User interactions and business features
5. **entities** - Business entity representations
6. **shared** - Reusable code, utilities, UI components

### Import Rules

- Higher layers can import from lower layers
- Lower layers cannot import from higher layers
- No circular dependencies between slices

### Path Aliases

```javascript
import { Button } from '@/shared/ui';
import HomePage from '@/pages/home';
import { Header } from '@/widgets/header';
```

## 🔐 Security

- **Helmet** - Sets various HTTP headers for security
- **CORS** - Configured for localhost development
- **Environment Variables** - Sensitive data stored in `.env` files
- **Input Validation** - Express-validator for request validation
- **.gitignore** - Prevents committing sensitive files

## 📚 API Documentation

Swagger documentation is automatically generated and available at:

**http://localhost:5000/api-docs**

## 🧪 Testing

Testing infrastructure is not included in the initial setup. To add testing:

**Frontend (Vitest):**
```bash
cd frontend
npm install --save-dev vitest @vue/test-utils
```

**Backend (Jest):**
```bash
cd backend
npm install --save-dev jest supertest
```

## 🔄 CI/CD

GitHub Actions workflow is configured to:
- Run linting on both frontend and backend
- Check code formatting
- Build frontend
- Generate Prisma Client

Workflow runs on:
- Push to `main` or `dev` branches
- Pull requests to `main` or `dev` branches

## 🚀 Future Enhancements

The project is structured to support:

### JWT Authentication
- User model already exists in Prisma schema
- API client configured for token attachment
- Router ready for auth guards

### Additional Features
- TypeScript migration
- Testing infrastructure (Vitest, Jest)
- Production Docker configurations
- Environment-specific deployments
- Additional database models
- Real-time features (WebSockets)

## 📖 Learn More

- [Vue 3 Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Express Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Feature-Sliced Design](https://feature-sliced.design/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Vue.js team for the amazing framework
- Prisma team for the excellent ORM
- Community for various open-source packages
