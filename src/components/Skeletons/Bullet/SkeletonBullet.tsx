import { FC } from "react";
import { SkeletonBulletProps } from "../../../interfaces/componentProps";
import { SkeletonAnimationLogic } from "../SkeletonAnimationLogic";

const SkeletonBullet: FC<SkeletonBulletProps> = (props) => {
  const { wrapperClass, bulletClass, animate } = props;

  const { animation } = SkeletonAnimationLogic({ animate });

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
