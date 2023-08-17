import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ConcertsType} from "../../api/api";
import {fetchConcertsAdmin, fetchConcerts, setPage, deleteConcert} from "../../redux/concertsReducer";
import {AppDispatchType, RootStateType} from "../../redux/store";
import Item from "../../components/Item/Item";
import {Container, Group, Header, Button, Flex, Pagination} from '@mantine/core';
import AddFrom from "../../components/AddForm/AddFrom";
import {PAGE} from "../../const/page";
import ActionBar from "../../components/ActionBar/ActionBar";
import Alert from "../../components/Alert/Alert";

const MainPage = () => {
    const [form, setForm] = useState(false)
    const concerts = useSelector<RootStateType, ConcertsType[]>(state => state.concerts.list)
    const total = useSelector<RootStateType, number>(state => state.concerts.total)
    const page = useSelector<RootStateType, number>(state => state.concerts.page)
    const pages = Math.ceil(total / PAGE.ITEM_PER_PAGE)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch<AppDispatchType>(fetchConcertsAdmin())
    }, [page, total])
    const onClickHandler = () => setForm(!form)
    const onChangeHandler = (page: number) => {
        dispatch<AppDispatchType>(setPage(page))
    }
    const onDeleteHandler = (id: number) =>{ dispatch<AppDispatchType>(deleteConcert(id))}
    const onEditHandler = () => {}
    const list = concerts.map(e => <Flex key={e.id}>
        <Item id={e.id}
              title={e.title}
              concertName={e.concertName}
              composer={e.composer}
              wayHint={e.wayHint}
              headliner={e.headliner}
              censor={e.censor}
              date={e.date}
              latitude={e.latitude}
              longitude={e.longitude}
              type={e.type}
              voice={e.voice}
              price={e.price}
              tickets={e.tickets}
        />
        <ActionBar  id={e.id} deleteItem={onDeleteHandler} editItem={onEditHandler}/>
    </Flex>)
    return (
        <Container w='1200px'>
            {!form && <Button onClick={onClickHandler}>Добавить концерт</Button>}
            {form && <AddFrom/>}

            <Flex direction={'column'}>
                {list}
            </Flex>
            {pages > 1 &&
                <Pagination total={pages} value={page} onChange={onChangeHandler} position={'center'}></Pagination>}
        </Container>
    );
};

export default MainPage;