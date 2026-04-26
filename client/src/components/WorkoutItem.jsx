function WorkoutItem({ workout, onDelete, onUpdate }) {
  return (
    <div>
      <p>Date: {new Date(workout.date).toLocaleDateString()}</p>
      <p>User: {workout.userId?.name}</p>

      {workout.exercises.map((ex, index) => (
        <div key={index}>
          <p>Exercise: {ex.exerciseId?.name}</p>
          <p>Sets: {ex.sets}</p>
          <p>Reps: {ex.reps}</p>
        </div>
      ))}

      <button onClick={() => onDelete(workout._id)}>Delete</button>
      <button onClick={() => onUpdate(workout._id)}>Update</button>
    </div>
  );
}

export default WorkoutItem;