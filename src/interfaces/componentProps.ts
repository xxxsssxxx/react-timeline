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