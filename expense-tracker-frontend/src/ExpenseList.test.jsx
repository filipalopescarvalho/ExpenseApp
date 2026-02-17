import React from "react";
import { render, screen } from "@testing-library/react";
import ExpenseList from "./components/ExpenseList";

const expenses = [
  { id: 1, title: "House", amount: 900 },
  { id: 2, title: "Car", amount: 300 },
];

describe("ExpenseList component", () => {
  test("renders all expenses", () => {
    render(<ExpenseList expenses={expenses} />);

    expect(screen.getByText(/House/i)).toBeInTheDocument();
    expect(screen.getByText(/Car/i)).toBeInTheDocument();
    expect(screen.getByText(/900/i)).toBeInTheDocument();
    expect(screen.getByText(/300/i)).toBeInTheDocument();
  });
});
