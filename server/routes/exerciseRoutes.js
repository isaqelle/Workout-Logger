import express from "express";
import Exercise from "../models/Exercise.js";

const router = express.Router();


// GET all exercises
router.get("/", async (req, res) => {
    //debug
    console.log("BODY:", req.body); 
    try {
        const exercises = await Exercise.find();
        res.json(exercises);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST new exercise
router.post("/", async (req, res) => {
    try {
        const exercise = new Exercise(req.body);
        await exercise.save();
        res.status(201).json(exercise);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})


export default router;