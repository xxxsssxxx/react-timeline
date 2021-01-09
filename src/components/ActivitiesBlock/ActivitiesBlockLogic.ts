import { useState, MouseEvent, useMemo, useEffect } from "react";
import {
  ESide,
  EOrder,
  EBulletType
} from "../../enums/enums";

import { IActivity } from "../../interfaces/interfaces";
import {
  dateFormating,
  sortDates,
  TDate,
  minutesBetween
} from "../../Utils/utils";

import { ActivitiesBlockProps } from "../../interfaces/componentProps";

interface INegateSides {
  [ESide.LEFT]: string;
  [ESide.RIGHT]: string;
}

const negateSides: INegateSides = {
  [ESide.LEFT]: ESide.RIGHT,
  [ESide.RIGHT]: ESide.LEFT
};

export const ActivitiesBlockLogic = (props: ActivitiesBlockProps) => {

  const {
    index = 0,
    activities,
    blockText,
    folded,
    maxActivities = 5,
    activitiesOffset = 5,
    activitiesOrder = EOrder.DESC,
    autoActivities = false,
    activitiesLoadCount = "",
    blockBulletsType = EBulletType.NUMERIC,
    bulletsType = EBulletType.NUMERIC,
    activitiesLongRange = 20,
    onBlockBulletClick = () => false,
    moreButton = "More"
  } = props;

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

  const setBulletText = (i: number, date: Date): string => {
    const bulletType: { [key: string]: string } = {
      [EBulletType.NUMERIC]: `${i + 1}`,
      [EBulletType.TIMING]: dateFormating(date)
    };

    const bulletText = bulletType[bulletsType];
    return bulletText;
  };

  const bulletType: { [key: string]: string } = {
    [EBulletType.NUMERIC]: `${index + 1}`,
    [EBulletType.TIMING]: `${blockText}`
  };
  const blockBulletText = bulletType[blockBulletsType];


  // Tailwind classes
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


  return {
    mappedActivities,
    moreButtonText,
    classes,
    showActivities,
    activitiesLimit,
    showCount,
    activities,
    blockBulletText,
    loadMoreActivities,
    showActivitiesCount,
    toggleActivities,
    setBulletText
  };

};