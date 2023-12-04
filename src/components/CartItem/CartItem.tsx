import React from 'react'

import { Flex, Image, Paper, Text } from '@mantine/core'

import { ItemStatus } from '../../api/api'
import { MEDIA } from '../../const/media'
import { ITEM_STATUS } from '../../const/statuses'
import { discountFormat } from '../../utils/utils'
import ActionBar from '../ActionBar/ActionBar'
import NumberedCounter from '../NumberedCounter/NumberedCounter'
import Promocode from '../PromocodeBar/PromocodeBar'
import { useStyles } from './styles'

const CartItem = (props: CartItemPropsType) => {
  const { classes } = useStyles()

  return (
    <Paper className={classes.paper}>
      <Flex className={classes.wrapper}>
        <Image height={'100px'} src={`${MEDIA.URL}${props.poster}`} width={'100px'}></Image>
        <Flex className={classes.info}>
          <Text className={classes.title}>{props.title}</Text>
          <Flex className={classes.control}>
            <NumberedCounter
              limit={props.ticket}
              onDecrement={props.onDecrement}
              onIncrement={props.onIncrement}
              value={props.count}
            />
            <Flex className={classes.control__price}>
              <Text td={props.discount ? 'line-through' : ''}>{`${props.price} USD`}</Text>
              {!!props.discount && (
                <Text color={'red'}>{`${discountFormat(props.discount)} USD`}</Text>
              )}
            </Flex>
          </Flex>
        </Flex>
        <Flex className={classes.icon}>
          <ActionBar
            del={props.onDelete}
            disabled={props.status === ITEM_STATUS.DELETE}
            id={props.id}
          />
        </Flex>
      </Flex>
      <Promocode addCallback={props.onAdd} id={props.id} promocode={props.promocode} />
    </Paper>
  )
}

export default React.memo(CartItem)

type CartItemPropsType = {
  count: number
  discount: number
  id: number
  onAdd: (p: string, id: number) => void
  onChange: (id: number, value: string) => void
  onDecrement: (v: number) => void
  onDelete: (id: number) => void
  onIncrement: (v: number) => void
  poster: string
  price: number
  promocode: null | string
  status: ItemStatus | undefined
  ticket: number
  title: string
}
