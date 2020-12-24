import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("Renders app with a title", () => {
    render(<App />);
    const title = screen.getByText(/React timeline/i);
    expect(title).toBeInTheDocument();
  });
  test("App has timeline component", () => {
    render(<App />);
    const timeline = screen.getByTestId("timeline");
    expect(timeline).toBeInTheDocument();
  });
});
