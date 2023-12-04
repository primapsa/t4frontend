import React from 'react'

import { Box, Button, Group, NumberInput, TextInput, rem } from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import { IconCalendarTime } from '@tabler/icons-react'

import { PromocodesType } from '../../api/api'
import { PROMOCODES } from '../../const/settings'
import { usePromocodeForm } from '../../hooks/usePromocodeForm'

const PromocodeForm = ({ initValues, onClose }: PromocodeItemTypeForm) => {
  const { buttonDisable, buttonName, currentDate, form, formHandler } = usePromocodeForm({
    initValues,
    onClose,
  })

  return (
    <form onSubmit={formHandler}>
      <Box maw={300} mx={'auto'}>
        <TextInput label={'Промокод'} placeholder={'Введите'} {...form.getInputProps('title')} />
        <NumberInput
          label={'Скидка (в %)'}
          max={PROMOCODES.DISCOUNT.MAX}
          min={PROMOCODES.DISCOUNT.MIN}
          placeholder={'Введите'}
          {...form.getInputProps('discount')}
        />
        <DateTimePicker
          clearable
          dropdownType={'modal'}
          icon={<IconCalendarTime size={rem(16)} />}
          label={'Дата и время'}
          locale={'ru'}
          minDate={currentDate}
          placeholder={'Выберите'}
          valueFormat={'YYYY-MM-DD HH:MM'}
          {...form.getInputProps('date')}
        />
      </Box>
      <Group mt={'md'} position={'right'}>
        <Button disabled={buttonDisable} type={'submit'}>
          {buttonName}
        </Button>
      </Group>
    </form>
  )
}

export default React.memo(PromocodeForm)

export type PromocodeItemTypeForm = {
  initValues?: PromocodeInitValueType
  onClose: () => void
}
export type PromocodeInitValueType = PromocodesType | undefined
