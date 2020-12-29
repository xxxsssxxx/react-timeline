import { useState, useMemo, useEffect, FC } from "react";
import ActivitiesBlock from "../ActivitiesBlock/ActivitiesBlock";
import Tools from "../Tool/Tools";
import { IActivity, IBlock } from "../../interfaces/interfaces";
import BaseButton from "../Base/Button/BaseButton";
import { EOrder, EBulletType } from "../../enums/enums";
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
  activitiesBulletsType?: string;
  blockBulletsType?: string;
  blockLoadCount?: string | boolean;
  activitiesLoadCount?: boolean;
};
const TimeLine: FC<Props> = ({
  blocks,
  showTools = true,
  folded = true,
  maxBlocks = 5,
  maxActivities,
  blocksOffset = 5,
  activitiesOffset,
  blockLoadCount = "",
  activitiesLoadCount = false,
  autoBlocks = false,
  autoActivities = false,
  blocksOrder = EOrder.DESC,
  activitiesOrder = EOrder.DESC,
  blockBulletsType = EBulletType.TIMING,
  activitiesBulletsType = EBulletType.NUMERIC
}) => {
  const [mappedBlocks, setMappedBlocks] = useState(blocks);
  const [loadCount, setLoadCount] = useState(blockLoadCount);
  const [toolsTitle] = useState("Tools to play");
  const [moreButtonText, setMoreButtonText] = useState("more");
  const [blockLimit, setBlockLimit] = useState(maxBlocks);

  const mapBlocks = useMemo(
    () => (blocks: IBlock[]): IBlock[] => {
      const mapped: IBlock[] = blocks
        .sort((a: IBlock, b: IBlock) => {
          if (isDateObject(a.blockText) && isDateObject(b.blockText)) {
            return sortDates(a.blockText, b.blockText, blocksOrder);
          }

          if (
            typeof a.blockText === "string" &&
            typeof b.blockText === "string"
          ) {
            return sortString(a.blockText, b.blockText, blocksOrder);
          }

          return 1;
        })
        .map((block) => {
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

  const loadMoreBlocks = () => {
    setBlockLimit((prevSatate) => prevSatate + blocksOffset);
    if (loadCount && !isNaN(+loadCount)) {
      const count = `${+loadCount - blocksOffset}`;
      setLoadCount(count);
      setMoreButtonText(`more (${count})`);
    }
  };

  useEffect(() => {
    if (autoBlocks) {
      setMappedBlocks(mapBlocks(blocks));
    }
    if (blockLimit < blocks.length) {
      if (!!blockLoadCount) {
        const count = `${blocks.length - blockLimit}`;
        setLoadCount(count);
        setMoreButtonText(`more (${count})`);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {mappedBlocks.map(
          ({ activities, blockText, max, offset, order, auto, bullets, loadsCount }, i) => {
            if (i >= blockLimit) return null;
            const autoActivitiesAcc =
              auto === undefined ? autoActivities : auto;
            return (
              <ActivitiesBlock
                activities={activities}
                blockText={blockText}
                folded={!!folded}
                maxActivities={max || maxActivities}
                activitiesOffset={offset || activitiesOffset}
                activitiesOrder={order || activitiesOrder}
                activitiesLoadCount={loadsCount || activitiesLoadCount}
                autoActivities={autoActivitiesAcc}
                key={i}
                index={i}
                blockBulletsType={blockBulletsType}
                bulletsType={bullets || activitiesBulletsType}
              />
            );
          }
        )}
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
