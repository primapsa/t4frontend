import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, RootStateType} from "../redux/store";
import {ConcertsType} from "../api/api";
import {AppStatus} from "../redux/appReducer";
import {useLoadScript} from "@react-google-maps/api";
import {useCallback, useEffect} from "react";
import {fetchConcert} from "../redux/concertReducer";
import {dateFormatDelimeter, makePayload} from "../utils/utils";
import {addCart} from "../redux/cartReducer";
import {getConcert, getIsStaff, getStatusConcert, getUserId} from "../selectors/selectors";

export const useSingleConcert = () => {

    const {id} = useParams()
    const concert = useSelector<RootStateType, ConcertsType>(getConcert)
    const status = useSelector<RootStateType, AppStatus>(getStatusConcert)
    const userId = useSelector<RootStateType, number | null>(getUserId)
    const isAdmin = useSelector<RootStateType, boolean>(getIsStaff)

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY as string,
    });

    const place = {lat: parseFloat(concert?.place?.latitude), lng: parseFloat(concert?.place?.longitude)} as const
    const dispatch = useDispatch()

    useEffect(() => {
        if (id) {
            dispatch<AppDispatchType>(fetchConcert(parseInt(id, 10)))
        }

    }, [])

    const addToCartHandler = useCallback(() => {
        if (concert && userId) {
            const payload = makePayload(concert.id, concert.price, userId)
            dispatch<AppDispatchType>(addCart(payload))
        }
    },[concert, userId])

    const dateTime = dateFormatDelimeter(concert.date)

    return {
        concert,
        status,
        dateTime,
        isAdmin,
        addToCartHandler,
        isLoaded,
        place
    }
}