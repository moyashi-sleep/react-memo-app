import { ADD_TAG_TO_LIST, REMOVE_TAG_FROM_LIST } from "../actions/actions";

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
    case REMOVE_TAG_FROM_LIST:
      // tagNameからタグのインデックスを取得
      const tagIndex = state.findIndex(tag => tag.tagName === action.payload.tagName);
      // 該当タグのみ削除
      return [
        ...state.slice(0, tagIndex),
        ...state.slice(tagIndex + 1)
      ];
    default:
      return state;
  }
};