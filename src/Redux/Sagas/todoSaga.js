import { put, select, take, takeEvery, takeLatest } from "redux-saga/effects";
import { getTodoList, getTodoListSusccess, getTodoListFail, addNewTodo, removeTodo } from "../Slices/todoSlice";


function* loadTodoListSaga() {
    try {
        const todoList = JSON.parse(localStorage.getItem("todoList")) || [];
        yield put(getTodoListSusccess(todoList));
    } catch (e) {
        yield put(getTodoListFail(e.message))
    }
}

function* saveTodoSaga() {
    const todoList = yield select(state => state.todo.todoList)
    localStorage.setItem('todoList', JSON.stringify(todoList))
}

export function* watchAddTodo() {
    yield takeEvery(addNewTodo.type, saveTodoSaga)
}
export function* watchRemoveTodo() {
    yield takeEvery(removeTodo.type, saveTodoSaga)
}
export function* watchLoadTodo() {
    yield takeEvery(getTodoList.type, loadTodoListSaga)
}