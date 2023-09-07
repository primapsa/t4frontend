import {createSlice} from "@reduxjs/toolkit";
import {PAGE} from "../const/page";
import {FILTER} from "../const/filter";

const initialState: InitialStateType = {
    query: FILTER.QUERY,
    type: FILTER.TYPE,
    count: PAGE.ITEM_PER_PAGE,
    ids: FILTER.IDS
}
export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        resetFilter(state) {
            state.query = FILTER.QUERY
            state.type = FILTER.TYPE
        },
        setFilter(state, action) {
            state.query = action.payload.query
            state.type = action.payload.type
        },
        setFilterIds(state, action){
            state.ids = action.payload
        }
    },
})

export const {resetFilter, setFilter} = filterSlice.actions
export default filterSlice.reducer

type InitialStateType = {
    query: string
    type: number
    count: number
    ids: string
}