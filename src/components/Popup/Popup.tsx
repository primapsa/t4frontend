import React from 'react'

import { Modal } from '@mantine/core'

const Popup = ({ isOpened, message, onClose, title }: PopupPropsType) => {
  return (
    <Modal onClose={onClose} opened={isOpened} title={title}>
      {message}
    </Modal>
  )
}

export default React.memo(Popup)

type PopupPropsType = {
  isOpened: boolean
  message: string
  onClose: () => void
  title: string
}
