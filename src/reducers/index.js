import { combineReducers } from 'redux';
import { notes } from './notesReducers';
import { tagList } from './tagListReducer';
import { noteFilter } from './noteFilterReducer';
import { selectedNoteId } from './selectedNoteIdReducer';


const rootReducer = combineReducers({
  notes: notes,
  tagList,
  noteFilter,
  selectedNoteId
});

export default rootReducer;