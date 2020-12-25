export interface IBlock {
  activities: IActivity[];
  blockText: string | number;
  index?: number;
  max?: number;
  offset?: number;
}

export interface IActivity {
  text: string,
  href?: string,
  date: string,
  tags: ITag[],
  assignee: IAssignee,
  className?: string,
  side?: string
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