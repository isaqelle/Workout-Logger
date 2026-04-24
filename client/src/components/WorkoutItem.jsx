function WorkoutItem({ workout }) {
  return (
    <div>
      <p>Date: {new Date(workout.date).toLocaleDateString()}</p>
      <p>User: {workout.userId?.name}</p>

      {workout.exercises.map((ex, index) => (
        <div key={index}>
          <p>Exercise: {ex.exerciseId?.name}</p>
          <p>Sets: {ex.sets}</p>
          <p>Exercise: {ex.reps}</p>
        </div>
      ))}
    </div>
  );
}

export default WorkoutItem;