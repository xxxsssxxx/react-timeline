import React from "react";
import BaseTag from "../Base/Tag/BaseTag";
import BasePerson from "../Base/Person/BasePerson";
import BaseTitle from "../Base/Title/BaseTitle";

import { dateFormating } from "../../Utils/utils";
import { IActivity } from "../../interfaces/interfaces";

type Props = {
  activity: IActivity;
};

const Activity: React.FC<Props> = ({ activity }) => {
  const { text, assignee, tags, date, href } = activity;

  const classes = {
    wrapper: "order-1 bg-gray-400 rounded-lg shadow-xl w-5/12 px-6 py-4",
    titleWrapper: "mb-3 flex justify-between flex-wrap",
    title: "font-bold text-gray-800 text-lg truncate",
    textWrapper:
      "text-sm leading-snug tracking-wide text-gray-900 text-opacity-100"
  };

  return (
    <div className={classes.wrapper} data-testid="activity">
      <div className={classes.titleWrapper}>
        <BaseTitle href={href} classTitle={classes.title} text={text} />
        <div className="activity-tags flex flex-wrap">
          {tags.map((tag, i) => (
            <BaseTag tag={tag} key={i} />
          ))}
        </div>
      </div>
      <div className={classes.textWrapper}>
        <div className="activity-assignee">
          <BasePerson person={assignee} />
        </div>
        <span className="activity-date block text-right">
          {dateFormating(date)}
        </span>
      </div>
    </div>
  );
};

export default Activity;
