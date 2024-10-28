import { createSelector } from "reselect";


const selectMenu = (state) => state.app

export const stateSelectedMenu = createSelector(
    [selectMenu],
    (app) => {
        return app.selectedMenu
    }
)
export const stateCollapseMenu = createSelector(
    [selectMenu],
    (app) => {
        return app.collapseMenu
    }
)
export const stateCollapseDetailTodo = createSelector(
    [selectMenu],
    (app) => {
        return app.collapseDetailTodo
    }
)