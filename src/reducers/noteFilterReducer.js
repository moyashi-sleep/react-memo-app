import { CHANGE_FILTER } from "../actions/actions";

export const ID_SHOW_ALL = Date.now();
export const ID_SHOW_TRASH = ID_SHOW_ALL + 1;

const initialState = {
  id: ID_SHOW_ALL,
  filterName: "SHOW_ALL"
};

export const noteFilter = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FILTER:
      return {
        id: action.payload.id,
        filterName: action.payload.noteFilter
      }
    default:
      return state;
  }
};