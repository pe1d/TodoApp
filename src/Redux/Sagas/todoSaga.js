import { put, select, takeEvery, takeLatest, call } from "redux-saga/effects";
import {
    getListTodo, getListTodoSusccess, getListTodoFail,
    addNewTodo, removeTodo, getListTodoGroupSusccess,
    getListTodoGroupFail, addNewTodoGroup, removeTodoGroup, getListTodoGroup,
    updateTodo,
    addNewTodoSuccess,
    addNewTodoFail,
    removeTodoSuccess,
    removeTodoFail,
    updateTodoSuccess,
    updateTodoFail,
    updateTodoGroup,
    updateTodoGroupSuccess,
    updateTodoGroupFail,
    removeTodoGroupSuccess,
    removeTodoGroupFail
} from "../Slices/todoSlice";
import { addTodoApi, removeTodoApi, removeTodoGroupApi, updateTodoApi, updateTodoGroupApi } from "../../services/todoServices";
import { changeSelectedMenu } from "../Slices/appSlice";

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
// function* saveTodoSaga() {
//     const listTodo = yield select(state => state.todo.listTodo)
//     localStorage.setItem('listTodo', JSON.stringify(listTodo))
// }
// func update add remove todo
function* addTodoSaga(action) {
    //console.log("check action on saga: ", action.payload);
    action.payload.key = "t" + new Date().getTime().toString();
    const res = yield addTodoApi(action.payload)
    //console.log("check action on saga: ", res);
    if (res.errCode === 0) {
        yield put(addNewTodoSuccess(action.payload))
        alert(res.message)
    } else {
        yield put(addNewTodoFail(res.message))
    }
}
function* removeTodoSaga(action) {
    console.log("Check todo remove on saga: ", action.payload)
    const res = yield removeTodoApi(action.payload)
    if (res.errCode === 0) {
        yield put(removeTodoSuccess(action.payload))
        alert(res.message)
    } else {
        yield put(removeTodoFail())
    }
}
function* updateTodoSaga(action) {
    //console.log("Check action payload on saga: ", action.payload);

    const res = yield updateTodoApi(action.payload)
    if (res.errCode === 0) {
        yield put(updateTodoSuccess(action.payload))
        alert(res.message)
    }
    else {
        yield put(updateTodoFail())
        alert("Error: ", res.message)
    }
}
// func add update delete group todo
function* saveTodoGroupSaga() {
    //console.log("fire saga");
    const listTodoGroup = yield select(state => state.todo.listTodoGroup)
    //console.log("fire saga", listTodoGroup);
    localStorage.setItem('listTodoGroup', JSON.stringify(listTodoGroup))
}
function* updateTodoGroupSaga(action) {
    console.log("Check action on saga(todo group): ", action);

    const res = yield updateTodoGroupApi(action.payload)
    if (res.errCode === 0) {
        yield put(updateTodoGroupSuccess(action.payload))
        alert(res.message)
    } else {
        yield put(updateTodoGroupFail())
        alert("Error: ", res.message)
    }
}
function* removeTodoGroupSaga(action) {
    const listTodoGroup = yield select(state => state.todo.listTodoGroup)
    let index = listTodoGroup.findIndex(item => item.keyGroup === action.payload.keyGroup)
    //console.log("Check index khoi tao: ", index, '/length: ', listTodoGroup.length - 1)
    if (index === listTodoGroup.length - 1) {
        index = index - 1;
        //console.log("Check index Cuoi: ", index)
    } else {
        //console.log("Check index giua: ", index)
        index += 1;
    }
    console.log("Check index: ", index)
    const res = yield call(removeTodoGroupApi, action.payload);
    if (res.errCode === 0) {
        yield put(removeTodoGroupSuccess(action.payload))
        if (index >= 0) {
            //console.log(" Check select: ", listTodoGroup[index]);
            yield put(changeSelectedMenu(listTodoGroup[index]))
        } else {
            yield put(changeSelectedMenu({}))
        }
        alert(res.message);
    } else {
        yield put(removeTodoGroupFail())
        alert("Error: ", res.message)
    }
}
//Add, update and remove Todo WATCH
export function* watchAddTodo() {
    yield takeEvery(addNewTodo.type, addTodoSaga)
}
export function* watchRemoveTodo() {
    yield takeEvery(removeTodo.type, removeTodoSaga)
}
export function* watchUpdateTodo() {
    yield takeEvery(updateTodo.type, updateTodoSaga)
}
//Add and remove, update TodoGroup watch
export function* watchAddTodoGroup() {
    yield takeEvery(addNewTodoGroup.type, saveTodoGroupSaga)
}
export function* watchRemoveTodoGroup() {
    yield takeEvery(removeTodoGroup.type, removeTodoGroupSaga)
}
export function* watchUpdateTodoGroup() {
    yield takeEvery(updateTodoGroup.type, updateTodoGroupSaga)
}
//Load list todo
export function* watchLoadTodo() {
    yield takeLatest(getListTodo.type, loadListTodoSaga)
}
//Load list todo group
export function* watchLoadTodoGroup() {
    yield takeLatest(getListTodoGroup.type, loadListTodoGroupSaga)
}

