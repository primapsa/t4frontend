import React from 'react';
import {Button, Input, Select} from '@mantine/core';
import {IconSearch} from '@tabler/icons-react';
import {useStyles} from "./styles";
import {useFilter} from "../../hooks/useFilter";

const Filter = () => {

    const {classes} = useStyles()
    const {form, formHandler, resetHandler, types} = useFilter()

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