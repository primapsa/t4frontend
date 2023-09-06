import React, {useCallback, useEffect} from 'react';
import {fetchConcertsTypes} from "../../redux/concertsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, RootStateType} from "../../redux/store";
import {ConcertTypesType} from "../../api/api";
import {Button, Input, Select} from '@mantine/core';
import {IconSearch} from '@tabler/icons-react';
import {useForm} from '@mantine/form';
import {resetFilter, setFilter} from "../../redux/filterReducer";
import {useStyles} from "./styles";
import {getConcertType, getFilterQuery, getFilterType} from "../../selectors/selectors";

const Filter = () => {

    const {classes} = useStyles()
    const types = useSelector<RootStateType, ConcertTypesType[]>(getConcertType)
    const query = useSelector<RootStateType, string>(getFilterQuery)
    const type = useSelector<RootStateType, number>(getFilterType)
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
    const resetHandler = useCallback(() => {
        dispatch<AppDispatchType>(resetFilter())
        form.reset()
    }, [])


    return (
        <form onSubmit={formHandler} className={classes.form}>
            <Input className={classes.search}
                   icon={<IconSearch/>}
                   placeholder="Введите запрос"
                   {...form.getInputProps('query')}
            />
            <Select className={classes.type}
                    placeholder="Выберите"
                    data={types}
                    {...form.getInputProps('type')}
            />
            <div>
                <Button variant="subtle" onClick={resetHandler}>
                    Сбросить фильтр
                </Button>
                <Button variant="light" type='submit'>
                    Найти
                </Button>
            </div>
        </form>
    );
};

export default Filter;