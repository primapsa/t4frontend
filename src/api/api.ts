import axios from "axios";
import {REST_API} from "../const/restApi";
import {PAGE} from "../const/page";

const axiosInstance = axios.create({
    baseURL: REST_API.BASE_URL,
    headers: {
        'Authorization': `Token `,
    }
})

export const concertAPI = {
    fetchConcerts(query: string = '', page: number = PAGE.NUMBER, count: number = PAGE.ITEM_PER_PAGE) {
        return axiosInstance.get<ResponseType<ConcertsType[]>>(`concerts/?query=${query}&count=${count}&page=${page}`)
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
    fetchPromocodes(query: string = '', page: number = PAGE.NUMBER, count: number = PAGE.ITEM_PER_PAGE) {
        return axiosInstance.get<ConcertsResponseType>(`concerts/?query=${query}&count=${count}&page=${page}`)
    },
}
export type ChangeResponseType = {
    id: number
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
export type ConcertsResponseType = {
    data: ConcertsType[]
    total: number
}
type ResponseType<T> = {
    data: T
    total: number
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
    voice: string
    price: number
    tickets: number
}
export type ConcertTypesType = {
    value: string
    label: string
}
export type SingerVoiceType = {
    value: string
    label: string
}