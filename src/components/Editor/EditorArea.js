import React from "react";

// オートフォーカスさせるためにcomponentDidUpdate()を使う必要があるのでクラスコンポーネントとして定義
class EditorArea extends React.Component {

  constructor(props) {
    super(props);
    this.textAreaRef = React.createRef();
  }


  componentDidUpdate() {
    this.textAreaRef.current.focus();
  }

  render() {
    return (
      <textarea
        className="editor-area"
        ref={this.textAreaRef}
        readOnly={this.props.selectedNoteId === null ? true : false}
        value={this.props.selectedNoteId === null ? "" : this.props.text}
        onChange={(event) => { this.props.onChange(event, this.props.selectedNoteId, Date.now()); }} />
    );
  }
}

// 関数コンポーネントでもオートフォーカスさせる方法が見つかったら戻したい
/*
const EditorArea = ({selectedNoteId, text, onChange}) => {
  return (
    <textarea
      className="editor-area"
      readOnly={selectedNoteId === null ? true : false}
      value={selectedNoteId === null ? "" : text}
      onChange={(event) => { onChange(event, selectedNoteId, Date.now()); }} />
  );
};
*/

export default EditorArea;