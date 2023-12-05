import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios/index'

import {
  ChangeResponseType,
  ConcertTypeResponse,
  ConcertTypesType,
  ConcertsType,
  ResponseType,
  SingerVoiceType,
  concertAPI,
} from '../api/api'
import { HTTP_STATUSES } from '../const/htttpStatus'
import { MESSAGE } from '../const/messages'
import { PAGE } from '../const/page'
import { ITEM_STATUS, STATUS } from '../const/statuses'
import { handleAppNotification, handleThunkStatusError } from '../utils/utils'
import { AppStatus, addAppStatus } from './appReducer'
import { AppDispatchType, RootStateType } from './store'

const initialState: InitialStateType = {
  errors: null,
  list: [],
  page: PAGE.NUMBER,
  singerVoice: [],
  status: STATUS.IDLE,
  total: PAGE.TOTAL,
  type: [],
}

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  dispatch: AppDispatchType
  extra: { n: number; s: string }
  rejectValue: string
  state: RootStateType
}>()

export const fetchConcerts = createAsyncThunk('concerts/fetchConcerts', async (param, thunkAPI) => {
  const state = thunkAPI.getState() as RootStateType
  const { page } = state.concerts
  const { count, ids, query, type } = state.filter

  try {
    const concerts = await concertAPI.fetchConcerts({ ids, query, type }, page, count)

    return concerts.data
  } catch (error) {
    return handleThunkStatusError(error as AxiosError, thunkAPI, false)
  }
})

export const fetchConcertsTypes = createAsyncThunk(
  'concerts/fetchConcertsType',
  async (param, thunkAPI) => {
    try {
      const concertTypes = await concertAPI.fetchConcertType()

      return concertTypes.data
    } catch (error) {
      return handleThunkStatusError(error as AxiosError, thunkAPI, false)
    }
  }
)
export const fetchSingerVoice = createAsyncThunk(
  'concerts/fetchSingerVoice',
  async (param, thunkAPI) => {
    try {
      const singerVoice = await concertAPI.fetchSingerVoice()

      return singerVoice.data
    } catch (error) {
      return handleThunkStatusError(error as AxiosError, thunkAPI, false)
    }
  }
)

export const fetchConcertsAdmin = createAsyncThunk(
  'concerts/fetchAdminPage',
  async (param, thunkAPI) => {
    await thunkAPI.dispatch(fetchConcerts())
    await thunkAPI.dispatch(fetchConcertsTypes())
    await thunkAPI.dispatch(fetchSingerVoice())
  }
)

export const addNewConcert = createAsyncThunk(
  'concerts/addNewConcert',
  async (concert: any, thunkAPI) => {
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
  }
)

export const updateConcert = createAppAsyncThunk(
  'concerts/update',
  async (
    param: {
      concert: FormData
      id: number
    },
    thunkAPI
  ) => {
    const { concert, id } = param

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
  }
)

export const deleteConcert = createAsyncThunk(
  'concerts/deleteConcert',
  async (id: number, thunkAPI) => {
    thunkAPI.dispatch(addStatus(STATUS.LOADING))
    try {
      const deleteConcert = await concertAPI.deleteConcert(id)

      thunkAPI.dispatch(addStatus(STATUS.IDLE))
      if (deleteConcert.status === HTTP_STATUSES.NO_CONTENT) {
        handleAppNotification(STATUS.SUCCESS, MESSAGE.REMOVED, thunkAPI)

        return { id } as ChangeResponseType
      }
    } catch (error) {
      return handleThunkStatusError(error as AxiosError, thunkAPI)
    }
  }
)

export const concertSlice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(fetchConcerts.fulfilled, (state, action) => {
        state.list = (action.payload as ResponseType<ConcertsType[]>).data
        state.total = (action.payload as ResponseType<ConcertsType[]>).total
      })
      .addCase(fetchConcertsTypes.fulfilled, (state, { payload }) => {
        if (payload) {
          state.type = (payload as ConcertTypeResponse[]).map(
            e =>
              ({
                label: e.title,
                value: e.id,
              }) as ConcertTypesType
          )
        }
      })
      .addCase(fetchSingerVoice.fulfilled, (state, action) => {
        state.singerVoice = action.payload as SingerVoiceType[]
      })
      .addCase(deleteConcert.pending, (state, action) => {
        const id = action.meta.arg

        if (id) {
          state.list = state.list.map(e => (e.id === id ? { ...e, status: ITEM_STATUS.DELETE } : e))
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
      .addCase(addNewConcert.pending, state => {
        state.status = STATUS.LOADING
      })
      .addCase(fetchConcertsAdmin.pending, state => {
        state.status = STATUS.LOADING
      })
      .addCase(fetchConcertsAdmin.fulfilled, state => {
        state.status = STATUS.IDLE
      })
      .addCase(updateConcert.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS
        if (action.payload) {
          const concert = action.payload[0] as ConcertsType

          state.list = state.list.map(c => (c.id === concert.id ? concert : c))
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
  },
  initialState,
  name: 'concerts',
  reducers: {
    addStatus(state, action) {
      state.status = action.payload
    },
    clearConcertsErrors(state) {
      state.errors = null
    },
    removeConcertStatus(state, action) {
      const id = action.payload

      state.list = state.list.map(concert => {
        if (concert.id === id) {
          delete concert.status

          return concert
        }

        return concert
      })
    },
    setConcertStatus(state, action) {
      const id = action.payload

      if (id) {
        state.list = state.list.map(e => (e.id === id ? { ...e, status: ITEM_STATUS.ADD } : e))
      }
    },
    setPage(state, action) {
      state.page = action.payload
    },
  },
})
export const { addStatus, clearConcertsErrors, removeConcertStatus, setConcertStatus, setPage } =
  concertSlice.actions
export default concertSlice.reducer

type InitialStateType = {
  errors: ConcertErrorsType | null
  list: ConcertsType[]
  page: number
  singerVoice: SingerVoiceType[]
  status: AppStatus
  total: number
  type: ConcertTypesType[]
}
export type ConcertErrorsType = {
  [key: string]: string[]
}
export type ConcertStatusType = 'error' | 'idle' | 'loading' | 'success'
