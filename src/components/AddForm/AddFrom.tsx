import React, {useEffect, useState} from 'react';
import * as yup from 'yup';
import {Paper} from '@mantine/core';
import {ErrorMessage, Field, Form, Formik, FormikHelpers, FormikValues} from 'formik';
import {
    useForm,
    UseFormReturnType,
    isNotEmpty,
    isEmail,
    isInRange,
    hasLength,
    matches,
    yupResolver
} from '@mantine/form';
import {Button, Group, TextInput, NumberInput, Box, Input, Select, Flex, FileInput, rem, Textarea } from '@mantine/core';
import {IconPhotoPlus, IconCalendarTime} from '@tabler/icons-react';
import {DateTimePicker} from '@mantine/dates';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, RootStateType} from "../../redux/store";
import {ConcertAddType, ConcertTypesType, SingerVoiceType} from "../../api/api";
import {addNewConcert, ConcertStatusType} from "../../redux/concertsReducer";
import {TICKETS} from "../../const/settings";
import {FORM} from "../../const/form";
import TextEditor from "../TextEditor/TextEditor";
import {STATUS} from "../../const/statuses";
import Alert from "../Alert/Alert";

const AddFrom = () => {
    const [concertType, setConcertType] = useState(0)
    const concertsType = useSelector<RootStateType, ConcertTypesType[]>(state => state.concerts.type)
    const singerVoice = useSelector<RootStateType, SingerVoiceType[]>(state => state.concerts.singerVoice)
    const status = useSelector<RootStateType, ConcertStatusType>(state => state.concerts.status)
    const currentDate = new Date();
    const dispatch = useDispatch()
    const form = useForm({
        validateInputOnBlur: true,
        initialValues: FORM.INIT,
        validate: yupResolver(FORM.VALIDATION),
    });
    useEffect(() => {
        if (status === STATUS.SUCCESS) {
            form.reset()
        }
    }, [status])
    const onChangeHandler = async (value: string) => {
        form.setFieldValue('typeId', value)
        setConcertType(Number(value))
        form.setValues(FORM.RESET)
    }

    const formHandler = form.onSubmit( (fields) => {
        const concert: ConcertAddType = {
            ...fields,
            place: {address: fields.address, latitude: fields.latitude, longitude: fields.longitude},
            typeId: Number(fields.typeId)
        }
        // let key: keyof typeof concert
        // for (key in concert) {
        //     const val = concert[key]
        //     if (concert[key] === '')
        //         delete concert[key]
        // }
        concert.date = new Date(concert.date).toISOString()

        const output = new FormData()
        let fieldsKey: keyof typeof concert
        for (fieldsKey in concert) {
            if (concert[fieldsKey]) {
                output.append(fieldsKey, concert[fieldsKey] as any)
            }
        }
        dispatch<AppDispatchType>(addNewConcert(output))

        //
    })


    return (
        <Box>

            <form onSubmit={formHandler}>
                <Flex align='start'>
                    <Box maw={300} mx="auto">
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
                        <Select
                            label="Тип концерта"
                            placeholder="Выберите"
                            data={concertsType}
                            {...form.getInputProps('typeId')}
                            onChange={onChangeHandler}
                        />
                        <FileInput
                            label="Постер концерта"
                            placeholder="Добавить"
                            accept="image/png,image/jpeg"
                            icon={<IconPhotoPlus size={rem(16)}/>}
                            {...form.getInputProps('poster')}

                        />
                    </Box>
                    <Box maw={300} mx="auto">
                        <TextInput
                            label="Место проведения"
                            placeholder="Адрес"
                            {...form.getInputProps('address')}
                        />
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
                    <Box maw={300} mx="auto">
                        <NumberInput
                            label="Количество билетов"
                            placeholder="Введите"
                            min={TICKETS.COUNT.MIN}
                            max={TICKETS.COUNT.MAX}
                            {...form.getInputProps('tickets')}
                        />
                        <NumberInput
                            label="Цена билета"
                            placeholder="Введите"
                            min={TICKETS.PRICE.MIN}
                            max={TICKETS.PRICE.MAX}
                            {...form.getInputProps('price')}
                        />
                        {/*<Textarea*/}
                        {/*    label="Описание концерта"*/}
                        {/*    placeholder="Введите"*/}
                        {/*    autosize*/}
                        {/*    minRows={3}*/}
                        {/*    {...form.getInputProps('desc')}*/}
                        {/*/>*/}
                    </Box>
                    {
                        concertType === 1 &&
                        <Box maw={300} mx="auto">
                            <Select
                                label="Тип голоса солиста"
                                placeholder="Выберите"
                                data={singerVoice}
                                {...form.getInputProps('singerVoiceId')}
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
                        concertType === 3 &&
                        <Box maw={300} mx="auto">
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
                        concertType === 2 &&
                        <Box maw={300} mx="auto">
                            <TextInput
                                label="возрастной ценз"
                                placeholder="Введите"
                                {...form.getInputProps('censor')}
                            />
                        </Box>
                    }
                </Flex>
                <TextEditor name={'desc'} form={form}/>
                <Group position="right" mt="md">
                    <Button type="submit" disabled={!form.isValid()}>Добавить</Button>
                </Group>
            </form>
        </Box>
    );
};

export default AddFrom;

type InitialValuesType = {
    title: string
    date: string


}