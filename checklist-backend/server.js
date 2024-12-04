const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Initialize tasks with preset tasks
let tasks = {
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

// Get tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Update tasks
app.post("/tasks", (req, res) => {
  tasks = req.body;
  res.json({ success: true });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

