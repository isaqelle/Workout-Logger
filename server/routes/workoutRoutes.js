import express from "express";
import { createWorkout, getWorkouts, getWorkoutStats, updateWorkout, deleteWorkout } from "../controllers/workoutController.js";

const router = express.Router();

router.post("/", createWorkout);
router.get("/", getWorkouts);
router.get("/stats/workout-counter", getWorkoutStats);
router.put("/:id", updateWorkout);
router.delete("/:id", deleteWorkout);

export default router;