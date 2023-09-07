import React, {useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, RootStateType} from "../../../redux/store";
import {ConcertsType} from "../../../api/api";
import {PAGE} from "../../../const/page";
import {Center, Flex} from '@mantine/core';
import {fetchConcertsAdmin, setPage} from "../../../redux/concertsReducer";
import Map from "../../../components/Map/Map"
import Filter from "../../../components/Filter/Filter";
import Pagination from "../../../components/Pagination/Pagination";
import {Link} from "react-router-dom";
import {LINKS} from "../../../const/routes";
import {addCart} from "../../../redux/cartReducer";
import Ticket from "../../../components/Ticket/Ticket";
import {AppStatus} from "../../../redux/appReducer";
import {AuthUserType} from "../../../redux/authReducer";
import {makePayload} from "../../../utils/utils";
import {useStyles} from "./styles";
import PreloaderExt from "../../../components/Preloader/PreloaderExt";
import {STATUS} from "../../../const/statuses";
import EmptyStateExt from "../../../components/Empty/EmptyStateExt";
import {
    getConcerts,
    getFilterQuery,
    getFilterType,
    getPage,
    getStatus,
    getTotal,
    getUser
} from "../../../selectors/selectors";

const Tickets = () => {

    const {classes} = useStyles()
    const concerts = useSelector<RootStateType, ConcertsType[]>(getConcerts)
    const total = useSelector<RootStateType, number>(getTotal)
    const page = useSelector<RootStateType, number>(getPage)
    const query = useSelector<RootStateType, string>(getFilterQuery)
    const type = useSelector<RootStateType, number>(getFilterType)
    const status = useSelector<RootStateType, AppStatus>(getStatus)
    const user = useSelector<RootStateType, AuthUserType>(getUser)


    const pages = Math.ceil(total / PAGE.ITEM_PER_PAGE)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch<AppDispatchType>(fetchConcertsAdmin())
    }, [page, total, query, type])


    const onChangeHandler = useCallback((page: number) => {
        dispatch<AppDispatchType>(setPage(page))
    }, [page])

    const addToCartHandler = useCallback((cId: number) => {

        const concert = concerts.find(c => c.id == cId)
        if (concert) {
            const payload = makePayload(cId, concert.price, user.id)
            dispatch<AppDispatchType>(addCart(payload))
        }

    }, [concerts])

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


    return (
        <PreloaderExt  isLoaded={status===STATUS.LOADING} >
            <Center className={classes.center}>
                <Flex className={classes.wrapper}>
                    <Filter/>
                    <EmptyStateExt isEmpty={!list.length}>
                        <Flex className={classes.tickets}>
                            {list}
                        </Flex>
                        <Pagination
                            total={pages}
                            page={page}
                            onChange={onChangeHandler}/>
                        <Map coordinates={coordinates}/>
                    </EmptyStateExt>
                </Flex>
            </Center>
        </PreloaderExt>
    );
};

export default React.memo(Tickets);