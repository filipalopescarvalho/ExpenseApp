// ** EXPENSE FORM COMPONENT **
// Handles input for creating a new expense.
// Maintains local state for title and amount, validates inputs,
// and calls the parent callback onAddExpense when submitted.

import { useState } from "react";
import React from "react";

function ExpenseForm({ onAddExpense }) {
// Local state for form inputs
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

// Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

// Validate inputs: title must not be empty and amount must be a valid number 
    if (!title.trim() || !amount) {
      alert("Please enter both a title and amount.");
      return;
    }

    // Create a new expense object
    const newExpense = {
      title: title.trim(),
      amount: parseFloat(amount),
    };

    onAddExpense(newExpense);

    // Reset input fields
    setTitle("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Expense</h2>
  
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
  
      <label htmlFor="amount">Amount</label>
      <input
        id="amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
  
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;
