# Prosta Teza Frontend

Vue.js 3 application with Feature-Sliced Design architecture.

## 🚀 Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vue Router** - Official routing library
- **Pinia** - State management
- **Axios** - HTTP client
- **Vite** - Build tool and dev server
- **FSD** - Feature-Sliced Design architecture

## 📁 Project Structure (FSD)

```
frontend/src/
├── app/                    # Application layer
│   ├── providers/          # App providers (router, store)
│   ├── styles/             # Global styles
│   └── App.vue             # Root component
├── pages/                  # Pages layer
├── widgets/                # Widgets layer
├── features/               # Features layer
├── entities/               # Entities layer
├── shared/                 # Shared layer
│   ├── ui/                 # Reusable UI components
│   ├── api/                # API client and endpoints
│   ├── lib/                # Utilities
│   └── config/             # Configuration
└── main.js                 # Application entry point
```

## 🏗️ Feature-Sliced Design

FSD layers from top to bottom:

1. **app** - Application initialization
2. **pages** - Full page components
3. **widgets** - Large UI blocks
4. **features** - User interactions
5. **entities** - Business entities
6. **shared** - Reusable code

## 🛠️ Scripts

```bash
npm run dev       # Start dev server (localhost:3000)
npm run build     # Build for production
npm run lint      # Lint code
npm run format    # Format code
```

## 📚 Learn More

- [Vue 3 Docs](https://vuejs.org/)
- [FSD Methodology](https://feature-sliced.design/)
