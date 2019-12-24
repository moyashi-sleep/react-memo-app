import { ADD_TAG_TO_LIST } from "../actions/actions";

export const tagList = (state = [], action) => {
  switch (action.type) {
    case ADD_TAG_TO_LIST:
      const existInList = state.some(tag => tag.tagName === action.payload.tagName);
      return existInList ? state : [
        ...state,
        {
          id: action.payload.id,
          tagName: action.payload.tagName
        }
      ];
    default:
      return state;
  }
};