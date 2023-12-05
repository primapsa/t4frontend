import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { CartConcertsType } from '../api/api'
import CartItem from '../components/CartItem/CartItem'
import { AppStatus } from '../redux/appReducer'
import {
  deleteCart,
  deleteCartUser,
  fetchCart,
  setCartPromocode,
  updateCart,
  validatePromocode,
} from '../redux/cartReducer'
import { RootStateType, useAppDispatch } from '../redux/store'
import { getCart, getStatus, getStatusCart, getTotalCart, getUserId } from '../selectors/selectors'

export const useCart = () => {
  const purchases = useSelector<RootStateType, CartConcertsType[]>(getCart)
  const userId = useSelector<RootStateType, null | number>(getUserId)
  const status = useSelector<RootStateType, AppStatus>(getStatusCart)
  const total = useSelector<RootStateType, number>(getTotalCart)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId))
    }
  }, [userId])

  const deleteItemHandler = useCallback((id: number) => {
    dispatch(deleteCart(id))
  }, [])

  const promocodeAddHandler = useCallback((promocode: string, id: number) => {
    dispatch(validatePromocode({ id, promocode }))
  }, [])

  const changePromocdeHandler = useCallback((id: number, value: string) => {
    dispatch(setCartPromocode({ id, value }))
  }, [])

  const counterHandler = useCallback((id: number, count: number) => {
    dispatch(updateCart({ data: { count }, id }))
  }, [])

  const paymentSuccess = useCallback(
    async (data: any, actions: any) => {
      if (userId) {
        dispatch(deleteCartUser({ data, userId }))
      }
    },
    [userId]
  )

  const cart = purchases.reduce(
    (acc, p) => {
      const price = p.price * p.count
      const discount = p.discount ? price - price * (1 - p.discount / 100) : 0
      const fullPrice = discount ? price - discount : discount

      acc.discount += discount
      acc.price += price - discount
      acc.ids.push(p.id)
      acc.items.push(
        <CartItem
          count={p.count}
          discount={fullPrice}
          id={p.id}
          key={p.id}
          onAdd={promocodeAddHandler}
          onChange={changePromocdeHandler}
          onDecrement={count => counterHandler(p.id, count)}
          onDelete={deleteItemHandler}
          onIncrement={count => counterHandler(p.id, count)}
          poster={p.poster}
          price={price}
          promocode={p.promocode}
          status={p.status}
          ticket={p.ticket_limit}
          title={p.title}
        />
      )

      return acc
    },
    { discount: 0, ids: [] as number[], items: [] as any[], price: 0 }
  )

  return {
    cart,
    paymentSuccess,
    status,
    total,
  }
}
