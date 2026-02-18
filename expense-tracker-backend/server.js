const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// ** DATABASE **

const db = new sqlite3.Database("./expenses.db", (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Create expenses table if it doesn't exist

db.run(`
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    amount REAL NOT NULL
  )
`);

// ** ROUTES **

app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

app.get("/expenses", (req, res) => {
  db.all("SELECT * FROM expenses", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.post("/expenses", (req, res) => {
  const { title, amount } = req.body;

  // Strong validation for NFR4
  if (
    typeof title !== "string" ||
    title.trim() === "" ||
    typeof amount !== "number" ||
    isNaN(amount)
  ) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  db.run(
    "INSERT INTO expenses (title, amount) VALUES (?, ?)",
    [title.trim(), amount],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.status(201).json({
        id: this.lastID,
        title: title.trim(),
        amount,
      });
    }
  );
});

app.put("/expenses/:id", (req, res) => {
  const { id } = req.params;
  const { title, amount } = req.body;

  if (
    typeof title !== "string" ||
    title.trim() === "" ||
    typeof amount !== "number" ||
    isNaN(amount)
  ) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  db.run(
    "UPDATE expenses SET title = ?, amount = ? WHERE id = ?",
    [title.trim(), amount, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({ id, title: title.trim(), amount });
    }
  );
});

app.delete("/expenses/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM expenses WHERE id = ?", id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ id });
  });
});

// ** START SERVER **

// To only start server if not running tests
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
