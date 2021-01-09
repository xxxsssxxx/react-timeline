import React from "react";
import BaseTag from "../Base/Tag/BaseTag";
import BasePerson from "../Base/Person/BasePerson";
import BaseTitle from "../Base/Title/BaseTitle";
import SkeletonActivity from "../Skeletons/SkeletonActivity";

import { dateFormating } from "../../Utils/utils";

import { ActivityLogic } from "../Activity/ActivityLogic";

import { ActivityProps } from "../../interfaces/componentProps";
const Activity: React.FC<ActivityProps> = (props) => {
  const { activity, loading, classes } = ActivityLogic(props);
  const { text, assignee, tags, date, href } = activity;

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
