# Job Search Application

A modern job search platform built with Next.js 14, Express, and SQLite. This application allows users to browse job opportunities, search for specific positions, and manage their favorite jobs.

## Features

- Browse job listings with titles, descriptions, and company names
- Search jobs by title
- Favorite/unfavorite jobs for easy access later
- Responsive design with dark mode support
- Real-time job details preview
- Infinite scroll pagination
- Confetti animation on job application

## Tech Stack

### Frontend

- Next.js 14
- React Query for data fetching
- Tailwind CSS for styling
- Framer Motion for animations
- Shadcn UI for accessible components
- TypeScript

### Backend

- Express.js
- SQLite database
- RESTful API endpoints

## Getting Started

### Prerequisites

- Node.js 20 or later (tested on v20.17.0)
- pnpm (v9.8.0)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Set up the database:

```bash
pnpm run db:reset
```

4. Start the development servers:

In one terminal:

```bash
npm run server:dev
```

In another terminal:

```bash
npm run client:dev
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## API Endpoints

### Jobs API

- `GET /jobs` - Get paginated list of jobs
- `GET /jobs/:id` - Get specific job details
- `POST /jobs/recommendations` - Get job recommendations based on title

### Favorites API

- `GET /favourites/:userId` - Get user's favorite jobs
- `POST /favourites` - Add job to favorites
- `DELETE /favourites` - Remove job from favorites

### Users API

- `GET /users` - Get all users
- `GET /users/first` - Get first user (for demo purposes)

## Project Structure

```bash
├── src/
│ ├── app/ # Next.js pages and API routes
│ ├── components/ # Reusable UI components
│ ├── features/ # Feature-specific components
│ ├── hooks/ # Custom React hooks
│ ├── lib/ # Utility functions and API clients
│ └── types/ # TypeScript type definitions
├── backend/
│ ├── models/ # Database models
│ ├── routes/ # Express routes
│ └── app.js # Express application setup
└── db/
├── schema.sql # Database schema
└── seed.js # Database seeding script
```

## Environment Variables

Create a `.env` file in the root directory with:

```bash
JOBS_API_BASE_URL=https://yon9jygrt9.execute-api.eu-west-1.amazonaws.com/prod
DB_SERVER_URL=http://localhost:3001
```
