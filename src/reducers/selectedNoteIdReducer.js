import { SELECT_NOTE } from "../actions/actions";

export const selectedNoteId = (state = null, action) => {
  switch (action.type) {
    case SELECT_NOTE:
      return action.payload.id;
    default:
      return state;
  }
};