import { FC } from "react";
import { ESkeletonsAnimate } from "../../enums/enums";

import Activity from "../Activity/Activity";
import BaseTooltip from "../Base/Tooltip/BaseTooltip";
import BaseButton from "../Base/Button/BaseButton";
import RangeDots from "../RangeDots/RangeDots";
import SkeletonBullet from "../Skeletons/Bullet/SkeletonBullet";


import { ActivitiesBlockProps } from "../../interfaces/componentProps";
import { ActivitiesBlockLogic } from "./ActivitiesBlockLogic";

const ActivitiesBlock: FC<ActivitiesBlockProps> = (props) => {

  const {
    mappedActivities,
    moreButtonText,
    classes,
    showActivities,
    activitiesLimit,
    activities,
    showCount,
    blockBulletText,
    loadMoreActivities,
    showActivitiesCount,
    toggleActivities,
    setBulletText
  } = ActivitiesBlockLogic(props);

  const {
    loading = false,
    blocksLoading = false,
    loadingAnimation = ESkeletonsAnimate.PULSE
  } = props;

  return (
    <div className={classes.block.wrapper} data-testid="activities-block">
      {showActivities
        ? mappedActivities.map((activity, i) => {
            if (activitiesLimit && i >= activitiesLimit) return null;
            let { className, side, date, isLongRange } = activity;
            const bulletText = setBulletText(i, date);
            return (
              <div
                className={classes.wrapper(className, side)}
                key={i}
                data-testid="activity-wrapper"
              >
                <div className="order-1 w-5/12 mt"></div>
                <div className={classes.indexes.wrapper}>
                  {isLongRange ? <RangeDots /> : null}
                  {!loading ? (
                    <div
                      className={`flex flex-col ${classes.indexes.extra} ${classes.scale}`}
                    >
                      <h1 className={classes.indexes.bullet}>{bulletText}</h1>
                    </div>
                  ) : (
                    <SkeletonBullet
                      wrapperClass={`${classes.indexes.extra} min-w-1`}
                      bulletClass={classes.indexes.bullet}
                      animate={loadingAnimation}
                    />
                  )}
                  <div className="border-2-2 border-opacity-20 border-gray-700 border h-36 mx-auto" />
                </div>
                <Activity activity={activity} loading={loading} />
              </div>
            );
          })
        : null}
      {showCount ? <BaseTooltip text={activities.length} /> : null}
      {activities.length > activitiesLimit && showActivities ? (
        <div
          className="button-wrapper mx-auto"
          data-testid="load-more-activities"
        >
          <BaseButton
            type={"primary"}
            text={moreButtonText}
            click={loadMoreActivities}
          />
        </div>
      ) : null}
      {!blocksLoading ? (
        <div
          data-testid="bullet"
          className={`${classes.indexes.wrapper} ${classes.scale} min-w-2 ${classes.indexes.extra}`}
          onMouseEnter={showActivitiesCount}
          onMouseLeave={showActivitiesCount}
          onClick={toggleActivities}
        >
          <h1 className={classes.indexes.bullet}>{blockBulletText}</h1>
        </div>
      ) : (
        <SkeletonBullet
          wrapperClass={`${classes.indexes.wrapper} min-w-2`}
          bulletClass={classes.indexes.bullet}
          animate={loadingAnimation}
        />
      )}
    </div>
  );
};

export default ActivitiesBlock;
