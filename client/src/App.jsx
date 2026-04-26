import { useEffect, useState } from "react";
import WorkoutList from "./components/WorkoutList";
import WorkoutForm from "./components/WorkoutForm";
import ExerciseForm from "./components/ExerciseForm";
import "./App.css";

function App() {
  const [workouts, setWorkouts] = useState([]);

  // for error and loading states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/workouts")
      .then(res => res.json())
      .then(data => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load workouts");
        setLoading(false);
      });
  }, []);




  //DELETE WORKOUT
  const deleteWorkout = async (id) => {
    await fetch(`http://localhost:5000/api/workouts/${id}`, {
      method: "DELETE"
    })
    //remove from UI:
    setWorkouts(workouts.filter(w => w._id !== id))
  }


  // UPDATE WORKOUT
  const updateWorkout = async (id) => {
    const newSets = prompt("Enter new set count: ");
    const newReps = prompt("Enter new rep count: ");

    if (!newSets || !newReps) return;

    const res = await fetch(`http://localhost:5000/api/workouts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        exercises: [{ sets: Number(newSets), reps: Number(newReps) }]
      })
    })

    const updated = await res.json();

    //update UI
    setWorkouts(workouts.map(w => w._id === id ? updated : w))
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}...</p>

  return (
    <div className="container">
      <h1>Workout Logger</h1>

      <WorkoutForm
        onWorkoutAdded={(newWorkout) =>
          setWorkouts([...workouts, newWorkout])
        } />


      <ExerciseForm onExerciseAdded={() => window.location.reload()}></ExerciseForm>

      <h2>Logged Workouts:</h2>
      <WorkoutList workouts={workouts} onDelete={deleteWorkout} onUpdate={updateWorkout} />
      
    </div>
  );


}

export default App;