// ミリ秒表記の時刻をYYYY/MM/DD hh:mmにフォーマットする
export const formatTime = (ms) => {
  const date = new Date(ms);
  return date.getFullYear() + "/" + toDoubleDigits(date.getMonth() + 1) + "/" + toDoubleDigits(date.getDate()) + " " + toDoubleDigits(date.getHours()) + ":" + toDoubleDigits(date.getMinutes());
};

// 1桁の数字を0埋めした2桁にする
const toDoubleDigits = (num) => {
  return ("0" + num).slice(-2);
};

// 改行以外の文字が入力されているかチェックする
// 改行・空白のみの場合はtrue、それ以外が含まれる場合はfalse
export const containsOnlyWhitespace = (text) => {
  return (text.trim().length === 0 ? true : false);
}

// メモ内容の1行目(タイトル)を抜き出す
export const getTitleLine = (text) => {
  // 1文字目以前の改行を削除し、改行以外の文字列を抜き出す
  return text.trimStart().match(/.*/);
}

// メモ内容のタイトルの次の行を抜き出す
export const getFirstLineOfContent = (text) => {
  // タイトル行を空文字列に置き換えて、タイトル行後の改行を削除、改行以外の文字列を抜き出す
  return text.trimStart().replace(/.*/, "").trimStart().match(/.*/);
}