import React from "react";

const TagFilterListRow = ({tag, noteFilter, onClickTagFilter, onClickDeleteButton, isEditing}) => {
  return (
    <div
      className={"tag-filter-list-row" + (noteFilter.id === tag.id ? " filter-selected" : "")}
      onClick={() => {
        if (!isEditing) {
          onClickTagFilter(tag.id, tag.tagName);
        }
      }}
    >
      <span
        className="icon-delete-1 delete-tag-button"
        onClick={() => {onClickDeleteButton(tag.tagName)}}
      ></span>
      <span className="tag-filter-list-row-name">
        {tag.tagName}
      </span>
    </div>
  );
};

export default TagFilterListRow;