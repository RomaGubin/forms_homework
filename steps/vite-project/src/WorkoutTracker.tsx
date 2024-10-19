import React, { useState } from "react";
import "./index.css";

interface Workout {
  date: string;
  distance: number;
}

const WorkoutTracker: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [inputDate, setInputDate] = useState<string>("");
  const [inputDistance, setInputDistance] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDate(e.target.value);
  };

  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDistance(e.target.value);
  };

  const handleSubmit = () => {
    if (!inputDate || !inputDistance) {
      return;
    }

    const newDistance = parseFloat(inputDistance);
    if (isNaN(newDistance)) return;

    const newWorkout: Workout = {
      date: inputDate,
      distance: newDistance,
    };

    if (editIndex !== null) {
      const updatedWorkouts = [...workouts];
      updatedWorkouts[editIndex] = newWorkout;
      setWorkouts(updatedWorkouts);
      setEditIndex(null);
    } else {
      const existingWorkoutIndex = workouts.findIndex(
        (w) => w.date === newWorkout.date
      );
      if (existingWorkoutIndex !== -1) {
        const updatedWorkouts = [...workouts];
        updatedWorkouts[existingWorkoutIndex].distance += newWorkout.distance;
        setWorkouts(updatedWorkouts);
      } else {
        // Добавляем новую запись и сортируем по дате
        const updatedWorkouts = [...workouts, newWorkout].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setWorkouts(updatedWorkouts);
      }
    }

    setInputDate("");
    setInputDistance("");
  };

  const handleEdit = (index: number) => {
    setInputDate(workouts[index].date);
    setInputDistance(workouts[index].distance.toString());
    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    const updatedWorkouts = workouts.filter((_, i) => i !== index);
    setWorkouts(updatedWorkouts);
  };

  return (
    <div className="container">
      <div className="input-section">
        <input
          type="text"
          placeholder="Дата (ДД.ММ.ГГ)"
          value={inputDate}
          onChange={handleDateChange}
          className="input-box"
        />
        <input
          type="number"
          placeholder="Пройдено км"
          value={inputDistance}
          onChange={handleDistanceChange}
          className="input-box"
        />
        <button onClick={handleSubmit}>ОК</button>
      </div>
      <table className="workout-table">
        <thead>
          <tr>
            <th>Дата (ДД.ММ.ГГ)</th>
            <th>Пройдено км</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout, index) => (
            <tr key={index}>
              <td>{workout.date}</td>
              <td>{workout.distance.toFixed(2)}</td>
              <td>
                <button onClick={() => handleEdit(index)}>✎</button>
                <button onClick={() => handleDelete(index)}>✘</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkoutTracker;