import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, RootStateType} from "../redux/store";
import {ConcertsType} from "../api/api";
import {AppStatus} from "../redux/appReducer";
import {AuthUserType} from "../redux/authReducer";
import {useLoadScript} from "@react-google-maps/api";
import {useCallback, useEffect} from "react";
import {fetchConcert} from "../redux/concertReducer";
import {dateFormatDelimeter, makePayload} from "../utils/utils";
import {addCart} from "../redux/cartReducer";

export const useSingleConcert = () => {

    const {id} = useParams()
    const concert = useSelector<RootStateType, ConcertsType>(state => state.concert.item)
    const status = useSelector<RootStateType, AppStatus>(state => state.app.status)
    const user = useSelector<RootStateType, AuthUserType>(state => state.auth.user)
    const isAdmin = useSelector<RootStateType, boolean>(state => state.auth.isStaff)

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY as string,
    });

    const place = {lat: parseFloat(concert.latitude), lng: parseFloat(concert.longitude)} as const
    const dispatch = useDispatch()

    useEffect(() => {
        if (id) {
            dispatch<AppDispatchType>(fetchConcert(parseInt(id, 10)))
        }

    }, [])

    const addToCartHandler = () => {
        if (concert) {
            const payload = makePayload(concert.id, concert.price, user.id)
            dispatch<AppDispatchType>(addCart(payload))
        }
    }

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