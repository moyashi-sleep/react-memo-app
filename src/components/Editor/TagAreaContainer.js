import { addTagToNote, addTagToList, removeTagFromNote } from "../../actions/actions";
import { connect } from "react-redux";
import TagArea from "./TagArea";

const getSelectedNoteTags = (noteList, selectedNoteId) => {
  if (selectedNoteId === null) {
    return [];
  }
  return noteList.find(note => note.id === selectedNoteId).tags;
}

const mapStateToProps = (state) => {
  return {
    selectedNoteTags: getSelectedNoteTags(state.notes.noteList, state.selectedNoteId),
    selectedNoteId: state.selectedNoteId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onKeyDownHandler: (noteId, id, tagName) => {
      dispatch(addTagToNote(noteId, id, tagName));
      dispatch(addTagToList(id, tagName));
    },
    onClickTag: (noteId, id) => {
      dispatch(removeTagFromNote(noteId, id))
    }
  };
};

const TagAreaContainer = connect(mapStateToProps, mapDispatchToProps)(TagArea);

export default TagAreaContainer;