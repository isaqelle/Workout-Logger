import Workout from "../models/Workout.js";
import User from "../models/User.js";
import Exercise from "../models/Exercise.js";

//CREATE
export const createWorkout = async (req, res) => {
    try {
        const new_workout = new Workout(req.body);
        await new_workout.save();
        res.status(201).json(new_workout);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// GET all workouts
export const getWorkouts = async (req, res) => {
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
};

// GET total workouts per user
export const getWorkoutStats = async (req, res) => {
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
}

// UPDATE a workout
export const updateWorkout = async (req, res) => {
    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedWorkout) {
            return res.status(404).json({ error: "Workout not found" });
        }

        res.json(updatedWorkout);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// DELETE a workout
export const deleteWorkout = async (req, res) => {
    try {
        const deletedWorkout = await Workout.findByIdAndDelete(req.params.id);

        if (!deletedWorkout) {
            return res.status(404).json({ error: "Workout not found" });
        }

        res.json({ message: "Workout deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}