import React from "react";

const TagItem = ({tagName, onClick}) => {
  return (
    <span className="tag-item" onClick={onClick}>
      {tagName}
    </span>
  );
};

export default TagItem;