import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {PromocodeAddType, promocodeAPI} from "../api/api";
import {PAGE} from "../const/page";
import {addAppStatus, addAppStatusNotification, AppStatus} from "./appReducer";
import {STATUS} from "../const/statuses";
import {MESSAGE} from "../const/messages";
import {HTTP_STATUSES} from "../const/htttpStatus";
import {
    asyncThunkActionWithLoading,
    handleAppNotification,
    handleThunkError,
    handleUncaughtError
} from "../utils/utils";
import {concertSlice} from "./concertsReducer";

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

    thunkAPI.dispatch(addAppStatus(STATUS.LOADING))
    try {
        const response = await promocodeAPI.deletePromocode(id)
        if (response.status === HTTP_STATUSES.NO_CONTENT) {
            thunkAPI.dispatch(addAppStatus(STATUS.IDLE))
            handleAppNotification(STATUS.SUCCESS, MESSAGE.REMOVED, thunkAPI)
            return {id}
        }
        return handleUncaughtError(thunkAPI)

    } catch (error) {
        return handleThunkError(error as Error, thunkAPI)
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
        return handleUncaughtError(thunkAPI)

    } catch (error) {
        return handleThunkError(error as Error, thunkAPI)
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
        return handleUncaughtError(thunkAPI)
    } catch (error) {
        return handleThunkError(error as Error, thunkAPI)
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
                state.list = state.list.filter(({id}) => id !== (action.payload?.id) as number)
                state.total -= 1
                if (state.page > 1 && !state.list.length) {
                    state.page -= 1
                }
            })
            .addCase(addPromocode.fulfilled, (state, action) => {
                if (action.payload) {
                    state.total += 1
                    if (state.list.length < PAGE.ITEM_PER_PAGE) {
                        state.list.push(action.payload)
                    }
                }

            })
            .addCase(editPromocode.fulfilled, (state, action) => {
                const response = action.payload
                if (response)
                    state.list = state.list.map(p => p.id === response.id ? response : p)
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