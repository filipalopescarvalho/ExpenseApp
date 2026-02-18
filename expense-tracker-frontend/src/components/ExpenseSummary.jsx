// ** EXPENSE SUMMARY COMPONENT **
// Displays the total of all expenses and a detailed list of each expense.

import React from "react";

function ExpenseSummary({ expenses = [] }) {
// Calculate total expenses, treating missing amounts as 0
  const total = expenses.reduce((acc, exp) => acc + (exp.amount || 0), 0);

  return (
    <div className="card expense-summary">
      <h2>Expense Summary</h2>

      <p>Total Expenses: €{total.toFixed(2)}</p>

      <ul>
        {expenses.map((exp) => (
          <li key={exp.id}>
            <span>{exp.title || "Untitled"}</span>
            <span>€{exp.amount ?? 0}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseSummary;
