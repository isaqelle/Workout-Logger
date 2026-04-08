import mongoose from "mongoose";


// define structure:
const workoutSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    exercises: [
        {
            exerciseId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Exercise",
                required: true
            },
            sets: {
                type: Number,
                required: true,
                min: 0
            },
            reps: {
                type: Number,
                required: true,
                min: 1
            },
            weight: {
                type: Number,
                min: 0
            }
        }
    ]
    
});

export default mongoose.model("Workout", workoutSchema)