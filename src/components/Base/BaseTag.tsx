import React from "react";
import { ITag } from "../../interfaces/interfaces";

type Props = {
  tag: ITag;
};

const BaseTag: React.FC<Props> = ({ tag }) => {
  const { name, className, colorScheme } = tag;
  return (
    <div className={`tag-wrapper ${className} m-0.5`}>
      <span
        className={
          `text-xs font-medium p-1 rounded align-middle ${colorScheme}`
        }
      >
        {name}
      </span>
    </div>
  );
};

export default BaseTag;
