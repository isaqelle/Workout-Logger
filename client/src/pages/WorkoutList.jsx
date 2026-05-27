import WorkoutItem from "./WorkoutItem";

function WorkoutList({ workouts, onDelete, onUpdate }) {
  
  if (workouts.length === 0) {
    return <p className="noWorkouts">No workouts logged yet</p>
  }
  
  return (
    <div className="workoutList">
      {workouts.map(workout => (
        <WorkoutItem
          key={workout._id}
          workout={workout}
          onDelete={onDelete}
          onUpdate={onUpdate} />
      ))}
    </div>
  );
}

export default WorkoutList;