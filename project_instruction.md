# Project Instruction Index

## Overview
This workspace implements the RealWorld spec as a full-stack application with two repositories:
- **Frontend**: React + Redux SPA for the user interface
- **Backend**: Node.js (Express) API server with Prisma ORM and PostgreSQL

All API endpoints, types, and payloads conform to the RealWorld API spec. The frontend communicates with the backend exclusively via HTTP API.

---

## Index
- [1. Project Structure](#1-project-structure)
- [2. Main Components & Modules](#2-main-components--modules)
- [3. Application Flows](#3-application-flows)
- [4. API Endpoints & Data Types](#4-api-endpoints--data-types)
- [5. Setup & Configuration](#5-setup--configuration)
- [6. Cross-Repo Notes](#6-cross-repo-notes)

---

## 1. Project Structure

### Frontend (`gothinker-001-6f3a67d3-frontend`)
- `src/components/` - React UI components (App, ArticleList, Editor, Header, etc.)
- `src/reducers/` - Redux reducers for state management (article, auth, profile, etc.)
- `src/agent.js` - API abstraction layer (set API URL here)
- `src/constants/` - Action types and constants
- `public/` - Static assets

### Backend (`gothinker-001-6f3a67d3-backend`)
- `src/app/routes/` - Express route controllers (article, auth, profile, tag)
- `src/app/models/` - Data models and error classes
- `src/prisma/schema.prisma` - Prisma ORM schema (User, Article, Comment, Tag)
- `src/prisma/seed.ts` - DB seed script
- `src/` - Main entry, config, and utility files

---

## 2. Main Components & Modules

### Frontend Components
- **App.js**: Root component, sets up routes and layout
- **ArticleList.js**: Lists articles, handles pagination
- **ArticlePreview.js**: Renders article summary
- **Editor.js**: Article create/edit form
- **Header.js**: Navigation bar, user menu
- **ListErrors.js**: Displays form/API errors
- **ListPagination.js**: Pagination controls
- **Login.js / Register.js**: Auth forms
- **Profile.js / ProfileFavorites.js**: User profile and favorites
- **Settings.js**: User settings form

### Redux Reducers
- **article.js**: Article state, comments
- **articleList.js**: List of articles, filters, pagination
- **auth.js**: Auth state (login/register)
- **common.js**: App-wide state (user, redirects)
- **editor.js**: Editor form state
- **home.js**: Home page state (tags)
- **profile.js**: Profile state
- **settings.js**: Settings form state

### Backend Modules
- **article/**: Article CRUD, comments, favorites
- **auth/**: User registration, login, JWT
- **profile/**: Profile view, follow/unfollow
- **tag/**: Tag list
- **models/**: Prisma models, HTTP error class

---

## 3. Application Flows
- **User Auth**: Register/Login via `/api/users`, `/api/users/login`. JWT stored in localStorage, sent on requests.
- **Article CRUD**: Create, edit, delete, list articles via `/api/articles`, `/api/articles/:slug`.
- **Profile**: View/follow users via `/api/profiles/:username`.
- **Comments**: Add/delete comments via `/api/articles/:slug/comments`.
- **Tags**: List tags via `/api/tags`.

---

## 4. API Endpoints & Data Types

### Endpoints
- `POST /api/users` - Register
- `POST /api/users/login` - Login
- `GET /api/user` - Current user
- `GET/PUT /api/profiles/:username` - Profile
- `POST/DELETE /api/profiles/:username/follow` - Follow/unfollow
- `GET/POST /api/articles` - List/create articles
- `GET/PUT/DELETE /api/articles/:slug` - Article detail
- `GET /api/articles/feed` - Feed
- `POST/DELETE /api/articles/:slug/favorite` - Favorite/unfavorite
- `GET/POST /api/articles/:slug/comments` - List/add comments
- `DELETE /api/articles/:slug/comments/:id` - Delete comment
- `GET /api/tags` - List tags

### Data Types
- **User**: `{ email, token, username, bio, image }`
- **Profile**: `{ username, bio, image, following }`
- **Article**: `{ slug, title, description, body, tagList, createdAt, updatedAt, favorited, favoritesCount, author }`
- **Comment**: `{ id, createdAt, updatedAt, body, author }`
- **Tag**: `string`

---

## 5. Setup & Configuration

### Frontend
- `npm install` then `npm start` (default port 4100)
- API URL: Edit `src/agent.js` to point to backend (e.g., `http://localhost:3000/api`)
- `.env` can be used for port and other env vars

### Backend
- `npm install`
- Set env vars in `.env`: `DATABASE_URL`, `JWT_SECRET`, `NODE_ENV`
- `npx prisma generate` to generate client
- `npx prisma migrate deploy` to apply migrations
- `npx nx serve api` to start server
- `npx prisma db seed` to seed DB (optional)

---

## 6. Cross-Repo Notes
- All API contracts follow the RealWorld spec
- No direct imports between repos; all integration is via HTTP API
- Environment variables must be set for backend; frontend must be configured to use correct API URL
- For full details, see `instruction.md` in backend repo
