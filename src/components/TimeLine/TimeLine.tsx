import { useState, FC } from "react";
import ActivitiesBlock from "../ActivitiesBlock/ActivitiesBlock";
import Tools from "../Tool/Tools";
import { IActivity, IBlock } from "../../interfaces/interfaces";
import BaseButton from "../Base/Button/BaseButton";
type Props = {
  activities?: IActivity[];
  showTools?: boolean;
  type?: string;
  blocks: IBlock[];
  folded?: boolean;
  maxBlocks?: number;
  maxActivities?: number;
  blocksOffset?: number;
  activitiesOffset?: number;
};
const TimeLine: FC<Props> = ({
  blocks,
  showTools = true,
  folded = true,
  maxBlocks = 5,
  maxActivities,
  blocksOffset = 5,
  activitiesOffset
}) => {
  const [toolsTitle] = useState("Tools to play");
  const [moreButtonText] = useState("more");
  const [blockLimit, setBlockLimit] = useState(maxBlocks);

  const loadMoreBlocks = () => {
    setBlockLimit((prevSatate) => prevSatate + blocksOffset);
  };

  return (
    <div
      className="timeline-wrapper mx-auto w-full h-full flex flex-col"
      data-testid="timeline"
    >
      {showTools ? <Tools title={toolsTitle} /> : null}
      <div className="relative wrap overflow-hidden p-10 h-full mb-2">
        <div
          className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border"
          style={{ left: "50%" }}
        ></div>
        {blocks.map(({ activities, blockText, max, offset }, i) => {
          if (i >= blockLimit) return null;
          return (
            <ActivitiesBlock
              activities={activities}
              blockText={blockText}
              folded={!!folded}
              maxActivities={maxActivities || max}
              activitiesOffset={activitiesOffset || offset}
              key={i}
            />
          );
        })}
      </div>
      {blocks.length > blockLimit ? (
        <div className="button-wrapper mx-auto" data-testid="load-more-blocks">
          <BaseButton type={"primary"} text={moreButtonText} click={loadMoreBlocks}/>
        </div>
      ) : null}
    </div>
  );
};

export default TimeLine;
