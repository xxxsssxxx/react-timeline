import { useState } from "react";
import { ESkeletonsAnimate } from "../../enums/enums";
import { IAnimation } from "../../interfaces/interfaces";

export const SkeletonAnimationLogic = (props: { animate?: string }) => {
  const { animate = ESkeletonsAnimate.PULSE } = props;

  const animationClass: IAnimation = {
    [ESkeletonsAnimate.PULSE]: "animate-pulse",
    [ESkeletonsAnimate.BOUNCE]: "animate-bounce"
  };

  const defaultAnimation =
    animationClass[animate as keyof IAnimation] || "animate-pulse";

  const [animation] = useState(defaultAnimation);

  return {
    animation
  };

};