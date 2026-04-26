import WorkoutItem from "./WorkoutItem";

function WorkoutList({ workouts, onDelete, onUpdate }) {
  return (
    <div>
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