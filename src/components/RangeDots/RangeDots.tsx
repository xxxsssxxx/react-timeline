import { FC } from "react";

import "./RangeDots.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";


type Props = {
  count?: number;
  times?: number;
  icon?: IconDefinition;
};

const RangeDots: FC<Props> = ({ count = 3, times = 1, icon = faCircle }) => {
  const items: JSX.Element[] = [];
  for (let i = 0; i < count * times; i++) {
    items.push(<FontAwesomeIcon icon={icon} key={i} className="range-dot" />);
  }

  return (
    <div className={"range-dots-wrapper text-gray-700 opacity-70"} data-testid="range-dots">{items}</div>
  );
};

export default RangeDots;
