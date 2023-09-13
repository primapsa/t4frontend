import {RootStateType, useAppDispatch} from "../redux/store";
import {useSelector} from "react-redux";
import {ConcertsType} from "../api/api";
import {
    getConcerts,
    getFilterQuery,
    getFilterType,
    getPage,
    getStatus,
    getTotal,
    getUser, getUserId
} from "../selectors/selectors";
import {AppStatus} from "../redux/appReducer";
import {AuthUserType} from "../redux/authReducer";
import {PAGE} from "../const/page";
import React, {useCallback, useEffect, useMemo} from "react";
import {fetchConcertsAdmin, setPage} from "../redux/concertsReducer";
import {makePayload} from "../utils/utils";
import {addCart} from "../redux/cartReducer";
import {Link} from "react-router-dom";
import {LINKS} from "../const/routes";
import Ticket from "../components/Ticket/Ticket";
import {useStyles} from "../features/User/Tickets/styles";

export const useTickets = () => {

    const dispatch = useAppDispatch()
    const concerts = useSelector<RootStateType, ConcertsType[]>(getConcerts)
    const total = useSelector<RootStateType, number>(getTotal)
    const page = useSelector<RootStateType, number>(getPage)
    const query = useSelector<RootStateType, string>(getFilterQuery)
    const type = useSelector<RootStateType, number>(getFilterType)
    const status = useSelector<RootStateType, AppStatus>(getStatus)
    const userId = useSelector<RootStateType, number | null>(getUserId)
    const {classes} = useStyles()
    const pages = Math.ceil(total / PAGE.ITEM_PER_PAGE)

    useEffect(() => {
        dispatch(fetchConcertsAdmin())
    }, [page, query, type])


    const onChangeHandler = useCallback((page: number) => {
        dispatch(setPage(page))
    }, [page])

    const addToCartHandler =useCallback((cId: number) => {
        const concert = concerts.find(c => c.id == cId)
        if (concert && userId) {
            const payload = makePayload(cId, concert.price, userId)
            dispatch(addCart(payload))
        }
    }, [userId])


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
                address={concert.address}
                source={concert.poster}
                onAddToCart={addToCartHandler}
            ></Ticket>
        </Link>
    )

    const coordinates = useMemo(
        () => concerts
            .map(c =>
                ({
                    lat: parseFloat(c.latitude),
                    lng: parseFloat(c.longitude), title: c.title
                })
            ), [concerts])

    return {list,coordinates, page, status, pages, onChangeHandler}

}