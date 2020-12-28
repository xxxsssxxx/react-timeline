import { render, screen } from "@testing-library/react";
import BaseTitle from "./BaseTitle";

describe("Rendering", () => {
  test("Renders link if href is providen", () => {
    render(<BaseTitle href={"test-href"} text={"Test"} />);
    const title = screen.getByText("Test");
    expect(title.tagName).toEqual("A");
  });
  test("Renders h3 if href is not providen", () => {
    render(<BaseTitle text={"Test"} />);
    const title = screen.getByText("Test");
    expect(title.tagName).toEqual("H3");
  });
});
