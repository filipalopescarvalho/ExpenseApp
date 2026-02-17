import { useState } from "react";
import React from "react";

function ExpenseForm({ onAddExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !amount) {
      alert("Please enter both a title and amount.");
      return;
    }

    const newExpense = {
      title: title.trim(),
      amount: parseFloat(amount),
    };

    onAddExpense(newExpense);

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
