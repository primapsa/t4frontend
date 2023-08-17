import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    ChangeResponseType,
    concertAPI,
    ConcertsType,
    ConcertTypesType,
    promocodeAPI,
    SingerVoiceType
} from "../api/api";
import {addStatus, deleteConcert, fetchConcerts, fetchConcertsTypes, fetchSingerVoice} from "./concertsReducer";
import {PAGE} from "../const/page";
import {addAppStatus, addAppStatusNotification, AppNotificationType, AppStatus} from "./appReducer";
import {STATUS} from "../const/statuses";
import {MESSAGE} from "../const/messages";

const initialState: InitialStateType = {
    list: [],
    total: PAGE.TOTAL,
    page: PAGE.NUMBER,
    status: STATUS.IDLE
}
// export const fetchPromocodes = createAsyncThunk('promocodes/fetch', async (param, thunkAPI) => {
//     let notification = {status: STATUS.SUCCESS, message: MESSAGE.ADDED} as AppNotificationType
//     const result = {success: false}
//     thunkAPI.dispatch(addAppStatus(STATUS.LOADING))
//     try {
//         const deleteConcert = await promocodeAPI.fetchPromocodes()
//     } catch (error) {
//         notification = {status: STATUS.ERROR, message: (error as Error).message}
//     }
//     thunkAPI.dispatch(addAppStatus(STATUS.IDLE))
//     thunkAPI.dispatch(addAppStatusNotification(notification))
//
// })
export const fetchPromocodes = createAsyncThunk('promocodes/fetch', async (param, thunkAPI) => {
    thunkAPI.dispatch(addAppStatus(STATUS.LOADING))
    try {
        const promocodes = await promocodeAPI.fetchPromocodes()
        thunkAPI.dispatch(addAppStatus(STATUS.IDLE))
        return promocodes.data
    } catch (error) {
        const notification = {status: STATUS.ERROR, message: (error as Error).message}
        thunkAPI.dispatch(addAppStatusNotification(notification))
    }
})
export const promocodeSlice = createSlice({
    name: 'promocodes',
    initialState,
    reducers: {
        addPromocodes(state, action) {
            state.list = action.payload.data
            state.total = action.payload.total
        },
        setPage(state, action) {
            state.page = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPromocodes.fulfilled, (state, action) => {
                state.list = action.payload?.data as PromocodesType[]
                state.total = action.payload?.total as number
            })
    }
})
//export const {addStatus, setPage} = promocodeSlice.actions
export default promocodeSlice.reducer

type InitialStateType = {
    list: PromocodesType[]
    total: number
    page: number
    status: AppStatus
}
export type PromocodesType = {
    id: number
    title: string
    discount: number
    concertId: number
    date: string
}