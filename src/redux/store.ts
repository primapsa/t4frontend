import { useDispatch } from 'react-redux'

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'

import appReducer from './appReducer'
import authReducer from './authReducer'
import cartReducer from './cartReducer'
import concertReducer from './concertReducer'
import concertsReducer from './concertsReducer'
import filterReducer from './filterReducer'
import promocodesReducer from './promocodesReducer'

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  cart: cartReducer,
  concert: concertReducer,
  concerts: concertsReducer,
  filter: filterReducer,
  promocode: promocodesReducer,
})

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
  reducer: rootReducer,
})

export const useAppDispatch: () => DispatchType = useDispatch
export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = any | typeof store.dispatch
export type DispatchType = typeof store.dispatch
