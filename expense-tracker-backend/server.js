const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 5001;

app.use(cors());


app.use(express.json());


const db = new sqlite3.Database("./expenses.db", (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    amount REAL NOT NULL
  )
`);


app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

app.get("/expenses", (req, res) => {
  console.log("GET /expenses called");  
    db.all("SELECT * FROM expenses", [], (err, rows) => {
    if (err) {
      console.error(err);                
      return res.status(500).json({ error: err.message });
    }
    console.log("Rows returned:", rows); 
    res.json(rows);
  });
});


app.post("/expenses", (req, res) => {
  const { title, amount } = req.body;

  if (!title || amount == null) {
    return res.status(400).json({ error: "Title and amount are required" });
  }

  db.run(
    "INSERT INTO expenses (title, amount) VALUES (?, ?)",
    [title, amount],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({
        id: this.lastID,
        title,
        amount,
      });
    }
  );
});

app.put("/expenses/:id", (req, res) => {
  const { id } = req.params;
  const { title, amount } = req.body;

  db.run(
    "UPDATE expenses SET title = ?, amount = ? WHERE id = ?",
    [title, amount, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id, title, amount });
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


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
