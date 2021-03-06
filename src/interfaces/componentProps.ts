import { MouseEvent } from "react";
import { IActivity, IBlock } from "./interfaces";

export type TimeLineProps = {
  activities?: IActivity[];
  showTools?: boolean;
  type?: string;
  blocks: IBlock[];
  folded?: boolean;
  maxBlocks?: number;
  maxActivities?: number;
  blocksOffset?: number;
  activitiesOffset?: number;
  autoBlocks?: boolean;
  autoActivities?: boolean;
  blocksOrder?: string;
  activitiesOrder?: string;
  activitiesBulletsType?: string;
  blockBulletsType?: string;
  blocksLongRange?: number;
  activitiesLongRange?: number;
  blockLoadCount?: string | boolean;
  activitiesLoadCount?: boolean;
  blocksLoading?: boolean;
  activitiesLoading?: boolean;
  loadingAnimation?: string;
  onBlockBulletClick?: (e: MouseEvent, block?: IBlock) => void;
  moreButton?: string;
};

export type ActivitiesBlockProps = {
  activities: IActivity[];
  index?: number;
  blockText: string | Date;
  folded?: boolean;
  maxActivities?: number;
  activitiesOffset?: number;
  activitiesOrder?: string;
  autoActivities?: boolean;
  bulletsType?: string;
  blockBulletsType?: string;
  activitiesLoadCount?: string | boolean;
  activitiesLongRange?: number;
  loading?: boolean;
  blocksLoading?: boolean;
  loadingAnimation?: string;
  onBlockBulletClick?: (e: MouseEvent, block?: IBlock) => unknown;
  moreButton?: string
}

export type ActivityProps = {
  activity: IActivity;
  loading?: boolean;
};

export type SkeletonBulletProps = {
  wrapperClass?: string;
  bulletClass?: string;
  animate?: string;
};

export type SkeletonActivityProps = {
  wrapper?: string;
  animate?: string;
};