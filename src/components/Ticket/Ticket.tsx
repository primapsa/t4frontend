import React from "react";
import {Button, Card, Flex, Image, Text} from "@mantine/core";
import {MEDIA} from "../../const/media";
import {IconClockHour3, IconMapPinFilled, IconWallet} from "@tabler/icons-react";
import {dateFormat} from "../../utils/utils";

const Ticket = ({id, source, title, address, date, price, onAddToCart}: TicketPropsType) => {

    const onclickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        onAddToCart(id)
    }
    const dateTime = dateFormat(date)

    return (
        <Card maw={'300px'} p={'10px'} h={'100%'}>
            <Image
                src={`${MEDIA.URL}${source}`}
                width={280} height={380}
                withPlaceholder
                alt={'poster'}
                fit={'fill'}/>
            <Text fw={700} align={"center"} m={'5px 0'} h={'50px'}>{title}</Text>
            <Flex mb={'10px'}>
                <IconMapPinFilled/>
                <Text fw={500} ml={'10px'}>{address}</Text>
            </Flex>
            <Flex>
                <IconClockHour3/>
                <Flex direction={"column"} ml={'10px'} >
                    <Text fw={500}>{dateTime.date} </Text>
                    <Text fw={500}>{dateTime.time} </Text>
                </Flex>
            </Flex>
            <Flex m={'10px 0'}>
                <IconWallet/>
                <Text fw={500} ml={'10px'}>от {price} USD</Text>
            </Flex>
            <Flex justify={"right"}>
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