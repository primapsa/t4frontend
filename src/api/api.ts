import axios, {AxiosResponse} from "axios";
import {REST_API} from "../const/restApi";
import {PAGE} from "../const/page";
import {makeQuery} from "../utils/utils";

const axiosInstance = axios.create({
    baseURL: REST_API.BASE_URL,
    headers: {
        'Authorization': `Token `,
    }
})

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
    addConcert(concert: any) {
        return axiosInstance.post<ConcertsType>('concerts/', concert, {headers: {'Content-Type': 'multipart/form-data'}})
    },
    deleteConcert(id: number) {
        return axiosInstance.delete<ChangeResponseType>(`concerts/${id}`)
    },
    fetchConcert(id: number) {
        return axiosInstance.get<ConcertsType[]>(`concerts/${id}`)
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
    addCart(cart: CartAddType) {
        return axiosInstance.post<CartType>('cart/', cart)
    },
    deleteCart(id: number) {
        return axiosInstance.delete(`cart/${id}`)
    },
    validateCartPomocode(param: { promocode: string, id: number }) {
        return axiosInstance.post<ValidatePromocodeType>(`promocode/`, param)
    }
}
export const paypalAPI = {
    createOrder(ids: number[]) {
        return axiosInstance.post('paypal/create/', {ids})
    }
}
export const authAPI = {
    login(credentials: CredentialsType) {
        return axiosInstance.post<AuthResponseType>('user/login/', credentials)
    }
}


type ResponseType<T> = {
    data: T
    total: number
}
export type PromocodeAddType = Omit<PromocodesType, 'id'>
//export type CartAddType = Partial<Pick<Omit<CartType, 'id'>, 'promocodeId' | 'count'>>
export type CartAddType = Omit<CartType, 'id'>
export type AuthResponseType = {
    refresh: string
    access: string
}
export type CartType = {
    id: number
    userId: number
    concertId: number
    count: number
    promocodeId?: number | null
    price: number
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
}
export type PromocodesType = {
    id: number
    title: string
    discount: number
    date: string
}
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
    tickets: number
    address: string
    singerVoiceId_id: number
    poster: string
}
export type ConcertTypesType = {
    value: string
    label: string
}
export type SingerVoiceType = {
    value: string
    label: string
}