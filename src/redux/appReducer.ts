import { Dispatch, createSlice } from '@reduxjs/toolkit'

import { STATUS } from '../const/statuses'

const initialState: AppStateType = {
  notification: [],
  popup: null,
  status: STATUS.LOADING,
}

export const appSlice = createSlice({
  initialState,
  name: 'app',
  reducers: {
    addAppStatus(state, action: ActionType<AppStatus>) {
      state.status = action.payload
    },
    addAppStatusNotification(state, action: ActionType<AppNotificationType>) {
      state.status = action.payload.status
      state.notification.push(action.payload)
    },
    addPopupContent(state, action) {
      state.popup = action.payload
    },
    clearAppNotification(state) {
      state.notification = []
    },
    clearPopup(state) {
      state.popup = null
    },
  },
})

export const {
  addAppStatus,
  addAppStatusNotification,
  addPopupContent,
  clearAppNotification,
  clearPopup,
} = appSlice.actions
export default appSlice.reducer

export type ActionType<T> = {
  payload: T
}
export type AppStatus = 'error' | 'idle' | 'loading' | 'offline' | 'success'
export type AppNotificationType = {
  message: string
  status: AppStatus
}
export type PopupType = {
  message: string
  title: string
}
export type AppStateType = {
  notification: AppNotificationType[]
  popup: PopupType | null
  status: AppStatus
}

export type AsyncThunkConfig = {
  dispatch?: Dispatch
  extra?: unknown
  fulfilledMeta?: unknown
  pendingMeta?: unknown
  rejectValue?: unknown
  rejectedMeta?: unknown
  serializedErrorType?: unknown
  state?: unknown
}
