import { useState, useMemo, FC } from "react";
import ActivitiesBlock from "../ActivitiesBlock/ActivitiesBlock";
import Tools from "../Tool/Tools";
import { IActivity, IBlock } from "../../interfaces/interfaces";
import BaseButton from "../Base/Button/BaseButton";
import { EOrder } from "../../enums/enums";
import { dateFormating, isDateObject, sortDates, sortString } from "../../Utils/utils";
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
  autoBlocks?: boolean;
  autoActivities?: boolean;
  blocksOrder?: string;
  activitiesOrder?: string;
};
const TimeLine: FC<Props> = ({
  blocks,
  showTools = true,
  folded = true,
  maxBlocks = 5,
  maxActivities,
  blocksOffset = 5,
  activitiesOffset,
  autoBlocks = false,
  autoActivities = false,
  blocksOrder = EOrder.DESC,
  activitiesOrder = EOrder.DESC
}) => {
  const [toolsTitle] = useState("Tools to play");
  const [moreButtonText] = useState("more");
  const [blockLimit, setBlockLimit] = useState(maxBlocks);

  const loadMoreBlocks = () => {
    setBlockLimit((prevSatate) => prevSatate + blocksOffset);
  };

  const mapBlocks = useMemo(
    () => (blocks: IBlock[]): IBlock[] => {
      const mapped: IBlock[] = blocks.sort((a: IBlock, b: IBlock) => {
        if (isDateObject(a.blockText) && isDateObject(b.blockText)) {
          return sortDates(a.blockText, b.blockText, blocksOrder);
        }

        if (typeof a.blockText === "string" && typeof b.blockText === "string") {
          return sortString(a.blockText, b.blockText, blocksOrder);
        }

        return 1;
      }).map((block) => {
        const { blockText } = block;
        if (isDateObject(blockText)) {
          return { ...block, blockText: dateFormating(blockText, false) };
        }
        return block;
      });
      return mapped;
    },
    [blocksOrder]
  );

  const mappedBlocks: IBlock[] = autoBlocks ? mapBlocks(blocks) : blocks;

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
        {mappedBlocks.map(({ activities, blockText, max, offset, order, auto }, i) => {
          if (i >= blockLimit) return null;
          return (
            <ActivitiesBlock
              activities={activities}
              blockText={blockText}
              folded={!!folded}
              maxActivities={max || maxActivities}
              activitiesOffset={offset || activitiesOffset}
              activitiesOrder={order || activitiesOrder}
              autoActivities={auto || autoActivities}
              key={i}
            />
          );
        })}
      </div>
      {blocks.length > blockLimit ? (
        <div className="button-wrapper mx-auto" data-testid="load-more-blocks">
          <BaseButton
            type={"primary"}
            text={moreButtonText}
            click={loadMoreBlocks}
          />
        </div>
      ) : null}
    </div>
  );
};

export default TimeLine;
