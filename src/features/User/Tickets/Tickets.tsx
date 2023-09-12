import React from 'react';
import {Center, Flex} from '@mantine/core';
import Map from "../../../components/Map/Map"
import Filter from "../../../components/Filter/Filter";
import Pagination from "../../../components/Pagination/Pagination";
import {useStyles} from "./styles";
import PreloaderExt from "../../../components/Preloader/PreloaderExt";
import {STATUS} from "../../../const/statuses";
import EmptyStateExt from "../../../components/Empty/EmptyStateExt";
import {useTickets} from "../../../hooks/useTickets";

const Tickets = () => {

    const {classes} = useStyles()
    const { list, coordinates, page, status, pages, onChangeHandler} = useTickets()

    return (
        <PreloaderExt isLoaded={status === STATUS.LOADING}>
            <Center className={classes.center}>
                <Flex className={classes.wrapper}>
                    <Filter/>
                    <EmptyStateExt isEmpty={!list.length}>
                        <Flex className={classes.tickets}>
                            {list}
                        </Flex>
                        <Pagination
                            total={pages}
                            page={page}
                            onChange={onChangeHandler}/>
                        <Map coordinates={coordinates}/>
                    </EmptyStateExt>
                </Flex>
            </Center>
        </PreloaderExt>
    );
};

export default React.memo(Tickets);