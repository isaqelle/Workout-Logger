import { useEffect, useState } from "react";
import WorkoutList from "./components/WorkoutList";

function App() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/workouts")
      .then(res => res.json())
      .then(data => 
        setWorkouts(data));
      
  }, []);

  return (
    <div>
      <h1>Workout Logger</h1>

      <WorkoutList workouts={workouts} />
    </div>
  );
}

export default App;