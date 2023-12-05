import React from 'react'

import { Notification } from '@mantine/core'

import { useStyles } from './style'

const Notice = ({ callback, color, message }: NoticePropsType) => {
  const { classes } = useStyles()

  return (
    <Notification classNames={{ root: classes.root }} color={color} onClose={callback}>
      {message}
    </Notification>
  )
}

export default React.memo(Notice)

type NoticePropsType = {
  callback: () => void
  color: string
  message: string
}
