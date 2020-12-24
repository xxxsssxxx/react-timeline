import { render, screen } from "@testing-library/react";
import Activity from "./Activity";

import { activities } from "../../mocks/mocks";

describe("Activity", () => {
  test("Renders activity", () => {
    render(<Activity activity={activities[0]} />);
    const activity = screen.getByTestId("activity");
    expect(activity).toBeInTheDocument();
  });
});
