// ** EXPENSE LIST COMPONENT **
// Displays a list of expenses with options to edit, save, or delete.
// Handles both display mode and inline editing mode for each expense.

import React from "react";

function ExpenseList({ expenses, onEditChange, onDeleteExpense, onEditExpense, onSaveExpense }) {
  // Render the list of expenses
  // Shows either inline editing fields or static display for each expense
  return (
    <div className="expense-list">
      <h2>Expenses List</h2>

      {/* Show message if no expenses exist */}
      {expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id} className="expense-item">
              
              {/* If expense is being edited, show input fields */}
              {expense.isEditing ? (
                <>
                  {/* Title input field */}
                  <input
                    type="text"
                    value={expense.title || ""}
                    onChange={(e) =>
                      onEditChange(expense.id, "title", e.target.value)
                    }
                  />

                  {/* Amount input field */}
                  <input
                    type="number"
                    value={expense.amount ?? 0}
                    onChange={(e) =>
                      onEditChange(expense.id, "amount", e.target.value)
                    }
                  />

                  {/* Save button for edited expense */}
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
                // Display mode: show expense title and amount with Edit/Delete buttons
                <>
                  <span>
                    {expense.title || "Untitled"} - €{expense.amount ?? 0}
                  </span>
                  <div className="button-group">
                    {/* Enable editing mode */}
                    <button onClick={() => onEditExpense(expense.id)}>Edit</button>
                    {/* Delete expense */}
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
