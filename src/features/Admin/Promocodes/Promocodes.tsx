import React from 'react'

import { Button, Center, Flex, Modal } from '@mantine/core'

import ActionBar from '../../../components/ActionBar/ActionBar'
import EmptyStateWithLoader from '../../../components/Empty/EmptyStateWithLoader'
import Pagination from '../../../components/Pagination/Pagination'
import Promocode from '../../../components/Promocode/Promocode'
import PromocodeForm from '../../../components/Promocode/PromocodeForm'
import { STATUS } from '../../../const/statuses'
import { usePromocodes } from '../../../hooks/usePromocodes'
import { useStyles } from './styles'

const Promocodes = () => {
  const { classes } = useStyles()
  const {
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
  } = usePromocodes()

  return (
    <Center>
      <Flex className={classes.wrapper}>
        <Button
          className={classes.button}
          disabled={status === STATUS.LOADING}
          onClick={onClickHandler}
        >
          Добавить промокод
        </Button>
        <Modal onClose={closeModal} opened={isModal}>
          <PromocodeForm initValues={itemEdit} onClose={onModalCloseHandler} />
        </Modal>
        <EmptyStateWithLoader isEmpty={!list.length} status={status}>
          <Flex className={classes.promocodes}>{list}</Flex>
          <Pagination onChange={onChangePageHandler} page={page} total={pages}></Pagination>
        </EmptyStateWithLoader>
      </Flex>
    </Center>
  )
}

export default Promocodes
