import React, { useState } from "react";
import { ID_SHOW_TRASH } from "../../reducers/noteFilterReducer";
import SlideModal from "./SlideModal";

const EditorUtility = ({ selectedNote, noteFilter, selectedNoteId, onClickTrashButton, onClickRestoreButton, onClickDeleteButton}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="editor-utility">
      {selectedNoteId !== null &&
        <>
          {noteFilter.id === ID_SHOW_TRASH ?
            <>
              <span
                className="icon restore-button tooltip"
                data-tooltip="Restore Note"
                onClick={() => { onClickRestoreButton(selectedNoteId) }}
              >&#xe910;</span>
              <span
                className="icon delete-button tooltip"
                data-tooltip="Delete Note"
                onClick={() => { onClickDeleteButton(selectedNoteId) }}
              >&#xe914;</span>
            </>
            :
            <span
              className="icon trash-button tooltip"
              data-tooltip="Trash Note"
              onClick={() => { onClickTrashButton(selectedNoteId); }}
            >&#xe90f;</span>
          }
          <span className="separator"></span>
          <span
            className="icon preview-button tooltip"
            data-tooltip="Markdown Preview"
          >&#xe906;</span>
          <span className="icon info-button" onClick={() => setIsOpen(true)}>&#xe90a;</span>
          <SlideModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            selectedNote={selectedNote}
          />
        </>
      }
    </div>
  );
};

export default EditorUtility;