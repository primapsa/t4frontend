import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {concertAPI, ConcertsType} from "../api/api";
import {ConcertStatusType} from "./concertsReducer";
import {STATUS} from "../const/statuses";
import {asyncThunkActionWithLoading} from "../utils/utils";

const initialState: InitialStateType = {
    item: {} as ConcertsType,
    status: STATUS.IDLE
}

export const fetchConcert = createAsyncThunk('concert/fetchConcert', async (id: number, thunkAPI) => {

    return asyncThunkActionWithLoading(concertAPI.fetchConcert, id, thunkAPI)

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
                    state.item = concert[0]
                }
            })
    }
})

export default concertSlice.reducer

type InitialStateType = {
    item: ConcertsType
    status: ConcertStatusType
}