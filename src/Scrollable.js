import React, { useEffect, useRef, useCallback, useMemo } from "react";
import "./Scrollable.css"

// TODO: "wheel"イベントのブラウザ間の差異を吸収する

const Scrollable = ({children, width, maxWidth, height, maxHeight}) => {
  const outerRef = useRef();
  const innerRef = useRef();

  const barTrackRef = useRef();
  const barThumbRef = useRef();

  const position = useRef();
  const limitPosition = useRef();

  const windowSize = useRef();
  const isAddedHandler = useRef();

  // innerのスクロールアニメーション用CSSを付与する
  const animateScroll = useCallback((position, duration) => {
    innerRef.current.style.transform = "translate(0, " + position + "px)";
    innerRef.current.style.transition = "transform " + duration + "ms linear";
  }, []);

  // thumbのスクロールアニメーション用CSSを付与する
  const animateThumb = useCallback((position, duration) => {
    const scrollRate = position / limitPosition.current;
    const thumbPosition = Math.floor((barTrackRef.current.offsetHeight - barThumbRef.current.offsetHeight) * scrollRate);
    barThumbRef.current.style.transform = "translate(0, " + thumbPosition + "px)";
    barThumbRef.current.style.transition = "transform " + duration + "ms linear";
  }, []);

  // スクロール量を0にリセットする
  const reset = useCallback(() => {
    position.current = 0;
    animateScroll(position.current, 0);
  }, [animateScroll]);

  // マウスホイール回転時に実行する
  const onWheel = useCallback((event) => {
    // ウィンドウ全体のスクロールを抑止する
    event.preventDefault();

    // ブラウザごとにホイール移動量の格納位置が違う
    const delta = event.deltaY ? -(event.deltaY) : event.wheelDelta || -(event.detail);

    let nextPos = Math.floor(position.current + (delta / 3));

    if (nextPos > 0) {
      nextPos = 0;
    } else if (nextPos < limitPosition.current) {
      nextPos = limitPosition.current;
    }

    animateScroll(nextPos, 100);
    animateThumb(nextPos, 100);
    position.current = nextPos;
  }, [animateScroll, animateThumb]);

  // wheel時のイベントハンドラを設定する
  const activate = useCallback(() => {
    if (isAddedHandler.current) {
      return;
    }

    outerRef.current.addEventListener("wheel", onWheel, { passive: false });
    isAddedHandler.current = true;
  }, [onWheel]);

  // wheel時のイベントハンドラを削除する
  const deactivate = useCallback(() => {
    if (!isAddedHandler.current) {
      return;
    }

    reset();
    outerRef.current.removeEventListener("wheel", onWheel, { passive: false });
    isAddedHandler.current = false;
  }, [reset, onWheel]);

  const update = useCallback(() => {
    const outerHeight = outerRef.current.offsetHeight;
    const innerHeight = innerRef.current.offsetHeight;
    limitPosition.current = (outerHeight - innerHeight) > 0 ? 0 : outerHeight - innerHeight;

    if (limitPosition.current > position.current) {
      // innerが小さくなってスクロール最下部が今のスクロール位置より高くなった場合
      // adjust
      position.current = limitPosition.current;
      animateScroll(position.current, 0);
    }

    // outerに対するinnerの高さの割合
    const sizeRate = outerHeight / innerHeight;
    // thumbの高さを更新する
    barThumbRef.current.style.height = (sizeRate < 1 ? Math.floor(barTrackRef.current.offsetHeight * sizeRate) : 0) + "px";
    // thumbを適切な位置へ移動する
    animateThumb(position.current, 100);

    if (innerHeight > outerHeight) {
      activate();
    } else {
      deactivate();
    }
  }, [animateScroll, animateThumb, activate, deactivate]);

  useEffect(() => {
    windowSize.current = 0;
    reset();
    window.addEventListener("resize", update);
    return () => {window.removeEventListener("resize", update)};
  }, [reset, update]);

  useEffect(() => {
    update();
  }, [children, update]);

  const outerStyle = useMemo(() => {
    return {
      width: width,
      maxWidth: maxWidth,
      height: height,
      maxHeight: maxHeight,
      overflow: "hidden",
    }
  }, [width, height, maxHeight]);

  return (
    <div className="Scrollable-outer" ref={outerRef} style={outerStyle}>
      <div className="Scrollable-inner" ref={innerRef}>
        {children}
      </div>
      <div className="Scrollable-scrollbar-track" ref={barTrackRef}>
        <div className="Scrollable-scrollbar-thumb" ref={barThumbRef}></div>
      </div>
    </div>
  );
};

export default Scrollable;