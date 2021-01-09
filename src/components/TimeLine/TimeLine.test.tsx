import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import TimeLine from "./TimeLine";

import { blocks, blocksText, shuffle } from "../../mocks/mocks";
import { dateFormating } from "../../Utils/utils";
import { IBlock } from "../../interfaces/interfaces";
import { EBulletType, EOrder } from "../../enums/enums";

describe("TimeLine", () => {
  let mockBlocks: IBlock[];
  afterEach(cleanup);
  beforeEach(() => {
    mockBlocks = JSON.parse(JSON.stringify(blocks));
  });
  test("Renders timeline", () => {
    render(<TimeLine blocks={mockBlocks} />);
    const timeline = screen.getByTestId("timeline");
    expect(timeline).toBeInTheDocument();
  });

  describe("Tools", () => {
    test("Renders tools if showTools set to true", async() => {
      render(<TimeLine blocks={mockBlocks} />);
      const tools = screen.queryByTestId("tools");
      expect(tools).not.toBeNull();
    });
    test("Not render tools if showTools set to false", () => {
      render(<TimeLine blocks={mockBlocks} showTools={false} />);
      const tools = screen.queryByTestId("tools");
      expect(tools).toBeNull();
    });
  });

  describe("Loading more", () => {
    test("Show load button if blocks are more then limit", async() => {
      render(<TimeLine blocks={mockBlocks} showTools={false} />);
      const loadMore = await screen.findByTestId("load-more-blocks");
      expect(loadMore).not.toBeNull();
    });
    test("Doesnt show load button if blocks are less then limit", () => {
      mockBlocks.length = 4;
      render(<TimeLine blocks={mockBlocks} showTools={false} />);
      const loadMore = screen.queryByTestId("load-more-blocks");
      expect(loadMore).toBeNull();
    });
    test("Use max defined in block for maxActivities if maxActivities doesnt defined", async() => {
      const maxActivities = 4;
      mockBlocks[0].max = maxActivities;
      render(<TimeLine blocks={mockBlocks} showTools={false} />);
      const bullet = await screen.findAllByTestId("bullet");
      fireEvent.click(bullet[0]);
      const activities = await screen.findAllByTestId("activity-wrapper");
      expect(activities).toHaveLength(maxActivities);
    });
    test("Use offset defined in block for offsetActivities if offsetActivities doesnt defined", async() => {
      const offset = 4;
      mockBlocks[0].offset = offset;
      const expectedActivitiesCount = 9;
      render(<TimeLine blocks={mockBlocks} showTools={false} />);
      const bullet = await screen.findAllByTestId("bullet");
      fireEvent.click(bullet[0]);
      const loadMore = await screen.findByTestId("load-more-activities");
      loadMore.firstChild && fireEvent.click(loadMore.firstChild);
      const activities = await screen.findAllByTestId("activity-wrapper");

      expect(activities).toHaveLength(expectedActivitiesCount);
    });
    test("Offset defined in block should be proiritized before offsetActivities", async() => {
      const offset = 4;
      mockBlocks[0].offset = offset;
      const expectedActivitiesCount = 9;
      render(
        <TimeLine blocks={mockBlocks} showTools={false} activitiesOffset={5} />
      );
      const bullet = await screen.findAllByTestId("bullet");
      fireEvent.click(bullet[0]);
      const loadMore = await screen.findByTestId("load-more-activities");
      loadMore.firstChild && fireEvent.click(loadMore.firstChild);
      const activities = await screen.findAllByTestId("activity-wrapper");

      expect(activities).toHaveLength(expectedActivitiesCount);
    });
    test("Max defined in block should be prioritized before maxActivities", async() => {
      const maxActivities = 4;
      mockBlocks[0].max = maxActivities;
      render(
        <TimeLine blocks={mockBlocks} showTools={false} maxActivities={10} />
      );
      const bullet = await screen.findAllByTestId("bullet");
      fireEvent.click(bullet[0]);
      const activities = await screen.findAllByTestId("activity-wrapper");
      expect(activities).toHaveLength(maxActivities);
    });

    test("Load next blocks by offset", async() => {
      const defaultOffset = 5;
      const defaultMax = 5;
      render(<TimeLine blocks={mockBlocks} showTools={false} />);
      let blocks = await screen.findAllByTestId("activities-block");
      expect(blocks).toHaveLength(defaultMax);

      const loadMore = await screen.findByTestId("load-more-blocks");
      loadMore.firstChild && fireEvent.click(loadMore.firstChild);

      blocks = await screen.findAllByTestId("activities-block");
      expect(blocks).toHaveLength(defaultOffset + defaultMax);
    });
  });

  describe("Auto", () => {
    describe("Auto is false", () => {
      test("Renders blocks, with text in blockText, in their initiall order + dont format anything", async() => {
        render(<TimeLine blocks={blocksText} maxBlocks={blocksText.length} />);
        const screenBlocks = await screen.findAllByTestId("activities-block");
        expect(screenBlocks).toHaveLength(blocksText.length);
        screenBlocks.forEach((block, i) => {
          expect(block.textContent).toEqual(blocksText[i].blockText);
        });
      });
    });

    describe("Auto order blocks", () => {
      afterEach(cleanup);
      beforeEach(() => {
        mockBlocks = JSON.parse(JSON.stringify(blocks));
      });
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      test("Save block place if blockText isnt a date or string", async() => {
        const blocks = shuffle([...mockBlocks]);
        blocks[6].blockText = 55;
        render(
          <TimeLine blocks={blocks} autoBlocks={true} maxBlocks={mockBlocks.length} blocksOrder={EOrder.ASC} />
        );
        const screenBlocks = await screen.findAllByTestId("activities-block");
        expect(screenBlocks[6].textContent).toEqual(`${blocks[6].blockText}`);
      });

      test("Order blocks by date ASC if props is asc", async() => {
        const blocks = shuffle([...mockBlocks]);
        render(
          <TimeLine
            blocks={blocks}
            autoBlocks={true}
            blocksOrder={EOrder.ASC}
            maxBlocks={mockBlocks.length}
          />
        );
        const screenBlocks = await screen.findAllByTestId("activities-block");
        screenBlocks.forEach((block, i) => {
          expect(block.textContent).toEqual(mockBlocks[i].blockText);
        });
      });

      test("Order blocks by date DESC if props is DESC", async() => {
        mockBlocks.forEach((block) => {
          block.blockText = new Date(block.blockText);
        });
        const blocks = shuffle([...mockBlocks]);
        render(
          <TimeLine
            blocks={blocks}
            autoBlocks={true}
            blocksOrder={EOrder.DESC}
            maxBlocks={mockBlocks.length}
          />
        );
        const screenBlocks = await screen.findAllByTestId("activities-block");
        const reversedMock = mockBlocks.reverse();
        screenBlocks.forEach((block, i) => {
          expect(block.textContent).toEqual(dateFormating(reversedMock[i].blockText, false));
        });
      });

      test("Order blocks by text ASC if props is ASC", async() => {
        const blocks = shuffle([...mockBlocks]);
        const expectedSort = months.sort((a, b) => a.localeCompare(b));
        // Just for testing purposes filling with some text
        blocks.forEach((block, i) => {
          delete block.date;
          block.blockText = months[i];
        });
        render(
          <TimeLine
            blocks={blocks}
            autoBlocks={true}
            blocksOrder={EOrder.ASC}
            maxBlocks={mockBlocks.length}
          />
        );
        const screenBlocks = await screen.findAllByTestId("activities-block");
        screenBlocks.forEach((block, i) => {
          expect(block.textContent).toEqual(expectedSort[i]);
        });
      });

      test("Order blocks by text DESC if props is DESC", async() => {
        const blocks = shuffle([...mockBlocks]);
        const expectedSort = months.sort((a, b) => b.localeCompare(a));
        // Just for testing purposes filling with some text
        blocks.forEach((block, i) => {
          delete block.date;
          block.blockText = months[i];
        });
        render(
          <TimeLine
            blocks={blocks}
            autoBlocks={true}
            blocksOrder={EOrder.DESC}
            maxBlocks={mockBlocks.length}
          />
        );
        const screenBlocks = await screen.findAllByTestId("activities-block");
        screenBlocks.forEach((block, i) => {
          expect(block.textContent).toEqual(expectedSort[i]);
        });
      });
    });

    describe("Auto Activities", () => {
      test("Prioritized auto for each block to autoActivities on whole timelime", async() => {
        blocksText[0].auto = false;
        const blocks = JSON.parse(JSON.stringify(blocksText));
        render(
          <TimeLine
            blocks={blocks}
            autoBlocks={false}
            maxBlocks={mockBlocks.length}
            autoActivities={true}
          />
        );
        const bullets = await screen.findAllByTestId("bullet");
        fireEvent.click(bullets[0]);

        const nonMappedActivities = await screen.findAllByTestId("activity-wrapper");
        nonMappedActivities.forEach((activity, i) => {
          const { text } = mockBlocks[0].activities[i];
          expect(activity.textContent?.includes(text)).toBe(true);
        });
        fireEvent.click(bullets[0]);

        fireEvent.click(bullets[1]);
        const mappedActivities = await screen.findAllByTestId("activity-wrapper");
        const onALeft = mappedActivities[0].className.includes("flex-row-reverse");
        const onALeft2 = mappedActivities[1].className.includes("flex-row-reverse");
        const onALeft3 = mappedActivities[2].className.includes("flex-row-reverse");
        expect(onALeft).toBe(false);
        expect(onALeft2).toBe(true);
        expect(onALeft3).toBe(false);
      });
      test("Prioritized order for each block to activitiesOrder on whole timelime", async() => {
        blocksText[0].order = EOrder.ASC;
        const blocks = JSON.parse(JSON.stringify(blocksText));
        render(
          <TimeLine
            blocks={blocks}
            autoBlocks={false}
            maxBlocks={blocksText.length}
            autoActivities={true}
          />
        );
        const bullets = await screen.findAllByTestId("bullet");
        fireEvent.click(bullets[0]);

        const ascActivities = await screen.findAllByTestId("activity-wrapper");
        ascActivities.forEach((activity, i) => {
          const { text } = blocksText[0].activities[i];
          expect(activity.textContent?.includes(text)).toBe(true);
        });
      });
    });

    describe("Show load more count", () => {
      test("blocks if auto is true and blockLoadCount is true", async() => {
        const max = 3;
        render(
          <TimeLine
            blocks={blocksText}
            maxBlocks={max}
            autoBlocks={true}
            blockLoadCount={true}
          />
        );
        const loadMore = await screen.findByTestId("load-more-blocks");
        const loadCount = `${blocksText.length - max}`;
        expect(loadMore.textContent?.includes(loadCount)).toBe(true);
      });
      test("blocks if auto is false but send as a parametr", async() => {
        const max = 3;
        const blocksLoadCount = `${blocksText.length - max}`;
        render(
          <TimeLine
            blocks={blocksText}
            maxBlocks={max}
            autoBlocks={false}
            blockLoadCount={blocksLoadCount}
          />
        );
        const loadMore = await screen.findByTestId("load-more-blocks");
        expect(loadMore.textContent?.includes(blocksLoadCount)).toBe(true);
      });

      test("after clicked loadMore and still not all loaded", async() => {
        const max = 3;
        const offset = 3;
        const count = `${blocksText.length - max - offset}`;
        render(
          <TimeLine
            blocks={blocksText}
            folded={true}
            autoBlocks={true}
            blocksOrder={EOrder.DESC}
            autoActivities={true}
            maxActivities={max}
            maxBlocks={max}
            blocksOffset={offset}
            blockLoadCount={true}
            activitiesLoadCount={true}
          />
        );
        let loadMore = await screen.findByTestId("load-more-blocks");
        loadMore.firstChild && fireEvent.click(loadMore.firstChild);

        loadMore = await screen.findByTestId("load-more-blocks");
        expect(loadMore.textContent?.includes(count)).toBe(true);
      });
    });
    describe("Doesnt show load more count", () => {
      test("blocks if auto is false and blocksLoadCount is empty", async() => {
        const max = 3;
        render(
          <TimeLine
            blocks={blocksText}
            maxBlocks={max}
            autoBlocks={false}
            blockLoadCount={false}
          />
        );
        const loadMore = await screen.findByTestId("load-more-blocks");
        const loadCount = `${blocksText.length - max}`;
        expect(loadMore.textContent?.includes(loadCount)).toBe(false);
      });
      test("blocks if blocksLoad is false", async() => {
        const max = 3;
        render(
          <TimeLine
            blocks={blocksText}
            maxBlocks={max}
            autoBlocks={true}
            blockLoadCount={false}
          />
        );
        const loadMore = await screen.findByTestId("load-more-blocks");
        const loadCount = `${blocksText.length - max}`;
        expect(loadMore.textContent?.includes(loadCount)).toBe(false);
      });
    });
  });

  describe("Bullet types", () => {
    describe("Block", () => {
      test("Render numeric block type", async() => {
        render(
          <TimeLine blocks={blocksText} maxBlocks={blocksText.length} blockBulletsType={EBulletType.NUMERIC}/>
        );
        const bullets = await screen.findAllByTestId("bullet");
        bullets.forEach((block, i) => {
          expect(block.textContent).toEqual(`${i + 1}`);
        });
      });
      test("Render time block type", async() => {
        render(
          <TimeLine
            blocks={blocksText}
            maxBlocks={blocksText.length}
            blockBulletsType={EBulletType.TIMING}
          />
        );
        const bullets = await screen.findAllByTestId("bullet");
        bullets.forEach((block, i) => {
          expect(block.textContent).toEqual(blocksText[i].blockText);
        });
      });
    });

    describe("Activities", () => {
      test("Render numeric type", async() => {
        render(
          <TimeLine
            blocks={blocksText}
            maxBlocks={blocksText.length}
            activitiesBulletsType={EBulletType.NUMERIC}
          />
        );
        const bullets = await screen.findAllByTestId("bullet");
        fireEvent.click(bullets[0]);

        const activities = await screen.findAllByTestId("activity-wrapper");
        activities.forEach((activity, i) => {
          expect(activity.textContent?.includes(`${i + 1}`)).toBe(true);
        });
      });
      test("Render time type", async() => {
        render(
          <TimeLine
            blocks={blocksText}
            maxBlocks={blocksText.length}
            blockBulletsType={EBulletType.TIMING}
          />
        );
        const bullets = await screen.findAllByTestId("bullet");
        fireEvent.click(bullets[0]);

        const activities = await screen.findAllByTestId("activity-wrapper");
        activities.forEach((activity, i) => {
          expect(activity.textContent?.includes(blocksText[0].activities[i].text)).toBe(true);
        });
      });
    });
  });

  describe("Range blocks", () => {
    test("Render range if blocksLongRange is set", async() => {
      const longRages = 6;
      render(
        <TimeLine
          blocks={blocks}
          maxBlocks={blocks.length}
          blocksLongRange={3}
          autoBlocks={true}
        />
      );
      const rangeDots = await screen.findAllByTestId("range-dots");
      expect(rangeDots).toBeDefined();
      expect(rangeDots).toHaveLength(longRages);
    });

    test("longRange is prioritized to activitiesLongRange", async() => {
      const longRages = 3;
      const copy = JSON.parse(JSON.stringify(blocks));
      copy[0].longRange = 10;
      render(
        <TimeLine
          blocks={copy}
          maxBlocks={1}
          maxActivities={blocks[0].activities.length}
          blocksLongRange={3}
          activitiesLongRange={3}
          autoBlocks={true}
          autoActivities={true}
          folded={false}
        />
      );
      const rangeDots = await screen.findAllByTestId("range-dots");
      expect(rangeDots).toBeDefined();
      expect(rangeDots).toHaveLength(longRages);
    });

    test("Render range if blocksLongRange is set and asc order", async() => {
      const longRages = 6;
      render(
        <TimeLine
          blocks={blocks}
          maxBlocks={blocks.length}
          blocksLongRange={3}
          autoBlocks={true}
          blocksOrder={EOrder.ASC}
        />
      );
      const rangeDots = await screen.findAllByTestId("range-dots");
      expect(rangeDots).toBeDefined();
      expect(rangeDots).toHaveLength(longRages);
    });

    test("Render range if auto is false isLongRange set on block", async() => {
      const longRages = 1;
      const copy = JSON.parse(JSON.stringify(blocks));
      copy[0].isLongRange = true;
      render(
        <TimeLine
          blocks={copy}
          maxBlocks={copy.length}
          blocksLongRange={3}
          autoBlocks={false}
        />
      );
      const rangeDots = await screen.findAllByTestId("range-dots");
      expect(rangeDots).toBeDefined();
      expect(rangeDots).toHaveLength(longRages);
    });

    test("Doesnt render range if blocksLongRange isnt set", () => {
      render(
        <TimeLine
          blocks={blocks}
          maxBlocks={3}
          autoBlocks={true}
        />
      );
      const rangeDots = screen.queryByTestId("range-dots");
      expect(rangeDots).toBeNull();
    });

    test("Doesnt render range if auto is false and no isLOngerRange on block set", () => {
      render(
        <TimeLine
          blocks={blocks}
          maxBlocks={3}
          autoBlocks={false}
        />
      );
      const rangeDots = screen.queryByTestId("range-dots");
      expect(rangeDots).toBeNull();
    });

    test("Doesnt render range if blockText isnt a date", () => {
      render(
        <TimeLine
          blocks={blocksText}
          maxBlocks={blocksText.length}
          autoBlocks={true}
        />
      );
      const rangeDots = screen.queryByTestId("range-dots");
      expect(rangeDots).toBeNull();
    });
  });

  describe("Loading", () => {
    test("Prioritized loading set on block data to activitiesLoading", () => {
      const copy = JSON.parse(JSON.stringify(blocks));
      copy[0].loading = true;
      render(
        <TimeLine
          blocks={copy}
          maxBlocks={1}
          maxActivities={2}
          blocksLongRange={3}
          activitiesLongRange={3}
          autoBlocks={true}
          autoActivities={true}
          folded={false}
          activitiesLoading={false}
        />
      );
      const skeletons = screen.queryAllByTestId("skeleton-bullet");
      expect(skeletons).toBeDefined();
    });
  });

    describe("bullet click", () => {
      test("On block bullet click emit event and block", async() => {
        let event, emittedBlock;
        const emittedArgs = (e: React.MouseEvent, block?: IBlock) => {
          event = e;
          emittedBlock = block;
        };

        render(
          <TimeLine
            blocks={blocksText}
            maxBlocks={blocksText.length}
            activitiesBulletsType={EBulletType.NUMERIC}
            onBlockBulletClick={emittedArgs}
          />
        );
        const bullets = await screen.findAllByTestId("bullet");
        fireEvent.click(bullets[0]);

        expect(event).toBeDefined();
        expect(emittedBlock).toBeDefined();
        expect(emittedBlock).toEqual(blocksText[0]);
      });
    });
});
