import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    selectedMenuKey: "",
    collapseMenu:false,
    collapseDetailTodo: true,
}
export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        changeSelectedMenuKey: (state,action)=>{
            state.selectedMenuKey = action.payload;
        },
        changeCollapseMenu:(state, action)=>{
            state.collapseMenu = action.payload;
        },
        changeCollapseDetailTodo:(state,action)=>{
            state.collapseDetailTodo = action.payload;
        }
    }
})
export const { changeSelectedMenuKey,changeCollapseMenu,changeCollapseDetailTodo} = appSlice.actions;

export default appSlice.reducer;