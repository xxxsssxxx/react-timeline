import { FC, useState } from "react";

import { IAnimation } from "../../interfaces/interfaces";
import { ESkeletonsAnimate } from "../../enums/enums";

type Props = {
  wrapper?: string;
  animate?: string;
};

const SkeletonActivity: FC<Props> = ({ wrapper, animate = ESkeletonsAnimate.PULSE }) => {
  const animationClass: IAnimation = {
    [ESkeletonsAnimate.PULSE]: "animate-pulse",
    [ESkeletonsAnimate.BOUNCE]: "animate-bounce"
  };

  const [animation] = useState(animationClass[animate as keyof IAnimation]);

  return (
    <div className={`${wrapper} ${animation}`} data-testid="skeleton-activity">
      <div className={"block h-20"}></div>
    </div>
  );
};

export default SkeletonActivity;
