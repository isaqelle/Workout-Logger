function WorkoutItem({ workout }) {
  return (
    <div>
      <p>Date: {new Date(workout.date).toLocaleDateString()}</p>
      <p>User: {workout.userId?.name}</p>
    </div>
  );
}

export default WorkoutItem;