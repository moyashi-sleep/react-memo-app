import { addNote } from "../../actions/actions";
import NoteListUtility from "./NoteListUtility";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    noteFilter: state.noteFilter
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClickAddButton: (defaultTag, created) => {
      dispatch(addNote(defaultTag, created));
    }
  };
};

const NoteListUtilityContainer = connect(mapStateToProps, mapDispatchToProps)(NoteListUtility);

export default NoteListUtilityContainer;