import { cleanup, render, screen } from "@testing-library/react";
import TimeLine from "./TimeLine";

import { activities } from "../../mocks/mocks";
import { IActivity } from "../../interfaces/interfaces";

describe("TimeLine", () => {
  let mockActivities: IActivity[];

  afterEach(cleanup);
  beforeEach(() => {
    mockActivities = JSON.parse(JSON.stringify(activities));
  });
  test("Renders timeline", () => {
    render(<TimeLine activities={mockActivities} />);
    const timeline = screen.getByTestId("timeline");
    expect(timeline).toBeInTheDocument();
  });

  describe("Activity", () => {
    test("Set default right side if no side provided", async() => {
      delete mockActivities[0].side;
      render(<TimeLine activities={mockActivities} />);
      const activities = await screen.findAllByTestId("activity-wrapper");
      const onALeft = activities[0].className.includes("flex-row-reverse");
      expect(onALeft).toBe(false);
    });

    test("Returns sideClass for activity with left side", async() => {
      render(<TimeLine activities={mockActivities} />);
      const activities = await screen.findAllByTestId("activity-wrapper");
      const onALeft = activities[0].className.includes("flex-row-reverse");
      expect(onALeft).toBe(true);
    });

    test("Returns sideClass for activity with right side", async() => {
      render(<TimeLine activities={mockActivities} />);
      const activities = await screen.findAllByTestId("activity-wrapper");
      const onALeft = activities[activities.length - 1].className.includes("flex-row-reverse");
      expect(onALeft).toBe(false);
    });
  });


  describe("Tools", () => {
    test("Renders tools if showTools set to true", async() => {
      render(<TimeLine activities={mockActivities} />);
      const tools = screen.queryByTestId("tools");
      expect(tools).not.toBeNull();
    });
    test("Not render tools if showTools set to false", () => {
      render(<TimeLine activities={mockActivities} showTools={false}/>);
      const tools = screen.queryByTestId("tools");
      expect(tools).toBeNull();
    });
  });
});
