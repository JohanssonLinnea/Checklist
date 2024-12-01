import React, { useState, useEffect } from "react";
import "./index.css";

function App() {
  const daysOfWeek = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag"];

  // Load tasks from localStorage or use the default tasks
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks
      ? JSON.parse(savedTasks)
      : {
          Måndag: [
            { text: "Reporder", done: false },
            { text: "Leverans påbörjad", done: false },
            { text: "Ersättningsdosor till ÅJ", done: false },
            { text: "Fråga lagret om ordrar", done: false },
          ],
          Tisdag: [
            { text: "Reporder", done: false },
            { text: "Leverans påbörjad", done: false },
            { text: "Frisläpp vapeordrar", done: false },
            { text: "Fråga lagret om ordrar", done: false },
          ],
          Onsdag: [
            { text: "Reporder", done: false },
            { text: "Leverans påbörjad", done: false },
            { text: "360 - rabatter", done: false },
            { text: "Fråga lagret om ordrar", done: false },
          ],
          Torsdag: [
            { text: "Reporder", done: false },
            { text: "Leverans påbörjad", done: false },
            { text: "Frisläpp vapeordrar", done: false },
            { text: "Rapport Inventering", done: false },
          ],
          Fredag: [
            { text: "Reporder", done: false },
            { text: "Leverans påbörjad", done: false },
            { text: "Reklamation rapporter", done: false },
            { text: "Städa Jeeves", done: false },
          ],
        };
  });

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (day, newTask) => {
    if (newTask.trim() === "") return;
    setTasks((prevTasks) => ({
      ...prevTasks,
      [day]: [...prevTasks[day], { text: newTask, done: false }],
    }));
  };

  const handleToggleTask = (day, index) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [day]: prevTasks[day].map((task, i) =>
        i === index ? { ...task, done: !task.done } : task
      ),
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
                <li key={index} className={task.done ? "done" : ""}>
                  <label>
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => handleToggleTask(day, index)}
                    />
                    {task.text}
                  </label>
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
