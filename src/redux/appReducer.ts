import {createSlice, Dispatch} from "@reduxjs/toolkit";
import {STATUS} from "../const/statuses";

const initialState: AppStateType = {
    status: STATUS.IDLE,
    notification: [],
    popup: null
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        addAppStatus(state, action: ActionType<AppStatus>) {
            state.status = action.payload
        },
        addAppStatusNotification(state, action: ActionType<AppNotificationType>) {
            state.status = action.payload.status
            state.notification.push(action.payload)
        },
        clearAppNotification(state) {
            state.notification = []
        },
        addPopupContent(state, action){
            state.popup = action.payload
        },
        clearPopup(state) {
            state.popup = null
        }
    },
})

export const {addAppStatus, addAppStatusNotification, clearAppNotification, addPopupContent, clearPopup} = appSlice.actions
export default appSlice.reducer

export type ActionType<T> = {
    payload: T
}
export type AppStatus = 'idle' | 'loading' | 'error' | 'success' | 'offline'
export type AppNotificationType = {
    status: AppStatus
    message: string
}
export type PopupType = {
    title: string
    message: string
}
export type AppStateType = {
    status: AppStatus
    notification: AppNotificationType[]
    popup: PopupType | null
}

export type AsyncThunkConfig = {
    state?: unknown
    dispatch?: Dispatch
    extra?: unknown
    rejectValue?: unknown
    serializedErrorType?: unknown
    pendingMeta?: unknown
    fulfilledMeta?: unknown
    rejectedMeta?: unknown
}