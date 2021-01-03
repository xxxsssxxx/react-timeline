import React from "react";
import BaseTag from "../Base/Tag/BaseTag";
import BasePerson from "../Base/Person/BasePerson";
import BaseTitle from "../Base/Title/BaseTitle";

import { dateFormating } from "../../Utils/utils";
import { IActivity } from "../../interfaces/interfaces";
import SkeletonActivity from "../Skeletons/SkeletonActivity";

type Props = {
  activity: IActivity;
  loading?: boolean;
};

const Activity: React.FC<Props> = ({ activity, loading = false }) => {
  const { text, assignee, tags, date, href, isLongRange } = activity;

  const classes = {
    wrapper: `order-1 bg-gray-400 rounded-lg shadow-xl w-5/12 px-6 py-4 ${
      isLongRange ? "mt-24" : ""
    }`,
    titleWrapper: "mb-3 flex justify-between flex-wrap",
    title: "font-bold text-gray-800 text-lg truncate",
    textWrapper:
      "text-sm leading-snug tracking-wide text-gray-900 text-opacity-100"
  };

  return (
    <>
      {!loading ? (
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
      ) : (
        <SkeletonActivity
          wrapper={classes.wrapper}
        />
      )}
    </>
  );
};

export default Activity;
