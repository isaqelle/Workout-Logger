import express from "express";
import Workout from "../models/Workout.js";
import User from "../models/User.js"
import Exercise from "../models/Exercise.js"

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
        //filtering
        const { userId } = req.query;
        let filter = {};
        if (userId) {
            filter.userId = userId;
        }

        const workouts = await Workout.find(filter)
            .populate("userId") // populate user
            .populate("exercises.exerciseId"); // populate nested exercise
        res.json(workouts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// GET total workouts per user
router.get("/stats/workout-counter", async (req, res) => {
    try {
        const workouts = await Workout.find().populate("userId", "name");
        const counts = {};
        
        workouts.forEach(workout => {
            const userName = workout.userId.name;
            if (!counts[userName]) {
                counts[userName] = 0;
            }
            counts[userName]++;
        });

        const result = Object.keys(counts).map(name => ({
            user: name,
            totalWorkouts: counts[name]
        }));
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

export default router;