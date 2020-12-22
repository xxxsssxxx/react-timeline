import React from "react";
import BaseTag from "./Base/BaseTag";

import { IActivity } from "../interfaces/interfaces";
import BasePerson from "./Base/BasePerson";

type Props = {
  activity: IActivity;
  index: number;
};

const Activity: React.FC<Props> = ({ activity, index }) => {
  const { text, assignee, className, tags, date, href } = activity;
  const classes = {
    wrapper: `activity-wrapper ${
      className || ""
    } mb-8 flex justify-between items-center w-full right-timeline`,
    indexes: {
      wrapper:
        "z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full",
      number: "mx-auto font-semibold text-lg text-white"
    },
    box: {
      wrapper: "order-1 bg-gray-400 rounded-lg shadow-xl w-5/12 px-6 py-4",
      titleWrapper: "mb-3 flex justify-between flex-wrap max-w-md",
      title: "font-bold text-gray-800 text-xl",
      textWrapper:
        "text-sm leading-snug tracking-wide text-gray-900 text-opacity-100"
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className="order-1 w-5/12"></div>
      <div className={classes.indexes.wrapper}>
        <h1 className={classes.indexes.number}>{index}</h1>
      </div>
      <div className={classes.box.wrapper}>
        <div className={classes.box.titleWrapper}>
          {href ? (
            <a
              className={classes.box.title}
              href={href}
              target="_blank"
              rel="noreferrer"
            >
              {text}
            </a>
          ) : (
            <h3 className={classes.box.title}>{text}</h3>
          )}
          <div className="activity-tags flex flex-wrap">
            {tags.map((tag, i) => (
              <BaseTag tag={tag} key={i} />
            ))}
          </div>
        </div>
        <div className={classes.box.textWrapper}>
          <div className="activity-assignee">
            <BasePerson person={assignee} />
          </div>
          <span className="activity-date"> {date}</span>
        </div>
      </div>
    </div>
  );
};

export default Activity;
