import React from "react";
import { render, screen } from "@testing-library/react";
import ExpenseSummary from "./components/ExpenseSummary";

const expenses = [
  { id: 1, title: "House", amount: 900 },
  { id: 2, title: "Car", amount: 300 },
];

describe("ExpenseSummary component", () => {
  test("renders total amount", () => {
    render(<ExpenseSummary expenses={expenses} />);

    const total = screen.getByText(/Total Expenses: €1200\.00/);
    expect(total).toBeInTheDocument();
  });
});
