import React from 'react';
import {ActionIcon, Group, Text} from '@mantine/core';

const NumberedCounter = ({value, limit, onIncrement, onDecrement}: NumberedCounterType) => {

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
            <ActionIcon size={30} variant="default" onClick={decrementHandler} disabled={value === 1}>
                –
            </ActionIcon>
            <Text p={'0 10px'}>{value}</Text>
            <ActionIcon size={30} variant="default" onClick={incrementHandler} disabled={value === limit}>
                +
            </ActionIcon>
        </Group>
    );
}
export default React.memo(NumberedCounter)

type NumberedCounterType = {
    value: number
    limit: number
    onIncrement: (v: number) => void
    onDecrement: (v: number) => void
}