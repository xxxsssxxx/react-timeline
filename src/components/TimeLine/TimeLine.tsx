import { useState, FC } from "react";
import ActivitiesBlock from "../ActivitiesBlock/ActivitiesBlock";
import Tools from "../Tool/Tools";
import { IActivity, IBlock } from "../../interfaces/interfaces";
type Props = {
  activities?: IActivity[],
  showTools?: boolean,
  type?: string,
  blocks: IBlock[],
  folded?: boolean
};
const TimeLine: FC<Props> = ({
  blocks,
  showTools = true,
  folded = true
}) => {
  const [toolsTitle] = useState("Tools to play");

  return (
    <div
      className="timeline-wrapper mx-auto w-full h-full"
      data-testid="timeline"
    >
      {showTools ? <Tools title={toolsTitle} /> : null}
      <div className="relative wrap overflow-hidden p-10 h-full">
        <div
          className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border"
          style={{ left: "50%" }}
        ></div>
        {blocks.map(({ activities, blockText }, i) => (
          <ActivitiesBlock
            activities={activities}
            blockText={blockText}
            folded={!!folded}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default TimeLine;
