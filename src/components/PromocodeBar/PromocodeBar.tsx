import React, {useState} from 'react';
import {Badge, Button, Flex, Input} from '@mantine/core';
import {IconPlus} from '@tabler/icons-react';
import {useStyles} from "./style";


const PromocodeBar = ({promocode, id, addCallback}: PromocodePropsType) => {

    const {classes} = useStyles()
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [value, setValue] = useState<string>(promocode || '')
    const addHandler = () => {
        addCallback(value, id)
        setValue('')
        setIsVisible(false)
    }
    const showHandler = () => {
        setIsVisible(!isVisible)
    }
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
    const buttonName = isVisible ? 'Закрыть' : 'Промокод'


    return (
        <Flex className={classes.badge}>
            {
                !!promocode ?
                    <Badge className={classes.badge} variant="outline" >
                        {promocode}
                    </Badge> :
                    <Button variant="subtle" compact onClick={showHandler}>
                        {buttonName}
                    </Button>
            }{
            isVisible &&
            <Flex>
                <Input
                    placeholder="Промокод"
                    value={value}
                    onChange={onChangeHandler}
                    classNames={{input: classes.input}}
                />
                <Button className={classes.button}
                        onClick={addHandler}
                        compact size={'xs'}
                        disabled={!value}
                        variant={"outline"}>
                    <IconPlus className={classes.icon}/>
                </Button>
            </Flex>
        }
        </Flex>

    );
};

export default React.memo(PromocodeBar);


type PromocodePropsType = {
    promocode: string | null
    id: number
    addCallback: (promocode: string, id: number) => void
}
