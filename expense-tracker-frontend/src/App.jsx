// ** APP COMPONENT **
// Main component of the Expense Tracker App.
// Responsible for managing application state, handling
// CRUD operations with the backend API, and rendering
// all child components (ExpenseForm, ExpenseList, ExpenseSummary).

import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary.jsx";

// Base URL for the backend API
const BASE_URL = "http://backend:5001/expenses";

function App() {
// State to hold the list of expenses fetched from the backend
  const [expenses, setExpenses] = useState([]);

// Fetch expenses from the backend when the component mounts
  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((err) => console.error("Error fetching expenses:", err));
  }, []);

  // Add a new expense
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

  // Delete an expense by ID
  const deleteExpenseHandler = (id) => {
    fetch(`${BASE_URL}/${id}`, { method: "DELETE" })
      .then(() => {
        setExpenses((prev) => prev.filter((exp) => exp.id !== id));
      })
      .catch((err) => console.error("Error deleting expense:", err));
  };

  // Enable editing mode for a specific expense
  const editExpenseHandler = (id) => {
    setExpenses((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, isEditing: true } : exp))
    );
  };

  // Save changes to an edited expense
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

  // Handle input changes while editing an expense
  const editChangeHandler = (id, field, value) => {
    setExpenses((prev) =>
      prev.map((exp) =>
        exp.id === id
          ? { ...exp, [field]: field === "amount" ? parseFloat(value) || 0 : value || "Untitled" }
          : exp
      )
    );
  };

  // Render the application UI
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
