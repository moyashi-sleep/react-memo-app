import React from "react";
import NoteListRow from "./NoteListRow";
import Scrollable from "../../Scrollable";

const NoteList = ({ filteredList, selectedNoteId, onClickRow }) => {
  return (
    <div className="note-list">
      {selectedNoteId === null ? <div className="note-list-message">No Notes</div> : <></>}
      <Scrollable width="100%" height="100%">
        {filteredList.map((listItem) => {
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
      </Scrollable>
    </div>
  );
};

export default NoteList;