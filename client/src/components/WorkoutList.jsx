import WorkoutItem from "./WorkoutItem";

function WorkoutList({ workouts }) {
  return (
    <div>
      {workouts.map(workout => (
        <WorkoutItem key={workout._id} workout={workout} />
      ))}
    </div>
  );
}

export default WorkoutList;