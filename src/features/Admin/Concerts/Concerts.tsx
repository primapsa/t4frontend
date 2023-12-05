import React from 'react'

import { Button, Flex, Modal } from '@mantine/core'

import ConcertsForm from '../../../components/AddForm/ConcertsForm'
import EmptyStateWithLoader from '../../../components/Empty/EmptyStateWithLoader'
import Pagination from '../../../components/Pagination/Pagination'
import { STATUS } from '../../../const/statuses'
import { useConcerts } from '../../../hooks/useConcerts'
import { useStyles } from './styles'

const Concerts = () => {
  const { classes } = useStyles()
  const {
    init,
    isModal,
    list,
    modalHandler,
    onChangeHandler,
    onClickHandler,
    onCloseHandler,
    page,
    pages,
    status,
  } = useConcerts()

  return (
    <Flex className={classes.center}>
      <Flex className={classes.wrapper}>
        <Button
          className={classes.button}
          disabled={status === STATUS.LOADING}
          onClick={onClickHandler}
        >
          Добавить концерт
        </Button>
        <Modal
          classNames={{ content: classes.content, inner: classes.inner }}
          onClose={modalHandler}
          opened={isModal}
        >
          <ConcertsForm init={init} onClose={onCloseHandler} />
        </Modal>
        <EmptyStateWithLoader isEmpty={!list.length} status={status}>
          <Flex className={classes.concerts}>{list}</Flex>
          <Pagination onChange={onChangeHandler} page={page} total={pages}></Pagination>
        </EmptyStateWithLoader>
      </Flex>
    </Flex>
  )
}

export default React.memo(Concerts)
