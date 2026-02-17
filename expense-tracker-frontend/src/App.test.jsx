import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("App component", () => {
  test("renders Expenses Tracker heading", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const heading = screen.getByText(/Expenses Tracker/i);
    expect(heading).toBeInTheDocument();
  });
});
