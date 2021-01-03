import { useState, useMemo, useEffect, FC } from "react";

import ActivitiesBlock from "../ActivitiesBlock/ActivitiesBlock";
import Tools from "../Tool/Tools";
import BaseButton from "../Base/Button/BaseButton";
import RangeDots from "../RangeDots/RangeDots";

import { IActivity, IBlock } from "../../interfaces/interfaces";
import { EOrder, EBulletType, ESkeletonsAnimate } from "../../enums/enums";
import { dateFormating, isDateObject, sortDates, sortString, daysBetween, TDate } from "../../Utils/utils";

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
  blocksLongRange?: number;
  activitiesLongRange?: number;
  blockLoadCount?: string | boolean;
  activitiesLoadCount?: boolean;
  blocksLoading?: boolean;
  activitiesLoading?: boolean;
  loadingAnimation?: string;
};
const TimeLine: FC<Props> = ({
  blocks,
  showTools = true,
  folded = true,
  blocksLongRange = 0,
  activitiesLongRange = 0,
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
  activitiesBulletsType = EBulletType.NUMERIC,
  blocksLoading = false,
  activitiesLoading = false,
  loadingAnimation = ESkeletonsAnimate.PULSE
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
        .map((block, i) => {
          const { blockText } = block;
          const prevBlock = blocks[i - 1];
          const isLongRange =
            i > 0 ? isLongRangeElement(blockText, prevBlock.blockText) : false;
          if (isDateObject(blockText)) {
            return {
              ...block,
              blockText: dateFormating(blockText, false),
              isLongRange
            };
          }
          return { ...block, isLongRange };
        });
      return mapped;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const loadMoreBlocks = () => {
    setBlockLimit((prevSatate) => prevSatate + blocksOffset);
    if (loadCount && !isNaN(+loadCount)) {
      const count = `${+loadCount - blocksOffset}`;
      setLoadCount(count);
      setMoreButtonText(`more (${count})`);
    }
  };

  const isLongRangeElement = (a: TDate, b: TDate): boolean => {
    const aDate = new Date(a);
    const bDate = new Date(b);
    if (!isDateObject(aDate) || !isDateObject(bDate)) return false;
    const mapRangeConditions: { [key: string]: boolean } = {
      [EOrder.DESC]: blocksLongRange
        ? blocksLongRange <= daysBetween(a, b)
        : false,
      [EOrder.ASC]: blocksLongRange
        ? blocksLongRange <= daysBetween(b, a)
        : false
    };
    const isRangeLonger = mapRangeConditions[blocksOrder];
    return isRangeLonger;
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
        {mappedBlocks.map(
          (
            {
              activities,
              blockText,
              max,
              offset,
              order,
              auto,
              bullets,
              loadsCount,
              isLongRange,
              longRange,
              loading
            },
            i
          ) => {
            if (i >= blockLimit) return null;
            const autoActivitiesAcc =
              auto === undefined ? autoActivities : auto;
            const autoActivitiesLoad =
              loading === undefined ? activitiesLoading : loading;
            return (
              <div key={i} className="flex flex-col">
                {isLongRange ? <RangeDots /> : null}
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
                  activitiesLongRange={longRange || activitiesLongRange}
                  blocksLoading={blocksLoading}
                  loading={loading || autoActivitiesLoad}
                  loadingAnimation={loadingAnimation}
                />
                <div className="border-2-2 border-opacity-20 border-gray-700 border h-12 mx-auto"></div>
              </div>
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
