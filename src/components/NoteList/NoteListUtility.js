import React from "react";
import { ID_SHOW_TRASH } from "../../reducers/noteFilterReducer";

// TODO: Trashを表示しているときはaddボタンをdisableにする
const NoteListUtility = ({noteFilter, onClickAddButton}) => {
  return (
    <div className="note-list-utility">
      <span className="icon menu-button">&#xe90b;</span>
      <span
        className={"icon tooltip add-button" + (noteFilter.id === ID_SHOW_TRASH ? " button-disable" : "")}
        data-tooltip="Add Note"
        onClick={() => { onClickAddButton(noteFilter, Date.now()); }}
      >&#xe905;</span>
      {/*
      <button
        className="add-button"
        disabled={noteFilter.id === ID_SHOW_TRASH ? true : false}
        onClick={() => { onClickAddButton(noteFilter, Date.now()); }}
      >
        メモ追加
      </button>
      */}
    </div>
  );
};

export default NoteListUtility;