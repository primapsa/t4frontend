import React from 'react';
import {Center, Flex} from '@mantine/core';
import Map from "../../../components/Map/Map"
import Filter from "../../../components/Filter/Filter";
import Pagination from "../../../components/Pagination/Pagination";
import {useStyles} from "./styles";
import PreloaderExt from "../../../components/Preloader/PreloaderExt";
import {useTickets} from "../../../hooks/useTickets";
import EmptyStateWithLoader from "../../../components/Empty/EmptyStateWithLoader";

const Tickets = () => {

    const {classes} = useStyles()
    const { list, coordinates, page, pages, onChangeHandler, isLoaded, status} = useTickets()

    return (
        <PreloaderExt isLoaded={isLoaded}>
            <Center className={classes.center}>
                <Flex className={classes.wrapper}>
                    <Filter/>
                    <EmptyStateWithLoader isEmpty={!list.length} status={status} >
                        <Flex className={classes.tickets}>
                            {list}
                        </Flex>
                        <Pagination
                            total={pages}
                            page={page}
                            onChange={onChangeHandler}/>
                        <Map coordinates={coordinates}/>
                    </EmptyStateWithLoader>
                </Flex>
            </Center>
        </PreloaderExt>
    );
};

export default React.memo(Tickets);