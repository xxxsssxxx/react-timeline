import React, { FC, useState } from "react";
import Sort from "../Sort/Sort";
import Filter from "../Filter/Filter";

type Props = {
  title: string
};

const Tools: FC<Props> = ({ title }) => {
  let [showFilter, setShowFilter] = useState(false);
  let [showSort, setShowSort] = useState(false);

  const toggleFilter = (): void => {
    setShowFilter(!showFilter);
  };
  const toggleSort = (): void => {
    setShowSort(!showSort);
  };


  return (
    <div className="tools" data-testid="tools">
      <p className="tools-title"> {title} </p>
      <button
        className="sort-toggle"
        onClick={toggleSort}
        data-testid="sort-toggler"
      >
        Toggle Sorting
      </button>
      <button
        className="filter-toggle"
        onClick={toggleFilter}
        data-testid="filter-toggler"
      >
        Toggle Filter
      </button>
      <div className="tools-wrapper">
        {showSort ? <Sort /> : null}
        {showFilter ? <Filter /> : null}
      </div>
    </div>
  );
};

export default Tools;
