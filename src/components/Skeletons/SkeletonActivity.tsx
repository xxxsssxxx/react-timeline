import { FC } from "react";

import { ESkeletonsAnimate } from "../../enums/enums";

import { SkeletonAnimationLogic } from "./SkeletonAnimationLogic";

import { SkeletonActivityProps } from "../../interfaces/componentProps";
const SkeletonActivity: FC<SkeletonActivityProps> = (props) => {
  const { wrapper, animate = ESkeletonsAnimate.PULSE } = props;
  const { animation } = SkeletonAnimationLogic({ animate });

  return (
    <div className={`${wrapper} ${animation}`} data-testid="skeleton-activity">
      <div className={"block h-20"}></div>
    </div>
  );
};

export default SkeletonActivity;
