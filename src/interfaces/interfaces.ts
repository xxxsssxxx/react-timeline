import { ESkeletonsAnimate } from "../enums/enums";

export interface IBlock {
  activities: IActivity[];
  blockText: string | Date;
  index?: number;
  max?: number;
  offset?: number;
  order?: string;
  auto?: boolean;
  bullets?: string;
  loadsCount?: string;
  isLongRange?: boolean;
  longRange?: number;
  loading?: boolean;
}

export interface IActivity {
  text: string;
  href?: string;
  date: Date;
  tags: ITag[];
  assignee: IAssignee;
  className?: string;
  side?: string;
  isLongRange?: boolean;
};

export interface ITag {
  name: string,
  priority: string,
  colorScheme?: string,
  className?: string
}

export interface IAssignee {
  name: string,
  href?: string,
  avatar?: string,
  className?: string
}

export interface IButtonTypes {
  primary: string,
  success: string,
  danger: string
}

export interface IAnimation {
  [ESkeletonsAnimate.PULSE]: string
  [ESkeletonsAnimate.BOUNCE]: string,
}