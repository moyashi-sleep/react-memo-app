import React, { useState } from "react";
import TagFilterListRow from "./TagFilterListRow";
import Scrollable from "../../Scrollable";

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
      <Scrollable height="calc(100% - 28px)">
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
      </Scrollable>
    </div>
  );
};

export default TagFilterList;