import { cleanup, render, screen } from "@testing-library/react";
import TimeLine from "./TimeLine";

import { blocks } from "../../mocks/mocks";
import { IBlock } from "../../interfaces/interfaces";

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
});
