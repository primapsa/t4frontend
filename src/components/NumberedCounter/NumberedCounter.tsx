import React from 'react'

import { ActionIcon, Group, Text } from '@mantine/core'

import { GROUP, ICONS, TICKETS } from '../../const/settings'
import { useStyles } from './style'

const NumberedCounter = ({ limit, onDecrement, onIncrement, value }: NumberedCounterType) => {
  const { classes } = useStyles()
  const incrementHandler = () => {
    if (value < limit) {
      onIncrement(++value)
    }
  }
  const decrementHandler = () => {
    if (value) {
      onDecrement(--value)
    }
  }

  return (
    <Group spacing={GROUP.SPACING5}>
      <ActionIcon
        disabled={value === TICKETS.COUNT.MIN}
        onClick={decrementHandler}
        size={ICONS.COUNTER}
        variant={'default'}
      >
        –
      </ActionIcon>
      <Text className={classes.counterText}>{value}</Text>
      <ActionIcon
        disabled={value === limit}
        onClick={incrementHandler}
        size={ICONS.COUNTER}
        variant={'default'}
      >
        +
      </ActionIcon>
    </Group>
  )
}

export default React.memo(NumberedCounter)

type NumberedCounterType = {
  limit: number
  onDecrement: (v: number) => void
  onIncrement: (v: number) => void
  value: number
}
