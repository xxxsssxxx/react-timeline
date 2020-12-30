import React from "react";
import TimeLine from "./components/TimeLine/TimeLine";

import { EOrder, EType } from "./enums/enums";
import { IBlock } from "./interfaces/interfaces";


import { blocks, shuffle, blocksAutoFalse, blocksText } from "./mocks/mocks";

const App = () => {
  const title: string = "React timeline";
  let showTools: boolean = true;
  let type: string = EType.NUMERIC;
  const autoBlocks: boolean = true;
  const textBlocksNames: boolean = false;
  // Looks bad its just for mocking and testing
  const mockedBlocks: IBlock[] = autoBlocks ? textBlocksNames ? blocksText : blocks : blocksAutoFalse;

  return (
    <div className="App">
      <div className="wrapper container mx-auto mt-6">
        <h1 title={title} className="text-center text-2xl">
          {title}
        </h1>
        <TimeLine
          blocks={shuffle(blocksText)}
          showTools={showTools}
          type={type}
          folded={true}
          autoBlocks={autoBlocks}
          blocksOrder={EOrder.DESC}
          autoActivities={true}
          maxActivities={3}
          maxBlocks={3}
          blocksOffset={3}
          blockLoadCount={true}
          activitiesLoadCount={true}
          blocksLongRange={3}
          activitiesLongRange={10}
        />
      </div>
    </div>
  );
};

export default App;
