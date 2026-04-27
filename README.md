# 🏋️ Workout Logger App

## 📌 Overview

This is a fullstack web application built with React (Vite), Express, and MongoDB.
The app allows users to log workouts, register new exercises, and monitor progress over time.

**Problem it solves:**
Helps users organize and track their workout routines in a structured way.

---

## 🚀 Tech Stack

* Frontend: React (Vite)
* Backend: Express.js (Node.js)
* Database: MongoDB Atlas
* Other: Mongoose, concurrently

---

## 🧩 Features

* Create, read, update, and delete workouts (CRUD)
* Link workouts to users
* Store exercises with sets, reps, and muscle group
* Dynamic UI with forms and live updates
* Error handling and loading states

---

## 🗂️ Project Structure

```
/client        → React frontend
/server        → Express backend
  /models      → Mongoose schemas
  /controllers → Logic
  /routes      → API routes
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```
git clone https://github.com/isaqelle/Workout-Logger.git
cd Workout-Logger
```

### 2. Install dependencies

```
npm install
cd client && npm install
cd ../server && npm install
```

### 3. Create environment variables

Create a `.env` file inside `/server`:

```
MONGO_URI=your_mongodb_connection_string
```

---

### 4. Run the application

From the root folder:

```
npm run dev
```

This will start both frontend and backend using concurrently.

---

### 5. Open in browser

```
http://localhost:5173
```

---

## 🗄️ Database Design

### Collections:

* users
* workouts
* exercises

### Relationships:

* workout.userId → users._id
* workout.exerciseId → exercises._id

---

## 🔌 API Endpoints

### Workouts

* `GET /api/workouts` → Get all workouts
* `GET /api/workouts/stats/workout-counter` → GET total workouts per user
* `POST /api/workouts` → Create workout
* `PUT /api/workouts/:id` → Update workout
* `DELETE /api/workouts/:id` → Delete workout

---
### Exercises
* `GET /api/exercises →` Get all exercises
* `POST /api/exercises →` Create exercise
* `PUT /api/exercises/:id` → Update exercise
* `DELETE /api/exercises/:id` → Delete exercise

