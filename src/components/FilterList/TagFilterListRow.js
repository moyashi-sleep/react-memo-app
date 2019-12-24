import React from "react";

const TagFilterListRow = ({tag, noteFilter, onClick}) => {
  return (
    <div
      className={"tag-filter-list-row" + (noteFilter.id === tag.id ? " filter-selected" : "")}
      onClick={() => {onClick(tag.id, tag.tagName)}}
    >
      <span className="icon-delete-1 delete-tag-button"></span>
      <span className="tag-filter-list-row-name">
        {tag.tagName}
      </span>
    </div>
  );
};

export default TagFilterListRow;