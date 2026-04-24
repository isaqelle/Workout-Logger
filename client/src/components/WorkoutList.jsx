import WorkoutItem from "./WorkoutItem";

function WorkoutList({ workouts, onDelete }) {
  return (
    <div>
      {workouts.map(workout => (
        <WorkoutItem key={workout._id} workout={workout} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default WorkoutList;