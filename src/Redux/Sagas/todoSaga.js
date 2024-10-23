import { put, select, take, takeEvery, takeLatest } from "redux-saga/effects";
import { getListTodo, getListTodoSusccess, getListTodoFail, 
    addNewTodo, removeTodo, getListTodoGroupSusccess, 
    getListTodoGroupFail, addNewTodoGroup, removeTodoGroup, getListTodoGroup } from "../Slices/todoSlice";

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
        console.log("fire saga",listTodoGroup);
        yield put(getListTodoGroupSusccess(listTodoGroup));
    } catch (e) {
        yield put(getListTodoGroupFail(e.message))
    }
}
function* saveTodoSaga() {
    const listTodo = yield select(state => state.todo.listTodo)
    localStorage.setItem('listTodo', JSON.stringify(listTodo))
}
function* saveTodoGroupSaga() {
    //console.log("fire saga");
    const listTodoGroup = yield select(state => state.todo.listTodoGroup)
    console.log("fire saga",listTodoGroup);
    localStorage.setItem('listTodoGroup', JSON.stringify(listTodoGroup))
}
//Add and remove Todo
export function* watchAddTodo() {
    yield takeEvery(addNewTodo.type, saveTodoSaga)
}
export function* watchRemoveTodo() {
    yield takeEvery(removeTodo.type, saveTodoSaga)
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
    yield takeEvery(getListTodo.type, loadListTodoSaga)
}
//Load list todo group
export function* watchLoadTodoGroup() {
    yield takeEvery(getListTodoGroup.type, loadListTodoGroupSaga)
}