import React from "react";
import NoteListContainer from "./NoteListContainer";
import NoteListUtilityContainer from "./NoteListUtilityContainer";

const NoteListPane = () => {
  return (
    <div className="note-list-pane">
      <NoteListUtilityContainer />
      <NoteListContainer />
    </div>
  )
}

export default NoteListPane;