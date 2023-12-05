import React from 'react'

import { Flex, Paper, Text } from '@mantine/core'

import { dateFormatDelimeter } from '../../utils/utils'
import { useStyles } from './style'

const Promocode = ({ date, discount, title }: PromocodeItemType) => {
  const { classes } = useStyles()

  return (
    <Paper className={classes.promocode}>
      <Flex className={classes.promocode__inner}>
        <Text className={classes.promocode__title}>{title}</Text>
        <Text>скидка {discount}%</Text>
      </Flex>
      <Text>до {dateFormatDelimeter(date)}</Text>
    </Paper>
  )
}

export default React.memo(Promocode)

type PromocodeItemType = {
  date: string
  discount: number
  editMode?: boolean
  title: string
}
