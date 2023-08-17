import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {concertAPI, ConcertsType, ConcertTypesType, SingerVoiceType} from "../api/api";
import {deleteConcert, fetchConcerts, fetchConcertsTypes, fetchSingerVoice, ConcertStatusType} from "./concertsReducer";
import {PAGE} from "../const/page";
import {STATUS} from "../const/statuses";
import {addAppStatus} from "./appReducer";

const initialState: InitialStateType = {
    item: {} as ConcertsType,
    status: STATUS.IDLE
}
export const fetchConcert = createAsyncThunk('concert/fetchConcert', async (id: number, thunkAPI) => {
    thunkAPI.dispatch(addAppStatus(STATUS.LOADING))
    try {
        const concert = await concertAPI.fetchConcert(id)
        thunkAPI.dispatch(addAppStatus(STATUS.IDLE))
        return concert.data

    } catch (error) {

    }

})
export const concertSlice = createSlice({
    name: 'concert',
    initialState,
    reducers: {
        // addStatus(state, action) {
        //     state.status = action.payload
        // },
        // setPage(state, action) {
        //     state.page = action.payload
        // }
    },
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
//export const {addStatus, setPage} = filterSlice.actions
export default concertSlice.reducer

type InitialStateType = {
    item: ConcertsType
    status: ConcertStatusType
}