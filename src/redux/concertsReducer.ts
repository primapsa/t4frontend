import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    ChangeResponseType,
    concertAPI,
    ConcertsType, ConcertTypeResponse,
    ConcertTypesType,
    ResponseType,
    SingerVoiceType
} from "../api/api";
import {ITEM_STATUS, STATUS} from "../const/statuses";
import {AppDispatchType, RootStateType} from "./store";
import {PAGE} from "../const/page";
import {MESSAGE} from "../const/messages";
import {addAppStatus, AppStatus} from "./appReducer";
import {HTTP_STATUSES} from "../const/htttpStatus";
import {handleAppNotification, handleThunkStatusError} from "../utils/utils";
import {AxiosError} from "axios/index";

const initialState: InitialStateType = {
    list: [],
    type: [],
    singerVoice: [],
    status: STATUS.IDLE,
    total: PAGE.TOTAL,
    page: PAGE.NUMBER,
    errors: null
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

    try {
        const concerts = await concertAPI.fetchConcerts({query, type, ids}, page, count)
        return concerts.data
    } catch (error) {
        return handleThunkStatusError(error as AxiosError, thunkAPI, false)
    }
})

export const fetchConcertsTypes = createAsyncThunk('concerts/fetchConcertsType',
    async (param, thunkAPI) => {
        try {
            const concertTypes = await concertAPI.fetchConcertType()
            return concertTypes.data
        } catch (error) {
            return handleThunkStatusError(error as AxiosError, thunkAPI, false)
        }
    }
)
export const fetchSingerVoice = createAsyncThunk
('concerts/fetchSingerVoice', async (param, thunkAPI) => {
    try {
        const singerVoice = await concertAPI.fetchSingerVoice()
        return singerVoice.data
    } catch (error) {
        return handleThunkStatusError(error as AxiosError, thunkAPI, false)
    }
})

export const fetchConcertsAdmin = createAsyncThunk('concerts/fetchAdminPage', async (param, thunkAPI) => {
    await thunkAPI.dispatch(fetchConcerts())
    await thunkAPI.dispatch(fetchConcertsTypes())
    await thunkAPI.dispatch(fetchSingerVoice())
})

export const addNewConcert = createAsyncThunk('concerts/addNewConcert', async (concert: any, thunkAPI) => {

    try {
        const response = await concertAPI.addConcert(concert)
        thunkAPI.dispatch(addAppStatus(STATUS.IDLE))
        if (response.status === HTTP_STATUSES.CREATED) {
            handleAppNotification(STATUS.SUCCESS, MESSAGE.ADDED, thunkAPI)
            return response.data
        }
    } catch (error) {
        return handleThunkStatusError(error as AxiosError, thunkAPI)
    }
})

export const updateConcert = createAppAsyncThunk('concerts/update', async (param: {
    id: number,
    concert: FormData
}, thunkAPI) => {
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
        // return handleThunkStatusError(error as AxiosError, thunkAPI)
        return thunkAPI.rejectWithValue(JSON.stringify((error as AxiosError).response?.data))
    }
})

export const deleteConcert = createAsyncThunk('concerts/deleteConcert', async (id: number, thunkAPI) => {

    thunkAPI.dispatch(addStatus(STATUS.LOADING))
    try {
        const deleteConcert = await concertAPI.deleteConcert(id)
        thunkAPI.dispatch(addStatus(STATUS.IDLE))
        if (deleteConcert.status === HTTP_STATUSES.NO_CONTENT) {
            handleAppNotification(STATUS.SUCCESS, MESSAGE.REMOVED, thunkAPI)
            return {id} as ChangeResponseType
        }
    } catch (error) {
        return handleThunkStatusError(error as AxiosError, thunkAPI)
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
        },
        clearConcertsErrors(state) {
            state.errors = null
        },
        setConcertStatus(state, action) {
            const id = action.payload
            if (id)
                state.list = state.list.map(e => e.id === id ? {...e, status: ITEM_STATUS.ADD} : e)
        },
        removeConcertStatus(state, action) {
            const id = action.payload
            state.list = state.list.map(concert => {
                    if (concert.id === id) {
                        delete concert.status
                        return concert
                    }
                    return concert
                }
            )
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchConcerts.fulfilled, (state, action) => {
                state.list = (action.payload as ResponseType<ConcertsType[]>).data
                state.total = (action.payload as ResponseType<ConcertsType[]>).total
            })
            .addCase(fetchConcertsTypes.fulfilled, (state, {payload}) => {
                if (payload) {
                    state.type = (payload as ConcertTypeResponse[]).map(e => ({
                        value: e.id,
                        label: e.title
                    } as ConcertTypesType))
                }
            })
            .addCase(fetchSingerVoice.fulfilled, (state, action) => {
                state.singerVoice = action.payload as SingerVoiceType[]
            })
            .addCase(deleteConcert.pending, (state, action) => {
                const id = action.meta.arg
                if (id) {
                    state.list = state.list.map(e => e.id === id ? {...e, status: ITEM_STATUS.DELETE} : e)
                }
            })
            .addCase(deleteConcert.fulfilled, (state, action) => {
                const id = Number((action.payload as ChangeResponseType).id)
                if (id) {
                    state.list = state.list.filter(concert => concert.id !== id)
                    state.total -= 1
                    if (state.page > 1 && !state.list.length) {
                        state.page -= 1
                    }
                }
            })
            .addCase(addNewConcert.fulfilled, (state, action) => {
                state.status = STATUS.SUCCESS
                if (action.payload) {
                    state.total += 1
                    state.errors = null
                    if (state.list.length < PAGE.ITEM_PER_PAGE) {
                        state.list.push(action.payload as ConcertsType)
                    }
                }
            })
            .addCase(addNewConcert.pending, (state) => {
                state.status = STATUS.LOADING
            })
            .addCase(fetchConcertsAdmin.pending, (state) => {
                state.status = STATUS.LOADING
            })
            .addCase(fetchConcertsAdmin.fulfilled, (state) => {
                state.status = STATUS.IDLE
            })
            .addCase(updateConcert.fulfilled, (state, action) => {
                state.status = STATUS.SUCCESS
                if (action.payload) {
                    const concert = action.payload[0] as ConcertsType
                    state.list = state.list.map(c => c.id === concert.id ? concert : c)
                    state.errors = null
                }
            })
            .addCase(updateConcert.rejected, (state, action) => {
                state.status = STATUS.ERROR
                const error = action.payload as string
                if (error) {
                    state.errors = JSON.parse(error) as ConcertErrorsType
                }
            })
            .addCase(updateConcert.pending, (state, action) => {
                state.status = STATUS.LOADING
            })
            .addCase(addNewConcert.rejected, (state, action) => {
                state.status = STATUS.ERROR
                const error = action.payload as string
                if (error) {
                    state.errors = JSON.parse(error) as ConcertErrorsType
                }
            })

    }
})
export const {addStatus, setPage, clearConcertsErrors, setConcertStatus, removeConcertStatus} = concertSlice.actions
export default concertSlice.reducer

type InitialStateType = {
    list: ConcertsType[]
    type: ConcertTypesType[]
    singerVoice: SingerVoiceType[]
    status: AppStatus
    total: number
    page: number
    errors: ConcertErrorsType | null
}
export type ConcertErrorsType = {
    [key: string]: string[]
}
export type ConcertStatusType = 'loading' | 'idle' | 'error' | 'success'
