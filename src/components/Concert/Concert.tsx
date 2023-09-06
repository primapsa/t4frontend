import React, {useCallback, useEffect} from 'react';
import {GoogleMap, MarkerF, useLoadScript} from "@react-google-maps/api";
import {Button, Center, Flex, Image, Paper, Text, TypographyStylesProvider} from '@mantine/core';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, RootStateType} from "../../redux/store";
import {ConcertsType} from "../../api/api";
import {useParams} from "react-router-dom";
import {fetchConcert} from "../../redux/concertReducer";
import {AppStatus} from "../../redux/appReducer";
import {useStyles} from "./styles";
import {IconClockHour3, IconMapPinFilled, IconWallet} from "@tabler/icons-react";
import {dateFormatDelimeter, makePayload} from "../../utils/utils";
import {MEDIA} from "../../const/media";
import {addCart} from "../../redux/cartReducer";
import {AuthUserType} from "../../redux/authReducer";
import EmptyStateWithLoader from "../Empty/EmptyStateWithLoader";
import Preloader from "../Preloader/Preloader";

const Concert = () => {

    const {classes} = useStyles()
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

    const addToCartHandler = useCallback(() => {
        if (concert) {
            const payload = makePayload(concert.id, concert.price, user.id)
            dispatch<AppDispatchType>(addCart(payload))
        }
    }, [id])

    const dateTime = dateFormatDelimeter(concert.date)

    return (
        <EmptyStateWithLoader isEmpty={!Object.keys(concert).length} status={status}>
            <Center className={classes.center}>
                <Paper className={classes.paper}>
                    <Flex className={classes.wrapper}>
                        <Text className={classes.title}>{concert.title}</Text>
                        <Flex className={classes.about}>
                            <Flex>
                                <IconClockHour3/>
                                <Text>{dateTime}</Text>
                            </Flex>
                            <Flex className={classes.pin}>
                                <IconMapPinFilled/>
                                <Text>{concert.address}</Text>
                            </Flex>
                            <Flex>
                                <IconWallet/>
                                <Text>от {concert.price} USD</Text>
                            </Flex>
                        </Flex>
                        <div className={classes.container}>
                            <Image className={classes.image}
                                   src={`${MEDIA.URL}${concert.poster}`}
                                   withPlaceholder
                                   alt={'poster'}
                                   fit={'fill'}/>
                        </div>
                        <Flex className={classes.optional}>
                            {concert.censor && <Text>Ценз: {concert.censor}</Text>}
                            {concert.headliner && <Text>Хедлайнер: {concert.headliner}</Text>}
                            {concert.wayHint && <Text>Проезд: {concert.wayHint}</Text>}
                            {concert.composer && <Text>Композитор: {concert.composer}</Text>}
                            {concert.concertName && <Text>Концерт: {concert.concertName}</Text>}
                        </Flex>
                        <TypographyStylesProvider className={classes.innerHtml}>
                            <div dangerouslySetInnerHTML={{__html: concert.desc}}/>
                        </TypographyStylesProvider>
                        {!isAdmin &&
                            <Flex>
                                <Button onClick={addToCartHandler} size={"lg"}>Купить билет</Button>
                            </Flex>
                        }
                        <div className={classes.map}>
                            {isLoaded ?
                                <GoogleMap
                                    mapContainerClassName="map-container"
                                    mapContainerStyle={{width: '100%', height: '100%'}}
                                    center={place}
                                    zoom={10}>
                                    <MarkerF position={place}/>
                                </GoogleMap> : <Preloader/>
                            }
                        </div>
                    </Flex>
                </Paper>
            </Center>
        </EmptyStateWithLoader>
    );
};

export default Concert
