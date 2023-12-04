import React from 'react'

import { Flex, Image, Paper, Text } from '@mantine/core'

import { MEDIA } from '../../const/media'
import { dateFormatDelimeter } from '../../utils/utils'
import { useStyles } from './styles'

const Item = (props: ItemPropsType) => {
  const { classes } = useStyles()

  return (
    <Paper className={classes.paper}>
      <Flex>
        <Image
          alt={'poster'}
          className={classes.image}
          height={100}
          src={`${MEDIA.URL}${props.poster}`}
          width={100}
          withPlaceholder
        />
        <Flex className={classes.concert}>
          <Text className={classes.concert__title}>{props.title}</Text>
          <Flex className={classes.concert__info}>
            <Flex className={classes.concert__flex}>
              <Text>{props.type}</Text>
              <Text>{dateFormatDelimeter(props.date)}</Text>
            </Flex>
            <Flex className={classes.concert__tickets}>
              <Text>
                Билетов: {props.ticket} / {props.ticket_limit ? props.ticket_limit : props.ticket}{' '}
              </Text>
              <Text>Стоимость: {props.price} USD</Text>
              <Text>Место: {props.address}</Text>
            </Flex>
            <Flex className={classes.concert__flex}>
              {props.voice && <Text>Тип голоса: {props.voice}</Text>}
              {props.concertName && <Text>Название концерта: {props.concertName}</Text>}
              {props.composer && <Text>Композитор: {props.composer}</Text>}
              {props.censor && <Text>Ценз: {props.censor}</Text>}
              {props.wayHint && <Text>Проезд: {props.wayHint}</Text>}
              {props.headliner && <Text>Хедлайнер: {props.headliner}</Text>}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Paper>
  )
}

export default React.memo(Item)

type ItemPropsType = {
  address: string
  censor: null | string
  composer: null | string
  concertName: null | string
  date: string
  headliner: null | string
  id: number
  poster: string
  price: number
  ticket: number
  ticket_limit: number
  title: string
  type: string
  voice: string
  wayHint: null | string
}
