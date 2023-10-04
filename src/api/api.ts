import axios, {AxiosResponse} from "axios";
import {REST_API} from "../const/restApi";
import {PAGE} from "../const/page";
import {addRequestHeader, makeQuery, refreshExpiredToken} from "../utils/utils";

const axiosInstance = axios.create({baseURL: REST_API.BASE_URL})
axiosInstance.interceptors.request.use(addRequestHeader)
axiosInstance.interceptors.response.use( async (config) => {
    const a = await new Promise(resolve => setTimeout(resolve, 500))
    return config

}, refreshExpiredToken(axiosInstance))

export const concertAPI = {
    fetchConcerts(param: { query: string, type: number, ids: string }, page: number = PAGE.NUMBER, count: number = PAGE.ITEM_PER_PAGE) {

        return axiosInstance.get<ResponseType<ConcertsType[]>>(`concerts/${makeQuery(param, page, count)}`)
    },
    fetchConcertType() {
        return axiosInstance.get<ConcertTypesType[]>('type/')
    },
    fetchSingerVoice() {
        return axiosInstance.get<SingerVoiceType[]>('voice/')
    },
    addConcert(concert: FormData) {
        return axiosInstance.post<ConcertsType[]>('concerts/', concert, {headers: {'Content-Type': 'multipart/form-data'}})
    },
    deleteConcert(id: number) {
        return axiosInstance.delete<ChangeResponseType>(`concerts/${id}`)
    },
    fetchConcert(id: number) {
        return axiosInstance.get<ConcertsType[]>(`concerts/${id}`)
    },
    updateConcert(id: number, concert: FormData) {
        return axiosInstance.put<ConcertsType[]>(`concerts/${id}`, concert, {headers: {'Content-Type': 'multipart/form-data'}})
    }
}

export const promocodeAPI = {
    fetchPromocodes(page: number = PAGE.NUMBER, count: number = PAGE.ITEM_PER_PAGE) {
        return axiosInstance.get<ResponseType<PromocodesType[]>>(`promocodes/?count=${count}&page=${page}`)
    },
    deletePromocode(id: number) {
        return axiosInstance.delete<AxiosResponse>(`promocodes/${id}`)
    },
    addPromocode(promocode: PromocodeAddType) {
        return axiosInstance.post<PromocodesType>('promocodes/', promocode)
    },
    editPromocode(promocode: PromocodesType) {
        return axiosInstance.put<PromocodesType>(`promocodes/${promocode.id}`, promocode)
    }
}

export const cartAPI = {
    fetchUserCart(userId: number) {
        return axiosInstance.get<CartConcertsType[]>(`cart/user/${userId}`)
    },
    deleteUserCart(userId: number) {
        return axiosInstance.delete(`cart/user/${userId}`)
    },
    addCart(cart: CartAddType) {
        return axiosInstance.post<CartType>('cart/', cart)
    },
    deleteCart(id: number) {
        return axiosInstance.delete(`cart/${id}`)
    },
    validateCartPomocode(param: { promocode: string, id: number }) {
        return axiosInstance.post<ValidatePromocodeType>(`promocode/`, param)
    },
    updateCart(param: { id: number, cart: Partial<CartType> }) {
        return axiosInstance.patch<PatchCartType>(`cart/${param.id}`, param.cart)
    }
}

export const paypalAPI = {
    createOrder(ids: number[]) {
        return axiosInstance.post('paypal/create/', {ids})
    },
}

export const authAPI = {
    login(credentials: CredentialsType) {
        return axiosInstance.post<AuthResponseType>('user/login/', credentials)
    },
    me() {
        return axiosInstance.get<AuthMeResponse>('user/me/')
    },
    socialLogin(jwt: string) {
        return axiosInstance.post<AuthResponseType>('user/login/social/', {jwt})
    },
    register(register: AuthRequestRegType) {
        return axiosInstance.post<AuthRegisterType>('user/register/', register)
    },
    refreshToken(token: { refresh: string }) {
        return axios.post<RefreshTokenResponseType>(REST_API.BASE_URL + 'token/refresh/', token)
    }
}

export const geoAPI = {
    mapGeocoding(address: string) {
        return axios.get<OpenStreetResponseType[]>(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURI(address)}&countrycodes=by`, {headers: {'Accept-Language': 'ru'}})
    },
}

export type ResponseType<T> = {
    data: T
    total: number
}
export type PromocodeAddType = Omit<PromocodesType, 'id'>
export type AuthRequestRegType = Omit<AuthRegisterType, 'id'>
export type CartAddType = Omit<CartType, 'id'>
export type ConcertsFileType = Omit<ConcertsType, 'poster'> & { poster: File }
export type AuthResponseType = {
    refresh: string
    access: string
}
type PatchCartType = {
    id: number
    data: Partial<CartType>
}
export type PayPalResponseTYpe = {
    billingToken: string | null
    facilitatorAccessToken: string
    orderID: string
    payerID: string
    paymentID: string
    paymentSource?: string
}
export type GoogleGeoResponse = {
    results: {
        formatted_address: string
        address_components: {
            long_name: string
            short_name: string
            types: string[]
        }[]
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
    id: number
    userId: number
    concertId: number
    count: number
    promocodeId?: number | null
    price: number
    statusId?: number
}
export type AuthRegisterType = {
    id: number
    username: string
    first_name?: string
    last_name?: string
    email: string
}
type RefreshTokenResponseType = {
    access: string
}
export type AuthMeResponse = {
    data: AuthMeType
}
export type AuthMeType = {
    email: string
    is_staff: boolean
    id: number
}
export type CredentialsType = {
    username: string
    password: string
    email: string
}
export type CartConcertsType = {
    count: number
    discount: number | null
    id: number
    poster: string
    price: number
    tickets: number
    title: string
    promocode: string | null
    status?: ItemStatus
}
export type PromocodesType = {
    id: number
    title: string
    discount: number
    date: string
    status?: ItemStatus
}
export type ItemStatus = 'delete' | 'add' | 'update'
export type ChangeResponseType = {
    id: number
}
export type ValidatePromocodeType = {
    cartId: number
    title: string
    discount: number
}
export type ConcertAddType = {
    title: string
    date: string
    place: {
        address: string
        latitude: string
        longitude: string
    }
    typeId: number
    singerVoiceId: string
    concertName: string
    composer: null | string
    wayHint: null | string
    headliner: null | string
    censor: null | string
    price: number
    tickets: number

}
export type ConcertsType = {
    id: number
    title: string
    singer: string
    concertName: string
    composer: null | string
    wayHint: null | string
    headliner: null | string
    censor: null | string
    date: string
    latitude: string
    longitude: string
    type: string
    typeId_id: number
    voice: string
    price: number
    ticket: number
    address: string
    singerVoiceId_id: number
    poster: string
    desc: string
    status?: ItemStatus
}
export type ConcertTypesType = {
    value: string
    label: string
}
export type SingerVoiceType = {
    value: string
    label: string
}