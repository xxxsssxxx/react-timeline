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

    test("Show not loaded count if auto is true", async() => {
      const max = 3;
      render(
        <ActivitiesBlock
          activities={mockActivities}
          blockText={blocksAutoFalse[0].blockText}
          folded={false}
          maxActivities={max}
          activitiesLoadCount={true}
          autoActivities={true}
        />
      );
      const loadMore = await screen.findAllByTestId("load-more-activities");
      const loadCount = `${mockActivities.length - max}`;
      expect(loadMore[0].textContent?.includes(loadCount)).toBe(true);
    });

    test("Show not loaded count if auto is false but loadCount is send by parametr", async() => {
      const max = 3;
      const count = `${mockActivities.length - max}`;
      const activities = JSON.parse(JSON.stringify(mockActivities));
      activities[0].loadCount = count;
      render(
        <ActivitiesBlock
          activities={mockActivities}
          blockText={blocksAutoFalse[0].blockText}
          folded={false}
          maxActivities={max}
          activitiesLoadCount={true}
          autoActivities={true}
        />
      );
      const loadMore = await screen.findAllByTestId("load-more-activities");
      expect(loadMore[0].textContent?.includes(count)).toBe(true);
    });

    test("Show loadMore after click and still some are not loaded", async() => {
      const max = 3;
      const offset = 3;
      render(
        <ActivitiesBlock
          activities={mockActivities}
          blockText={blocksAutoFalse[0].blockText}
          folded={false}
          maxActivities={max}
          activitiesLoadCount={true}
          autoActivities={true}
          activitiesOffset={offset}
        />
      );

      const loadMore = await screen.findByTestId("load-more-activities");
      loadMore.firstChild && fireEvent.click(loadMore.firstChild);

      const loadCount = `${mockActivities.length - max - offset}`;
      expect(loadMore.textContent?.includes(loadCount)).toBe(true);
    });

    test("Doesnt show not loaded count auto is false", async() => {
      const max = 3;
      render(
        <ActivitiesBlock
          activities={mockActivities}
          blockText={blocksAutoFalse[0].blockText}
          folded={false}
          maxActivities={max}
          activitiesLoadCount={true}
          autoActivities={false}
        />
      );
      const loadMore = await screen.findAllByTestId("load-more-activities");
      const loadCount = `${mockActivities.length - max}`;
      expect(loadMore[0].textContent?.includes(loadCount)).toBe(false);
    });

    test("Doesnt show not loaded count auto is true and activitiesLoadCount is false", async() => {
      const max = 3;
      render(
        <ActivitiesBlock
          activities={mockActivities}
          blockText={blocksAutoFalse[0].blockText}
          folded={false}
          maxActivities={max}
          activitiesLoadCount={false}
          autoActivities={true}
        />
      );
      const loadMore = await screen.findAllByTestId("load-more-activities");
      const loadCount = `${mockActivities.length - max}`;
      expect(loadMore[0].textContent?.includes(loadCount)).toBe(false);
    });
  });

  describe("Auto arrange", () => {

    test("Dont do autoBlocks arrange if autoActivities is false", async() => {
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

  describe("Range activities", () => {
    test("Render range if activitiesLongRange is set", async() => {
      const longRages = 3;
      render(
        <ActivitiesBlock
          activities={mockActivities}
          blockText={blocksAutoFalse[0].blockText}
          folded={false}
          autoActivities={true}
          activitiesLongRange={10}
          maxActivities={mockActivities.length}
        />
      );
      const rangeDots = await screen.findAllByTestId("range-dots");
      expect(rangeDots).toBeDefined();
      expect(rangeDots).toHaveLength(longRages);
    });

    test("Doesnt render range if activitiesLongRange isnt set", async() => {
      render(
        <ActivitiesBlock
          activities={mockActivities}
          blockText={blocksAutoFalse[0].blockText}
          folded={false}
          autoActivities={true}
          maxActivities={mockActivities.length}
        />
      );
      const rangeDots = screen.queryByTestId("range-dots");
      expect(rangeDots).toBeNull();
    });
  });

  describe("Skeletons", () => {
    describe("Block", () => {
      test("Show skeleton for block if blocksLoadin", async() => {
        render(
          <ActivitiesBlock
            activities={mockActivities}
            blockText={blocksAutoFalse[0].blockText}
            folded={false}
            autoActivities={true}
            activitiesLongRange={10}
            maxActivities={mockActivities.length}
            blocksLoading={true}
          />
        );
        const skeletons = await screen.findAllByTestId("skeleton-bullet");
        expect(skeletons).toBeDefined();
      });

      test("Doesnt show skeleton for block", () => {
        render(
          <ActivitiesBlock
            activities={mockActivities}
            blockText={blocksAutoFalse[0].blockText}
            folded={false}
            autoActivities={true}
            activitiesLongRange={10}
            maxActivities={mockActivities.length}
          />
        );
        const skeletons = screen.queryAllByTestId("skeleton-bullet");
        expect(skeletons).toHaveLength(0);
      });
    });

    describe("Activities", () => {
      test("Show skeleton for inside blocks bullets if loading on block is true", async() => {
        render(
          <ActivitiesBlock
            activities={mockActivities}
            blockText={blocksAutoFalse[0].blockText}
            folded={false}
            autoActivities={true}
            activitiesLongRange={10}
            maxActivities={mockActivities.length}
            loading={true}
            blocksLoading={false}
          />
        );
        const skeletons = await screen.findAllByTestId("skeleton-bullet");
        expect(skeletons).toBeDefined();
      });

      test("Doesnt show skeleton for inside blocks bullets", () => {
        render(
          <ActivitiesBlock
            activities={mockActivities}
            blockText={blocksAutoFalse[0].blockText}
            folded={false}
            autoActivities={true}
            activitiesLongRange={10}
            maxActivities={mockActivities.length}
          />
        );
        const skeletons = screen.queryAllByTestId("skeleton-bullet");
        expect(skeletons).toHaveLength(0);
      });
    });

    test("Use default pulse animation", () => {
      render(
        <ActivitiesBlock
          activities={mockActivities}
          blockText={blocksAutoFalse[0].blockText}
          folded={false}
          autoActivities={true}
          activitiesLongRange={10}
          maxActivities={mockActivities.length}
          blocksLoading={true}
        />
      );

      const skeletons = screen.queryAllByTestId("skeleton-bullet");
      const isPulseAnimation = skeletons[0].classList.contains("animate-pulse");
      expect(isPulseAnimation).toBe(true);
    });
  });

});
