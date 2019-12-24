import { connect } from "react-redux";
import NoteList from "./NoteList";
import { addNote, selectNote } from "../../actions/actions";

const mapStateToProps = (state) => {
  return {
    filteredList: state.notes.noteList.filter(note => state.notes.visibleIdList.includes(note.id)),
    //filterVisibleNote(state.notes.noteList, state.notes.visibleNotesId),
    selectedNoteId: state.selectedNoteId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClickRow: (id) => {
      dispatch(selectNote(id));
    }
  };
};

const NoteListContainer = connect(mapStateToProps, mapDispatchToProps)(NoteList);

export default NoteListContainer;