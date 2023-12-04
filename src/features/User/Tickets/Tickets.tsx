import React from 'react'

import { Center, Flex } from '@mantine/core'

import EmptyStateWithLoader from '../../../components/Empty/EmptyStateWithLoader'
import Filter from '../../../components/Filter/Filter'
import Map from '../../../components/Map/Map'
import Pagination from '../../../components/Pagination/Pagination'
import PreloaderExt from '../../../components/Preloader/PreloaderExt'
import { useTickets } from '../../../hooks/useTickets'
import { useStyles } from './styles'

const Tickets = () => {
  const { classes } = useStyles()
  const { coordinates, isLoaded, list, onChangeHandler, page, pages, status } = useTickets()

  return (
    <PreloaderExt isLoaded={isLoaded}>
      <Center className={classes.center}>
        <Flex className={classes.wrapper}>
          <Filter />
          <EmptyStateWithLoader isEmpty={!list.length} status={status}>
            <Flex className={classes.tickets}>{list}</Flex>
            <Pagination onChange={onChangeHandler} page={page} total={pages} />
            <Map coordinates={coordinates} />
          </EmptyStateWithLoader>
        </Flex>
      </Center>
    </PreloaderExt>
  )
}

export default React.memo(Tickets)
