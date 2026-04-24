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

  //DELETE workout
  const deleteWorkout = async (id) => {
    await fetch(`http://localhost:5000/api/workouts/${id}`, {
      method: "DELETE"
    })
    //remove from UI:
    setWorkouts(workouts.filter(w => w._id !== id))
  }

  return (
    <div>
      <h1>Workout Logger</h1>

      <WorkoutForm
        onWorkoutAdded={(newWorkout) =>
          setWorkouts([...workouts,newWorkout])
      }/>
      <WorkoutList workouts={workouts} onDelete={deleteWorkout} />

      <ExerciseForm onExerciseAdded={()=> window.location.reload()}></ExerciseForm>
      
    </div>
  );

}

export default App;