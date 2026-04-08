import mongoose from "mongoose";


// define structure:
const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    muscleGroup: {
        type: String,
        required: true
    },
    equipment: {
        type: String
    }
    
});

export default mongoose.model("Exercise", exerciseSchema)