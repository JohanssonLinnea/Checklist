import React, { useState, useEffect } from "react";
import "./index.css";

function App() {
  const daysOfWeek = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag"];
  const presetTasks = {
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

  const [tasks, setTasks] = useState(presetTasks);

  // Fetch tasks from the backend when the app loads
  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((data) => {
        // If backend tasks are empty, use presetTasks
        if (Object.keys(data).length === 0) {
          setTasks(presetTasks);
          saveTasksToBackend(presetTasks);
        } else {
          setTasks(data);
        }
      });
  }, []);

  // Save tasks to the backend
  const saveTasksToBackend = (updatedTasks) => {
    fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTasks),
    });
  };

  const checkAllTasksDone = (updatedTasks) => {
    const allTasks = Object.values(updatedTasks).flat();
    return allTasks.every((task) => task.done);
  };

  const handleAddTask = (day, newTask) => {
    if (newTask.trim() === "") return;
    const updatedTasks = {
      ...tasks,
      [day]: [...tasks[day], { text: newTask, done: false }],
    };
    setTasks(updatedTasks);
    saveTasksToBackend(updatedTasks);
  };

  const handleToggleTask = (day, index) => {
    const updatedTasks = {
      ...tasks,
      [day]: tasks[day].map((task, i) =>
        i === index ? { ...task, done: !task.done } : task
      ),
    };
    setTasks(updatedTasks);
    saveTasksToBackend(updatedTasks);

    // Check if all tasks are done
    if (checkAllTasksDone(updatedTasks)) {
      alert("Bra jobbat!!\nTrevlig helg!");
      // Reset all tasks to unchecked
      const resetTasks = Object.fromEntries(
        Object.entries(updatedTasks).map(([day, tasks]) => [
          day,
          tasks.map((task) => ({ ...task, done: false })),
        ])
      );
      setTasks(resetTasks);
      saveTasksToBackend(resetTasks);
    }
  };

  const handleRemoveTask = (day, index) => {
    const updatedTasks = {
      ...tasks,
      [day]: tasks[day].filter((_, i) => i !== index),
    };
    setTasks(updatedTasks);
    saveTasksToBackend(updatedTasks);
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



