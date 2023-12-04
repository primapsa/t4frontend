import React from 'react'

import { Modal } from '@mantine/core'

import { useAlert } from '../../hooks/useAlert'
import { useStyles } from './style'

const Alert = () => {
  const { isShown, notifications, onPopupClose, popup } = useAlert()
  const { style } = useStyles()

  return (
    <>
      {isShown && <div style={style}>{notifications}</div>}
      <Modal
        centered
        onClose={onPopupClose}
        opened={!!popup}
        title={popup?.title}
        withCloseButton
        zIndex={10}
      >
        {popup?.message}
      </Modal>
    </>
  )
}

export default Alert
