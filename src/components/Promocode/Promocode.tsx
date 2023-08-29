import React, {useState} from 'react';
import {Button, Flex, Input} from '@mantine/core';
import {IconPlus} from '@tabler/icons-react';

const Promocode = ({promocode, id,addCallback, changeCallback}:PromocodePropsType) => {
    const [isVisible, setIsVisible] = useState(false)
    const value = promocode ? promocode : ''
    const addHandler = () => addCallback(value, id)
    const showHandler = () => setIsVisible(true)
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => changeCallback(id, e.target.value)
    return (
        <>
            <Button variant="outline" onClick={showHandler}>Добавить промокод</Button>
            {
                isVisible &&
                <Flex>
                    <Input
                        placeholder="Промокод"
                        value={value}
                        onChange={onChangeHandler}
                    />
                    <Button onClick={addHandler} disabled={!promocode}><IconPlus/></Button>
                </Flex>
            }
        </>

    );
};
type PromocodePropsType = {
    promocode: string | null
    id: number
    addCallback: (promocode: string, id: number) => void
    changeCallback: (id: number, value: string) => void
}
export default Promocode;