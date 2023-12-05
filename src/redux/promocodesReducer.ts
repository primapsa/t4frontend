import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { PromocodeAddType, promocodeAPI } from '../api/api'
import { HTTP_STATUSES } from '../const/htttpStatus'
import { MESSAGE } from '../const/messages'
import { PAGE } from '../const/page'
import { ITEM_STATUS, STATUS } from '../const/statuses'
import {
  asyncThunkActionWithLoading,
  handleAppNotification,
  handleThunkStatusError,
  handleUncaughtStatusError,
} from '../utils/utils'
import { AppStatus, addAppStatus } from './appReducer'

const initialState: InitialStateType = {
  error: null,
  list: [],
  page: PAGE.NUMBER,
  status: STATUS.IDLE,
  total: PAGE.TOTAL,
}

export const fetchPromocodes = createAsyncThunk(
  'promocodes/fetch',
  async (page: number, thunkAPI) => {
    return asyncThunkActionWithLoading(promocodeAPI.fetchPromocodes, page, thunkAPI)
  }
)

export const deletePromocode = createAsyncThunk(
  'promocodes/delete',
  async (id: number, thunkAPI) => {
    try {
      const response = await promocodeAPI.deletePromocode(id)

      if (response.status === HTTP_STATUSES.NO_CONTENT) {
        thunkAPI.dispatch(addAppStatus(STATUS.IDLE))
        handleAppNotification(STATUS.SUCCESS, MESSAGE.REMOVED, thunkAPI)

        return { id }
      }

      return handleUncaughtStatusError(thunkAPI)
    } catch (error) {
      return handleThunkStatusError(error as AxiosError, thunkAPI)
    }
  }
)

export const addPromocode = createAsyncThunk(
  'promocode/add',
  async (promocode: PromocodeAddType, thunkAPI) => {
    thunkAPI.dispatch(addAppStatus(STATUS.LOADING))
    try {
      const response = await promocodeAPI.addPromocode(promocode)

      thunkAPI.dispatch(addAppStatus(STATUS.IDLE))
      if (response.status === HTTP_STATUSES.CREATED) {
        handleAppNotification(STATUS.SUCCESS, MESSAGE.ADDED, thunkAPI)

        return response.data
      }

      return handleUncaughtStatusError(thunkAPI)
    } catch (error) {
      return handleThunkStatusError(error as AxiosError, thunkAPI)
    }
  }
)

export const editPromocode = createAsyncThunk(
  'promocode/edit',
  async (promocode: PromocodesType, thunkAPI) => {
    thunkAPI.dispatch(addAppStatus(STATUS.LOADING))
    try {
      const response = await promocodeAPI.editPromocode(promocode)

      thunkAPI.dispatch(addAppStatus(STATUS.IDLE))
      if (response.status === HTTP_STATUSES.OK) {
        handleAppNotification(STATUS.SUCCESS, MESSAGE.UPDATED, thunkAPI)

        return response.data
      }

      return handleUncaughtStatusError(thunkAPI)
    } catch (error) {
      return handleThunkStatusError(error as AxiosError, thunkAPI)
    }
  }
)

export const promocodeSlice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(fetchPromocodes.fulfilled, (state, action) => {
        state.list = action.payload?.data as PromocodesType[]
        state.total = action.payload?.total as number
      })
      .addCase(deletePromocode.fulfilled, (state, action) => {
        state.status = STATUS.IDLE
        state.list = state.list.filter(({ id }) => id !== (action.payload?.id as number))
        state.total -= 1
        if (state.page > 1 && !state.list.length) {
          state.page -= 1
        }
      })
      .addCase(addPromocode.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS
        state.error = null
        if (action.payload) {
          state.total += 1
          if (state.list.length < PAGE.ITEM_PER_PAGE) {
            state.list.push(action.payload)
          }
        }
      })
      .addCase(addPromocode.rejected, (state, action) => {
        state.status = STATUS.ERROR
        const error = action.payload as string

        if (error) {
          state.error = JSON.parse(error) as PromocodeErrorType
        }
      })
      .addCase(editPromocode.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS
        const response = action.payload

        if (response) {
          state.list = state.list.map(p => (p.id === response.id ? response : p))
        }
      })
      .addCase(editPromocode.pending, (state, action) => {
        state.status = STATUS.LOADING
      })
      .addCase(deletePromocode.pending, (state, action) => {
        const id = action.meta.arg

        if (id) {
          state.list = state.list.map(e => (e.id === id ? { ...e, status: ITEM_STATUS.DELETE } : e))
        }
      })
  },
  initialState,
  name: 'promocodes',
  reducers: {
    addPromocodes(state, action) {
      state.list = action.payload.data
      state.total = action.payload.total
    },
    setPage(state, action) {
      state.page = action.payload
    },
    setPromocodeStatus(state, action) {
      state.status = action.payload
    },
  },
})
export const { setPage, setPromocodeStatus } = promocodeSlice.actions
export default promocodeSlice.reducer

type InitialStateType = {
  error: PromocodeErrorType | null
  list: PromocodesType[]
  page: number
  status: AppStatus
  total: number
}
export type PromocodesType = {
  date: string
  discount: number
  id: number
  title: string
}
export type PromocodeErrorType = {
  [key: string]: string
}
