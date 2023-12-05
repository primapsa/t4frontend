import React from 'react'

import { ActionIcon, Flex } from '@mantine/core'
import { IconEdit, IconTrash } from '@tabler/icons-react'

import { useStyles } from './styles'

const ActionBar = ({ del, disabled = false, edit, id }: ActionBarPropsType) => {
  const { classes } = useStyles()
  const onDeleteHandler = del ? () => del(id) : null
  const onEditHandler = edit ? () => edit(id) : null

  return (
    <Flex className={classes.bar}>
      {onDeleteHandler && (
        <ActionIcon
          className={classes.icon}
          color={'red'}
          disabled={disabled}
          onClick={onDeleteHandler}
          title={'delete'}
          variant={'outline'}
        >
          <IconTrash />
        </ActionIcon>
      )}
      {onEditHandler && (
        <ActionIcon
          className={classes.icon}
          color={'blue'}
          disabled={disabled}
          onClick={onEditHandler}
          title={'edit'}
          variant={'outline'}
        >
          <IconEdit />
        </ActionIcon>
      )}
    </Flex>
  )
}

export default React.memo(ActionBar)

type ActionBarPropsType = {
  del?: (id: number) => void
  disabled?: boolean
  edit?: (id: number) => void
  id: number
}
