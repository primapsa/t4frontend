import React from 'react';
import {Box, Button, FileInput, Flex, NumberInput, rem, Select, TextInput} from '@mantine/core';
import {IconCalendarTime, IconPhotoPlus} from '@tabler/icons-react';
import {DateTimePicker} from '@mantine/dates';
import {TICKETS} from "../../const/settings";
import TextEditor from "../TextEditor/TextEditor";
import {useStyles} from "./style";
import {useConcertForm} from "../../hooks/useConcertForm";
import AddressAutocomplete from "../Address/AddressAutocomplete";
import {STATUS} from "../../const/statuses";

const ConcertsForm = ({init, onClose}: InitialValuesType) => {

    const {classes} = useStyles()
    const {
        form,
        formHandler,
        currentDate,
        onChangeHandler,
        concertsType,
        concertType,
        singerVoice,
        onSetCoordinates,
        status
    } = useConcertForm({init, onClose})

    return (
        <Box className={classes.container}>
            <form onSubmit={formHandler}>
                <Flex className={classes.wrapper}>
                    <Box className={classes.box}>
                        <TextInput
                            label="Исполнитель"
                            placeholder="Введите"
                            {...form.getInputProps('title')}
                        />
                        <DateTimePicker
                            label="Дата и время"
                            valueFormat="YYYY-MM-DD HH:MM"
                            placeholder="Выберите"
                            clearable={true}
                            minDate={currentDate}
                            icon={<IconCalendarTime size={rem(16)}/>}
                            {...form.getInputProps('date')}
                        />
                        {
                            !init &&
                            <Select
                                label="Тип концерта"
                                placeholder="Выберите"
                                data={concertsType}
                                {...form.getInputProps('type')}
                                onChange={onChangeHandler}
                            />
                        }
                    </Box>
                    <Box className={classes.box}>
                        <AddressAutocomplete
                            onSetCoordinates={onSetCoordinates}
                            label="Место проведения"
                            placeholder="Адрес"
                            {...form.getInputProps('address')}/>
                        <TextInput
                            label="Координаты"
                            placeholder="Широта"
                            {...form.getInputProps('latitude')}
                        />
                        <TextInput
                            label="Координаты"
                            placeholder="Долгота"
                            {...form.getInputProps('longitude')}
                        />
                    </Box>
                    <Box className={classes.box}>
                        <FileInput
                            label="Постер концерта"
                            placeholder="Добавить"
                            accept="image/png,image/jpeg"
                            icon={<IconPhotoPlus size={rem(16)}/>}
                            {...form.getInputProps('poster')}
                        />
                        <NumberInput
                            label="Количество билетов"
                            placeholder="Введите"
                            min={TICKETS.COUNT.MIN}
                            {...form.getInputProps('ticket')}
                        />
                        <NumberInput
                            label="Цена билета"
                            placeholder="Введите"
                            min={TICKETS.PRICE.MIN}
                            {...form.getInputProps('price')}
                        />
                    </Box>
                    {
                        concertType === Type.CLASSIC &&
                        <Box className={classes.box}>
                            <Select
                                label="Тип голоса солиста"
                                placeholder="Выберите"
                                data={singerVoice}
                                {...form.getInputProps('singerVoice')}
                            />
                            <TextInput
                                label="Название концерта"
                                placeholder="Введите"
                                {...form.getInputProps('concertName')}
                            />
                            <TextInput
                                label="Композитор"
                                placeholder="Введите"
                                {...form.getInputProps('composer')}
                            />
                        </Box>}
                    {
                        concertType === Type.OPENAIR &&
                        <Box className={classes.box}>
                            <TextInput
                                label="Как проехать"
                                placeholder="Введите"
                                {...form.getInputProps('wayHint')}
                            />
                            <TextInput
                                label="Хэдлайнер"
                                placeholder="Введите"
                                {...form.getInputProps('headliner')}
                            />
                        </Box>
                    }
                    {
                        concertType === Type.PARTY &&
                        <Box className={classes.box}>
                            <TextInput
                                label="возрастной ценз"
                                placeholder="Введите"
                                {...form.getInputProps('censor')}
                            />
                        </Box>
                    }
                </Flex>
                <TextEditor name={'desc'} form={form}/>
                <Flex className={classes.submit}>
                    {/*<Button type="submit" disabled={!form.isValid()}>Добавить</Button>*/}
                    <Button type="submit" disabled={status === STATUS.LOADING}>Добавить</Button>
                </Flex>
            </form>
        </Box>
    );
};

export default React.memo(ConcertsForm);

export type InitialValuesType = {
    init: undefined | any
    onClose: () => void
}

enum Type {
    CLASSIC = 1,
    PARTY = 2,
    OPENAIR = 3
}