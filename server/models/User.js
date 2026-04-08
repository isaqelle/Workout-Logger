import mongoose from "mongoose";


// define structure:
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
    
});

export default mongoose.model("User", userSchema)