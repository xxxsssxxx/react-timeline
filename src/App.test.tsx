import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app with a title", () => {
  render(<App />);
  const title = screen.getByText(/React timeline/i);
  expect(title).toBeInTheDocument();
});
