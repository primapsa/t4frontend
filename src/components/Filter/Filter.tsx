import React, {useEffect} from 'react';
import {fetchConcertsTypes} from "../../redux/concertsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, RootStateType} from "../../redux/store";
import {ConcertTypesType} from "../../api/api";
import {Button, Flex, Input, Select} from '@mantine/core';
import {IconSearch} from '@tabler/icons-react';
import {useForm} from '@mantine/form';
import {resetFilter, setFilter} from "../../redux/filterReducer";

const Filter = () => {
    const types = useSelector<RootStateType, ConcertTypesType[]>(state => state.concerts.type)
    const query = useSelector<RootStateType, string>(state => state.filter.query)
    const type = useSelector<RootStateType, number>(state => state.filter.type)
    const dispatch = useDispatch()
    const form = useForm({
        initialValues: {query, type},
    });

    useEffect(() => {
        dispatch<AppDispatchType>(fetchConcertsTypes())
    }, [])

    const formHandler = form.onSubmit((fields) => {
        dispatch<AppDispatchType>(setFilter(fields))
    })
    const resetHandler = () => {
        dispatch<AppDispatchType>(resetFilter())
        form.reset()
    }
    return (
        <Flex style={{padding: '20px'}}>
            <form onSubmit={formHandler}>
                <Input style={{minWidth: '250px'}}
                       icon={<IconSearch/>}
                       placeholder="Введите запрос"
                       {...form.getInputProps('query')}
                />
                <Select
                    placeholder="Выберите"
                    data={types}
                    {...form.getInputProps('type')}
                />
                <Button variant="subtle" onClick={resetHandler}>
                    Сбросить фильтр
                </Button>
                <Button variant="light" type='submit'>
                    Найти
                </Button>
            </form>
        </Flex>
    );
};

export default Filter;