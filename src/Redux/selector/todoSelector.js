import { createSelector } from "reselect";

const selectTodo = (state) => state.todo;

export const stateTodoList = createSelector(
    [selectTodo],
    (todo) => {
        todo.todoList
    }
)