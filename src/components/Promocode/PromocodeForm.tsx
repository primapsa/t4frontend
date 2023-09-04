import {useDispatch} from "react-redux";
import {useForm, yupResolver} from "@mantine/form";
import {FORM} from "../../const/form";
import {addPromocode, editPromocode} from "../../redux/promocodesReducer";
import {AppDispatchType} from "../../redux/store";
import {Box, Button, Group, NumberInput, rem, TextInput} from "@mantine/core";
import {PROMOCODES} from "../../const/settings";
import {DateTimePicker} from "@mantine/dates";
import {IconCalendarTime} from "@tabler/icons-react";
import React from "react";
import {PromocodesType} from "../../api/api";

const PromocodeForm = ( { initValues } : PromocodeItemTypeForm) => {

    const init = initValues ? {...initValues, date: new Date(initValues.date)} : initValues
    const dispatch = useDispatch()
    const form = useForm({
        validateInputOnBlur: true,
        initialValues:  init || FORM.INIT.PROMOCODES,
        validate: yupResolver(FORM.VALIDATION.PROMOCODES),
    });
    const buttonDisable = !form.isValid()
    const buttonName = init ? 'Изменить' : 'Добавить'
    const currentDate =  new Date()
    const executePromocode = init ? editPromocode : addPromocode

    const formHandler = form.onSubmit((fields) => {
        const promocode = {...fields, date: new Date(fields.date).toISOString(), id: init?.id || 0}
        dispatch<AppDispatchType>(executePromocode(promocode))
        form.reset()
    })

    return (
        <form onSubmit={formHandler}>
            <Box maw={300} mx="auto">
                <TextInput
                    label="Промокод"
                    placeholder="Введите"
                    {...form.getInputProps('title')}
                />
                <NumberInput
                    label="Скидка (в %)"
                    placeholder="Введите"
                    min={PROMOCODES.DISCOUNT.MIN}
                    max={PROMOCODES.DISCOUNT.MAX}
                    {...form.getInputProps('discount')}
                />
                <DateTimePicker
                    label="Дата и время"
                    valueFormat="YYYY-MM-DD HH:MM"
                    placeholder="Выберите"
                    clearable={true}
                    minDate={currentDate}
                    dropdownType={'modal'}
                    icon={<IconCalendarTime size={rem(16)}/>}
                    {...form.getInputProps('date')}
                />
            </Box>
            <Group position="right" mt="md">
                <Button type="submit" disabled={buttonDisable}>{buttonName}</Button>
            </Group>
        </form>
    )
}

export default React.memo(PromocodeForm)


type PromocodeItemTypeForm = {
    initValues?: PromocodeInitValueType
}
export type PromocodeInitValueType = undefined |  PromocodesType