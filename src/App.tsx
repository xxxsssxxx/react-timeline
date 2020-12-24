import React from "react";
import TimeLine from "./components/TimeLine/TimeLine";

import { EType } from "./enums/enums";


import { blocks } from "./mocks/mocks";

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
        <TimeLine blocks={blocks} showTools={showTools} type={type} folded={true} />
      </div>
    </div>
  );
};

export default App;
