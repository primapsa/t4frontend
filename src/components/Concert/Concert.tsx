import React from 'react';
import {GoogleMap, MarkerF} from "@react-google-maps/api";
import {Button, Center, Flex, Image, Paper, Text, TypographyStylesProvider, Badge} from '@mantine/core';
import {useStyles} from "./styles";
import {IconClockHour3, IconMapPinFilled, IconWallet} from "@tabler/icons-react";
import {MEDIA} from "../../const/media";
import EmptyStateWithLoader from "../Empty/EmptyStateWithLoader";
import Preloader from "../Preloader/Preloader";
import {useSingleConcert} from "../../hooks/useSingleConcert";

const Concert = () => {

    const {classes} = useStyles()
    const {concert, status, dateTime, isAdmin, addToCartHandler, isLoaded, place} = useSingleConcert()

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
                                {
                                    Boolean(concert.ticket_limit) ?
                                        <Button onClick={addToCartHandler} size={"lg"}>Купить билет</Button>
                                        :
                                        <Badge variant="outline" color="red" size="xl" radius="md">Билетов нет</Badge>
                                }

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
