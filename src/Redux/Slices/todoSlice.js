import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    todoList: [],
    isLoading: false,
    isError: false,
    errorMessage: "",

}
export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        getTodoList: (state) => {
            state.isLoading = true;
        },
        getTodoListSusccess: (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.todoList = action.payload;
            state.errorMessage = "";
        },
        getTodoListFail: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload
        },
        addNewTodo: (state, action) => {
            state.todoList.push(action.payload)
        },
        removeTodo: (state, action) => {
            state.todoList.filter(item => item.id !== action.payload)
        }
    }
})
export const { getTodoList, getTodoListFail, getTodoListSusccess, addNewTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;