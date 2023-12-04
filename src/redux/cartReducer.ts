import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios/index'

import {
  CartAddType,
  CartConcertsType,
  CartType,
  PayPalResponseTYpe,
  ValidatePromocodeType,
  cartAPI,
} from '../api/api'
import { HTTP_STATUSES } from '../const/htttpStatus'
import { MESSAGE } from '../const/messages'
import { ITEM_STATUS, STATUS } from '../const/statuses'
import { makePayPalMessage } from '../utils/paypal'
import {
  getCartCount,
  handleAppNotification,
  handleThunkStatusError,
  handleUncaughtStatusError,
  setCartCount,
} from '../utils/utils'
import {
  AppNotificationType,
  AppStatus,
  addAppStatus,
  addAppStatusNotification,
  addPopupContent,
} from './appReducer'
import { removeConcertStatus, setConcertStatus } from './concertsReducer'

const initialState: InitialStateType = {
  list: [],
  status: STATUS.IDLE,
  total: getCartCount(),
}

export const fetchCart = createAsyncThunk('cart/fetch', async (userId: number, thunkAPI) => {
  try {
    const response = await cartAPI.fetchUserCart(userId)

    if (response.status === HTTP_STATUSES.OK) {
      return response.data
    }

    return handleUncaughtStatusError(thunkAPI, false)
  } catch (error) {
    return handleThunkStatusError(error as AxiosError, thunkAPI, false)
  }
})

export const addCart = createAsyncThunk('cart/add', async (cart: CartAddType, thunkAPI) => {
  const notification = {
    message: MESSAGE.ADDED_TO_CART,
    status: STATUS.SUCCESS,
  } as AppNotificationType
  let newItemInCart = true

  thunkAPI.dispatch(setConcertStatus(cart.concertId))
  try {
    const response = await cartAPI.addCart(cart)

    thunkAPI.dispatch(removeConcertStatus(cart.concertId))
    if (response.status === HTTP_STATUSES.NO_CONTENT) {
      notification.message = MESSAGE.REMOVED_FROM_CART
      newItemInCart = false
    }
    thunkAPI.dispatch(addAppStatusNotification(notification))

    return newItemInCart
  } catch (error) {
    return handleThunkStatusError(error as AxiosError, thunkAPI)
  }
})

export const deleteCart = createAsyncThunk('cart/delete', async (cartId: number, thunkAPI) => {
  try {
    const response = await cartAPI.deleteCart(cartId)

    if (response.status === HTTP_STATUSES.NO_CONTENT) {
      return { cartId }
    }

    return handleUncaughtStatusError(thunkAPI)
  } catch (error) {
    return handleThunkStatusError(error as AxiosError, thunkAPI)
  }
})

export const deleteCartUser = createAsyncThunk(
  'cart/deleteCartUser',
  async ({ data, userId }: { data: PayPalResponseTYpe; userId: number }, thunkAPI) => {
    thunkAPI.dispatch(addAppStatus(STATUS.LOADING))
    try {
      const response = await cartAPI.deleteUserCart(userId)

      thunkAPI.dispatch(addAppStatus(STATUS.IDLE))
      if (response.status === HTTP_STATUSES.NO_CONTENT) {
        thunkAPI.dispatch(addPopupContent(makePayPalMessage(data)))

        return response.data
      }

      return handleUncaughtStatusError(thunkAPI)
    } catch (error) {
      return handleThunkStatusError(error as AxiosError, thunkAPI)
    }
  }
)

export const updateCart = createAsyncThunk(
  'cart/update',
  async (cart: { data: Partial<CartType>; id: number }, thunkAPI) => {
    try {
      const response = await cartAPI.updateCart({ cart: cart.data, id: cart.id })

      if (response.status === HTTP_STATUSES.OK) {
        return response.data
      }

      return handleUncaughtStatusError(thunkAPI)
    } catch (error) {
      return handleThunkStatusError(error as AxiosError, thunkAPI)
    }
  }
)

export const validatePromocode = createAsyncThunk(
  'cart/validatePromocode',
  async (param: { id: number; promocode: string }, thunkAPI) => {
    try {
      const response = await cartAPI.validateCartPomocode(param)

      if (response.status === HTTP_STATUSES.OK) {
        if (response.data) {
          handleAppNotification(STATUS.SUCCESS, MESSAGE.ADDED, thunkAPI)

          return response.data
        }

        return handleAppNotification(STATUS.ERROR, MESSAGE.NOT_FOUND, thunkAPI)
      }

      return handleAppNotification(STATUS.ERROR, MESSAGE.NOT_FOUND, thunkAPI)
    } catch (error) {
      return handleThunkStatusError(error as AxiosError, thunkAPI)
    }
  }
)

export const cartSlice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        if (action.payload) {
          state.list = action.payload
          state.status = STATUS.IDLE
          state.total = (action.payload as CartConcertsType[]).length
        }
      })
      .addCase(fetchCart.pending, state => {
        state.status = STATUS.LOADING
      })
      .addCase(addCart.fulfilled, (state, action) => {
        const isNewCartItem = action.payload
        const lsTotal = isNewCartItem ? getCartCount() + 1 : getCartCount() - 1

        setCartCount(lsTotal)
        state.total = isNewCartItem ? state.total + 1 : state.total - 1
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        const cartId = action?.payload?.cartId

        if (cartId) {
          state.list = state.list.filter(({ id }) => id !== cartId)
          setCartCount(state.list.length)
          state.total = state.list.length
        }
      })
      .addCase(deleteCart.pending, (state, action) => {
        const id = action.meta.arg

        if (id) {
          state.list = state.list.map(e => (e.id === id ? { ...e, status: ITEM_STATUS.DELETE } : e))
        }
      })
      .addCase(validatePromocode.fulfilled, (state, action) => {
        if (action.payload) {
          const { cartId, discount, title } = action.payload as ValidatePromocodeType

          state.list = state.list.map(c =>
            c.id === cartId ? { ...c, discount: discount, promocode: title } : c
          )
        }
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        if (action.payload) {
          const updated = action.payload

          state.list = state.list.map(c => (c.id === updated.id ? { ...c, ...updated.data } : c))
        }
      })
      .addCase(deleteCartUser.fulfilled, (state, action) => {
        state.list = []
        state.total = 0
      })
  },
  initialState,
  name: 'cart',
  reducers: {
    setCartPromocode(state, action) {
      state.list = state.list.map(c =>
        c.id === action.payload.id ? { ...c, promocode: action.payload.value } : c
      )
    },
  },
})

export const { setCartPromocode } = cartSlice.actions
export default cartSlice.reducer

type InitialStateType = {
  list: CartConcertsType[]
  status: AppStatus
  total: number
}
