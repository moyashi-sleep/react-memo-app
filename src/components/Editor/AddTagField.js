import React from "react";

const AddTagField = ({onKeyDown}) => {
  return (
    <input
      type="text"
      className="add-tag-field"
      placeholder="Add a tag..."
      onKeyDown={(event) => {
        const inputString = event.target.value.trim();
        // 入力が0文字ではなくEnterキー押下かつ日本語入力未確定中(keyCode = 229)じゃなければ
        if (inputString.length !== 0 && event.key === "Enter" && event.keyCode !== 229) {
          onKeyDown(Date.now(), inputString);
          // textboxの入力値を消去する
          // TODO: 良くない方法な気がするので直せるなら直す
          event.target.value = "";
        }
      }}
    />
  );
};

export default AddTagField;