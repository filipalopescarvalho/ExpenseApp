// ** EXPENSE LIST COMPONENT **
// Displays a list of expenses with options to edit, save, or delete.
// Handles both display mode and inline editing mode for each expense.

import React from "react";

function ExpenseList({ expenses, onEditChange, onDeleteExpense, onEditExpense, onSaveExpense }) {
 // Render the list of expenses, showing input fields for editing and buttons for actions
  return (
    <div className="expense-list">
      <h2>Expenses List</h2>

      {expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id} className="expense-item">

// If the expense is in editing mode, show input fields and Save button
              
              {expense.isEditing ? (
                <>
                  <input
                    type="text"
                    value={expense.title || ""}
                    onChange={(e) =>
                      onEditChange(expense.id, "title", e.target.value)
                    }
                  />
                  <input
                    type="number"
                    value={expense.amount ?? 0}
                    onChange={(e) =>
                      onEditChange(expense.id, "amount", e.target.value)
                    }
                  />
                  <div className="button-group">
                    <button
                      className="save"
                      onClick={() =>
                        onSaveExpense(expense.id, {
                          title: expense.title || "Untitled",
                          amount: expense.amount ?? 0,
                        })
                      }
                    >
                      Save
                    </button>
                  </div>
                </>
              ) : (

// Display expense details with Edit and Delete buttons
                <>
                  <span>
                    {expense.title || "Untitled"} - €{expense.amount ?? 0}
                  </span>
                  <div className="button-group">
                    <button onClick={() => onEditExpense(expense.id)}>Edit</button>
                    <button onClick={() => onDeleteExpense(expense.id)}>Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExpenseList;
