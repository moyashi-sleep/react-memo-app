import React from "react";
import { getTitleLine, getFirstLineOfContent, containsOnlyWhitespace } from "../../utility";

const NoteListRow = ({ id, text, isSelected, onClick }) => {
  return (
    <div
      className={"note-list-row" + (isSelected ? " note-list-row-selected" : "")}
      onClick={() => { onClick(id) }}
    >
      <div className="note-list-row-title">
        {containsOnlyWhitespace(text) ? "New Note..." : getTitleLine(text)}
      </div>
      <div className="note-list-row-content">
        {text.length === 0 ? "" : getFirstLineOfContent(text)}
      </div>
    </div>
  );
};

export default NoteListRow;