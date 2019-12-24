import React from 'react';
import NoteListPane from './NoteList/NoteListPane';
import FilterListPane from './FilterList/FilterListPane';
import EditorPane from './Editor/EditorPane';


const App = () => {
  return (
    <div className="base">
      <FilterListPane />
      <NoteListPane />
      <EditorPane />
    </div>
  );
}

export default App;