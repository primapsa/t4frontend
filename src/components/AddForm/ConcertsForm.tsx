import React, {useCallback, useState} from 'react';
import {Box, Button, FileInput, Flex, NumberInput, rem, Select, TextInput} from '@mantine/core';
import {useForm, yupResolver} from '@mantine/form';
import {IconCalendarTime, IconPhotoPlus} from '@tabler/icons-react';
import {DateTimePicker} from '@mantine/dates';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, RootStateType} from "../../redux/store";
import {ConcertTypesType, SingerVoiceType} from "../../api/api";
import {addNewConcert, updateConcert} from "../../redux/concertsReducer";
import {TICKETS} from "../../const/settings";
import {FORM} from "../../const/form";
import TextEditor from "../TextEditor/TextEditor";
import {formatConcertRequest, formatConcertUpdateRequest} from "../../utils/concertRequestFromat";
import {concertInitAdapter} from "../../utils/concertInitAdapter";
import {useStyles} from "./style";
import {getConcerts, getSingerVoice} from "../../selectors/selectors";

const ConcertsForm = ({init, onClose}: InitialValuesType) => {

    const {classes} = useStyles()
    const initial = init ? concertInitAdapter(init) : init
    const [concertType, setConcertType] = useState<Number>(Number(initial?.typeId || ''))
    const concertsType = useSelector<RootStateType, ConcertTypesType[]>(getConcerts)
    const singerVoice = useSelector<RootStateType, SingerVoiceType[]>(getSingerVoice)

    const currentDate = new Date();
    const dispatch = useDispatch()

    const form = useForm({

        validateInputOnBlur: true,
        initialValues: initial || FORM.INIT.CONCERTS,
        validate: yupResolver(FORM.VALIDATION.CONCERTS),
    });

    const onChangeHandler =useCallback( async (value: string) => {

        form.setFieldValue('typeId', value)
        setConcertType(Number(value))
        form.setValues(FORM.RESET)
    },[])

    const formHandler = form.onSubmit((fields) => {

        const formatted = formatConcertRequest(fields)
        init ?
            dispatch<AppDispatchType>(updateConcert({id: initial.id, concert: formatConcertUpdateRequest(fields)})) :
            dispatch<AppDispatchType>(addNewConcert(formatted))
        onClose()
    })

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
                        <Select
                            label="Тип концерта"
                            placeholder="Выберите"
                            data={concertsType}
                            {...form.getInputProps('typeId')}
                            onChange={onChangeHandler}
                        />
                    </Box>
                    <Box className={classes.box}>
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
                            max={TICKETS.COUNT.MAX}
                            {...form.getInputProps('ticket')}
                        />
                        <NumberInput
                            label="Цена билета"
                            placeholder="Введите"
                            min={TICKETS.PRICE.MIN}
                            max={TICKETS.PRICE.MAX}
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
                    <Button type="submit" disabled={!form.isValid()}>Добавить</Button>
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