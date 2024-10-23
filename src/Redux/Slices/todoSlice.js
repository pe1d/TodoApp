import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    listTodo: [],
    listTodoGroup:[],
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
            state.listTodoGroup  = action.payload;
        },
        getListTodoGroupFail: (state, action) => {
            state.errorMessage = action.payload
        },
        // add and remove todo
        addNewTodo: (state, action) => {
            state.listTodo.push(action.payload)
        },
        removeTodo: (state, action) => {
            state.listTodo.filter(item => item.keyTodo !== action.payload)
        },
        // add and remove group todo
        addNewTodoGroup:(state,action)=>{
            state.listTodoGroup.push(action.payload)
        },
        removeTodoGroup:(state,action)=>{
            state.listTodoGroup.filter(item => item.keyGroup !== action.payload)
        },
        //add todo selection
        addTodoSelection:(state, action) =>{
            state.todoSelection = action.payload;
        }
    }
})
export const { getListTodo, getListTodoFail, getListTodoSusccess, 
    addNewTodo, removeTodo,addTodoSelection, addNewTodoGroup,removeTodoGroup,
    getListTodoGroup,getListTodoGroupSusccess,getListTodoGroupFail
 } = todoSlice.actions;

export default todoSlice.reducer;