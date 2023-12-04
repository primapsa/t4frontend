import React, { useCallback } from 'react'

import { Badge, Button, Card, Flex, Image, Text } from '@mantine/core'
import { IconClockHour3, IconMapPinFilled, IconWallet } from '@tabler/icons-react'

import { ItemStatus } from '../../api/api'
import { MEDIA } from '../../const/media'
import { ITEM_STATUS } from '../../const/statuses'
import { dateFormat } from '../../utils/utils'
import { useStyles } from './styles'

const Ticket = ({
  address,
  date,
  id,
  isSold = false,
  onAddToCart,
  price,
  source,
  status,
  title,
}: TicketPropsType) => {
  const { classes } = useStyles()
  const onclickHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()
      onAddToCart(id)
    },
    [id, onAddToCart]
  )

  const dateTime = dateFormat(date)

  return (
    <Card className={classes.wrapper}>
      <Image
        alt={'poster'}
        className={classes.img}
        fit={'fill'}
        src={`${MEDIA.URL}${source}`}
        withPlaceholder
      />
      <Text className={classes.title}>{title}</Text>
      <Flex className={classes.address}>
        <IconMapPinFilled />
        <Text className={classes.address__text}>{address}</Text>
      </Flex>
      <Flex>
        <IconClockHour3 />
        <Flex className={classes.date}>
          <Text className={classes.date__text}>{dateTime.date} </Text>
          <Text className={classes.date__text}>{dateTime.time} </Text>
        </Flex>
      </Flex>
      <Flex className={classes.wallet}>
        <IconWallet />
        <Text className={classes.address}>от {price} USD</Text>
      </Flex>
      <Flex className={classes.buy}>
        {isSold ? (
          <Badge color={'red'} radius={'md'} size={'xl'} variant={'outline'}>
            Билетов нет
          </Badge>
        ) : (
          <Button
            disabled={status === ITEM_STATUS.ADD}
            onClick={onclickHandler}
            variant={'outline'}
          >
            Купить
          </Button>
        )}
      </Flex>
    </Card>
  )
}

type TicketPropsType = {
  address: string
  date: string
  id: number
  isSold: boolean
  onAddToCart: (id: number) => void
  price: number
  source: string
  status?: ItemStatus
  title: string
}
export default React.memo(Ticket)
