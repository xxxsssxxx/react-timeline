import React from "react";
import TimeLine from "./components/TimeLine/TimeLine";

import { EType } from "./enums/enums";


import { activities } from "./mocks/mocks";

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
        <TimeLine activities={activities} showTools={showTools} type={type} />
      </div>
    </div>
  );
};

export default App;
