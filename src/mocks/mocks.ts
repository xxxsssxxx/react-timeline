import { IActivity } from "../interfaces/interfaces";
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
  }
];
