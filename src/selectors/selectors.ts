import {RootStateType} from "../redux/store";

export const getNotice = (state:RootStateType) => state.app.notification
export const getConcerts = (state:RootStateType) => state.concerts.list
export const getSingerVoice = (state:RootStateType) => state.concerts.singerVoice
export const getPopup = (state:RootStateType) => state.app.popup
export const getCart = (state:RootStateType) => state.cart.list
export const getUser = (state:RootStateType) => state.auth.user
export const getStatus = (state:RootStateType) => state.app.status
export const getConcertType = (state:RootStateType) => state.concerts.type
export const getFilterQuery = (state:RootStateType) => state.filter.query
export const getFilterType = (state:RootStateType) => state.filter.type
export const getIsAuth = (state:RootStateType) => state.auth.isAuth
export const getIsStaff = (state:RootStateType) => state.auth.isStaff
export const getPromocodes = (state:RootStateType) => state.promocode.list
export const getTotal = (state:RootStateType) => state.concerts.total
export const getPage = (state:RootStateType) => state.concerts.page