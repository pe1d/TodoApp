import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    selectedMenu: { key: "d04", label: "All", icon: "ProfileOutlined", searchType: 'all' },
    collapseMenu: false,
    collapseDetailTodo: true,
}
export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        changeSelectedMenu: (state, action) => {
            //console.log("check payload", action.payload);
            state.selectedMenu = action.payload;
            state.collapseDetailTodo = true;
        },
        changeCollapseMenu: (state, action) => {
            state.collapseMenu = action.payload;
        },
        changeCollapseDetailTodo: (state, action) => {
            state.collapseDetailTodo = action.payload;
        }
    }
})
export const { changeSelectedMenu, changeCollapseMenu, changeCollapseDetailTodo } = appSlice.actions;

export default appSlice.reducer;