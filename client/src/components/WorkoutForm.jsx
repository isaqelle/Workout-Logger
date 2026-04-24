import { useState,useEffect } from "react";


function WorkoutForm({ onWorkoutAdded }) {
    const [exercises, setExercises] = useState([]);
    const [exerciseId, setExerciseId] = useState("");
    const [sets, setSets] = useState("");
    const [reps, setReps] = useState("");

    const userId = "69e22b8d36380026a5a97353"

    useEffect(() => {
    fetch("http://localhost:5000/api/exercises")
        .then(res => res.json())
        .then(data => setExercises(data));
}, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newWorkout = {
            userId,
            date: new Date(),
            exercises: [
                {
                    exerciseId,
                    sets: Number(sets),
                    reps: Number(reps)
                }
            ]
        }
        const res = await fetch("http://localhost:5000/api/workouts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newWorkout)
        });
        const data = await res.json()
        onWorkoutAdded(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Log New Workout</h2>
            
            <select value={exerciseId} onChange={(e) => setExerciseId(e.target.value)}>
                <option value="">Select Exercise</option>
                {exercises.map(ex => (
                    <option key={ex._id} value={ex._id}>
                        {ex.name} {ex.equipment ? `- ${ex.equipment}` : ""}
                    </option>
                ))}

            </select>
            
            <input type="number" placeholder="Sets" value={sets}
                onChange={(e) => setSets(e.target.value)} />
            
            <input type="number" placeholder="Reps" value={reps}
                onChange={(e) => setReps(e.target.value)} />
            
            <button type="submit">Log Workout</button>
        </form>
    )
}

export default WorkoutForm