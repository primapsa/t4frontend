import {createSlice} from "@reduxjs/toolkit";
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
        // setPage(state, action) {
        //     state.page = action.payload
        // }
    },
    extraReducers: (builder) => {
        // builder
        //     .addCase(registerUser.fulfilled, (state, action) => {
        //         state.list = action.payload?.data as ConcertsType[]
        //         state.total = action.payload?.total as number
        //     })


    }
})
export const {addAppStatus, addAppStatusNotification, clearAppNotification, addPopupContent, clearPopup} = appSlice.actions
export default appSlice.reducer
export type ActionType<T> = {
    payload: T
}
export type AppStatus = 'idle' | 'loading' | 'error' | 'success'
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