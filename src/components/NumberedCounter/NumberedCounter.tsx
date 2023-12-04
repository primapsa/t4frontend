import React from 'react'

import { ActionIcon, Group, Text } from '@mantine/core'

const NumberedCounter = ({ limit, onDecrement, onIncrement, value }: NumberedCounterType) => {
  const incrementHandler = () => {
    if (value < limit) {
      onIncrement(value + 1)
    }
  }
  const decrementHandler = () => {
    if (value > 1) {
      onDecrement(value - 1)
    }
  }

  return (
    <Group spacing={5}>
      <ActionIcon disabled={value === 1} onClick={decrementHandler} size={30} variant={'default'}>
        –
      </ActionIcon>
      <Text p={'0 10px'}>{value}</Text>
      <ActionIcon
        disabled={value === limit}
        onClick={incrementHandler}
        size={30}
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
