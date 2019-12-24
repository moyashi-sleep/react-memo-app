import { connect } from "react-redux";
import { trashNote, restoreNote, deleteNote } from "../../actions/actions";
import EditorUtility from "./EditorUtility";

const mapStateToProps = (state) => {
  return {
    selectedNote: state.notes.noteList[state.notes.noteList.findIndex(note => note.id === state.selectedNoteId)],
    noteFilter: state.noteFilter,
    selectedNoteId: state.selectedNoteId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClickTrashButton: (id) => {
      dispatch(trashNote(id));
    },
    onClickRestoreButton: (id) => {
      dispatch(restoreNote(id));
    },
    onClickDeleteButton: (id) => {
      dispatch(deleteNote(id));
    }
  };
};

const EditorUtilityContainer = connect(mapStateToProps, mapDispatchToProps)(EditorUtility);

export default EditorUtilityContainer;