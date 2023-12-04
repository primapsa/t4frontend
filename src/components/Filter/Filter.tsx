import React from 'react'

import { Button, Input, Select } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'

import { useFilter } from '../../hooks/useFilter'
import { useStyles } from './styles'

const Filter = () => {
  const { classes } = useStyles()
  const { form, formHandler, resetHandler, types } = useFilter()

  return (
    <form className={classes.form} onSubmit={formHandler}>
      <Input
        className={classes.search}
        icon={<IconSearch />}
        placeholder={'Введите запрос'}
        {...form.getInputProps('query')}
      />
      <Select
        className={classes.type}
        data={types}
        placeholder={'Выберите'}
        {...form.getInputProps('type')}
      />
      <div>
        <Button onClick={resetHandler} variant={'subtle'}>
          Сбросить фильтр
        </Button>
        <Button type={'submit'} variant={'light'}>
          Найти
        </Button>
      </div>
    </form>
  )
}

export default Filter
