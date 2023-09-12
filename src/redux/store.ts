import {combineReducers, configureStore} from "@reduxjs/toolkit";
import concertsReducer from "./concertsReducer";
import thunkMiddleware from 'redux-thunk'
import filterReducer from "./filterReducer";
import concertReducer from "./concertReducer";
import appReducer from "./appReducer";
import promocodesReducer from "./promocodesReducer";
import cartReducer from "./cartReducer";
import authReducer from "./authReducer";
import { useDispatch } from 'react-redux'

export const rootReducer = combineReducers({
    concerts: concertsReducer,
    filter: filterReducer,
    concert: concertReducer,
    app: appReducer,
    promocode: promocodesReducer,
    cart: cartReducer,
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),

})

export const useAppDispatch: () => DispatchType = useDispatch

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch | any
export type DispatchType = typeof store.dispatch

// @ts-ignore
window.store = store