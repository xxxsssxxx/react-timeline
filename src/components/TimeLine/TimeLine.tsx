import React from "react";
import Activity from "../Activity/Activity";
import Tools from "../Tool/Tools";
import { IActivity } from "../../interfaces/interfaces";
import { EType, ESide } from "../../enums/enums";
type Props = {
  activities: IActivity[];
  showTools?: boolean;
  type?: string;
};
const TimeLine: React.FC<Props> = ({
  activities,
  showTools = true,
  type = EType.NUMERIC
}) => {
  const toolsTitle: string = "Tools to play";

  const classes = {
    wrapper: (className: string | undefined, side: string | undefined): string =>
      `activity-wrapper  mb-8 flex justify-between items-center w-full ${sideClass(side)} ${className || ""}`,
    indexes: {
      wrapper:
        "z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full",
      bullet: "mx-auto font-semibold text-lg text-white"
    }
  };

  const sideClass = (side: string = ESide.RIGHT): string => {
    return side === ESide.LEFT ? "flex-row-reverse" : "";
  };

  return (
    <div className="timeline-wrapper mx-auto w-full h-full" data-testid="timeline">
      {showTools ? <Tools title={toolsTitle} /> : null}
      <div className="relative wrap overflow-hidden p-10 h-full">
        <div
          className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border"
          style={{ left: "50%" }}
        ></div>
        {activities.map((activity, i) => {
          const { className, side } = activity;
          return (
            <div className={classes.wrapper(className, side)} key={i} data-testid="activity-wrapper">
              <div className="order-1 w-5/12"></div>
              <div className={classes.indexes.wrapper}>
                <h1 className={classes.indexes.bullet}>{i + 1}</h1>
              </div>
              <Activity activity={activity} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeLine;
