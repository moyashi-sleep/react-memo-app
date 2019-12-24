import React from "react";
import EditorAreaContainer from "./EditorAreaContainer";
import EditorUtilityContainer from "./EditorUtilityContainer";
import TagAreaContainer from "./TagAreaContainer";

const EditorPane = () => {
  return (
    <div className="editor-pane">
      {/* Utility */}
      <EditorUtilityContainer />
      <div className="editor-area-container">
        <EditorAreaContainer />
        <TagAreaContainer />
      </div>
    </div>
  );
};

export default EditorPane;