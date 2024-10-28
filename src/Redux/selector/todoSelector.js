import { createSelector } from "reselect";
const selectTodo = (state) => state.todo
const selectListTodo = (state) => state.todo.listTodo;
const selectAppSelectedMenu = (state) => state.app.selectedMenu;
const selectSelectionTodo = (state) => state.todo.todoSelection;
export const stateListTodo = createSelector(
    [selectListTodo, selectAppSelectedMenu],
    (listTodo, menu) => {
        // console.log("Check todo: ", todo.listTodo);
        // console.log("Check menu ", menu);
        if (menu.searchType) {
            switch (menu.searchType) {
                case 'all':
                    return listTodo
                case 'important':
                    return listTodo.filter(item => item.important === true)
                case 'compeleted':
                    return listTodo.filter(item => item.complete === true)
                case 'uncompeleted':
                    return listTodo.filter(item => item.complete === false)
                default:
                    return listTodo
            }
        }
        else {
            return listTodo.filter(item => item.keyGroup === menu.keyGroup)
        }

    }
)
export const stateSelectTodo = createSelector(
    [selectListTodo, selectSelectionTodo],
    (listTodo, todoSelection) => {
        // console.log("Check todo: ", todo.listTodo);
        // console.log("Check menu ", menu);
        return todoSelection;

    }
)
export const stateListTodoGroup = createSelector(
    [selectTodo],
    (todo) => {
        return todo.listTodoGroup
    }
)