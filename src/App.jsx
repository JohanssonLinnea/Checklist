import React, { useState } from "react";
import "./index.css";

function App() {
  const daysOfWeek = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag"];
  const [tasks, setTasks] = useState({
    Måndag: [],
    Tisdag: [],
    Onsdag: [],
    Torsdag: [],
    Fredag: [],
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
      <h1>Checklista Innesälj</h1>
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
        placeholder={`Lägg till ny uppgift för ${day}`}
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button type="submit">Lägg till</button>
    </form>
  );
}

export default App;