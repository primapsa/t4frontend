import {Box, Button, Group, NumberInput, rem, TextInput} from "@mantine/core";
import {PROMOCODES} from "../../const/settings";
import {DateTimePicker} from "@mantine/dates";
import {IconCalendarTime} from "@tabler/icons-react";
import React from "react";
import {PromocodesType} from "../../api/api";
import {usePromocodeForm} from "../../hooks/usePromocodeForm";

const PromocodeForm = ({initValues, onClose}: PromocodeItemTypeForm) => {

  const {formHandler, form, currentDate, buttonName, buttonDisable} = usePromocodeForm({initValues, onClose})

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
                    locale={'ru'}
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


export type PromocodeItemTypeForm = {
    initValues?: PromocodeInitValueType
    onClose: ()=> void
}
export type PromocodeInitValueType = undefined | PromocodesType