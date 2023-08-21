import {ConcertsType} from "../api/api";
import {PAGE} from "../const/page";

export const cordinatesCallback = () => (c: ConcertsType) => ({
    lat: parseFloat(c.latitude),
    lng: parseFloat(c.longitude)
})
export const makeQuery = (param: { query: string, type: number }, page: number, count: number) => {
    const queryString = []
    if (param.query) queryString.push(`keyword=${param.query}`)
    if (param.type) queryString.push(`type=${param.type}`)
    queryString.push(`page=${page}`, `count=${count}`)
    return `?${queryString.join('&')}`
}