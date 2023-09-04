import React from 'react';
import {Flex, Image, Paper, Text} from '@mantine/core';
import {useStyles} from "./styles";
import {MEDIA} from "../../const/media";

const Item = (props: ItemPropsType) => {

    const {classes} = useStyles()

    return (
        <Paper className={classes.paper}>
            <Flex>
                <Image
                    className={classes.image}
                    src={`${MEDIA.URL}${props.poster}`}
                    width={100} height={100}
                    withPlaceholder
                    alt={'poster'}
                />
                <Flex className={classes.concert}>
                    <Text className={classes.concert__title}>{props.title}</Text>
                    <Flex className={classes.concert__info}>
                        <Flex className={classes.concert__flex}>
                            <Text>{props.type}</Text>
                            <Text>{props.date}</Text>
                        </Flex>
                        <Flex className={classes.concert__tickets}>
                            <Text>Билетов: {props.ticket}</Text>
                            <Text>Стоимость: {props.price} USD</Text>
                            <Text>Место: {props.address}</Text>
                        </Flex>
                        <Flex className={classes.concert__flex}>
                            {props.voice && <Text>Тип голоса: {props.voice}</Text>}
                            {props.concertName && <Text>Название концерта: {props.concertName}</Text>}
                            {props.composer && <Text>Композитор: {props.composer}</Text>}
                            {props.censor && <Text>Ценз: {props.censor}</Text>}
                            {props.wayHint && <Text>Проезд: {props.wayHint}</Text>}
                            {props.headliner && <Text>Хедлайнер: {props.headliner}</Text>}
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Paper>
    );
};

export default React.memo(Item);

type ItemPropsType = {
    id: number
    title: string
    concertName: string | null
    composer: null | string
    wayHint: null | string
    headliner: null | string
    censor: null | string
    date: string
    address: string
    type: string
    voice: string
    price: number
    ticket: number
    poster: string
}