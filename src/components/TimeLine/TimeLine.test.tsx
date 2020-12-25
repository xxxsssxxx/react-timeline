import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import TimeLine from "./TimeLine";

import { blocks } from "../../mocks/mocks";
import { IBlock } from "../../interfaces/interfaces";
import { off } from "process";

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
      render(<TimeLine blocks={mockBlocks} showTools={false}/>);
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

      test("Load all next blocks by offset", async() => {
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
});
