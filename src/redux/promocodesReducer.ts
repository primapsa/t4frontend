import {createAsyncThunk, createSlice, isAnyOf} from "@reduxjs/toolkit";
import {PromocodeAddType, promocodeAPI} from "../api/api";
import {PAGE} from "../const/page";
import {addAppStatus, AppStatus} from "./appReducer";
import {ITEM_STATUS, STATUS} from "../const/statuses";
import {MESSAGE} from "../const/messages";
import {HTTP_STATUSES} from "../const/htttpStatus";
import {
    asyncThunkActionWithLoading,
    handleAppNotification,
    handleThunkStatusError,
    handleUncaughtStatusError
} from "../utils/utils";
import {AxiosError} from "axios";

const initialState: InitialStateType = {
    list: [],
    total: PAGE.TOTAL,
    page: PAGE.NUMBER,
    status: STATUS.IDLE
}

export const fetchPromocodes = createAsyncThunk('promocodes/fetch', async (page: number, thunkAPI) => {

    return asyncThunkActionWithLoading(promocodeAPI.fetchPromocodes, page, thunkAPI)
})

export const deletePromocode = createAsyncThunk('promocodes/delete', async (id: number, thunkAPI) => {

    try {
        const response = await promocodeAPI.deletePromocode(id)
        if (response.status === HTTP_STATUSES.NO_CONTENT) {
            thunkAPI.dispatch(addAppStatus(STATUS.IDLE))
            handleAppNotification(STATUS.SUCCESS, MESSAGE.REMOVED, thunkAPI)
            return {id}
        }
        return handleUncaughtStatusError(thunkAPI)

    } catch (error) {
        return handleThunkStatusError(error as AxiosError, thunkAPI)
    }
})

export const addPromocode = createAsyncThunk('promocode/add', async (promocode: PromocodeAddType, thunkAPI) => {

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
})

export const editPromocode = createAsyncThunk('promocode/edit', async (promocode: PromocodesType, thunkAPI) => {

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
})

export const promocodeSlice = createSlice({
    name: 'promocodes',
    initialState,
    reducers: {
        addPromocodes(state, action) {
            state.list = action.payload.data
            state.total = action.payload.total
        },
        setPage(state, action) {
            state.page = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPromocodes.fulfilled, (state, action) => {
                state.list = action.payload?.data as PromocodesType[]
                state.total = action.payload?.total as number
            })
            .addCase(deletePromocode.fulfilled, (state, action) => {
                state.status = STATUS.IDLE
                state.list = state.list.filter(({id}) => id !== (action.payload?.id) as number)
                state.total -= 1
                if (state.page > 1 && !state.list.length) {
                    state.page -= 1
                }
            })
            .addCase(addPromocode.fulfilled, (state, action) => {
                state.status = STATUS.IDLE
                if (action.payload) {
                    state.total += 1
                    if (state.list.length < PAGE.ITEM_PER_PAGE) {
                        state.list.push(action.payload)
                    }
                }

            })
            .addCase(editPromocode.fulfilled, (state, action) => {
                state.status = STATUS.IDLE
                const response = action.payload
                if (response)
                    state.list = state.list.map(p => p.id === response.id ? response : p)
            })
            .addCase(deletePromocode.pending, (state, action) => {
                const id = action.meta.arg
                if(id){
                    state.list = state.list.map(e => e.id === id ? {...e, status: ITEM_STATUS.DELETE} : e)
                }
            })

    }
})
export const {setPage} = promocodeSlice.actions
export default promocodeSlice.reducer

type InitialStateType = {
    list: PromocodesType[]
    total: number
    page: number
    status: AppStatus
}
export type PromocodesType = {
    id: number
    title: string
    discount: number
    date: string
}