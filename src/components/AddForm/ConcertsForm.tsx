import React from 'react'

import { Box, Button, FileInput, Flex, NumberInput, Select, TextInput, rem } from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import { IconCalendarTime, IconPhotoPlus } from '@tabler/icons-react'

import { TICKETS } from '../../const/settings'
import { STATUS } from '../../const/statuses'
import { useConcertForm } from '../../hooks/useConcertForm'
import AddressAutocomplete from '../Address/AddressAutocomplete'
import TextEditor from '../TextEditor/TextEditor'
import { useStyles } from './style'

const ConcertsForm = ({ init, onClose }: InitialValuesType) => {
  const { classes } = useStyles()
  const {
    concertType,
    concertsType,
    currentDate,
    form,
    formHandler,
    onChangeHandler,
    onSetCoordinates,
    singerVoice,
    status,
  } = useConcertForm({ init, onClose })

  return (
    <Box className={classes.container}>
      <form onSubmit={formHandler}>
        <Flex className={classes.wrapper}>
          <Box className={classes.box}>
            <TextInput
              label={'Исполнитель'}
              placeholder={'Введите'}
              {...form.getInputProps('title')}
            />
            <DateTimePicker
              clearable
              icon={<IconCalendarTime size={rem(16)} />}
              label={'Дата и время'}
              minDate={currentDate}
              placeholder={'Выберите'}
              valueFormat={'YYYY-MM-DD HH:MM'}
              {...form.getInputProps('date')}
            />
            {!init && (
              <Select
                data={concertsType}
                label={'Тип концерта'}
                placeholder={'Выберите'}
                {...form.getInputProps('type')}
                onChange={onChangeHandler}
              />
            )}
          </Box>
          <Box className={classes.box}>
            <AddressAutocomplete
              label={'Место проведения'}
              onSetCoordinates={onSetCoordinates}
              placeholder={'Адрес'}
              {...form.getInputProps('address')}
            />
            <TextInput
              label={'Координаты'}
              placeholder={'Широта'}
              {...form.getInputProps('latitude')}
            />
            <TextInput
              label={'Координаты'}
              placeholder={'Долгота'}
              {...form.getInputProps('longitude')}
            />
          </Box>
          <Box className={classes.box}>
            <FileInput
              accept={'image/png,image/jpeg'}
              icon={<IconPhotoPlus size={rem(16)} />}
              label={'Постер концерта'}
              placeholder={'Добавить'}
              {...form.getInputProps('poster')}
            />
            <NumberInput
              label={'Количество билетов'}
              min={TICKETS.COUNT.MIN}
              placeholder={'Введите'}
              {...form.getInputProps('ticket')}
            />
            <NumberInput
              label={'Цена билета'}
              min={TICKETS.PRICE.MIN}
              placeholder={'Введите'}
              {...form.getInputProps('price')}
            />
          </Box>
          {concertType === Type.CLASSIC && (
            <Box className={classes.box}>
              <Select
                data={singerVoice}
                label={'Тип голоса солиста'}
                placeholder={'Выберите'}
                {...form.getInputProps('singerVoice')}
              />
              <TextInput
                label={'Название концерта'}
                placeholder={'Введите'}
                {...form.getInputProps('concertName')}
              />
              <TextInput
                label={'Композитор'}
                placeholder={'Введите'}
                {...form.getInputProps('composer')}
              />
            </Box>
          )}
          {concertType === Type.OPENAIR && (
            <Box className={classes.box}>
              <TextInput
                label={'Как проехать'}
                placeholder={'Введите'}
                {...form.getInputProps('wayHint')}
              />
              <TextInput
                label={'Хэдлайнер'}
                placeholder={'Введите'}
                {...form.getInputProps('headliner')}
              />
            </Box>
          )}
          {concertType === Type.PARTY && (
            <Box className={classes.box}>
              <TextInput
                label={'возрастной ценз'}
                placeholder={'Введите'}
                {...form.getInputProps('censor')}
              />
            </Box>
          )}
        </Flex>
        <TextEditor form={form} name={'desc'} />
        <Flex className={classes.submit}>
          {/*<Button type="submit" disabled={!form.isValid()}>Добавить</Button>*/}
          <Button disabled={status === STATUS.LOADING} type={'submit'}>
            Добавить
          </Button>
        </Flex>
      </form>
    </Box>
  )
}

export default React.memo(ConcertsForm)

export type InitialValuesType = {
  init: any | undefined
  onClose: () => void
}

enum Type {
  CLASSIC = 1,
  OPENAIR = 3,
  PARTY = 2,
}
