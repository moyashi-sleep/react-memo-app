import { CHANGE_FILTER } from "../actions/actions";
import { generateUuid } from "../utility";

export const ID_SHOW_ALL = generateUuid();
export const ID_SHOW_TRASH = generateUuid();

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