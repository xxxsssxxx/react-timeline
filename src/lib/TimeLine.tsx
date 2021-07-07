import { FC, MouseEvent } from "react";

import ActivitiesBlock from "../components/ActivitiesBlock/ActivitiesBlock";
import Tools from "../components/Tool/Tools";
import BaseButton from "../components/Base/Button/BaseButton";
import RangeDots from "../components/RangeDots/RangeDots";

import { TimeLineLogic } from "./TimeLineLogic";

import { TimeLineProps } from "../interfaces/componentProps";
import { EBulletType, EOrder, ESkeletonsAnimate } from "../enums/enums";

const TimeLine: FC<TimeLineProps> = (props) => {

  const {
    blocks,
    folded = true,
    activitiesLongRange = 0,
    maxActivities = 5,
    activitiesOffset = 5,
    activitiesLoadCount = false,
    autoActivities = false,
    activitiesOrder = EOrder.DESC,
    blockBulletsType = EBulletType.TIMING,
    activitiesBulletsType = EBulletType.NUMERIC,
    blocksLoading = false,
    activitiesLoading = false,
    loadingAnimation = ESkeletonsAnimate.PULSE
  } = props;



  const {
    mappedBlocks,
    toolsTitle,
    moreButtonText,
    blockLimit,
    showTools,
    moreButton,
    emitBulletClick,
    loadMoreBlocks
  } = TimeLineLogic(props);

  const MoreButton: FC = () => {
    if (blocks.length < blockLimit) return null;

    return (
      <div className="button-wrapper mx-auto" data-testid="load-more-blocks">
        <BaseButton
          type={"primary"}
          text={moreButtonText}
          click={loadMoreBlocks}
        />
      </div>
    );
  };

  return (
    <div
      className="timeline-wrapper mx-auto w-full h-full flex flex-col"
      data-testid="timeline"
    >
      {showTools ? <Tools title={toolsTitle} /> : null}
      <div className="relative wrap overflow-hidden p-10 h-full mb-2">
        {mappedBlocks.map((block, i) => {
          const {
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
          } = block;
          if (i >= blockLimit) return null;
          const autoActivitiesAcc = auto === undefined ? autoActivities : auto;
          const activitiesLoadAcc =
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
                loading={loading || activitiesLoadAcc}
                loadingAnimation={loadingAnimation}
                onBlockBulletClick={(e: MouseEvent) => emitBulletClick(e, block)}
                moreButton={moreButton}
              />
              <div className="border-2-2 border-opacity-20 border-gray-700 border h-12 mx-auto"></div>
            </div>
          );
        })}
      </div>
      <MoreButton />
    </div>
  );
};

export default TimeLine;
