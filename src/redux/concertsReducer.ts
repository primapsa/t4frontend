import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ChangeResponseType, concertAPI, ConcertsType, ConcertTypesType, SingerVoiceType} from "../api/api";
import {STATUS} from "../const/statuses";
import {AppDispatchType, RootStateType} from "./store";
import {PAGE} from "../const/page";
import {MESSAGE} from "../const/messages";
import {addAppStatus} from "./appReducer";
import {HTTP_STATUSES} from "../const/htttpStatus";
import {handleAppNotification, handleThunkError} from "../utils/utils";

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

    const state = thunkAPI.getState() as RootStateType
    const {page} = state.concerts
    const {query, count, type, ids} = state.filter

    thunkAPI.dispatch(addAppStatus(STATUS.LOADING))
    try {
        const concerts = await concertAPI.fetchConcerts({query, type, ids}, page, count)
        thunkAPI.dispatch(addAppStatus(STATUS.IDLE))
        return concerts.data
    } catch (error) {
        return handleThunkError(error as Error, thunkAPI)
    }
})

export const fetchConcertsTypes = createAsyncThunk('concerts/fetchConcertsType',
    async (param, thunkAPI) => {
        try {
            const concertTypes = await concertAPI.fetchConcertType()
            return concertTypes.data
        } catch (error) {
            return handleThunkError(error as Error, thunkAPI)
        }
    }
)
export const fetchSingerVoice = createAsyncThunk
('concerts/fetchSingerVoice', async (param, thunkAPI) => {
    try {
        const singerVoice = await concertAPI.fetchSingerVoice()
        return singerVoice.data

    } catch (error) {
        return handleThunkError(error as Error, thunkAPI)
    }
})

export const fetchConcertsAdmin = createAsyncThunk('concerts/fetchAdminPage', (param, thunkAPI) => {

    thunkAPI.dispatch(fetchConcerts())
    thunkAPI.dispatch(fetchConcertsTypes())
    thunkAPI.dispatch(fetchSingerVoice())

})

export const addNewConcert = createAsyncThunk('concerts/addNewConcert', async (concert: any, thunkAPI) => {

    thunkAPI.dispatch(addAppStatus(STATUS.LOADING))
    try {
        const response = await concertAPI.addConcert(concert)
        thunkAPI.dispatch(addAppStatus(STATUS.IDLE))

        if (response.status === HTTP_STATUSES.CREATED) {
            handleAppNotification(STATUS.SUCCESS, MESSAGE.ADDED, thunkAPI)
            return response.data
        }

    } catch (error) {
        return handleThunkError(error as Error, thunkAPI)
    }
})

export const updateConcert = createAppAsyncThunk('concerts/update', async (param: { id: number, concert: FormData }, thunkAPI) => {
    const {id, concert} = param

    thunkAPI.dispatch(addAppStatus(STATUS.LOADING))
    try {
        const response = await concertAPI.updateConcert(id, concert)
        thunkAPI.dispatch(addAppStatus(STATUS.IDLE))

        if (response.status === HTTP_STATUSES.OK) {
            handleAppNotification(STATUS.SUCCESS, MESSAGE.UPDATED, thunkAPI)

            return response.data
        }

    } catch (error) {
        return handleThunkError(error as Error, thunkAPI)
    }
})

export const deleteConcert = createAsyncThunk('concerts/deleteConcert', async (id: number, thunkAPI) => {
    thunkAPI.dispatch(addStatus(STATUS.LOADING))
    try {
        const deleteConcert = await concertAPI.deleteConcert(id)
        thunkAPI.dispatch(addStatus(STATUS.IDLE))

        if (deleteConcert.status === HTTP_STATUSES.OK) {
            handleAppNotification(STATUS.SUCCESS, MESSAGE.UPDATED, thunkAPI)
            return {id} as ChangeResponseType
        }

    } catch (error) {
        return handleThunkError(error as Error, thunkAPI)
    }

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
            .addCase(addNewConcert.fulfilled, (state, action) => {
                if (action.payload) {
                    state.list.push(action.payload[0])
                }
            })
            .addCase(updateConcert.fulfilled, (state, action) => {
                if (action.payload) {
                    const concert = action.payload[0]
                    state.list = state.list.map(c => c.id === concert.id ? concert : c)
                }
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
