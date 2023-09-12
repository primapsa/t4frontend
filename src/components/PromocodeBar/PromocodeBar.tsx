import React from 'react';
import {Badge, Button, Flex, Input} from '@mantine/core';
import {IconPlus} from '@tabler/icons-react';
import {useStyles} from "./style";
import {usePromocodeBar} from "../../hooks/usePromocodeBar";


const PromocodeBar = ({promocode, id, addCallback}: PromocodePropsType) => {

    const {classes} = useStyles()
    const {buttonName, value, isVisible, onChangeHandler, addHandler, showHandler} = usePromocodeBar({promocode, id, addCallback})

    return (
        <Flex className={classes.badge}>
            {
                !!promocode ?
                    <Badge className={classes.badge} variant="outline">
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


export type PromocodePropsType = {
    promocode: string | null
    id: number
    addCallback: (promocode: string, id: number) => void
}
