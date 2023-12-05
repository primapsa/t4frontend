import React from 'react'

import { Modal } from '@mantine/core'

import { MODAL } from '../../const/settings'
import { useAlert } from '../../hooks/useAlert'
import { useStyles } from './style'

const Alert = () => {
  const { isShown, notifications, onPopupClose, popup } = useAlert()
  const { classes } = useStyles()

  return (
    <>
      {isShown && <div className={classes.alert}>{notifications}</div>}
      <Modal
        centered
        onClose={onPopupClose}
        opened={!!popup}
        title={popup?.title}
        withCloseButton
        zIndex={MODAL.POSITION}
      >
        {popup?.message}
      </Modal>
    </>
  )
}

export default Alert
