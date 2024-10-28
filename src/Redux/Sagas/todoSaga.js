import { put, select, takeEvery, takeLatest } from "redux-saga/effects";
import {
    getListTodo, getListTodoSusccess, getListTodoFail,
    addNewTodo, removeTodo, getListTodoGroupSusccess,
    getListTodoGroupFail, addNewTodoGroup, removeTodoGroup, getListTodoGroup,
    updateTodo,
    addNewTodoSuccess,
    addNewTodoFail,
    removeTodoSuccess,
    removeTodoFail
} from "../Slices/todoSlice";
import { addTodoApi, removeTodoApi } from "../../services/todoServices";

function* loadListTodoSaga() {
    try {
        const listTodo = JSON.parse(localStorage.getItem("listTodo")) || [];
        yield put(getListTodoSusccess(listTodo));
    } catch (e) {
        yield put(getListTodoFail(e.message))
    }
}
function* loadListTodoGroupSaga() {
    try {
        const listTodoGroup = JSON.parse(localStorage.getItem("listTodoGroup")) || [];
        //console.log("fire saga", listTodoGroup);
        yield put(getListTodoGroupSusccess(listTodoGroup));
    } catch (e) {
        yield put(getListTodoGroupFail(e.message))
    }
}
function* saveTodoSaga() {
    const listTodo = yield select(state => state.todo.listTodo)
    localStorage.setItem('listTodo', JSON.stringify(listTodo))
}
function* addTodoSaga(action) {
    //console.log("check action on saga: ", action.payload);
    const res = yield addTodoApi(action.payload)
    //console.log("check action on saga: ", res);
    if (res.errCode === 0) {
        yield put(addNewTodoSuccess(action.payload))
        alert(res.message)
    } else {
        yield put(addNewTodoFail(res.message))
    }
}
function* saveTodoGroupSaga() {
    //console.log("fire saga");
    const listTodoGroup = yield select(state => state.todo.listTodoGroup)
    //console.log("fire saga", listTodoGroup);
    localStorage.setItem('listTodoGroup', JSON.stringify(listTodoGroup))
}
function* removeTodoSaga(action) {
    const res = yield removeTodoApi(action.payload)
    if (res.errCode === 0) {
        yield put(removeTodoSuccess(action.payload))
        alert(res.message)
    } else {
        yield put(removeTodoFail())
    }
}
//Add and remove Todo
export function* watchAddTodo() {
    yield takeEvery(addNewTodo.type, addTodoSaga)
}
export function* watchRemoveTodo() {
    yield takeEvery(removeTodo.type, removeTodoSaga)
}
export function* watchUpdateTodo() {
    yield takeEvery(updateTodo.type, saveTodoSaga)
}
//Add and remove TodoGroup
export function* watchAddTodoGroup() {
    yield takeEvery(addNewTodoGroup.type, saveTodoGroupSaga)
}
export function* watchRemoveTodoGroup() {
    yield takeEvery(removeTodoGroup.type, saveTodoGroupSaga)
}
//Load list todo
export function* watchLoadTodo() {
    yield takeLatest(getListTodo.type, loadListTodoSaga)
}
//Load list todo group
export function* watchLoadTodoGroup() {
    yield takeLatest(getListTodoGroup.type, loadListTodoGroupSaga)
}