import {combineReducers, configureStore} from "@reduxjs/toolkit";
import concertsReducer from "./concertsReducer";
import thunkMiddleware from 'redux-thunk'
export const rootReducer = combineReducers({
    concerts: concertsReducer
})
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch | any
// @ts-ignore
window.store = store