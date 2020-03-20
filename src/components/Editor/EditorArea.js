import React, { useRef, useEffect } from "react";

const EditorArea = ({selectedNoteId, text, onChange}) => {
  // refオブジェクトを作成する
  const textAreaRef = useRef();

  // selectedNoteIdに変化があった場合の処理
  // TODO: フィルターの変更でseletedNoteIdが変わらなかった場合、フォーカスしないのを直したい(できれば)
  // (あるノートを選択していて、あるタグでフィルターしたとき、そのノートが最上部にある場合など)
  useEffect(() => {
    const textArea = textAreaRef.current;
    // フォーカスする
    textArea.focus();
    // キャレットを末尾に移動する
    textArea.setSelectionRange(textArea.value.length, textArea.value.length);
    // 最下部へスクロールする
    textArea.scrollTop = textArea.scrollHeight;
  }, [selectedNoteId]);

  return (
    <textarea
      className="editor-area"
      ref={textAreaRef}
      readOnly={selectedNoteId === null ? true : false}
      value={selectedNoteId === null ? "" : text}
      onChange={(event) => { onChange(event, selectedNoteId, Date.now()); }} />
  );
};

export default EditorArea;