import React from "react";
import NoteListRow from "./NoteListRow";

const NoteList = ({ filteredList, selectedNoteId, onClickRow }) => {
  return (
    <div className="note-list">
      {selectedNoteId === null ? <div className="note-list-message">No Notes</div> : filteredList.map((listItem) => {
        return (
          <NoteListRow
            key={listItem.id}
            id={listItem.id}
            text={listItem.text}
            isSelected={listItem.id === selectedNoteId}
            onClick={onClickRow}
          />
        );
      })}
    </div>
  );
};

export default NoteList;