import {createAsyncThunk, createSlice, isAnyOf} from "@reduxjs/toolkit";
import {authAPI, AuthRequestRegType, CredentialsType} from "../api/api";
import {HTTP_STATUSES} from "../const/htttpStatus";
import {
    asyncThunkActionWithLoading,
    authPersistGet,
    authPersistPut,
    handleThunkError,
    handleUncaughtError,
    parseJwt
} from "../utils/utils";
import {MESSAGE} from "../const/messages";
import {addAppStatus, addPopupContent} from "./appReducer";
import {STATUS} from "../const/statuses";


export const login = createAsyncThunk('auth/login', async (credentials: CredentialsType, thunkAPI) => {
    return  asyncThunkActionWithLoading(authAPI.login, credentials, thunkAPI)
    }
)

export const checkAuth = createAsyncThunk('auth/me', async (param, thunkAPI) => {
    try {
        const response = await authAPI.me()

        if (response.status === HTTP_STATUSES.OK) {
            if (response.data.code) return response.data.data
        }
        return handleUncaughtError(thunkAPI)
    } catch (error) {
        return handleThunkError(error as Error, thunkAPI)
    }
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
        }
        return handleUncaughtError(thunkAPI)
    } catch (error) {
        return handleThunkError(error as Error, thunkAPI)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState: authPersistGet(),
    reducers: {
        logout(state) {
            state.isAuth = false
            state.isStaff = false
            state.user = {} as AuthUserType
            localStorage.clear()
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.fulfilled, (state, action) => {
                if (action.payload) {
                    const data = action.payload
                    state.isAuth = true
                    state.user = data
                    state.isStaff = data.is_staff
                    authPersistPut({isAuth: true, isStaff: data.is_staff, user: data})
                }
            })
            .addMatcher(isAnyOf(login.fulfilled, socialLogin.fulfilled), (state, action) => {
                if (action.payload) {
                    const data = action.payload
                    const decodedToken = parseJwt(data.access)
                    state.isAuth = true
                    state.user = decodedToken
                    state.isStaff = decodedToken.is_staff
                    localStorage.setItem('token', data.access)
                    localStorage.setItem('refresh', data.refresh)
                    authPersistPut({isAuth: true, isStaff: decodedToken.is_staff, user: decodedToken})
                }
            })
    }
})

export const {logout} = authSlice.actions
export default authSlice.reducer

export type AuthInitialType = {
    isAuth: boolean
    isStaff: boolean
    user: AuthUserType
}
export type AuthUserType = {
    email: string
    exp?: number
    user_id?: number
    id: number
    is_staff: boolean
}