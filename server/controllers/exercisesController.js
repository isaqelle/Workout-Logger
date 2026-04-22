import Exercise from "../models/Exercise.js";

// GET all exercises
export const getExercises = async (req, res) => {
    //debug
    console.log("BODY:", req.body); 
    try {
        const exercises = await Exercise.find();
        res.json(exercises);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// CREATE a new exercise
export const createExercise = async (req, res) => {
    try {
        const exercise = new Exercise(req.body);
        await exercise.save();
        res.status(201).json(exercise);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// UPDATE an exercise
export const updateExercise = async (req, res) => {
    try {
        const updatedExercise = await Exercise.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedExercise) {
            return res.status(404).json({ error: "Exercise not found" });
        }

        res.json(updatedExercise);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// DELETE an exercise

export const deleteExercise = async (req, res) => {
    try {
        const deletedExercise = await Exercise.findByIdAndDelete(req.params.id);

        if (!deletedExercise) {
            return res.status(404).json({ error: "Exercise not found" });
        }

        res.json({ message: "Exercise deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}