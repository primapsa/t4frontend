import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {CartAddType, cartAPI, CartConcertsType, CartType, PayPalResponseTYpe, ValidatePromocodeType} from "../api/api";
import {HTTP_STATUSES} from "../const/htttpStatus";
import {ITEM_STATUS, STATUS} from "../const/statuses";
import {addAppStatus, addAppStatusNotification, addPopupContent, AppStatus} from "./appReducer";
import {MESSAGE} from "../const/messages";
import {makePayPalMessage} from "../utils/paypal";
import {
    asyncThunkActionWithLoading,
    getCartCount,
    handleAppNotification,
    handleThunkStatusError,
    handleUncaughtStatusError,
    setCartCount
} from "../utils/utils";
import {AxiosError} from "axios/index";
import {removeConcertStatus, setConcertStatus} from "./concertsReducer";

const initialState: InitialStateType = {
    list: [],
    total: getCartCount(),
    status: STATUS.IDLE
}

export const fetchCart = createAsyncThunk('cart/fetch', async (userId: number, thunkAPI) => {

    try {
        const response = await cartAPI.fetchUserCart(userId)

        if (response.status === HTTP_STATUSES.OK) {
            return response.data
        }
        return handleUncaughtStatusError(thunkAPI,false)
    } catch (error) {
        return handleThunkStatusError(error as AxiosError, thunkAPI,false)
    }

})

export const addCart = createAsyncThunk('cart/add', async (cart: CartAddType, thunkAPI) => {

    thunkAPI.dispatch(setConcertStatus(cart.concertId))
    try {
        const response = await cartAPI.addCart(cart)
        thunkAPI.dispatch(removeConcertStatus(cart.concertId))

        if (response.status === HTTP_STATUSES.CREATED) {
            const notification = {status: STATUS.SUCCESS, message: MESSAGE.ADDED_TO_CART}
            thunkAPI.dispatch(addAppStatusNotification(notification))
            return response.data
        }
        return handleUncaughtStatusError(thunkAPI)

    } catch (error) {
        return handleThunkStatusError(error as AxiosError, thunkAPI)
    }
})

export const deleteCart = createAsyncThunk('cart/delete', async (cartId: number, thunkAPI) => {

    try {
        const response = await cartAPI.deleteCart(cartId)
       // thunkAPI.dispatch(addAppStatus(STATUS.IDLE))
        if (response.status === HTTP_STATUSES.NO_CONTENT) {
            return {cartId}
        }
        return handleUncaughtStatusError(thunkAPI)
    } catch (error) {
        return handleThunkStatusError(error as AxiosError, thunkAPI)
    }
})

export const deleteCartUser = createAsyncThunk('cart/deleteCartUser',
    async ({userId, data}: { userId: number, data: PayPalResponseTYpe }, thunkAPI) => {
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
    })

export const updateCart = createAsyncThunk('cart/update', async (cart: { id: number, data: Partial<CartType> }, thunkAPI) => {

    try {
        const response = await cartAPI.updateCart({id: cart.id, cart: cart.data})

        if (response.status === HTTP_STATUSES.OK) {
            return response.data
        }
        return handleUncaughtStatusError(thunkAPI)
    } catch (error) {
        return handleThunkStatusError(error as AxiosError, thunkAPI)
    }
})

export const validatePromocode = createAsyncThunk('cart/validatePromocode', async (param: { promocode: string, id: number }, thunkAPI) => {

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
})

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartPromocode(state, action) {
            state.list = state.list.map(c => c.id === action.payload.id ? {...c, promocode: action.payload.value} : c)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.fulfilled, (state, action) => {
                if (action.payload){
                    state.list = action.payload
                    state.status = STATUS.IDLE
                    state.total = (action.payload as CartConcertsType[]).length
                }
            })
            .addCase(fetchCart.pending, (state, action) => {
                state.status = STATUS.LOADING
            })
            .addCase(addCart.fulfilled, (state, action) => {
                setCartCount(getCartCount()  + 1)
                state.total += 1
            })
            .addCase(deleteCart.fulfilled, (state, action) => {
                const cartId = action?.payload?.cartId
                if (cartId){
                    state.list = state.list.filter(({id}) => id !== cartId)
                    setCartCount(state.list.length)
                    state.total = state.list.length
                }
            })
            .addCase(deleteCart.pending, (state, action) => {
                const id = action.meta.arg
                if (id){
                    state.list = state.list.map(e => e.id === id ? {...e, status: ITEM_STATUS.DELETE} : e)
                }
            })
            .addCase(validatePromocode.fulfilled, (state, action) => {
                if (action.payload) {
                    const {cartId, title, discount} = action.payload as ValidatePromocodeType
                    state.list = state.list.map(c => c.id === cartId ? {...c, promocode: title, discount: discount} : c)
                }
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                if (action.payload) {
                    const updated = action.payload
                    state.list = state.list.map(c => c.id === updated.id ? {...c, ...updated.data} : c)
                }
            })
            .addCase(deleteCartUser.fulfilled, (state, action) => {
                state.list = []
            })
    }
})

export const {setCartPromocode} = cartSlice.actions
export default cartSlice.reducer

type InitialStateType = {
    list: CartConcertsType[]
    total: number
    status: AppStatus
}