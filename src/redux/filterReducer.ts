import {createSlice} from "@reduxjs/toolkit";
import {ConcertsType, ConcertTypesType, SingerVoiceType} from "../api/api";
import {deleteConcert, fetchConcerts, fetchConcertsTypes, fetchSingerVoice} from "./concertsReducer";
import {PAGE} from "../const/page";

const initialState: InitialStateType = {
    query: '',
    sort: 0,
    count: PAGE.ITEM_PER_PAGE
}
export const filterSlice = createSlice({
    name: 'filter',
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
        // builder
        //     .addCase(fetchConcerts.fulfilled, (state, action) => {
        //         state.list = action.payload?.data as ConcertsType[]
        //         state.total = action.payload?.total as number
        //     })


    }
})
//export const {addStatus, setPage} = filterSlice.actions
export default filterSlice.reducer

type InitialStateType = {
    query: string
    sort: number
    count: number
}