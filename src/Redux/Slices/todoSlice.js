import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    listTodo: [],
    listTodoGroup: [],
    todoSelection: {},
    isLoading: false,
    isError: false,
    errorMessage: "",
}
export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        //Get List Todo
        getListTodo: (state) => {
            state.isLoading = true;
        },
        getListTodoSusccess: (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.listTodo = action.payload;
            state.errorMessage = "";
        },
        getListTodoFail: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload
        },
        //Get List Group Todo
        getListTodoGroup: () => {
        },
        getListTodoGroupSusccess: (state, action) => {
            state.listTodoGroup = action.payload;
        },
        getListTodoGroupFail: (state, action) => {
            state.errorMessage = action.payload
        },
        // add, remove, update todo
        addNewTodo: (state, action) => {
            state.isLoading = true
            state.isError = false
        },
        addNewTodoSuccess: (state, action) => {
            //console.log("Check action", action);
            state.isLoading = false
            state.listTodo.push(action.payload)
            state.isError = false
        },
        addNewTodoFail: (state, action) => {
            state.isError = true
            state.isLoading = false
        },
        removeTodo: (state, action) => {

        },
        removeTodoSuccess: (state, action) => {
            console.log("check action on payload:", action);

            const list = state.listTodo.filter(item => item.key !== action.payload.key)
            state.listTodo = list;
        },
        removeTodoFail: () => {

        },
        updateTodo: (state, action) => {
            const { id, todoUpdate } = action.payload;
            //console.log("Check payload", action.payload);
            const index = state.listTodo.findIndex(item => item.key === id);
            if (index >= 0) {
                //console.log("check");
                state.listTodo[index] = todoUpdate
                state.todoSelection = todoUpdate
            }
            //alert("update todo group success!")
        },
        // add and remove group todo
        addNewTodoGroup: (state, action) => {
            state.listTodoGroup.push(action.payload)
            alert("Add new todo group success!")
        },
        removeTodoGroup: (state, action) => {
            state.listTodoGroup.filter(item => item.keyGroup !== action.payload)
        },
        //add todo selection
        addTodoSelection: (state, action) => {
            state.todoSelection = action.payload;
        }
    }
})
export const { getListTodo, getListTodoFail, getListTodoSusccess,
    addNewTodo, removeTodo, updateTodo,
    addTodoSelection, addNewTodoGroup, removeTodoGroup,
    getListTodoGroup, getListTodoGroupSusccess, getListTodoGroupFail,
    addNewTodoSuccess, addNewTodoFail, removeTodoSuccess, removeTodoFail
} = todoSlice.actions;

export default todoSlice.reducer;