import { createSlice } from '@reduxjs/toolkit'

import { FILTER } from '../const/filter'
import { PAGE } from '../const/page'

const initialState: InitialStateType = {
  count: PAGE.ITEM_PER_PAGE,
  ids: FILTER.IDS,
  query: FILTER.QUERY,
  type: FILTER.TYPE,
}

export const filterSlice = createSlice({
  initialState,
  name: 'filter',
  reducers: {
    resetFilter(state) {
      state.query = FILTER.QUERY
      state.type = FILTER.TYPE
    },
    setFilter(state, action) {
      state.query = action.payload.query
      state.type = action.payload.type
    },
    setFilterIds(state, action) {
      state.ids = action.payload
    },
  },
})

export const { resetFilter, setFilter } = filterSlice.actions
export default filterSlice.reducer

type InitialStateType = {
  count: number
  ids: string
  query: string
  type: number
}
