import express from "express";
import {createExercise,getExercises,updateExercise,deleteExercise} from "../controllers/exercisesController.js";

const router = express.Router();


router.post("/", createExercise);
router.get("/", getExercises);
router.put("/:id", updateExercise);
router.delete("/:id", deleteExercise);

export default router;