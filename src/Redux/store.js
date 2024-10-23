import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './Slices/todoSlice'
import  appReducer  from './Slices/appSlice'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './Sagas/rootSaga'
const sagaMiddleware = createSagaMiddleware()
export default configureStore({
    reducer: {
        todo: todoReducer,
        app:appReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)