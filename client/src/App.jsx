import { useEffect, useState } from "react";
import WorkoutList from "./components/WorkoutList";
import WorkoutForm from "./components/WorkoutForm";
import ExerciseForm from "./components/ExerciseForm";
import "./App.css";

function App() {
  const [workouts, setWorkouts] = useState([]);
  //for stats:
  const [stats, setStats] = useState([]);

  // for error and loading states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchStats = () => {
  fetch("http://localhost:5000/api/workouts/stats/workout-counter")
    .then(res => res.json())
    .then(data => setStats(data))
    .catch(err => console.error(err));
  };
  

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


  // for stats:
  useEffect(() => {
    fetchStats();
}, []);


  //DELETE WORKOUT
  const deleteWorkout = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this workout?");
    if (!confirmDelete) return;
    
    await fetch(`http://localhost:5000/api/workouts/${id}`, {
      method: "DELETE"
    })
    //remove from UI:
    setWorkouts(workouts.filter(w => w._id !== id))
    fetchStats();
  }


  // UPDATE WORKOUT
const updateWorkout = async (id) => {
  const newSets = prompt("Enter new set count:");
  const newReps = prompt("Enter new rep count:");

  if (!newSets || !newReps) return;

  const workout = workouts.find(w => w._id === id);

  const res = await fetch(`http://localhost:5000/api/workouts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      exercises: workout.exercises.map(ex => ({
        exerciseId: ex.exerciseId._id || ex.exerciseId,
        sets: Number(newSets),
        reps: Number(newReps)
      }))
    })
  });

  const updated = await res.json();

  // update UI
  setWorkouts(workouts.map(w =>
    w._id === id ? updated : w
  ));
  fetchStats();
};

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}...</p>

  return (
    <div className="container">
      <h1>Workout Logger</h1>

      <WorkoutForm
        onWorkoutAdded={(newWorkout) => {
          setWorkouts([...workouts, newWorkout]);
          fetchStats();
        }} />


      <ExerciseForm onExerciseAdded={() => window.location.reload()}></ExerciseForm>

      <h2>Logged Workouts:</h2>

      {/* show stats */}
        <div className="stats">
        {stats.map((s, index) => (
      <p key={index}>
        {s.user}: {s.totalWorkouts} workout/s
      </p>
    ))}
  </div>
      <WorkoutList workouts={workouts} onDelete={deleteWorkout} onUpdate={updateWorkout} />
      
    </div>
  );


}

export default App;