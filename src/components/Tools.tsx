import React from "react";
import Sort from "./Sort";
import Filter from "./Filter";

type Props = {
  title: string
};

const Tools: React.FC<Props> = ({ title }) => {
  let showFilter:boolean = true;
  let showSort:boolean = true;


  return (
    <div className="tools">
      <p className="tools-title"> { title } </p>
      <div className="tools-wrapper">
        {showSort ? <Sort /> : null}
        {showFilter ? <Filter /> : null}
      </div>
    </div>
  );
};

export default Tools;
