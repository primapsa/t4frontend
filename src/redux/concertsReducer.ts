import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    ChangeResponseType,
    ConcertAddType,
    concertAPI,
    ConcertsType,
    ConcertTypesType,
    SingerVoiceType
} from "../api/api";
import {STATUS} from "../const/statuses";
import {AppDispatchType, RootStateType} from "./store";
import {PAGE} from "../const/page";
import {MESSAGE} from "../const/messages";
import {ActionType, addAppStatus, addAppStatusNotification, AppNotificationType, AppStateType} from "./appReducer";
import {HTTP_STATUSES} from "../const/htttpStatus";

const initialState: InitialStateType = {
    list: [],
    type: [],
    singerVoice: [],
    status: STATUS.IDLE,
    total: PAGE.TOTAL,
    page: PAGE.NUMBER,
}

const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: RootStateType
    dispatch: AppDispatchType
    rejectValue: string
    extra: { s: string; n: number }
}>()
export const fetchConcerts = createAsyncThunk('concerts/fetchConcerts', async (param, thunkAPI) => {
    // const {query, page, count} = param
    const state = thunkAPI.getState() as RootStateType
    const {page} = state.concerts
    const {query, count} = state.filter
    thunkAPI.dispatch(addStatus(STATUS.LOADING))
    try {
        const concerts = await concertAPI.fetchConcerts(query, page, count)
        return concerts.data
    } catch (error) {

    }
    thunkAPI.dispatch(addStatus(STATUS.IDLE))
})
export const fetchConcertsTypes = createAsyncThunk('concerts/fetchConcertsType',
    async (param, thunkAPI) => {

        try {
            const concertTypes = await concertAPI.fetchConcertType()
            return concertTypes.data
        } catch (error) {

        }

    }
)
export const fetchSingerVoice = createAsyncThunk
('concerts/fetchSingerVoice', async (param, thunkAPI) => {
    thunkAPI.dispatch(addStatus(STATUS.LOADING))
    try {
        const singerVoice = await concertAPI.fetchSingerVoice()
        return singerVoice.data

    } catch (errror) {

    }
    thunkAPI.dispatch(addStatus(STATUS.IDLE))
})
export const fetchConcertsAdmin = createAsyncThunk('concerts/fetchAdminPage', (param, thunkAPI) => {
    thunkAPI.dispatch(addStatus(STATUS.LOADING))
    thunkAPI.dispatch(fetchConcerts())
    thunkAPI.dispatch(fetchConcertsTypes())
    thunkAPI.dispatch(fetchSingerVoice())
    thunkAPI.dispatch(addStatus(STATUS.IDLE))
})

export const addNewConcert = createAppAsyncThunk('concerts/addNewConcert', async (concert: any, thunkAPI) => {
    let notification = {status: STATUS.SUCCESS, message: MESSAGE.ADDED} as AppNotificationType
    const result = {success: false}
    thunkAPI.dispatch(addAppStatus(STATUS.LOADING))
    try {
        const addConcert = await concertAPI.addConcert(concert)

        if (addConcert.status === HTTP_STATUSES.CREATED)
            result.success = true

    } catch (error) {
        notification = {status: STATUS.ERROR, message: (error as Error).message}
    }
    thunkAPI.dispatch(addAppStatusNotification(notification))
    thunkAPI.dispatch(addAppStatus(STATUS.IDLE))
    return result
})

export const deleteConcert = createAsyncThunk('concerts/deleteConcert', async (id: number, thunkAPI) => {
    thunkAPI.dispatch(addStatus(STATUS.LOADING))
    try {
        const deleteConcert = await concertAPI.deleteConcert(id)
        console.log(deleteConcert)
        return {id} as ChangeResponseType
    } catch (error) {
        console.log(error)
    }
    thunkAPI.dispatch(addStatus(STATUS.IDLE))
})

export const concertSlice = createSlice({
    name: 'concerts',
    initialState,
    reducers: {
        addStatus(state, action) {
            state.status = action.payload
        },
        setPage(state, action) {
            state.page = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchConcerts.fulfilled, (state, action) => {
                state.list = action.payload?.data as ConcertsType[]
                state.total = action.payload?.total as number
            })
            .addCase(fetchConcertsTypes.fulfilled, (state, action) => {
                state.type = action.payload as ConcertTypesType[]
            })
            .addCase(fetchSingerVoice.fulfilled, (state, action) => {
                state.singerVoice = action.payload as SingerVoiceType[]
            })
            .addCase(deleteConcert.fulfilled, (state, action) => {
                const id = Number(action.payload?.id)
                if (id) {
                    state.list = state.list.filter(concert => concert.id !== id)
                    state.total -= 1
                }
            })
            .addCase(addNewConcert.fulfilled, (state, action: ActionType<{success: boolean}>) => {
                state.status = action.payload.success ? STATUS.SUCCESS : STATUS.IDLE
            })
            .addCase(addNewConcert.rejected, (state, action) => {
                state.status = STATUS.ERROR
            })


    }
})
export const {addStatus, setPage} = concertSlice.actions
export default concertSlice.reducer

type InitialStateType = {
    list: ConcertsType[]
    type: ConcertTypesType[]
    singerVoice: SingerVoiceType[]
    status: ConcertStatusType
    total: number
    page: number

}
export type ConcertStatusType = 'loading' | 'idle' | 'error' | 'success'
