import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { ConcertsType, concertAPI } from '../api/api'
import { HTTP_STATUSES } from '../const/htttpStatus'
import { STATUS } from '../const/statuses'
import { handleThunkError, handleUncaughtStatusError } from '../utils/utils'
import { ConcertStatusType } from './concertsReducer'

const initialState: InitialStateType = {
  item: {} as ConcertsType,
  status: STATUS.IDLE,
}

export const fetchConcert = createAsyncThunk(
  'concert/fetchConcert',
  async (id: number, thunkAPI) => {
    try {
      const response = await concertAPI.fetchConcert(id)

      if (response.status === HTTP_STATUSES.OK) {
        return response.data
      }

      return handleUncaughtStatusError(thunkAPI)
    } catch (error) {
      return handleThunkError(error as AxiosError, thunkAPI)
    }
  }
)

export const concertSlice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(fetchConcert.fulfilled, (state, action) => {
        const concert = action.payload

        if (concert) {
          state.item = concert
        }
        state.status = STATUS.IDLE
      })
      .addCase(fetchConcert.pending, state => {
        state.status = STATUS.LOADING
      })
  },
  initialState,
  name: 'concert',
  reducers: {},
})

export default concertSlice.reducer

type InitialStateType = {
  item: ConcertsType
  status: ConcertStatusType
}
