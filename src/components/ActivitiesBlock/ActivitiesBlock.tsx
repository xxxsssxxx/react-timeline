import { FC, useState, MouseEvent, useMemo, useEffect } from "react";
import {
  ESide,
  EOrder,
  EBulletType,
  ESkeletonsAnimate
} from "../../enums/enums";
import { IActivity, IBlock } from "../../interfaces/interfaces";
import {
  dateFormating,
  sortDates,
  TDate,
  minutesBetween
} from "../../Utils/utils";

import Activity from "../Activity/Activity";
import BaseTooltip from "../Base/Tooltip/BaseTooltip";
import BaseButton from "../Base/Button/BaseButton";
import RangeDots from "../RangeDots/RangeDots";
import SkeletonBullet from "../Skeletons/Bullet/SkeletonBullet";
interface INegateSides {
  [ESide.LEFT]: string;
  [ESide.RIGHT]: string;
}

const negateSides: INegateSides = {
  [ESide.LEFT]: ESide.RIGHT,
  [ESide.RIGHT]: ESide.LEFT
};

type Props = {
  activities: IActivity[];
  index?: number;
  blockText: string | Date;
  folded?: boolean;
  maxActivities?: number;
  activitiesOffset?: number;
  activitiesOrder?: string;
  autoActivities?: boolean;
  bulletsType?: string;
  blockBulletsType?: string;
  activitiesLoadCount?: string | boolean;
  activitiesLongRange?: number;
  loading?: boolean;
  blocksLoading?: boolean;
  loadingAnimation?: string;
  onBlockBulletClick?: (e: MouseEvent, block?: IBlock) => unknown;
  moreButton?: string
};

const ActivitiesBlock: FC<Props> = ({
  index = 0,
  activities,
  blockText,
  folded,
  maxActivities = 5,
  activitiesOffset = 5,
  activitiesOrder = EOrder.DESC,
  autoActivities = false,
  activitiesLoadCount = "",
  bulletsType = EBulletType.NUMERIC,
  blockBulletsType = EBulletType.NUMERIC,
  activitiesLongRange = 20,
  loading = false,
  blocksLoading = false,
  loadingAnimation = ESkeletonsAnimate.PULSE,
  onBlockBulletClick = () => false,
  moreButton = "More"
}) => {
  const [mappedActivities, setMappedActivities] = useState(activities);
  const [showCount, setShowCount] = useState(false);
  const [loadCount, setLoadCount] = useState(activitiesLoadCount);
  const [showActivities, setShowActivities] = useState(!folded);
  const [activitiesLimit, setActivitiesLimit] = useState(maxActivities);
  const [moreButtonText, setMoreButtonText] = useState(moreButton);

  const mapActivities = useMemo(
    () => (activities: IActivity[]): IActivity[] => {
      let currentSide: string = ESide.RIGHT;
      const mapped: IActivity[] = activities
        .sort((a, b) => {
          return sortDates(a.date, b.date, activitiesOrder);
        })
        .map((activity, i) => {
          const { date } = activity;
          const prevActivity = activities[i - 1];
          const isLongRange =
            i > 0 ? isLongRangeElement(date, prevActivity.date) : false;
          if (!prevActivity) {
            return { ...activity, side: ESide.RIGHT, isLongRange };
          }
          if (+date !== +prevActivity.date) {
            currentSide = negateSides[currentSide as keyof INegateSides];
          }
          return { ...activity, side: currentSide, isLongRange };
        });
      return mapped;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const sideClass = (side: string = ESide.RIGHT): string => {
    return side === ESide.LEFT ? "flex-row-reverse" : "";
  };

  const showActivitiesCount = (e: MouseEvent): void => {
    setShowCount(!showCount);
  };

  const loadMoreActivities = () => {
    setActivitiesLimit((prevSatate) => prevSatate + activitiesOffset);
    if (loadCount && !isNaN(+loadCount)) {
      const count = `${+loadCount - activitiesOffset}`;
      setLoadCount(count);
      setMoreButtonText(`${moreButton} (${count})`);
    }
  };

  const toggleActivities = (e: MouseEvent): void => {
    setShowActivities(!showActivities);
    onBlockBulletClick(e);
  };

  const isLongRangeElement = (a: TDate, b: TDate): boolean => {
    const aDate = new Date(a);
    const bDate = new Date(b);
    const mapRangeConditions: { [key: string]: boolean } = {
      [EOrder.DESC]: activitiesLongRange
        ? activitiesLongRange <= minutesBetween(aDate, bDate)
        : false,
      [EOrder.ASC]: activitiesLongRange
        ? activitiesLongRange <= minutesBetween(bDate, aDate)
        : false
    };
    const isRangeLonger = mapRangeConditions[activitiesOrder];
    return isRangeLonger;
  };

  useEffect(() => {
    if (autoActivities) {
      if (!!activitiesLoadCount && activitiesLimit < activities.length) {
        const count = `${activities.length - activitiesLimit}`;
        setLoadCount(count);
        setMoreButtonText(`${moreButton} (${count})`);
      }
      setMappedActivities(mapActivities(activities));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = {
    wrapper: (
      className: string | undefined,
      side: string | undefined
    ): string =>
      `activity-wrapper flex justify-between items-start w-full ${sideClass(
        side
      )} ${className || ""} cursor-default`,
    indexes: {
      wrapper: "z-20 flex flex-col items-center order-1 mx-auto max-w-1",
      bullet:
        "min-w-1 mx-auto font-semibold text-md text-white text-center p-2",
      extra: "bg-gray-800 shadow-md rounded-full h-8 justify-center"
    },
    block: {
      wrapper:
        "block-wrapper cursor-pointer relative flex flex-col items-center"
    },
    scale:
      "transform hover:-translate-y-1 hover:scale-110 transition duration-200 ease-linear"
  };

  const bulletType: { [key: string]: string } = {
    [EBulletType.NUMERIC]: `${index + 1}`,
    [EBulletType.TIMING]: `${blockText}`
  };
  const blockBulletText = bulletType[blockBulletsType];

  return (
    <div className={classes.block.wrapper} data-testid="activities-block">
      {showActivities
        ? mappedActivities.map((activity, i) => {
            if (activitiesLimit && i >= activitiesLimit) return null;
            let { className, side, date, isLongRange } = activity;
            const bulletType: { [key: string]: string } = {
              [EBulletType.NUMERIC]: `${i + 1}`,
              [EBulletType.TIMING]: dateFormating(date)
            };
            const bulletText = bulletType[bulletsType];
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
