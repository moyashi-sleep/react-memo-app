import { fork, take, put, select } from "redux-saga/effects";
import { ADD_NOTE, CHANGE_FILTER, updateVisibleId, TRASH_NOTE, RESTORE_NOTE, DELETE_NOTE } from "./actions/actions";
import { selectNote } from "./actions/actions";

const getNotes = state => state.notes;
const getVisibleIdList = state => state.notes.visibleIdList;
const getNoteFilter = state => state.noteFilter;

function* handleAddNote() {
  while (true) {
    // ADD_NOTEのdispatchを待ち、dispatchされたらactionを取得する
    const action = yield take(ADD_NOTE);
    // dispatchされたactionからidを取得してselectNoteをdispatchする
    yield put(selectNote(action.payload.id));
  }
}

function* handleChangeFilter() {
  while (true) {
    const action = yield take(CHANGE_FILTER);
    yield put(updateVisibleId({
      id: action.payload.id,
      filterName: action.payload.noteFilter
    }));
    const visibleIdList = yield select(getVisibleIdList);
    yield put(selectNote(visibleIdList.length === 0 ? null : visibleIdList[0]));
  }
}

// 表示リスト、選択位置の更新を伴う必要があるactionを待つ汎用ジェネレータ
function* waitAbstractNoteAction(actionType) {
  while (true) {
    // dispatchされたらactionを取得する
    let action = yield take(actionType);
    let noteFilter = yield select(getNoteFilter);
    let visibleIdList = yield select(getVisibleIdList);
    // リストから消えるノートの位置を取得する
    let trashedIndex = visibleIdList.indexOf(action.payload.id);
    // 選択位置を変更する
    // 削除位置が0だった場合は要素番号1の要素、それ以外の場合は1つ前の要素、要素1つの場合はnullに
    let nextSelectedIndex = trashedIndex === 0 ? 1 : (trashedIndex - 1);
    let nextSelectedId = visibleIdList.length === 1 ? null : visibleIdList[nextSelectedIndex];
    // visibleIdListを更新する
    yield put(updateVisibleId(noteFilter));
    yield put(selectNote(nextSelectedId));
  }
}

// ノートの削除を待つ
function* handleTrashNote() {
  yield waitAbstractNoteAction(TRASH_NOTE);
}

// ノートの復元を待つ
function* handleRestoreNote() {
  yield waitAbstractNoteAction(RESTORE_NOTE);
}

// ノートの完全削除を待つ
function* handleDeleteNote() {
  yield waitAbstractNoteAction(DELETE_NOTE);
}



export default function* rootSaga() {
  yield fork(handleAddNote);
  yield fork(handleChangeFilter);
  yield fork(handleTrashNote);
  yield fork(handleRestoreNote);
  yield fork(handleDeleteNote);
}