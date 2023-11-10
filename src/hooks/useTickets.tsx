import {RootStateType, useAppDispatch} from "../redux/store";
import {useSelector} from "react-redux";
import {ConcertsType} from "../api/api";
import {
    getConcerts,
    getFilterQuery,
    getFilterType,
    getPage,
    getStatus,
    getStatusConcerts,
    getTotal,
    getUserId
} from "../selectors/selectors";
import {AppStatus} from "../redux/appReducer";
import {PAGE} from "../const/page";
import React, {useCallback, useEffect, useMemo} from "react";
import {fetchConcertsAdmin, setPage} from "../redux/concertsReducer";
import {makePayload} from "../utils/utils";
import {addCart} from "../redux/cartReducer";
import {Link} from "react-router-dom";
import {LINKS} from "../const/routes";
import Ticket from "../components/Ticket/Ticket";
import {useStyles} from "../features/User/Tickets/styles";
import {STATUS} from "../const/statuses";

export const useTickets = () => {

    const dispatch = useAppDispatch()
    const concerts = useSelector<RootStateType, ConcertsType[]>(getConcerts)
    const total = useSelector<RootStateType, number>(getTotal)
    const page = useSelector<RootStateType, number>(getPage)
    const query = useSelector<RootStateType, string>(getFilterQuery)
    const type = useSelector<RootStateType, number>(getFilterType)
    const status = useSelector<RootStateType, AppStatus>(getStatusConcerts)
    const appStatus = useSelector<RootStateType, AppStatus>(getStatus)
    const userId = useSelector<RootStateType, number | null>(getUserId)
    const {classes} = useStyles()
    const pages = Math.ceil(total / PAGE.ITEM_PER_PAGE)

    useEffect(() => {
        dispatch(fetchConcertsAdmin())
    }, [page, query, type])


    const onChangeHandler = useCallback((page: number) => {
        dispatch(setPage(page))
    }, [page])

    const addToCartHandler = (cId: number) => {
        const concert = concerts.find(c => c.id == cId)
        if (concert && userId) {
            const payload = makePayload(cId, concert.price, userId)
            dispatch(addCart(payload))
        }
    }

    const isLoaded = status === STATUS.LOADING && appStatus === STATUS.IDLE

    const list = concerts.map(concert =>
        <Link
            to={`../${LINKS.CONCERT}${concert.id}`}
            key={concert.id}
            className={classes.link}>
            <Ticket
                id={concert.id}
                date={concert.date}
                price={concert.price}
                title={concert.title}
                address={concert.place.address}
                source={concert.poster}
                status={concert.status}
                isSold = {!concert.ticket_limit}
                onAddToCart={addToCartHandler}
            ></Ticket>
        </Link>
    )

    const coordinates = useMemo(
        () => concerts
            .map(c =>
                ({
                    lat: parseFloat(c.place.latitude),
                    lng: parseFloat(c.place.longitude), title: c.title
                })
            ), [concerts])

    return {list, coordinates, page, status,appStatus, pages, onChangeHandler, isLoaded}

}