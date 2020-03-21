import { ADD_NOTE, UPDATE_TEXT, TRASH_NOTE, UPDATE_VISIBLE_ID, ADD_TAG_TO_NOTE, restoreNote, RESTORE_NOTE, DELETE_NOTE, REMOVE_TAG_FROM_NOTE, REMOVE_TAG_FROM_ALL_NOTE } from "../actions/actions";
import { ID_SHOW_ALL, ID_SHOW_TRASH } from "./noteFilterReducer";

const initialState = {
  noteList: [],
  visibleIdList: []
};

const getNoteIndexById = (noteList, id) => {
  return noteList.findIndex(note => note.id === id);
}

const filterVisibleNote = (noteList, noteFilter) => {
  switch (noteFilter.id) {
    case ID_SHOW_ALL:
      return noteList.filter(note => !note.isTrashed).map(note => note.id);
    case ID_SHOW_TRASH:
      return noteList.filter(note => note.isTrashed).map(note => note.id);
    default:
      return noteList.filter(note => {
        // noteFilterで指定されたタグを含む、かつtrashされていないノートのみ取り出す
        return note.tags.some(tag => tag.tagName === noteFilter.filterName) && !note.isTrashed;
      }).map(note => note.id);
  }
};

export const notes = (state = initialState, action) => {
  let noteIndex;
  switch (action.type) {
    case ADD_NOTE:
      return Object.assign({}, state, {
        noteList: [
          {
            id: action.payload.id,
            text: "",
            tags: action.payload.defaultTag.id === ID_SHOW_ALL ? [] : [
              {
                id: action.payload.defaultTag.id,
                tagName: action.payload.defaultTag.filterName
              }
            ],
            created: action.payload.created,
            modified: action.payload.created,
            isTrashed: false
          },
          ...state.noteList
        ],
        visibleIdList: [
          action.payload.id,
          ...state.visibleIdList
        ]
      });
    case UPDATE_TEXT:
      noteIndex = getNoteIndexById(state.noteList, action.payload.id);
      return Object.assign({}, state, {
        noteList: [
          ...state.noteList.slice(0, noteIndex),
          Object.assign({}, state.noteList[noteIndex], {
            text: action.payload.text,
            modified: action.payload.modified
          }),
          ...state.noteList.slice(noteIndex + 1)
        ]
      });
    case TRASH_NOTE:
      noteIndex = getNoteIndexById(state.noteList, action.payload.id);
      return Object.assign({}, state, {
        noteList: [
          ...state.noteList.slice(0, noteIndex),
          Object.assign({}, state.noteList[noteIndex], {
            isTrashed: true
          }),
          ...state.noteList.slice(noteIndex + 1)
        ]
      });
    case RESTORE_NOTE:
      noteIndex = getNoteIndexById(state.noteList, action.payload.id);
      return Object.assign({}, state, {
        noteList: [
          ...state.noteList.slice(0, noteIndex),
          Object.assign({}, state.noteList[noteIndex], {
            isTrashed: false
          }),
          ...state.noteList.slice(noteIndex + 1)
        ]
      });
    case DELETE_NOTE:
      noteIndex = getNoteIndexById(state.noteList, action.payload.id);
      return Object.assign({}, state, {
        noteList: [
          ...state.noteList.slice(0, noteIndex),
          ...state.noteList.slice(noteIndex + 1)
        ]
      });
    case UPDATE_VISIBLE_ID:
      return Object.assign({}, state, {
        visibleIdList: filterVisibleNote(state.noteList, action.payload.noteFilter)
      });
    case ADD_TAG_TO_NOTE:
      noteIndex = getNoteIndexById(state.noteList, action.payload.noteId);
      const existInTags = state.noteList[noteIndex].tags.some(tag => tag.tagName === action.payload.tagName);
      return existInTags ? state : Object.assign({}, state, {
        noteList: [
          ...state.noteList.slice(0, noteIndex),
          Object.assign({}, state.noteList[noteIndex], {
            tags: [
              ...state.noteList[noteIndex].tags,
              {
                id: action.payload.id,
                tagName: action.payload.tagName
              }
            ]
          }),
          ...state.noteList.slice(noteIndex + 1)
        ]
      });
    case REMOVE_TAG_FROM_NOTE:
      noteIndex = getNoteIndexById(state.noteList, action.payload.noteId);
      const tagIndex = state.noteList[noteIndex].tags.findIndex(tag => tag.id === action.payload.id);
      return Object.assign({}, state, {
        noteList: [
          ...state.noteList.slice(0, noteIndex),
          Object.assign({}, state.noteList[noteIndex], {
            tags: [
              ...state.noteList[noteIndex].tags.slice(0, tagIndex),
              ...state.noteList[noteIndex].tags.slice(tagIndex + 1)
            ]
          }),
          ...state.noteList.slice(noteIndex + 1)
        ]
      });
    case REMOVE_TAG_FROM_ALL_NOTE:
      return Object.assign({}, state, {
        // 該当のタグを削除したnoteを要素とするnoteListを作成し、stateとassignする
        noteList: state.noteList.map((note) => {
          // 該当タグのtags内インデックスを取得する
          const tagIndex = note.tags.findIndex(tag => tag.tagName === action.payload.tagName);
          // 該当タグを削除したnoteを返す
          return tagIndex === -1 ? note : Object.assign({}, note, {
            tags: [
              ...note.tags.slice(0, tagIndex),
              ...note.tags.slice(tagIndex + 1)
            ]
          })
        })
      });
    default:
      return state;
  }
};

