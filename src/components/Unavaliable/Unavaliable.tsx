import React from 'react'
import { useSelector } from 'react-redux'

import { Center, Flex, Text, Title } from '@mantine/core'

import { RootStateType } from '../../redux/store'
import { getMemoOfflineStatus } from '../../selectors/selectors'
import { useStyles } from './styles'

const Unavaliable = ({ children }: UnavalibalePropsType) => {
  const { classes } = useStyles()
  const status = useSelector<RootStateType>(getMemoOfflineStatus)

  return (
    <>
      {status ? (
        <Center>
          <Flex className={classes.root}>
            <div className={classes.label}>Unavaliable</div>
            <Title className={classes.title}>Something went wrong.</Title>
            <Text className={classes.description}>
              Unfortunately,the server is unavailable. Please, try later
            </Text>
          </Flex>
        </Center>
      ) : (
        children
      )}
    </>
  )
}

export default React.memo(Unavaliable)

type UnavalibalePropsType = {
  children: React.ReactNode
}
