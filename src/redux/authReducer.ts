import {createAsyncThunk, createSlice, isAnyOf} from "@reduxjs/toolkit";
import {authAPI, AuthRequestRegType, CredentialsType} from "../api/api";
import {HTTP_STATUSES} from "../const/htttpStatus";
import {handleThunkError, handleUncaughtError, handleUncaughtStatusError, parseJwt, setTokens} from "../utils/utils";
import {MESSAGE} from "../const/messages";
import {addAppStatus, addPopupContent, AppStatus} from "./appReducer";
import {STATUS} from "../const/statuses";
import {AxiosError} from "axios/index";

const init: AuthInitialType = {
    isAuth: false,
    type: 'login',
    error: null,
    isStaff: false,
    user: {} as AuthUserType,
    userId: null,
    status: STATUS.LOADING
}

export const login = createAsyncThunk('auth/login', async (credentials: CredentialsType, thunkAPI) => {

        try {
            const response = await authAPI.login(credentials)
            if (response.status === HTTP_STATUSES.OK) {
                return response.data
            }
            return handleUncaughtStatusError(thunkAPI)
        } catch (error) {
            return thunkAPI.rejectWithValue({
                credentials, error: JSON.stringify((error as AxiosError).response?.data)
            })
        }
    }
)

export const checkAuth = createAsyncThunk('auth/me', async (param, thunkAPI) => {

    try {
        const response = await authAPI.me()
        if (response.status === HTTP_STATUSES.OK) {
            thunkAPI.dispatch(addAppStatus(STATUS.IDLE))
            return response.data
        }
        return handleUncaughtError(thunkAPI)
    } catch (error) {
        thunkAPI.dispatch(addAppStatus(STATUS.IDLE))
        return handleThunkError(error as AxiosError, thunkAPI, false)
    }
})

export const socialLogin = createAsyncThunk('auth/socialLogin', async (credentials: string, thunkAPI) => {

    try {
        const response = await authAPI.socialLogin(credentials)
        if (response.status === HTTP_STATUSES.OK) {
            return response.data
        }
        return handleUncaughtError(thunkAPI)
    } catch (error) {
        return handleThunkError(error as AxiosError, thunkAPI)
    }
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
        return handleUncaughtStatusError(thunkAPI)
    } catch (error) {
        thunkAPI.dispatch(addAppStatus(STATUS.IDLE))
        return thunkAPI.rejectWithValue(JSON.stringify((error as AxiosError).response?.data))
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState: init,
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
                } else {
                    state.isAuth = false
                }
                state.status = STATUS.IDLE
                state.error = null
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isAuth = false
                state.user = {} as AuthUserType
                state.userId = null
                state.isStaff = false
                localStorage.clear()
                state.error = null
                state.status = STATUS.IDLE
            })
            .addCase(checkAuth.pending, (state, action) => {
                state.status = STATUS.LOADING
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
                state.status = STATUS.IDLE
                const data = action.payload as {credentials: CredentialsType, error: string}
                if (data) {
                    const {credentials} = data
                    const err = JSON.parse(data.error)
                    state.error = err.detail
                    state.user = {'email': credentials.email} as AuthUserType
                }
            })
            .addCase(login.pending, (state) => {
                state.error = null
                state.status = STATUS.LOADING
            })
            .addCase(socialLogin.pending, (state) => {
                state.error = null
                state.status = STATUS.LOADING
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
                    state.userId = decodedToken.user_id
                    setTokens(data)
                    state.error = null
                    state.status = STATUS.IDLE
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
    status: AppStatus
}
export type LoginType = 'login' | 'register'
export type AuthUserType = {
    email: string
    exp?: number
    user_id: number
    id: number
    is_staff: boolean
}