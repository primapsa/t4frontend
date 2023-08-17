import React from 'react';
import {Paper, Title, Text, Flex} from '@mantine/core';
import {NavLink, Link} from "react-router-dom";
import {LINKS} from "../../const/routes";

const Item = (props: ItemPropsType) => {
    return (
            <Paper p={'sm'} mt={'sm'}>
                <Flex>
                    <div>
                        <Title order={4}>{props.title}</Title>
                        <Text fw={500}>{props.type}</Text>
                        <Text>Дата: {props.date}</Text>
                    </div>
                    <div>
                        <Text>Билетов: {props.tickets}</Text>
                        <Text>Цена билета: {props.price}</Text>
                        <Text>Место: {`${props.latitude} ${props.longitude}`}</Text>
                    </div>
                    <div>
                        {props.voice && <Text>Тип голоса: {props.voice}</Text>}
                        {props.concertName && <Text>Название концерта: {props.concertName}</Text>}
                        {props.composer && <Text>Композитор: {props.composer}</Text>}
                        {props.censor && <Text>Ценз: {props.censor}</Text>}
                        {props.wayHint && <Text>Ценз: {props.wayHint}</Text>}
                        {props.headliner && <Text>Ценз: {props.headliner}</Text>}
                    </div>
                </Flex>
            </Paper>
    );
};

export default Item;

type ItemPropsType = {
    id: number
    title: string
    concertName: string | null
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