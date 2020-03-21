import { connect } from "react-redux";
import TagInputPopup from "./TagInputPopup";
import { addTagToList } from "../../actions/actions";

const getSelectedNoteTags = (noteList, selectedNoteId) => {
  if (selectedNoteId === null) {
    return [];
  }
  return noteList.find(note => note.id === selectedNoteId).tags;
};

const mapStateToProps = (state) => {
  return {
    tagList: state.tagList,
    selectedNoteTags: getSelectedNoteTags(state.notes.noteList, state.selectedNoteId)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTag: (id, tagName) => {
      dispatch(addTagToList(id, tagName));
    }
  };
};

const TagInputPopupContainer = connect(mapStateToProps, mapDispatchToProps)(TagInputPopup);

export default TagInputPopupContainer;