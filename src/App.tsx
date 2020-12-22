import React from "react";
import TimeLine from "./components/TimeLine";

import { IActivity } from "./interfaces/interfaces";
import { EPriority } from "./enums/enums";
import { Schemes } from "./schemes/schemes";

const App = () => {
  const title: string = "React timeline";

  const activities: IActivity[] = [
    {
      text: "Went for a walk",
      href: "https://google.com",
      date: new Date().toLocaleDateString(),
      tags: [
        { name: "Work", priority: EPriority.VERY_HIGHT, colorScheme: Schemes.very_hight }
      ],
      assignee: { name: "Admin" }
    },
    {
      text: "Take out trash",
      date: new Date().toLocaleDateString(),
      tags: [
        {
          name: "Home",
          priority: EPriority.HIGHT,
          colorScheme: Schemes.hight
        }
      ],
      assignee: { name: "Admin", href: "https://youtube.com" }
    },
    {
      text: "Pay the phone bill",
      date: new Date().toLocaleDateString(),
      tags: [
        {
          name: "Work",
          priority: EPriority.MEDIUM,
          colorScheme: Schemes.low
        },
        {
          name: "Home",
          priority: EPriority.HIGHT,
          colorScheme: Schemes.hight
        },
        { name: "School", priority: EPriority.LOW, colorScheme: Schemes.medium }
      ],
      assignee: { name: "Admin" }
    }
  ];

  return (
    <div className="App">
      <div className="wrapper container mx-auto mt-6">
        <h1 title={title} className="text-center text-2xl">
          {title}
        </h1>
        <TimeLine activities={activities} />
      </div>
    </div>
  );
};

export default App;
