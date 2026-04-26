import { useEffect, useState } from "react";
import WorkoutList from "./components/WorkoutList";
import WorkoutForm from "./components/WorkoutForm";
import ExerciseForm from "./components/ExerciseForm";

function App() {


  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/workouts")
      .then(res => res.json())
      .then(data => {

        setWorkouts(data);
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
    const newSets = prompt("Enter new sets: ");
    const newReps = prompt("Enter new reps: ");

    if (!newSets || !newReps) return;

    const res = await fetch(`http://localhost:5000/api/workouts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        exercises: [{sets: Number(newSets), reps: Number(newReps)}]
      })
    })

    const updated = await res.json();

    //update UI
    setWorkouts(workouts.map(w => w._id === id ? updated : w))
  }


  return (
    <div>
      <h1>Workout Logger</h1>

      <WorkoutForm
        onWorkoutAdded={(newWorkout) =>
          setWorkouts([...workouts,newWorkout])
      }/>
      <WorkoutList workouts={workouts} onDelete={deleteWorkout} onUpdate={updateWorkout} />

      <ExerciseForm onExerciseAdded={()=> window.location.reload()}></ExerciseForm>
      
    </div>
  );


}

export default App;