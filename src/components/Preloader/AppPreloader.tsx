import React from 'react'
import { useSelector } from 'react-redux'

import { Flex, Loader } from '@mantine/core'

import { AppStatus } from '../../redux/appReducer'
import { RootStateType } from '../../redux/store'
import { getMemoAuthStatus } from '../../selectors/selectors'
import { useStyles } from './style'

const PreloaderExt = () => {
  const status = useSelector<RootStateType, AppStatus | undefined>(getMemoAuthStatus)
  const { classes } = useStyles()

  return (
    <>
      {status ? (
        <Flex className={classes.appPreloader}>
          <Loader variant={'dots'} />
        </Flex>
      ) : null}
    </>
  )
}

export default React.memo(PreloaderExt)
