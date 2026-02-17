import React from "react";

function ExpenseList({ expenses, onEditChange, onDeleteExpense, onEditExpense, onSaveExpense }) {
  return (
    <div className="expense-list">
      <h2>Expenses List</h2>

      {expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id} className="expense-item">
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
