import React, {useCallback} from "react";
import {Button, Card, Flex, Image, Text} from "@mantine/core";
import {MEDIA} from "../../const/media";
import {IconClockHour3, IconMapPinFilled, IconWallet} from "@tabler/icons-react";
import {dateFormat} from "../../utils/utils";
import {useStyles} from "./styles";

const Ticket = ({id, source, title, address, date, price, onAddToCart}: TicketPropsType) => {

    const {classes} = useStyles()
    const onclickHandler = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        onAddToCart(id)
    },[id, onAddToCart])

    const dateTime = dateFormat(date)

    return (
        <Card className={classes.wrapper}>
            <Image className={classes.img}
                src={`${MEDIA.URL}${source}`}
                withPlaceholder
                alt={'poster'}
                fit={'fill'}/>
            <Text className={classes.title}>{title}</Text>
            <Flex className={classes.address}>
                <IconMapPinFilled/>
                <Text className={classes.address__text}>{address}</Text>
            </Flex>
            <Flex>
                <IconClockHour3/>
                <Flex className={classes.date}>
                    <Text className={classes.date__text}>{dateTime.date} </Text>
                    <Text className={classes.date__text}>{dateTime.time} </Text>
                </Flex>
            </Flex>
            <Flex className={classes.wallet}>
                <IconWallet/>
                <Text  className={classes.address}>от {price} USD</Text>
            </Flex>
            <Flex className={classes.buy}>
                <Button onClick={onclickHandler} variant={"outline"}>Купить</Button>
            </Flex>
        </Card>
    )
}
type TicketPropsType = {
    id: number
    source: string
    title: string
    address: string
    date: string
    price: number
    onAddToCart: (id: number) => void
}
export default React.memo(Ticket);