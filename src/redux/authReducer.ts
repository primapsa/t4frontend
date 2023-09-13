import {createAsyncThunk, createSlice, isAnyOf} from "@reduxjs/toolkit";
import {authAPI, AuthRequestRegType, CredentialsType, promocodeAPI} from "../api/api";
import {HTTP_STATUSES} from "../const/htttpStatus";
import {
    asyncThunkActionWithLoading,
    authPersistGet,
    authPersistPut,
    handleThunkError,
    handleUncaughtError,
    parseJwt,
    setTokens
} from "../utils/utils";
import {MESSAGE} from "../const/messages";
import {addAppStatus, addPopupContent} from "./appReducer";
import {STATUS} from "../const/statuses";
import {AxiosError} from "axios/index";

const init: AuthInitialType = {
    isAuth: false,
    type: 'login',
    error: null,
    isStaff: false,
    user: {} as AuthUserType,
    userId: null
}

export const login = createAsyncThunk('auth/login', async (credentials: CredentialsType, thunkAPI) => {

        thunkAPI.dispatch(addAppStatus(STATUS.LOADING))
        try {
            const response = await authAPI.login(credentials)
            thunkAPI.dispatch(addAppStatus(STATUS.IDLE))
            if (response.status === HTTP_STATUSES.OK) {
                return response.data
            }
            return handleUncaughtError(thunkAPI)
        } catch (error) {
            thunkAPI.dispatch(addAppStatus(STATUS.IDLE))
            return thunkAPI.rejectWithValue(JSON.stringify((error as AxiosError).response?.data))
        }
    }
)

export const checkAuth = createAsyncThunk('auth/me', async (param, thunkAPI) => {

    return asyncThunkActionWithLoading(authAPI.me, undefined, thunkAPI)
})

export const socialLogin = createAsyncThunk('auth/socialLogin', async (credentials: string, thunkAPI) => {

    return asyncThunkActionWithLoading(authAPI.socialLogin, credentials, thunkAPI)
})


export const registerUser = createAsyncThunk('auth/register', async (reg: AuthRequestRegType, thunkAPI) => {
    thunkAPI.dispatch(addAppStatus(STATUS.LOADING))
    try {
        const response = await authAPI.register(reg)
        thunkAPI.dispatch(addAppStatus(STATUS.IDLE))
        if (response.status === HTTP_STATUSES.OK) {
            thunkAPI.dispatch(addPopupContent(MESSAGE.NEW_USER_SUCCESS))
            return 'login'
        }
        return handleUncaughtError(thunkAPI)
    } catch (error) {
        thunkAPI.dispatch(addAppStatus(STATUS.IDLE))
        return thunkAPI.rejectWithValue(JSON.stringify((error as AxiosError).response?.data))
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState: authPersistGet() || init,
    reducers: {
        logout(state) {
            state.isAuth = false
            state.isStaff = false
            state.user = {} as AuthUserType
            localStorage.clear()
        },
        setLoginType(state, action) {
            state.type = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.fulfilled, (state, action) => {
                if (action.payload) {
                    const data = action.payload
                    state.isAuth = true
                    state.user = data
                    state.userId = data.id
                    state.isStaff = data.is_staff
                    state.error = null
                    authPersistPut(data)
                }
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isAuth = false
                state.user = {} as AuthUserType
                state.userId = null
                state.isStaff = false
                localStorage.clear()
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                if (action.payload) {
                    state.type = action.payload
                    state.error = null
                }
            })
            .addCase(registerUser.rejected, (state, action) => {
                if (action.payload) {
                    state.error = action.payload as string
                }
            })
            .addCase(login.rejected, (state, action) => {

                if (action.payload) {
                    const err = JSON.parse(action.payload as string)
                    state.error = err.detail
                }
            })
            .addCase(login.pending, (state) => {
                state.error = null
            })
            .addCase(registerUser.pending, (state) => {
                state.error = null
            })
            .addMatcher(isAnyOf(login.fulfilled, socialLogin.fulfilled), (state, action) => {
                if (action.payload) {
                    const data = action.payload
                    const decodedToken = parseJwt(data.access)
                    state.isAuth = true
                    state.user = decodedToken
                    state.isStaff = decodedToken.is_staff
                    state.userId = decodedToken.id
                    setTokens(data)
                    authPersistPut(decodedToken)
                    state.error = null
                }
            })
    }
})

export const {logout, setLoginType} = authSlice.actions
export default authSlice.reducer


export type AuthInitialType = {
    isAuth: boolean
    isStaff: boolean
    userId: number | null
    user: AuthUserType
    type: LoginType
    error: string | null
}
export type LoginType = 'login' | 'register'
export type AuthUserType = {
    email: string
    exp?: number
    user_id?: number
    id: number
    is_staff: boolean
}