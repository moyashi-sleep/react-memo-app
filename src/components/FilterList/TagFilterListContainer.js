import { changeFilter } from "../../actions/actions";
import TagFilterList from "./TagFilterList";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    noteFilter: state.noteFilter,
    tagList: state.tagList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClickTagFilter: (id, noteFilter) => {
      dispatch(changeFilter(id, noteFilter));
    }
  };
};

const TagFilterListContainer = connect(mapStateToProps, mapDispatchToProps)(TagFilterList);

export default TagFilterListContainer;