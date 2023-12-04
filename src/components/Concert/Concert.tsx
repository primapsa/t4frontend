import React from 'react'

import {
  Badge,
  Button,
  Center,
  Flex,
  Image,
  Paper,
  Text,
  TypographyStylesProvider,
} from '@mantine/core'
import { GoogleMap, MarkerF } from '@react-google-maps/api'
import { IconClockHour3, IconMapPinFilled, IconWallet } from '@tabler/icons-react'

import { MEDIA } from '../../const/media'
import { useSingleConcert } from '../../hooks/useSingleConcert'
import EmptyStateWithLoader from '../Empty/EmptyStateWithLoader'
import Preloader from '../Preloader/Preloader'
import { useStyles } from './styles'

const Concert = () => {
  const { classes } = useStyles()
  const { addToCartHandler, concert, dateTime, isAdmin, isLoaded, place, status } =
    useSingleConcert()

  return (
    <EmptyStateWithLoader isEmpty={!Object.keys(concert).length} status={status}>
      <Center className={classes.center}>
        <Paper className={classes.paper}>
          <Flex className={classes.wrapper}>
            <Text className={classes.title}>{concert.title}</Text>
            <Flex className={classes.about}>
              <Flex>
                <IconClockHour3 />
                <Text>{dateTime}</Text>
              </Flex>
              <Flex className={classes.pin}>
                <IconMapPinFilled />
                <Text>{concert?.place?.address}</Text>
              </Flex>
              <Flex>
                <IconWallet />
                <Text>от {concert.price} USD</Text>
              </Flex>
            </Flex>
            <div className={classes.container}>
              <Image
                alt={'poster'}
                className={classes.image}
                fit={'fill'}
                src={`${MEDIA.URL}${concert.poster}`}
                withPlaceholder
              />
            </div>
            <Flex className={classes.optional}>
              {concert.censor && <Text>Ценз: {concert.censor}</Text>}
              {concert.headliner && <Text>Хедлайнер: {concert.headliner}</Text>}
              {concert.wayHint && <Text>Проезд: {concert.wayHint}</Text>}
              {concert.composer && <Text>Композитор: {concert.composer}</Text>}
              {concert.concertName && <Text>Концерт: {concert.concertName}</Text>}
            </Flex>
            <TypographyStylesProvider className={classes.innerHtml}>
              <div dangerouslySetInnerHTML={{ __html: concert.desc }} />
            </TypographyStylesProvider>
            {!isAdmin && (
              <Flex>
                {concert.ticket_limit ? (
                  <Button onClick={addToCartHandler} size={'lg'}>
                    Купить билет
                  </Button>
                ) : (
                  <Badge color={'red'} radius={'md'} size={'xl'} variant={'outline'}>
                    Билетов нет
                  </Badge>
                )}
              </Flex>
            )}
            <div className={classes.map}>
              {isLoaded ? (
                <GoogleMap
                  center={place}
                  mapContainerClassName={'map-container'}
                  mapContainerStyle={{ height: '100%', width: '100%' }}
                  zoom={10}
                >
                  <MarkerF position={place} />
                </GoogleMap>
              ) : (
                <Preloader />
              )}
            </div>
          </Flex>
        </Paper>
      </Center>
    </EmptyStateWithLoader>
  )
}

export default Concert
