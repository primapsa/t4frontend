import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Flex } from '@mantine/core'

import { PromocodesType } from '../api/api'
import ActionBar from '../components/ActionBar/ActionBar'
import Promocode from '../components/Promocode/Promocode'
import { PromocodeInitValueType } from '../components/Promocode/PromocodeForm'
import { PAGE } from '../const/page'
import { ITEM_STATUS } from '../const/statuses'
import { useStyles } from '../features/Admin/Promocodes/styles'
import { AppStatus } from '../redux/appReducer'
import { deletePromocode, fetchPromocodes, setPage } from '../redux/promocodesReducer'
import { RootStateType, useAppDispatch } from '../redux/store'
import {
  getPage,
  getPagePromocode,
  getPromocodes,
  getStatus,
  getStatusPromocode,
  getTotal,
  getTotalPromocode,
} from '../selectors/selectors'

export const usePromocodes = () => {
  const { classes } = useStyles()
  const promocodes = useSelector<RootStateType, PromocodesType[]>(getPromocodes)
  const status = useSelector<RootStateType, AppStatus>(getStatus)

  const [isModal, setIsModal] = useState<boolean>(false)
  const [itemEdit, setItemEdit] = useState<PromocodeInitValueType>(undefined)
  const dispatch = useAppDispatch()

  const page = useSelector<RootStateType, number>(getPagePromocode)
  const total = useSelector<RootStateType, number>(getTotalPromocode)

  const pages = Math.ceil(total / PAGE.ITEM_PER_PAGE)

  const deleteItemHandler = useCallback(
    (id: number) => {
      dispatch(deletePromocode(id))
    },
    [promocodes]
  )

  const editItemHandler = useCallback(
    (pId: number) => {
      if (promocodes) {
        const promocode = promocodes.find(({ id }) => id === pId)

        if (promocode) {
          setItemEdit(promocode)
          setIsModal(true)
        }
      }
    },
    [promocodes]
  )

  useEffect(() => {
    dispatch(fetchPromocodes(page))
  }, [page])

  const onModalCloseHandler = useCallback(() => setIsModal(false), [])
  const onClickHandler = useCallback(() => {
    setItemEdit(undefined)
    setIsModal(true)
  }, [])

  const closeModal = useCallback(() => setIsModal(false), [])

  const onChangePageHandler = useCallback(
    (page: number) => {
      dispatch(setPage(page))
    },
    [page]
  )

  const list = promocodes.map(p => (
    <Flex className={classes.promocode} key={p.id}>
      <Promocode date={p.date} discount={p.discount} title={p.title} />
      <ActionBar
        del={deleteItemHandler}
        disabled={p.status === ITEM_STATUS.DELETE}
        edit={editItemHandler}
        id={p.id}
      />
    </Flex>
  ))

  return {
    closeModal,
    isModal,
    itemEdit,
    list,
    onChangePageHandler,
    onClickHandler,
    onModalCloseHandler,
    page,
    pages,
    status,
  }
}
