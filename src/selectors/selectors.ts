import { createSelector } from '@reduxjs/toolkit'

import { STATUS } from '../const/statuses'
import { RootStateType } from '../redux/store'

export const getNotice = (state: RootStateType) => state.app.notification
export const getConcerts = (state: RootStateType) => state.concerts.list
export const getConcert = (state: RootStateType) => state.concert.item
export const getSingerVoice = (state: RootStateType) => state.concerts.singerVoice
export const getPopup = (state: RootStateType) => state.app.popup
export const getCart = (state: RootStateType) => state.cart.list
export const getUser = (state: RootStateType) => state.auth.user
export const getUserId = (state: RootStateType) => state.auth.userId
export const getStatus = (state: RootStateType) => state.app.status
export const getStatusCart = (state: RootStateType) => state.cart.status
export const getStatusAuth = (state: RootStateType) => state.auth.status
export const getStatusConcerts = (state: RootStateType) => state.concerts.status
export const getStatusConcert = (state: RootStateType) => state.concert.status
export const getConcertType = (state: RootStateType) => state.concerts.type
export const getFilterQuery = (state: RootStateType) => state.filter.query
export const getFilterType = (state: RootStateType) => state.filter.type
export const getIsAuth = (state: RootStateType) => state.auth.isAuth
export const getIsStaff = (state: RootStateType) => state.auth.isStaff
export const getAuthType = (state: RootStateType) => state.auth.type
export const getAuthError = (state: RootStateType) => state.auth.error
export const getPromocodes = (state: RootStateType) => state.promocode.list
export const getTotal = (state: RootStateType) => state.concerts.total
export const getPage = (state: RootStateType) => state.concerts.page
export const getTotalPromocode = (state: RootStateType) => state.promocode.total
export const getPagePromocode = (state: RootStateType) => state.promocode.page
export const getStatusPromocode = (state: RootStateType) => state.promocode.status
export const getTotalCart = (state: RootStateType) => state.cart.total
export const getConcertErrors = (state: RootStateType) => state.concerts.errors
export const getPromocodeErrors = (state: RootStateType) => state.promocode.error

export const getMemoOfflineStatus = createSelector(getStatus, status =>
  status === STATUS.OFFLINE ? status : undefined
)

export const getMemoLoadingStatus = createSelector(getStatus, status =>
  status === STATUS.LOADING ? status : undefined
)

export const getMemoAuthStatus = createSelector(getStatusAuth, status =>
  status === STATUS.LOADING ? status : undefined
)
