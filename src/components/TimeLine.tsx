import React from "react";
import Activity from "./Activity";
import Tools from "../components/Tools";
import { IActivity } from "../interfaces/interfaces";
type Props = {
  activities: IActivity[];
};
const TimeLine: React.FC<Props> = ({ activities }) => {
  const toolsTitle: string = "Tools to play";
  let showTools: boolean = false;

  return (
    <div className="timeline-wrapper mx-auto w-full h-full">
      {showTools ? <Tools title={toolsTitle} /> : null}
      <div className="relative wrap overflow-hidden p-10 h-full">
        <div
          className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border"
          style={{ left: "50%" }}
        ></div>
        {activities.map((activity, i) => (
          <Activity activity={activity} key={i} index={i + 1} />
        ))}
      </div>
    </div>
  );
};

export default TimeLine;
