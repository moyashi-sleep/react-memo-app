import { connect } from "react-redux";
import MainFilterList from "./MainFilterList";
import { changeFilter } from "../../actions/actions";


const mapStateToProps = (state) => {
  return {
    noteFilter: state.noteFilter
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClickMainFilter: (id, noteFilter) => {
      dispatch(changeFilter(id, noteFilter));
    }
  };
};

const MainFilterListContainer = connect(mapStateToProps, mapDispatchToProps)(MainFilterList);

export default MainFilterListContainer;