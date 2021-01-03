import { FC, useState } from "react";
import { ESkeletonsAnimate } from "../../enums/enums";
import { IAnimation } from "../../interfaces/interfaces";

type Props = {
  wrapperClass?: string,
  bulletClass?: string,
  animate?: string
}

const SkeletonBullet: FC<Props> = ({
  wrapperClass,
  bulletClass,
  animate = ESkeletonsAnimate.PULSE
}) => {

  const animationClass: IAnimation = {
    [ESkeletonsAnimate.PULSE]: "animate-pulse",
    [ESkeletonsAnimate.BOUNCE]: "animate-bounce"
  };

  const [animation] = useState(animationClass[animate as keyof IAnimation]);


  return (
    <div
      data-testid="skeleton-bullet"
      className={`${wrapperClass} bg-gray-800 shadow-md rounded-full h-8 justify-center ${animation}`}
    >
      <span className={`${bulletClass}`} />
    </div>
  );
};

export default SkeletonBullet;
