import { IActivity, IBlock } from "../interfaces/interfaces";
import { ESide, EPriority } from "../enums/enums";
import { Schemes } from "../schemes/schemes";

export const activities: IActivity[] = [
  {
    text: "Went for a walk",
    href: "https://google.com",
    date: new Date().toLocaleDateString(),
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
    date: new Date().toLocaleDateString(),
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
    date: new Date().toLocaleDateString(),
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
    date: new Date().toLocaleDateString(),
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
    date: new Date().toLocaleDateString(),
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
    date: new Date().toLocaleDateString(),
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
    date: new Date().toLocaleDateString(),
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
    date: new Date().toLocaleDateString(),
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
    date: new Date().toLocaleDateString(),
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
    date: new Date().toLocaleDateString(),
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
    date: new Date().toLocaleDateString(),
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
  { blockText: new Date().toLocaleDateString("en-GB"), date: new Date(), activities },
  { blockText: addDays(4).toLocaleDateString("en-GB"), date: addDays(4), activities },
  { blockText: addDays(10).toLocaleDateString("en-GB"), date: addDays(10), activities },
  { blockText: addDays(25).toLocaleDateString("en-GB"), date: addDays(25), activities },
  { blockText: addDays(27).toLocaleDateString("en-GB"), date: addDays(27), activities },
  { blockText: addDays(30).toLocaleDateString("en-GB"), date: addDays(30), activities },
  { blockText: addDays(40).toLocaleDateString("en-GB"), date: addDays(40), activities },
  { blockText: addDays(42).toLocaleDateString("en-GB"), date: addDays(42), activities },
  { blockText: addDays(45).toLocaleDateString("en-GB"), date: addDays(45), activities },
  { blockText: addDays(47).toLocaleDateString("en-GB"), date: addDays(47), activities }
];

function addDays(days: number): Date {
  const result = new Date();
  result.setDate(result.getDate() + days);
  return result;
};

export const shuffle = (a: any[]): any[] => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
