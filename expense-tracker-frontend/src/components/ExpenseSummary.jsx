// ** EXPENSE SUMMARY COMPONENT **
// Displays the total of all expenses and a detailed list of each expense.

import React from "react";

function ExpenseSummary({ expenses = [] }) {
// Calculate total expenses, treating missing amounts as 0
  const total = expenses.reduce((acc, exp) => acc + (exp.amount || 0), 0);

  return (
    <div className="card expense-summary">
      <h2>Expense Summary</h2>

//  Display total expenses, ensuring it shows 0 if there are no expenses or amounts are missing
      <p>Total Expenses: €{total.toFixed(2)}</p>

// Show detailed list of expenses, handling missing titles and amounts 
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
