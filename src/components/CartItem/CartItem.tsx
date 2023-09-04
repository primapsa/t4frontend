import {Flex, Image, Paper, Text} from "@mantine/core";
import {MEDIA} from "../../const/media";
import NumberedCounter from "../NumberedCounter/NumberedCounter";
import ActionBar from "../ActionBar/ActionBar";
import Promocode from "../Promocode/Promocode";
import React from "react";
import {useStyles} from './styles'

const CartItem = (props: CartItemPropsType) => {
    const {classes} = useStyles()
    return (
        <Paper className={classes.paper}>
            <Flex className={classes.wrapper}>
                <Image src={`${MEDIA.URL}${props.poster}`}
                       width={'100px'} height={'100px'}>
                </Image>
                <Flex className={classes.info}>
                    <Text className={classes.title}>{props.title}</Text>
                    <Flex className={classes.control}>
                        <NumberedCounter
                            value={props.count}
                            onDecrement={props.onDecrement}
                            onIncrement={props.onIncrement}
                        />
                        <Flex className={classes.control__price}>
                            <Text td={!!props.discount ? 'line-through' : ''}>{`${props.price} USD`}</Text>
                            {!!props.discount && <Text color={'red'}>{`${props.discount} USD`}</Text>}
                        </Flex>
                    </Flex>
                </Flex>
                <Flex className={classes.icon}>
                    <ActionBar id={props.id} del={props.onDelete}/>
                </Flex>
            </Flex>
            <Promocode promocode={props.promocode}
                       id={props.id}
                       addCallback={props.onAdd}
            />
        </Paper>
    )
}
export default React.memo(CartItem)

type CartItemPropsType = {
    id: number
    poster: string
    title: string
    count: number
    price: number
    discount: number
    onDelete: (id: number) => void
    onAdd: (p: string, id: number) => void
    onChange: (id: number, value: string) => void
    onIncrement: (v: number) => void
    onDecrement: (v: number) => void
    promocode: string | null
}