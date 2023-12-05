import axios, { AxiosResponse } from 'axios'

import { PAGE } from '../const/page'
import { REST_API } from '../const/restApi'
import { addRequestHeader, makeQuery, refreshExpiredToken } from '../utils/utils'

const axiosInstance = axios.create({ baseURL: REST_API.BASE_URL })

axiosInstance.interceptors.request.use(addRequestHeader)
axiosInstance.interceptors.response.use(config => config, refreshExpiredToken(axiosInstance))

export const concertAPI = {
  addConcert(concert: FormData) {
    return axiosInstance.post<ConcertsType>('concerts/', concert, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  deleteConcert(id: number) {
    return axiosInstance.delete<ChangeResponseType>(`concerts/${id}`)
  },
  fetchConcert(id: number) {
    return axiosInstance.get<ConcertsType[]>(`concerts/${id}`)
  },
  fetchConcertType() {
    return axiosInstance.get<ConcertTypeResponse[]>('type/')
  },
  fetchConcerts(
    param: {
      ids: string
      query: string
      type: number
    },
    page: number = PAGE.NUMBER,
    count: number = PAGE.ITEM_PER_PAGE
  ) {
    return axiosInstance.get<ResponseType<ConcertsType[]>>(
      `concerts/${makeQuery(param, page, count)}`
    )
  },
  fetchSingerVoice() {
    return axiosInstance.get<SingerVoiceType[]>('voice/')
  },
  updateConcert(id: number, concert: FormData) {
    return axiosInstance.put<ConcertsType[]>(`concerts/${id}`, concert, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}

export const promocodeAPI = {
  addPromocode(promocode: PromocodeAddType) {
    return axiosInstance.post<PromocodesType>('promocodes/', promocode)
  },
  deletePromocode(id: number) {
    return axiosInstance.delete<AxiosResponse>(`promocodes/${id}`)
  },
  editPromocode(promocode: PromocodesType) {
    return axiosInstance.put<PromocodesType>(`promocodes/${promocode.id}`, promocode)
  },
  fetchPromocodes(page: number = PAGE.NUMBER, count: number = PAGE.ITEM_PER_PAGE) {
    return axiosInstance.get<ResponseType<PromocodesType[]>>(
      `promocodes/?count=${count}&page=${page}`
    )
  },
}

export const cartAPI = {
  addCart(cart: CartAddType) {
    return axiosInstance.post<CartType>('cart/', cart)
  },
  deleteCart(id: number) {
    return axiosInstance.delete(`cart/${id}`)
  },
  deleteUserCart(userId: number) {
    return axiosInstance.delete(`cart/user/${userId}`)
  },
  fetchUserCart(userId: number) {
    return axiosInstance.get<CartConcertsType[]>(`cart/user/${userId}`)
  },
  updateCart(param: { cart: Partial<CartType>; id: number }) {
    return axiosInstance.patch<PatchCartType>(`cart/${param.id}`, param.cart)
  },
  validateCartPomocode(param: { id: number; promocode: string }) {
    return axiosInstance.post<ValidatePromocodeType>(`promocode/`, param)
  },
}

export const paypalAPI = {
  createOrder(ids: number[]) {
    return axiosInstance.post('paypal/create/', { ids })
  },
}

export const authAPI = {
  login(credentials: CredentialsType) {
    return axiosInstance.post<AuthResponseType>('user/login/', credentials)
  },
  me() {
    return axiosInstance.get<AuthMeResponse>('user/me/')
  },
  refreshToken(token: { refresh: string }) {
    return axios.post<RefreshTokenResponseType>(REST_API.BASE_URL + 'token/refresh/', token)
  },
  register(register: AuthRequestRegType) {
    return axiosInstance.post<AuthRegisterType>('user/register/', register)
  },
  socialLogin(jwt: string) {
    return axiosInstance.post<AuthResponseType>('user/login/social/', { jwt })
  },
}

export const geoAPI = {
  mapGeocoding(address: string) {
    return axios.get<OpenStreetResponseType[]>(`${REST_API.GEOCODING}&q=${encodeURI(address)}`, {
      headers: { 'Accept-Language': 'ru' },
    })
  },
}

export type ResponseType<T> = {
  data: T
  total: number
}
export type PromocodeAddType = Omit<PromocodesType, 'id'>
export type AuthRequestRegType = Omit<AuthRegisterType, 'id'>
export type CartAddType = Omit<CartType, 'id'> & { id?: number }
export type ConcertsFileType = Omit<ConcertsType, 'poster'> & { poster: File }
export type AuthResponseType = {
  access: string
  refresh: string
}
type PatchCartType = {
  data: Partial<CartType>
  id: number
}
export type PayPalResponseTYpe = {
  billingToken: null | string
  facilitatorAccessToken: string
  orderID: string
  payerID: string
  paymentID: string
  paymentSource?: string
}
export type GoogleGeoResponse = {
  results: {
    address_components: {
      long_name: string
      short_name: string
      types: string[]
    }[]
    formatted_address: string
    geometry: {
      location: {
        lat: number
        lng: number
      }
    }
    place_id: string
  }[]
}

export type OpenStreetResponseType = {
  addresstype: string
  boundingbox: string[]
  class: string
  display_name: string
  importance: number
  lat: string
  licence: string
  lon: string
  name: string
  osm_id: number
  osm_type: number
  place_id: number
  place_rank: number
  type: string
}

type GooglePlaceResponse = {
  result: { name: string }
}
export type CartType = {
  concertId: number
  count: number
  id: number
  price: number
  promocodeId?: null | number
  statusId?: number
  userId: number
}
export type AuthRegisterType = {
  email: string
  first_name?: string
  id: number
  last_name?: string
  username: string
}
type RefreshTokenResponseType = {
  access: string
}
export type AuthMeResponse = {
  data: AuthMeType
}
export type AuthMeType = {
  email: string
  id: number
  is_staff: boolean
}
export type CredentialsType = {
  email: string
  password: string
  username: string
}
export type CartConcertsType = {
  count: number
  discount: null | number
  id: number
  poster: string
  price: number
  promocode: null | string
  status?: ItemStatus
  ticket_limit: number
  tickets: number
  title: string
}
export type PromocodesType = {
  date: string
  discount: number
  id: number
  status?: ItemStatus
  title: string
}
export type ItemStatus = 'add' | 'delete' | 'update'
export type ChangeResponseType = {
  id: number
}
export type ValidatePromocodeType = {
  cartId: number
  discount: number
  title: string
}
export type ConcertAddType = {
  censor: null | string
  composer: null | string
  concertName: string
  date: string
  headliner: null | string
  place: {
    address: string
    latitude: string
    longitude: string
  }
  price: number
  singerVoiceId: string
  tickets: number
  title: string
  typeId: number
  wayHint: null | string
}
export type ConcertsType = {
  censor: null | string
  composer: null | string
  concertName: string
  date: string
  desc: string
  headliner: null | string
  id: number
  place: {
    address: string
    latitude: string
    longitude: string
  }
  poster: string
  price: number
  singer: string
  singerVoice: number
  status?: ItemStatus
  ticket: number
  ticket_limit: number
  title: string

  type: string
  type_id: number
  voice: string
  wayHint: null | string
}
export type ConcertTypesType = {
  label: string
  value: string
}
export type ConcertTypeResponse = {
  id: string
  title: string
}
export type SingerVoiceType = {
  label: string
  value: string
}
