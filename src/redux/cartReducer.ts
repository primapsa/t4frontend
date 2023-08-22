import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {PAGE} from "../const/page";
import {FILTER} from "../const/filter";
import {CartAddType, cartAPI, CartConcertsType, CartType} from "../api/api";
import {HTTP_STATUSES} from "../const/htttpStatus";
import {STATUS} from "../const/statuses";
import {addAppStatusNotification} from "./appReducer";
import {MESSAGE} from "../const/messages";

const initialState: InitialStateType = {
    list: [],
    // type: FILTER.TYPE,
    // count: PAGE.ITEM_PER_PAGE
}
export const fetchCart = createAsyncThunk('cart/fetch', async (userId: number, thunkAPI) => {
    try {
        const response = await cartAPI.fetchUserCart(userId)
        if (response.status === HTTP_STATUSES.OK) {
            return response.data
        }
        const notification = {status: STATUS.ERROR, message: MESSAGE.UNCAUGHT}
        thunkAPI.dispatch(addAppStatusNotification(notification))
    } catch (error) {
        const notification = {status: STATUS.ERROR, message: (error as Error).message}
        thunkAPI.dispatch(addAppStatusNotification(notification))
    }
})
export const addCart = createAsyncThunk('cart/add', async (cart: CartAddType, thunkAPI) => {
    try {
        const response = await cartAPI.addCart(cart)

        if (response.status === HTTP_STATUSES.CREATED) {
            const notification = {status: STATUS.SUCCESS, message: MESSAGE.ADDED_TO_CART}
            thunkAPI.dispatch(addAppStatusNotification(notification))
            return response.data
        }
        const notification = {status: STATUS.ERROR, message: MESSAGE.UNCAUGHT}
        thunkAPI.dispatch(addAppStatusNotification(notification))


    } catch (error) {
        const notification = {status: STATUS.ERROR, message: (error as Error).message}
        thunkAPI.dispatch(addAppStatusNotification(notification))
    }
})
export const deleteCart = createAsyncThunk('cart/delete', async (cartId: number, thunkAPI) => {
    try {
        const response = await cartAPI.deleteCart(cartId)

        if (response.status === HTTP_STATUSES.OK) {
            return {cartId}
        }
        const notification = {status: STATUS.ERROR, message: MESSAGE.UNCAUGHT}
        thunkAPI.dispatch(addAppStatusNotification(notification))


    } catch (error) {
        const notification = {status: STATUS.ERROR, message: (error as Error).message}
        thunkAPI.dispatch(addAppStatusNotification(notification))
    }
})
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        resetFilter(state) {
            // state.query = FILTER.QUERY
            // state.type = FILTER.TYPE
        },
        setFilter(state, action) {
            // state.query = action.payload.query
            // state.type = action.payload.type
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.fulfilled, (state, action) => {
                if (action.payload)
                    state.list = action.payload
            })
            .addCase(deleteCart.fulfilled, (state, action) => {
                const cartId  = action?.payload?.cartId
                if (cartId)
                    state.list = state.list.filter( ({id}) => id !== cartId)
            })

            // .addCase(addCart.fulfilled, (state, action) => {
            //     if (action.payload)
            //         state.list.push(action.payload)
            // })
    }
})
export const {resetFilter, setFilter} = cartSlice.actions
export default cartSlice.reducer

type InitialStateType = {
    list: CartConcertsType[]

}