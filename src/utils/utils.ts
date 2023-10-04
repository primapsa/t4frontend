import {authAPI, CartAddType} from "../api/api";
import {AuthInitialType, AuthUserType, LoginType} from "../redux/authReducer";
import {AxiosError, AxiosInstance, InternalAxiosRequestConfig} from "axios/index";
import {HTTP_STATUSES} from "../const/htttpStatus";
import {STATUS} from "../const/statuses";
import {addAppStatus, addAppStatusNotification, AppStatus} from "../redux/appReducer";
import {MESSAGE} from "../const/messages";


export const makeQuery = (param: { query: string, type: number, ids: string }, page: number, count: number) => {
    const queryString = []
    if (param.query) queryString.push(`keyword=${param.query}`)
    if (param.type) queryString.push(`type=${param.type}`)
    if (param.ids) queryString.push(`ids=${param.ids}`)
    queryString.push(`page=${page}`, `count=${count}`)
    return `?${queryString.join('&')}`
}

export const parseJwt = (token: string): AuthUserType => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return {} as AuthUserType;
    }
}

export const getAuthToken = (): string => {
    const header = localStorage.getItem('token')
    return header ? `Bearer ${header}` : ''
}

export const getRefreshToken = (): string | null => {
    return localStorage.getItem('refresh')
}

export const getCartCount = (): number => {
    return Number(localStorage.getItem('cart'))
}

export const setCartCount = (count: number) => {
    return localStorage.setItem('cart', String(count))
}

export const makePayload = (concertId: number, price: number, userId: number): CartAddType => {
    return {concertId, price, userId, count: 1, promocodeId: null}
}

export const authPersistPut = (data: { is_staff: boolean }) => {
    const storaged = {isAuth: true, isStaff: data.is_staff, user: data, type: 'login' as LoginType}
    localStorage.setItem('auth', JSON.stringify(storaged))
}

export const setTokens = (token: { access: string, refresh: string }) => {
    localStorage.setItem('token', token.access)
    localStorage.setItem('refresh', token.refresh)
}

export const authPersistGet = (): AuthInitialType => {
    const persist = localStorage.getItem('auth')

    return persist ? JSON.parse(persist) : null
}

const nullFormat = (wn: number) => wn < 10 ? `0${wn}` : wn

export const dateFormat = (date: string): { date: string, time: string } => {
    const dt = new Date(date)

    return {
        date: `${nullFormat(dt.getUTCDate())}.${nullFormat(dt.getUTCMonth())}.${dt.getUTCFullYear()}`,
        time: `${nullFormat(dt.getUTCHours())}:${nullFormat(dt.getUTCMinutes())}`
    }
}

export const dateFormatDelimeter = (date: string): string => {
    const dt = new Date(date)
    return `${dt.getUTCFullYear()}-${nullFormat(dt.getUTCMonth())}-${nullFormat(dt.getUTCDate())} ${nullFormat(dt.getUTCHours())}:${nullFormat(dt.getUTCMinutes())}`
}

export const discountFormat = (discount: number) => {
    return (Math.round(discount * 100) / 100).toFixed(2)
}

export const addRequestHeader = (config: InternalAxiosRequestConfig<any>) => {
    const token = getAuthToken()
    if (token) {
        config.headers.Authorization = token
    } else {
        delete config.headers.Authorization;
    }
    return config;
}

export const refreshExpiredToken = (axiosInstance: AxiosInstance) => async (error: AxiosError) => {

    const config = error.config as AxiosConfigType
    const status = error.response?.status
    if (status === HTTP_STATUSES.UNAUTHORIZED && config && !config.isRetry) {
        const refresh = getRefreshToken()
        config.isRetry = true
        if (refresh) {
            try {
                const response = await authAPI.refreshToken({refresh})
                if (response.status === HTTP_STATUSES.OK) {
                    localStorage.setItem('token', response.data.access)
                    return axiosInstance(config)
                }
            } catch (err) {
                localStorage.clear()
            }
        }
    }
    throw error
}

export const fetchImagebyUrl = async (url: string) => {
    const data = await fetch(url);
    const buffer = await data.arrayBuffer();
    return new Blob([buffer], {type: "image/png"});
}

export const generateImageFromUrl = async (url: string, name: string) => {
    const blob = await fetchImagebyUrl(url)
    const file = await new File([blob], name)
    return file
}

export const handleThunkStatusError = (error: AxiosError, thunkAPI: any, turnIDLE: boolean = true): string => {

    if (turnIDLE) {
        thunkAPI.dispatch(addAppStatus(STATUS.IDLE))
    }

    const notification = {status: STATUS.ERROR, message: error.message}

    if (error.message === 'Network Error') {
        thunkAPI.dispatch(addAppStatus(STATUS.OFFLINE))
    } else {
        thunkAPI.dispatch(addAppStatusNotification(notification))
    }

    return thunkAPI.rejectWithValue(JSON.stringify(error.response?.data))
}

export const handleThunkError = (error: AxiosError, thunkAPI: any, notification: boolean = true): string => {

    const record = {status: STATUS.ERROR, message: error.message}

    if (error.message === 'Network Error') {
        thunkAPI.dispatch(addAppStatus(STATUS.OFFLINE))
    } else {
        if(notification)
            thunkAPI.dispatch(addAppStatusNotification(record))
    }

    return thunkAPI.rejectWithValue(JSON.stringify(error.response?.data))
}

export const handleUncaughtStatusError = (thunkAPI: any, turnIDLE: boolean = true) => {

    if (turnIDLE) {
        thunkAPI.dispatch(addAppStatus(STATUS.IDLE))
    }
    const notification = {status: STATUS.ERROR, message: MESSAGE.UNCAUGHT}
    thunkAPI.dispatch(addAppStatusNotification(notification))
    return thunkAPI.rejectWithValue(MESSAGE.UNCAUGHT)
}
export const handleUncaughtError = (thunkAPI: any) => {

    const notification = {status: STATUS.ERROR, message: MESSAGE.UNCAUGHT}
    thunkAPI.dispatch(addAppStatusNotification(notification))

    return thunkAPI.rejectWithValue(MESSAGE.UNCAUGHT)
}

export const asyncThunkActionWithLoading = async (action: Function, actionParam: any, thunkAPI: any) => {
    thunkAPI.dispatch(addAppStatus(STATUS.LOADING))
    try {
        const response = await action(actionParam)
        thunkAPI.dispatch(addAppStatus(STATUS.IDLE))
        if (response.status === HTTP_STATUSES.OK) {
            return response.data
        }
        return handleUncaughtStatusError(thunkAPI)
    } catch (error) {
        return handleThunkStatusError(error as AxiosError, thunkAPI)
    }
}

export const handleAppNotification = (status: AppStatus, message: string, thunkAPI: any) => {
    thunkAPI.dispatch(addAppStatusNotification({status, message}))
    if (status === STATUS.ERROR)
        return thunkAPI.rejectWithValue(message)
}

type AxiosConfigType = InternalAxiosRequestConfig & { isRetry: boolean }