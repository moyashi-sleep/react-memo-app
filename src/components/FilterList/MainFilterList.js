import React from "react";
import { ID_SHOW_ALL, ID_SHOW_TRASH } from "../../reducers/noteFilterReducer";

const MainFilterList = ({noteFilter, onClickMainFilter}) => {
  return (
    <div className="main-filter-list">
      <div
        className={"show-all-button" + (noteFilter.id === ID_SHOW_ALL ? " filter-selected" : "")}
        onClick={() => { onClickMainFilter(ID_SHOW_ALL, "SHOW_ALL") }}>
        <span className="icon filter-list-icon">&#xe90d;</span>All Note
      </div>
      <div
        className={"show-trash-button" + (noteFilter.id === ID_SHOW_TRASH ? " filter-selected" : "")}
        onClick={() => { onClickMainFilter(ID_SHOW_TRASH, "SHOW_TRASH") }}>
        <span className="icon filter-list-icon">&#xe90f;</span>Trash
      </div>
    </div>
  );
};

export default MainFilterList;