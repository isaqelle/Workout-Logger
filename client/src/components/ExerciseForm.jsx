import { useState } from "react";

function ExerciseForm({ onExerciseAdded }) {
    const [name, setName] = useState("");
    const [muscleGroup, setMuscleGroup] = useState("");
    const [equipment, setEquipment] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newExercise = { name, muscleGroup, equipment };

        const res = await fetch("http://localhost:5000/api/exercises", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newExercise)
        });
        const data = await res.json();

        onExerciseAdded(data);
        setName("");
        setMuscleGroup("");
        setEquipment("");
    };
    return (
        <div className="exerciseContainer">
        <form className="exerciseForm" onSubmit={handleSubmit}>
            <h2>Register new exercise</h2>

            <input placeholder="Exercise name" value={name} onChange={(e) => setName(e.target.value)} />
        
            <input placeholder="Muscle group" value={muscleGroup} onChange={(e) => setMuscleGroup(e.target.value)} />

            <input placeholder="Equipment" value={equipment} onChange={(e) => setEquipment(e.target.value)} />

            <button type="submit">Add Exercise</button>
        
            </form>
        </div>
    )
}

export default ExerciseForm;