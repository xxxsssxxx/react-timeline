import { IActivity, IBlock } from "../interfaces/interfaces";
import { ESide, EPriority } from "../enums/enums";
import { Schemes } from "../schemes/schemes";
import { dateFormating } from "../Utils/utils";

export const activities: IActivity[] = [
  {
    text: "Went for a walk",
    href: "https://google.com",
    date: new Date(),
    tags: [
      {
        name: "Work",
        priority: EPriority.VERY_HIGHT,
        colorScheme: Schemes.tags.very_hight
      }
    ],
    assignee: { name: "Admin" },
    side: ESide.LEFT
  },
  {
    text: "Take out trash",
    date: addMinutes(new Date(), 30),
    tags: [
      {
        name: "Home",
        priority: EPriority.HIGHT,
        colorScheme: Schemes.tags.hight
      }
    ],
    assignee: { name: "Admin", href: "https://youtube.com" },
    side: ESide.LEFT
  },
  {
    text: "Pay the phone bill",
    date: addMinutes(new Date(), 30),
    tags: [
      {
        name: "Work",
        priority: EPriority.MEDIUM,
        colorScheme: Schemes.tags.low
      },
      {
        name: "Home",
        priority: EPriority.HIGHT,
        colorScheme: Schemes.tags.hight
      },
      {
        name: "School",
        priority: EPriority.LOW,
        colorScheme: Schemes.tags.medium
      }
    ],
    assignee: { name: "Admin" },
    side: ESide.RIGHT
  },
  {
    text: "Went for a walk",
    href: "https://google.com",
    date: new Date(),
    tags: [
      {
        name: "Work",
        priority: EPriority.VERY_HIGHT,
        colorScheme: Schemes.tags.very_hight
      }
    ],
    assignee: { name: "Admin" },
    side: ESide.LEFT
  },
  {
    text: "Take out trash",
    date: addMinutes(new Date(), 45),
    tags: [
      {
        name: "Home",
        priority: EPriority.HIGHT,
        colorScheme: Schemes.tags.hight
      }
    ],
    assignee: { name: "Admin", href: "https://youtube.com" },
    side: ESide.LEFT
  },
  {
    text: "Pay the phone bill",
    date: addMinutes(new Date(), 42),
    tags: [
      {
        name: "Work",
        priority: EPriority.MEDIUM,
        colorScheme: Schemes.tags.low
      },
      {
        name: "Home",
        priority: EPriority.HIGHT,
        colorScheme: Schemes.tags.hight
      },
      {
        name: "School",
        priority: EPriority.LOW,
        colorScheme: Schemes.tags.medium
      }
    ],
    assignee: { name: "Admin" },
    side: ESide.RIGHT
  },
  {
    text: "Pay the phone bill",
    date: addMinutes(new Date(), 50),
    tags: [
      {
        name: "Work",
        priority: EPriority.MEDIUM,
        colorScheme: Schemes.tags.low
      },
      {
        name: "Home",
        priority: EPriority.HIGHT,
        colorScheme: Schemes.tags.hight
      },
      {
        name: "School",
        priority: EPriority.LOW,
        colorScheme: Schemes.tags.medium
      }
    ],
    assignee: { name: "Admin" },
    side: ESide.RIGHT
  },
  {
    text: "Went for a walk",
    href: "https://google.com",
    date: addMinutes(new Date(), 50),
    tags: [
      {
        name: "Work",
        priority: EPriority.VERY_HIGHT,
        colorScheme: Schemes.tags.very_hight
      }
    ],
    assignee: { name: "Admin" },
    side: ESide.LEFT
  },
  {
    text: "Take out trash",
    date: addMinutes(new Date(), 12),
    tags: [
      {
        name: "Home",
        priority: EPriority.HIGHT,
        colorScheme: Schemes.tags.hight
      }
    ],
    assignee: { name: "Admin", href: "https://youtube.com" },
    side: ESide.LEFT
  },
  {
    text: "Pay the phone bill",
    date: new Date(),
    tags: [
      {
        name: "Work",
        priority: EPriority.MEDIUM,
        colorScheme: Schemes.tags.low
      },
      {
        name: "Home",
        priority: EPriority.HIGHT,
        colorScheme: Schemes.tags.hight
      },
      {
        name: "School",
        priority: EPriority.LOW,
        colorScheme: Schemes.tags.medium
      }
    ],
    assignee: { name: "Admin" },
    side: ESide.RIGHT
  },
  {
    text: "Pay the phone bill",
    date: addMinutes(new Date(), 45),
    tags: [
      {
        name: "Work",
        priority: EPriority.MEDIUM,
        colorScheme: Schemes.tags.low
      },
      {
        name: "Home",
        priority: EPriority.HIGHT,
        colorScheme: Schemes.tags.hight
      },
      {
        name: "School",
        priority: EPriority.LOW,
        colorScheme: Schemes.tags.medium
      }
    ],
    assignee: { name: "Admin" },
    side: ESide.RIGHT
  }
];



export const blocks: IBlock[] = [
  { blockText: new Date(), activities },
  { blockText: addDays(4), activities },
  { blockText: addDays(10), activities },
  { blockText: addDays(25), activities },
  { blockText: addDays(27), activities },
  { blockText: addDays(30), activities },
  { blockText: addDays(40), activities },
  { blockText: addDays(42), activities },
  { blockText: addDays(45), activities },
  { blockText: addDays(47), activities }
];

export const blocksAutoFalse: IBlock[] = [
  { blockText: dateFormating(new Date(), false), activities },
  { blockText: dateFormating(addDays(4), false), activities },
  { blockText: dateFormating(addDays(10), false), activities },
  { blockText: dateFormating(addDays(25), false), activities },
  { blockText: dateFormating(addDays(27), false), activities },
  { blockText: dateFormating(addDays(30), false), activities },
  { blockText: dateFormating(addDays(40), false), activities },
  { blockText: dateFormating(addDays(42), false), activities },
  { blockText: dateFormating(addDays(45), false), activities },
  { blockText: dateFormating(addDays(47), false), activities }
];

export const blocksText: IBlock[] = [
  { blockText: new Date().toLocaleString("default", { month: "long" }), activities },
  { blockText: addDays(4).toLocaleString("default", { month: "long" }), activities },
  { blockText: addDays(10).toLocaleString("default", { month: "long" }), activities },
  { blockText: addDays(25).toLocaleString("default", { month: "long" }), activities },
  { blockText: addDays(27).toLocaleString("default", { month: "long" }), activities },
  { blockText: addDays(30).toLocaleString("default", { month: "long" }), activities },
  { blockText: addDays(40).toLocaleString("default", { month: "long" }), activities },
  { blockText: addDays(42).toLocaleString("default", { month: "long" }), activities },
  { blockText: addDays(45).toLocaleString("default", { month: "long" }), activities },
  { blockText: addDays(47).toLocaleString("default", { month: "long" }), activities }
];

function addDays(days: number): Date {
  const result = new Date();
  result.setDate(result.getDate() + days);
  return new Date(result);
};

function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60000);
}

export const shuffle = (a: any[]): any[] => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
