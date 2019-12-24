export const ADD_NOTE = "ADD_NOTE";
export const UPDATE_TEXT = "UPDATE_TEXT";
export const TRASH_NOTE = "TRASH_NOTE";
export const RESTORE_NOTE = "RESTORE_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
export const SELECT_NOTE = "SELECT_NOTE";
export const CHANGE_FILTER = "CHANGE_FILTER";
export const UPDATE_VISIBLE_ID = "UPDATE_VISIBLE_ID";
export const ADD_TAG_TO_NOTE = "ADD_TAG_TO_NOTE";
export const ADD_TAG_TO_LIST = "ADD_TAG_TO_LIST";
export const REMOVE_TAG_FROM_NOTE = "REMOVE_TAG_FROM_NOTE";
export const REMOVE_TAG_FROM_LIST = "REMOVE_TAG_FROM_LIST";

let nextNoteId = 0;
export const addNote = (defaultTag, created) => {
  return ({
    type: ADD_NOTE,
    payload: {
      id: nextNoteId++,
      defaultTag,
      created,
    }
  });
};

export const updateText = (id, text, modified) => {
  return ({
    type: UPDATE_TEXT,
    payload: {
      id,
      text,
      modified
    }
  });
};

export const trashNote = (id) => {
  return ({
    type: TRASH_NOTE,
    payload: {
      id
    }
  });
};

export const restoreNote = (id) => {
  return ({
    type: RESTORE_NOTE,
    payload: {
      id
    }
  });
};

export const deleteNote = (id) => {
  return ({
    type: DELETE_NOTE,
    payload: {
      id
    }
  });
};

export const selectNote = (id) => {
  return ({
    type: SELECT_NOTE,
    payload: {
      id
    }
  });
};

export const changeFilter = (id, noteFilter) => {
  return ({
    type: CHANGE_FILTER,
    payload: {
      id,
      noteFilter
    }
  });
};

export const updateVisibleId = (noteFilter) => {
  return ({
    type: UPDATE_VISIBLE_ID,
    payload: {
      noteFilter
    }
  });
};

export const addTagToNote = (noteId, id, tagName) => {
  return {
    type: ADD_TAG_TO_NOTE,
    payload: {
      noteId,
      id,
      tagName
    }
  };
};

export const addTagToList = (id, tagName) => {
  return {
    type: ADD_TAG_TO_LIST,
    payload: {
      id,
      tagName
    }
  };
};

export const removeTagFromNote = (noteId, id) => {
  return {
    type: REMOVE_TAG_FROM_NOTE,
    payload: {
      noteId,
      id
    }
  };
};

export const removeTagFromList = (tagName) => {
  return {
    type: REMOVE_TAG_FROM_LIST,
    payload: {
      tagName
    }
  };
};