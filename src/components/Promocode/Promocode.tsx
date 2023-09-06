import {Flex, Paper, Text} from "@mantine/core";
import React from "react";
import {useStyles} from "./style";
import {dateFormatDelimeter} from "../../utils/utils";

const Promocode = ({title, discount, date}: PromocodeItemType) => {

    const {classes} = useStyles()

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
    title: string
    discount: number
    date: string
    editMode?: boolean
}
