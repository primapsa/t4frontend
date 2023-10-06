import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {concertAPI, ConcertsType} from "../api/api";
import {ConcertStatusType} from "./concertsReducer";
import {STATUS} from "../const/statuses";
import {handleThunkError, handleUncaughtStatusError} from "../utils/utils";
import {HTTP_STATUSES} from "../const/htttpStatus";
import {AxiosError} from "axios";

const initialState: InitialStateType = {
    item: {} as ConcertsType,
    status: STATUS.IDLE
}

export const fetchConcert = createAsyncThunk('concert/fetchConcert', async (id: number, thunkAPI) => {

    try {
        const response = await concertAPI.fetchConcert(id)
        if (response.status === HTTP_STATUSES.OK) {
            return response.data
        }
        return handleUncaughtStatusError(thunkAPI)
    } catch (error) {
        return handleThunkError(error as AxiosError, thunkAPI)
    }
})

export const concertSlice = createSlice({
    name: 'concert',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchConcert.fulfilled, (state, action) => {
                const concert  = action.payload
                if(concert){
                    state.item = concert
                }
                state.status = STATUS.IDLE
            })
            .addCase(fetchConcert.pending, (state) => {
                state.status = STATUS.LOADING
            })
    }
})

export default concertSlice.reducer

type InitialStateType = {
    item: ConcertsType
    status: ConcertStatusType
}