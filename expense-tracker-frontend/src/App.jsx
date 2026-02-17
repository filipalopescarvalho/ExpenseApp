import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary.jsx";

const BASE_URL = "http://backend:5001/expenses";

function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((err) => console.error("Error fetching expenses:", err));
  }, []);

  const addExpenseHandler = (expense) => {
    fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add expense");
        return res.json();
      })
      .then((newExpense) => {
        setExpenses((prev) => [...prev, { ...newExpense, isEditing: false }]);
      })
      .catch((err) => console.error("Error adding expense:", err));
  };

  const deleteExpenseHandler = (id) => {
    fetch(`${BASE_URL}/${id}`, { method: "DELETE" })
      .then(() => {
        setExpenses((prev) => prev.filter((exp) => exp.id !== id));
      })
      .catch((err) => console.error("Error deleting expense:", err));
  };

  const editExpenseHandler = (id) => {
    setExpenses((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, isEditing: true } : exp))
    );
  };

  const saveExpenseHandler = (id, updatedExpense) => {
    fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedExpense),
    })
      .then((res) => res.json())
      .then((data) => {
        setExpenses((prev) =>
          prev.map((exp) =>
            exp.id === id ? { ...data, isEditing: false } : exp
          )
        );
      })
      .catch((err) => console.error("Error updating expense:", err));
  };

  const editChangeHandler = (id, field, value) => {
    setExpenses((prev) =>
      prev.map((exp) =>
        exp.id === id
          ? { ...exp, [field]: field === "amount" ? parseFloat(value) || 0 : value || "Untitled" }
          : exp
      )
    );
  };

  return (
    <div>
      <h1>Expenses Tracker</h1>
      <p>Welcome to your expense tracking application.</p>

      <nav>
        <Link to="/">Expenses</Link> | <Link to="/summary">Summary</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <ExpenseForm onAddExpense={addExpenseHandler} />
              <ExpenseList
                expenses={expenses || []}
                onDeleteExpense={deleteExpenseHandler}
                onEditExpense={editExpenseHandler}
                onSaveExpense={saveExpenseHandler}
                onEditChange={editChangeHandler}
              />
            </>
          }
        />
        <Route
          path="/summary"
          element={<ExpenseSummary expenses={expenses || []} />}
        />
      </Routes>
    </div>
  );
}

export default App;
