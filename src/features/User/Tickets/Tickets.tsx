import React, {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, RootStateType} from "../../../redux/store";
import {ConcertsType} from "../../../api/api";
import {PAGE} from "../../../const/page";
import {Button, Card, Center, Flex, Grid, Image, Text} from '@mantine/core';
import {MEDIA} from "../../../const/media";
import {IconClockHour3, IconMapPinFilled, IconWallet} from '@tabler/icons-react';
import {fetchConcertsAdmin, setPage} from "../../../redux/concertsReducer";
import Map from "../../../components/Map/Map"
import Filter from "../../../components/Filter/Filter";
import Pagination from "../../../components/Pagination/Pagination";
import {Link} from "react-router-dom";
import {LINKS} from "../../../const/routes";

const Tickets = () => {
    const concerts = useSelector<RootStateType, ConcertsType[]>(state => state.concerts.list)
    const total = useSelector<RootStateType, number>(state => state.concerts.total)
    const page = useSelector<RootStateType, number>(state => state.concerts.page)
    const query = useSelector<RootStateType, string>(state => state.filter.query)
    const type = useSelector<RootStateType, number>(state => state.filter.type)
    const pages = Math.ceil(total / PAGE.ITEM_PER_PAGE)
    const dispatch = useDispatch()

    const onChangeHandler = (page: number) => {
        dispatch<AppDispatchType>(setPage(page))
    }

    const list = concerts.map(concert =>
        <Grid.Col span={3} key={concert.id}>
            <Link to={`../${LINKS.CONCERT}${concert.id}`}>
                <Ticket date={concert.date}
                        price={concert.price}
                        title={concert.title}
                        address={concert.address}
                        source={concert.poster}
                ></Ticket>
            </Link>

        </Grid.Col>)

    useEffect(() => {
        dispatch<AppDispatchType>(fetchConcertsAdmin())
    }, [page, total,query,type])


    const coordinates = useMemo(() => concerts.map(c => ({lat: parseFloat(c.latitude),
        lng: parseFloat(c.longitude), title: c.title})), [concerts])

    return (
        <Center>
           <Flex direction={'column'}>
               <Filter/>
               <Grid maw={'1200px'}>
                   {list}
               </Grid>
               <Pagination total={pages} page={page} onChange={onChangeHandler}/>
               <Map coordinates={coordinates}/>
           </Flex>
        </Center>
    );
};
const Ticket = ({source, title, address, date, price = 99}: TicketPropsType) => {
    return (
        <Card>
            <Image src={`${MEDIA.URL}${source}`} width={200} height={120} withPlaceholder alt={'poster'}></Image>
            <Text fw={700}>{title}</Text>
            <Flex>
                <IconMapPinFilled/>
                <Text fw={500}>{address}</Text>
            </Flex>
            <Flex>
                <IconClockHour3/>
                <Text fw={500}>{date}</Text>
            </Flex>
            <Flex>
                <IconWallet/>
                <Text fw={500}>от {price} BYN</Text>
            </Flex>
            <Button>Купить</Button>
        </Card>
    )
}
type TicketPropsType = {
    source: string
    title: string
    address: string
    date: string
    price: number
}
export default Tickets;