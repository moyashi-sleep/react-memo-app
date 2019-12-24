import { updateText } from "../../actions/actions";
import { connect } from "react-redux";
import EditorArea from "./EditorArea";

const getNoteTextById = (notes, selectedNoteId) => {
  if (notes.length === 0 || selectedNoteId === null) {
    return;
  }
  let targetNote = notes.find(note => note.id === selectedNoteId);
  return targetNote.text;
};

const mapStateToProps = (state) => {
  return {
    selectedNoteId: state.selectedNoteId,
    text: getNoteTextById(state.notes.noteList, state.selectedNoteId)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (event, id, modified) => {
      dispatch(updateText(id, event.target.value, modified));
    }
  };
};

const EditorAreaContainer = connect(mapStateToProps, mapDispatchToProps)(EditorArea);

export default EditorAreaContainer;