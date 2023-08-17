import React, {useEffect, useState} from 'react';
import {Container, Group, Header, Button, Flex, Pagination, Paper, Text, Center} from '@mantine/core';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, RootStateType} from "../../../redux/store";
import {AppStatus} from "../../../redux/appReducer";
import {PromocodesType} from "../../../api/api";
import {fetchPromocodes} from "../../../redux/promocodesReducer";

const Promocodes = () => {
    const appStatus = useSelector<RootStateType, AppStatus>(state => state.app.status)
    const promocodes = useSelector<RootStateType, PromocodesType[]>(state => state.promocode.list)
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false)
    const [isPageReady, setIsPageReady] = useState<boolean>(false)
    const list = promocodes.map( p => <PromocodeItem date={p.date} title={p.title} discount={p.discount} /> )
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch<AppDispatchType>(fetchPromocodes())
    },[])
    return (
        <Center>
            {list}
        </Center>
    );
};

const PromocodeItem = ({title, discount,date, editMode = false}: PromocodeItemType) => {
 return (
     <Paper style={{margin: '10px'}}>
         <Text fw={700}>{discount}%</Text>
         <Text fw={500}>{title}</Text>
         <Text fw={500}>до {date}</Text>
     </Paper>
 )
}
type PromocodeItemType = {
    title: string
    discount: number
    date: string
    editMode?: boolean
}

export default Promocodes;