import { fork, take, put, select } from "redux-saga/effects";
import { ADD_NOTE, CHANGE_FILTER, updateVisibleId, TRASH_NOTE, RESTORE_NOTE, DELETE_NOTE, ADD_TAG_TO_LIST, addTagToNote, REMOVE_TAG_FROM_ALL_NOTE } from "./actions/actions";
import { selectNote } from "./actions/actions";

const getNotes = state => state.notes;
const getVisibleIdList = state => state.notes.visibleIdList;
const getNoteFilter = state => state.noteFilter;
const getTagList = state => state.tagList;
const getSelectedNoteId = state => state.selectedNoteId;

// ノートが追加されたら、そのノートにフォーカスする
function* handleAddNote() {
  while (true) {
    // ADD_NOTEのdispatchを待ち、dispatchされたらactionを取得する
    const action = yield take(ADD_NOTE);
    // dispatchされたactionからidを取得してselectNoteをdispatchする
    yield put(selectNote(action.payload.id));
  }
}

// Filterが変更されたら、表示対象を更新して1番目のノートにフォーカスする
function* handleChangeFilter() {
  while (true) {
    const action = yield take(CHANGE_FILTER);
    // 表示対象を更新する
    yield put(updateVisibleId({
      id: action.payload.id,
      filterName: action.payload.noteFilter
    }));
    const visibleIdList = yield select(getVisibleIdList);
    // 表示対象が0個ならnull、そうでないなら最初のノートにフォーカス
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

// 全ノートから任意のタグが削除されたら、表示対象を更新する
function* handleRemoveTagFromAllNote() {
  while (true) {
    // タグ削除を待つ
    yield take(REMOVE_TAG_FROM_ALL_NOTE);
    // 現在のnoteFilterを取得する
    const noteFilter = yield select(getNoteFilter);
    // 表示対象を更新する
    // 削除したタグでフィルタしていた場合は表示対象が0に、そうでない場合は変化なし
    yield put(updateVisibleId(noteFilter));
  }
}

// TagListへタグが追加されたら、ノートにそのタグを追加する
function* handleAddTag() {
  while (true) {
    const action = yield take(ADD_TAG_TO_LIST);
    const tagList = yield select(getTagList);
    const selectedNoteId = yield select(getSelectedNoteId);
    // TagList内の同名タグを探す
    // 初めて追加するタグの場合でもaddTagToListの後なので必ず見つかる(undefにならない)
    const tagInList = tagList.find(tag => tag.tagName === action.payload.tagName);
    // 同名タグのIDを利用する
    yield put(addTagToNote(selectedNoteId, tagInList.id, action.payload.tagName));
  }
}


export default function* rootSaga() {
  yield fork(handleAddNote);
  yield fork(handleChangeFilter);
  yield fork(handleTrashNote);
  yield fork(handleRestoreNote);
  yield fork(handleDeleteNote);
  yield fork(handleAddTag);
  yield fork(handleRemoveTagFromAllNote);
}