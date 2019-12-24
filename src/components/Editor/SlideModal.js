import React from "react";
import ReactDOM from "react-dom";
import { formatTime } from "../../utility";

// isOpenで開閉制御、背景クリックでisOpenをfalseにする
// TODO: 閉じるボタンつける
const SlideModal = ({isOpen, setIsOpen, selectedNote}) => {
  return ReactDOM.createPortal(
    <>
      <div className={"modal-outer" + (isOpen ? " modal-outer-open" : "")} onClick={() => { setIsOpen(false) }}></div>
      <div className={"modal-inner" + (isOpen ? " modal-inner-open" : "")}>
        <div className="modal-title">Info<span className="icon close-button" onClick={() => { setIsOpen(false) }}>&#xe912;</span></div>
        <div>
          作成日
        </div>
        <div>
          {formatTime(selectedNote.created)}
        </div>
        <div>
          更新日
        </div>
        <div>
          {formatTime(selectedNote.modified)}
        </div>
        <div>
          {selectedNote.text.replace(/\r?\n/g, '').length}文字
        </div>

      </div>
    </>,
    document.querySelector("#modal")
  );
};

export default SlideModal;