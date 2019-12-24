import React from "react";
import MainFilterListContainer from "./MainFilterListContainer";
import TagFilterListContainer from "./TagFilterListContainer";

const FilterListPane = () => {
  return (
    <div className="filter-list-pane">
      <MainFilterListContainer />
      <TagFilterListContainer />
    </div>
  );
};

export default FilterListPane;