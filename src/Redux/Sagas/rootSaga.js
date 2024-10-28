import { all, fork } from "redux-saga/effects";
import * as watchTodo from './todoSaga';

const rootSaga = function* () {
    yield all([
        fork(watchTodo.watchLoadTodo), fork(watchTodo.watchLoadTodoGroup),
        fork(watchTodo.watchAddTodo), fork(watchTodo.watchRemoveTodo),
        fork(watchTodo.watchAddTodoGroup), fork(watchTodo.watchRemoveTodoGroup),
        fork(watchTodo.watchUpdateTodo)
    ])
}

export default rootSaga;
