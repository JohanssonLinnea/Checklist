import React, { useState } from "react";
import "./App.css";

function App() {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const [tasks, setTasks] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
  });

  const handleAddTask = (day, newTask) => {
    if (newTask.trim() === "") return;
    setTasks((prevTasks) => ({
      ...prevTasks,
      [day]: [...prevTasks[day], newTask],
    }));
  };

  const handleRemoveTask = (day, index) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [day]: prevTasks[day].filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="App">
      <h1>Weekly Checklist</h1>
      <div className="checklist-container">
        {daysOfWeek.map((day) => (
          <div key={day} className="day-checklist">
            <h2>{day}</h2>
            <ul>
              {tasks[day].map((task, index) => (
                <li key={index}>
                  {task}{" "}
                  <button
                    className="delete-btn"
                    onClick={() => handleRemoveTask(day, index)}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
            <AddTaskForm day={day} onAddTask={handleAddTask} />
          </div>
        ))}
      </div>
    </div>
  );
}

function AddTaskForm({ day, onAddTask }) {
  const [newTask, setNewTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(day, newTask);
    setNewTask("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={`Add a task for ${day}`}
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default App;
