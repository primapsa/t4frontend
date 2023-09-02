import React from 'react';
import {ActionIcon, Group, Text} from '@mantine/core';

const NumberedCounter = ({value, onIncrement, onDecrement}: NumberedCounterType) => {

    const incrementHandler = () => {
        onIncrement(value + 1)
    }
    const decrementHandler = () => {
        if (value > 1) {
            onDecrement(value - 1)
        }
    }

    return (
        <Group spacing={5}>
            <ActionIcon size={30} variant="default" onClick={decrementHandler}>
                –
            </ActionIcon>
            <Text p={'0 10px'}>{value}</Text>
            <ActionIcon size={30} variant="default" onClick={incrementHandler}>
                +
            </ActionIcon>
        </Group>
    );
}
export default React.memo(NumberedCounter)

type NumberedCounterType = {
    value: number
    onIncrement: (v: number) => void
    onDecrement: (v: number) => void
}