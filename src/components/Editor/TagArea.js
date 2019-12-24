import React from "react";
import TagItem from "./TagItem";
import AddTagField from "./AddTagField";

const TagArea = ({selectedNoteTags, selectedNoteId, onKeyDownHandler, onClickTag}) => {
  return (
    <div className="tag-area">
      {selectedNoteTags.map((tag) => {
        return (
          <TagItem
            key={tag.id}
            tagName={tag.tagName}
            onClick={() => onClickTag(selectedNoteId, tag.id)}
          />
        );
      })}
      <AddTagField
        selectedNoteId={selectedNoteId}
        onKeyDown={onKeyDownHandler}
      />
    </div>
  );
};

export default TagArea;