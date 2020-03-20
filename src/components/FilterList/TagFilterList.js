import React, { useState } from "react";
import TagFilterListRow from "./TagFilterListRow";

const TagFilterList = ({noteFilter, tagList, onClickTagFilter, onClickDeleteButton}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className={"tag-filter-list" + (isEditing ? " list-editing" : "")}>
      <div className="tag-filter-list-header">
        <span className="icon filter-list-icon">&#xe90e;</span>Tags
        <span className="edit-filter-list-button" onClick={() => {setIsEditing(isEditing ? false : true)}}>
          {isEditing ? "Done" : "Edit"}
        </span>
      </div>
      {tagList.map((listItem) => {
        return (
          <TagFilterListRow
            key={listItem.id}
            noteFilter={noteFilter}
            tag={listItem}
            onClickTagFilter={onClickTagFilter}
            onClickDeleteButton={onClickDeleteButton}
            isEditing={isEditing}
          />
        );
      })}
    </div>
  );
};

export default TagFilterList;