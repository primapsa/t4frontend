import React from 'react'

import { Center, Flex, Text } from '@mantine/core'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'

import { useCart } from '../../hooks/useCart'
import { createPayOrder } from '../../utils/paypal'
import { discountFormat } from '../../utils/utils'
import EmptyStateWithLoader from '../Empty/EmptyStateWithLoader'
import Preloader from '../Preloader/Preloader'
import { useStyles } from './styles'

const Cart = () => {
  const [{ isPending }] = usePayPalScriptReducer()
  const { classes } = useStyles()
  const { cart, paymentSuccess, status, total } = useCart()

  return (
    <EmptyStateWithLoader isEmpty={!total} status={status}>
      <Center className={classes.center}>
        <Flex direction={'column'}>{cart.items}</Flex>
        <Flex className={classes.payblock}>
          {isPending ? (
            <Preloader />
          ) : (
            <>
              <Text classNames={classes.text}>{`Итого:  ${cart.price} USD`}</Text>
              {!!cart.discount && (
                <Text className={classes.text}>{`Скидка:  ${discountFormat(
                  cart.discount
                )} USD`}</Text>
              )}
              <PayPalButtons
                createOrder={createPayOrder(cart.ids)}
                onApprove={paymentSuccess}
                style={{ layout: 'horizontal' }}
              />
            </>
          )}
        </Flex>
      </Center>
    </EmptyStateWithLoader>
  )
}

export default Cart
