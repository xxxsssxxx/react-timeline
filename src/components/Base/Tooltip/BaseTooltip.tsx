import { FC } from "react";
import "./BaseTooltip.css";
type Props = {
  text: string | number
};
const BaseTooltip: FC<Props> = ({ text }) => {
  return (
    <div className="tooltip bg-primary" data-testid="tooltip">
      <span className="triangle"></span>
      {text}
    </div>
  );
};

export default BaseTooltip;
