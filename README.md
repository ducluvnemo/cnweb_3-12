# Student Management (React + Express + MongoDB)

This project contains a simple MERN-style CRUD app to manage students.
- Frontend: React (minimal scaffold)
- Backend: Express + Mongoose
- Database: MongoDB (recommended to run via Docker Compose)

## Quick start (local, without Docker)
1. Start MongoDB locally (or use a hosted MongoDB).
2. Backend:
   - `cd backend`
   - `npm install`
   - Create a `.env` file (or use `.env.example`) with `MONGO_URL`.
   - `npm start`
3. Frontend:
   - `cd frontend`
   - `npm install`
   - `npm start`
4. Open http://localhost:3000

## Run with Docker Compose (recommended)
This repository includes a `docker-compose.yml` at the repo root that will:
- Start a MongoDB container
- Build and start the backend container

Steps:
1. Make sure Docker & Docker Compose are installed.
2. Run `docker-compose up --build` at the repo root.
3. Backend will be reachable at `http://localhost:5000`.
4. Start the frontend locally (`cd frontend && npm install && npm start`) or build & serve the static files.

## Notes about Docker / networking
- In `docker-compose.yml`, the backend's `MONGO_URL` is set to `mongodb://mongodb:27017/student_db` so the backend container connects to the MongoDB service by its service name `mongodb`.
- When running backend locally (not in Docker) use `mongodb://localhost:27017/student_db` or set `MONGO_URL` accordingly.

## Files created
- backend/: Express server, models, Dockerfile, .env.example
- frontend/: React app skeleton
- docker-compose.yml: launches mongodb + backend
