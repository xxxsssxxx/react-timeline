import { FC, useState, MouseEvent } from "react";
import { ESide } from "../../enums/enums";
import { IActivity } from "../../interfaces/interfaces";

import Activity from "../Activity/Activity";
import BaseTooltip from "../Base/Tooltip/BaseTooltip";

type Props = {
  activities: IActivity[];
  index?: number;
  blockText: string | number;
  folded?: boolean;
};

interface StringMap {
  [key: string]: boolean;
}

const ActivitiesBlock: FC<Props> = ({ activities, blockText, folded }) => {
  const [showCount, setShowCount] = useState(false);
  const [showActivities, setShowActivities] = useState({ [blockText]: !folded } as StringMap);
  const classes = {
    wrapper: (
      className: string | undefined,
      side: string | undefined
    ): string =>
      `activity-wrapper mb-8 flex justify-between items-center w-full ${sideClass(
        side
      )} ${className || ""}`,
    indexes: {
      wrapper:
        "z-20 flex items-center order-1 bg-gray-800 mx-auto shadow-md max-w-1 h-8 rounded-full transform hover:-translate-y-1 hover:scale-110 transition duration-200 ease-linear",
      bullet: "min-w-1 mx-auto font-semibold text-md text-white text-center"
    }
  };

  const sideClass = (side: string = ESide.RIGHT): string => {
    return side === ESide.LEFT ? "flex-row-reverse" : "";
  };

  const showActivitiesCount = (e: MouseEvent): void => {
    setShowCount(!showCount);
  };

  const toggleActivities = (e?: MouseEvent, show?: boolean): void => {
    setShowActivities(
      (prevState): StringMap => {
        let showActivities = { ...prevState };
        showActivities[blockText] = !showActivities[blockText];
        return showActivities;
      }
    );
  };

  return (
    <div
      className="block-wrapper mt-20 cursor-pointer relative"
      data-testid="activities-block"
    >
      {showActivities[blockText]
        ? activities.map((activity, i) => {
            const { className, side } = activity;
            return (
              <div
                className={classes.wrapper(className, side)}
                key={i}
                data-testid="activity-wrapper"
              >
                <div className="order-1 w-5/12"></div>
                <div className={classes.indexes.wrapper}>
                  <h1 className={classes.indexes.bullet}>{i + 1}</h1>
                </div>
                <Activity activity={activity} />
              </div>
            );
          })
        : null}
      {showCount ? <BaseTooltip text={activities.length} /> : null}
      <div
        data-testid="bullet"
        className={classes.indexes.wrapper}
        onMouseEnter={showActivitiesCount}
        onMouseLeave={showActivitiesCount}
        onClick={toggleActivities}
      >
        <h1 className={classes.indexes.bullet}>{blockText}</h1>
      </div>
    </div>
  );
};

export default ActivitiesBlock;
