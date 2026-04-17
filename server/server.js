import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
//Load variables from .env file
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

import exerciseRoutes from "./routes/exerciseRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js"
app.use("/api/exercises", exerciseRoutes);
app.use("/api/workouts", workoutRoutes);





app.get("/", (req, res) => {
  res.send("API running");
});


// Connecting the database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.error(err));