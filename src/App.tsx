import React from "react";
import TimeLine from "./components/TimeLine/TimeLine";

import { EOrder, EType } from "./enums/enums";


import { blocks, shuffle } from "./mocks/mocks";

const App = () => {
  const title: string = "React timeline";
  let showTools: boolean = true;
  let type: string = EType.NUMERIC;

  return (
    <div className="App">
      <div className="wrapper container mx-auto mt-6">
        <h1 title={title} className="text-center text-2xl">
          {title}
        </h1>
        <TimeLine blocks={shuffle(blocks)} showTools={showTools} type={type} folded={true} auto={true} blocksOrder={EOrder.DESC} />
      </div>
    </div>
  );
};

export default App;
