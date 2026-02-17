import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ExpenseForm from "./components/ExpenseForm";

describe("ExpenseForm component", () => {
  test("renders inputs and submit button", () => {
    render(<ExpenseForm onAddExpense={jest.fn()} />);

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Amount/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Add Expense/i })).toBeInTheDocument();
  });

  test("calls onAddExpense when form is submitted", () => {
    const mockAddExpense = jest.fn();
    render(<ExpenseForm onAddExpense={mockAddExpense} />);

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: "House" } });
    fireEvent.change(screen.getByLabelText(/Amount/i), { target: { value: "900" } });
    fireEvent.click(screen.getByRole("button", { name: /Add Expense/i }));

    expect(mockAddExpense).toHaveBeenCalledWith({
      title: "House",
      amount: 900,
    });
  });
});
