import { fireEvent, render, screen } from "@testing-library/react";
import Tools from "./Tools";

describe("Tools", () => {
  test("Renders Tools", () => {
    render(<Tools title="Title" />);
    const toolsTitle = screen.getByText("Title");
    expect(toolsTitle).toBeInTheDocument();
  });
  test("Renders Filter by condition", async() => {
    render(<Tools title="Title" />);

    let filter = screen.queryByTestId("filter");
    expect(filter).toBeNull();

    const filterToggler = await screen.findByTestId("filter-toggler");

    fireEvent.click(filterToggler);
    filter = screen.queryByTestId("filter");
    expect(filter).not.toBeNull();
  });
  test("Renders Sort by condition", async() => {
    render(<Tools title="Title" />);
    let sort = screen.queryByTestId("sort");
    expect(sort).toBeNull();
    const sortToggler = await screen.findByTestId("sort-toggler");

    fireEvent.click(sortToggler);
    sort = screen.queryByTestId("sort");
    expect(sort).not.toBeNull();
  });
});
