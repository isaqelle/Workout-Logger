import express from "express";
import Workout from "../models/Workout.js";

const router = express.Router();

// Create a workout
router.post("/", async (req, res) => {
    try {
        const new_workout = new Workout(req.body);
        await new_workout.save();
        res.status(201).json(new_workout);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// GET all workouts
router.get("/", async (req, res) => {
    try {
        const workouts = await Workout.find();
        res.json(workouts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;