import React, { useState } from "react";
import TagItem from "./TagItem";
import TagInputPopupContainer from "./TagInputPopupContainer";

const TagArea = ({selectedNoteTags, selectedNoteId, onClickTag}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="tag-area">
      <div className="tag-container">
        {selectedNoteTags.map((tag) => {
          return (
            <TagItem
              key={tag.id}
              tagName={tag.tagName}
              onClick={() => onClickTag(selectedNoteId, tag.id)}
            />
          );
        })}
      </div>
      {
        // TODO: ボタンの表示/非表示を切り替える方法を統一したい
        // ここではstyleでvisibilityの値を変えてるけど
        // EditorUtilityでは不要なら生成しないようになってる
      }
      <span
        className="icon add-tag-button"
        style={{visibility: selectedNoteId === null ? "hidden" : "visible"}}
        onClick={() => setIsOpen(isOpen ? false : true)}
      >&#xe90e;</span>
      <TagInputPopupContainer isOpen={isOpen} setIsOpen={setIsOpen}/>
    </div>
  );
};

export default TagArea;