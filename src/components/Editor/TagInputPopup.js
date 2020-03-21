import React, { useRef, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import { generateUuid } from "../../utility";

const TagInputPopup = ({tagList, selectedNoteTags, addTag, isOpen, setIsOpen}) => {
  const inputRef = useRef();

  // マウント時にCallBack(ポップアップを閉じる)をメモ化する
  const closePopup = useCallback((event) => {
    // クリックした要素がPopup以外、かつadd-tag-buttonでない場合は閉じる
    // TagInputPopup-rowをクリックした際、コールバック実行時点でrowは既にPopupから削除されている
    // そのため親要素を持たず、closest()による判断では除外できないので個別で除外している
    if (event.target.closest(".TagInputPopup") === null && !(event.target.classList.contains("TagInputPopup-row") || event.target.classList.contains("add-tag-button"))) {
      setIsOpen(false);
    }
  }, []);

  // マウント時にイベントハンドラを登録する
  useEffect(() => {
    document.addEventListener("click", closePopup);
    // イベントハンドラの解除をクリーンアップ関数として返す
    return () => {document.removeEventListener("click", closePopup)}
  }, []);

  // ポップアップ開閉時にフォーカスする
  // TODO: 閉じるときにもフォーカスしちゃうので直したい
  useEffect(() => {
    inputRef.current.focus();
  }, [isOpen])

  return ReactDOM.createPortal(
    <div className={"TagInputPopup" + (isOpen ? " open" : "")}>
      <div className="TagInputPopup-list">
        {
          // tagListにあり、選択中のノートにはないタグを抽出する
          tagList.filter(tagInList => !selectedNoteTags.some(tag => tag.id === tagInList.id))
          .map(tag => {
            return (
              <div
                key={tag.id}
                className="TagInputPopup-row"
                onClick={() => {addTag(tag.id, tag.tagName);}}
              >
                {tag.tagName}
              </div>
            );
          })
        }
      </div>
      <input
        type="text"
        className="add-tag-field"
        ref={inputRef}
        placeholder="Add a tag..."
        onKeyDown={(event) => {
          const inputString = event.target.value.trim();
          // 入力が0文字ではなくEnterキー押下かつ日本語入力未確定中(keyCode = 229)じゃなければ
          if (inputString.length !== 0 && event.key === "Enter" && event.keyCode !== 229) {
            addTag(generateUuid(), inputString);
            // textboxの入力値を消去する
            event.target.value = "";
          }
        }}
      />
      {/*
      <AddTagField
        onKeyDown={addTag}
      />
      */}
    </div>,
    document.querySelector("#TagInputPopup")
  );
};

export default TagInputPopup;