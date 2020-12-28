import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import ActivitiesBlock from "./ActivitiesBlock";

import { activities, blocksAutoFalse } from "../../mocks/mocks";
import { IActivity } from "../../interfaces/interfaces";
import { EOrder } from "../../enums/enums";

describe("Activity", () => {
  let mockActivities: IActivity[];

  afterEach(cleanup);
  beforeEach(() => {
    mockActivities = JSON.parse(JSON.stringify(activities));
  });

  describe("Folding", () => {
    test("Show activities while fold is false", () => {
      render(<ActivitiesBlock activities={mockActivities} blockText={blocksAutoFalse[0].blockText} folded={false}/>);
      const activities = screen.queryAllByTestId("activity-wrapper");
      expect(activities).not.toBeNull();
    });

    test("Doesnt show activities while fold is true", () => {
      render(<ActivitiesBlock activities={mockActivities} blockText={blocksAutoFalse[0].blockText} folded={true}/>);
      const activities = screen.queryByTestId("activity-wrapper");
      expect(activities).toBeNull();
    });

    test("Unfold activities for clicked block", async() => {
      render(<ActivitiesBlock activities={mockActivities} blockText={blocksAutoFalse[0].blockText} folded={true}/>);
      const bullet = await screen.findAllByTestId("bullet");

      expect(bullet).not.toBeNull();

      fireEvent.click(bullet[0]);
      const activities = screen.queryAllByTestId("activity-wrapper");
      expect(activities).not.toBeNull();

      expect(activities).toHaveLength(activities.length);
    });

    test("Fold activities for clicked block", async() => {
      render(<ActivitiesBlock activities={mockActivities} blockText={blocksAutoFalse[0].blockText} folded={false}/>);
      const bullet = await screen.findAllByTestId("bullet");

      expect(bullet).not.toBeNull();

      fireEvent.click(bullet[0]);
      const activities = screen.queryAllByTestId("activity-wrapper");
      expect(activities).toHaveLength(0);
    });
  });

  describe("Sides", () => {
    test("If side isnt providen set side of previous activity", async() => {
      // Firs activity has a left side
      delete mockActivities[1].side;
      render(
        <ActivitiesBlock
          activities={mockActivities}
          blockText={blocksAutoFalse[1].blockText}
          folded={false}
        />
      );
      const activities = await screen.findAllByTestId("activity-wrapper");
      const onALeft = activities[0].className.includes("flex-row-reverse");
      expect(onALeft).toBe(true);
    });

    test("If side isnt providen and no previous activity set side to right", async() => {
      delete mockActivities[0].side;
      render(
        <ActivitiesBlock
          activities={mockActivities}
          blockText={blocksAutoFalse[0].blockText}
          folded={false}
        />
      );
      const activities = await screen.findAllByTestId("activity-wrapper");
      const onALeft = activities[0].className.includes("flex-row-reverse");
      expect(onALeft).toBe(false);
    });

    test("Returns sideClass for activity with left side", async() => {
      render(
        <ActivitiesBlock
          activities={mockActivities}
          blockText={blocksAutoFalse[0].blockText}
          folded={false}
        />
      );
      const activities = await screen.findAllByTestId("activity-wrapper");
      const onALeft = activities[0].className.includes("flex-row-reverse");
      expect(onALeft).toBe(true);
    });

    test("Returns sideClass for activity with right side", async() => {
      render(
        <ActivitiesBlock
          activities={mockActivities}
          blockText={blocksAutoFalse[0].blockText}
          folded={false}
        />
      );
      const activities = await screen.findAllByTestId("activity-wrapper");
      const onALeft = activities[2].className.includes("flex-row-reverse");
      expect(onALeft).toBe(false);
    });
  });

  describe("Tooltip", () => {
    test("Show tooltip with activities count on mouse enter", async() => {
      render(<ActivitiesBlock activities={mockActivities} blockText={blocksAutoFalse[0].blockText} folded={false}/>);
      const bullet = await screen.findAllByTestId("bullet");

      expect(bullet).not.toBeNull();

      fireEvent.mouseEnter(bullet[0]);
      const tooltip = await screen.findByTestId("tooltip");
      expect(tooltip).not.toBe(null);

      expect(tooltip.textContent).toEqual(`${activities.length}`);
    });

    test("Hide tooltip with activities count on mouse leave", async() => {
      render(<ActivitiesBlock activities={mockActivities} blockText={blocksAutoFalse[0].blockText} folded={false}/>);
      const bullet = await screen.findAllByTestId("bullet");

      expect(bullet).not.toBeNull();

      fireEvent.mouseEnter(bullet[0]);
      let tooltip = screen.queryByTestId("tooltip");
      expect(tooltip).not.toBe(null);

      fireEvent.mouseLeave(bullet[0]);
      tooltip = screen.queryByTestId("tooltip");
      expect(tooltip).toBe(null);
    });
  });

  describe("Loading more", () => {
    test("Show load button if activities are more then limit", async() => {
      render(<ActivitiesBlock activities={mockActivities} blockText={blocksAutoFalse[0].blockText} folded={false}/>);
      const loadMore = await screen.findByTestId("load-more-activities");
      expect(loadMore).not.toBeNull();
    });
    test("Doesnt show load button if activities are less then limit", () => {
      mockActivities.length = 4;
      render(<ActivitiesBlock activities={mockActivities} blockText={blocksAutoFalse[0].blockText} folded={false}/>);
      const loadMore = screen.queryByTestId("load-more-activities");
      expect(loadMore).toBeNull();
    });
    test("Load all next activities by offset", async() => {
      const defaultOffset = 5;
      const defaultMax = 5;
      render(<ActivitiesBlock activities={mockActivities} blockText={blocksAutoFalse[0].blockText} folded={false}/>);
      let activities = await screen.findAllByTestId("activity-wrapper");
      expect(activities).toHaveLength(defaultMax);

      const loadMore = await screen.findByTestId("load-more-activities");
      loadMore.firstChild && fireEvent.click(loadMore.firstChild);

      activities = await screen.findAllByTestId("activity-wrapper");
      expect(activities).toHaveLength(defaultOffset + defaultMax);
    });
  });

  describe("Auto arrange", () => {

    test("Dont do auto arrange if autoActivities is false", async() => {
      render(<ActivitiesBlock activities={mockActivities} blockText={blocksAutoFalse[0].blockText} folded={false} />);
      const activities = await screen.findAllByTestId("activity-wrapper");
      const onALeft = activities[0].className.includes("flex-row-reverse");
      const onALeft2 = activities[1].className.includes("flex-row-reverse");
      expect(onALeft).toBe(true);
      expect(onALeft2).toBe(true);
    });

    test("Auto arrange activities sides by time", async() => {
      mockActivities.forEach((activity) => {
        activity.date = new Date(activity.date);
      });
      render(<ActivitiesBlock activities={mockActivities} blockText={blocksAutoFalse[0].blockText} folded={false} autoActivities={true} />);
      const activities = await screen.findAllByTestId("activity-wrapper");
      const onALeft = activities[0].className.includes("flex-row-reverse");
      const onALeft2 = activities[1].className.includes("flex-row-reverse");
      const onALeft3 = activities[2].className.includes("flex-row-reverse");
      expect(onALeft).toBe(false);
      expect(onALeft2).toBe(false);
      expect(onALeft3).toBe(true);
    });
  });

});
