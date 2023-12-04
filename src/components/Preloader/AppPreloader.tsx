import React from 'react'
import { useSelector } from 'react-redux'

import { Flex, Loader } from '@mantine/core'

import { AppStatus } from '../../redux/appReducer'
import { RootStateType } from '../../redux/store'
import { getMemoAuthStatus } from '../../selectors/selectors'

const PreloaderExt = () => {
  const status = useSelector<RootStateType, AppStatus | undefined>(getMemoAuthStatus)

  return (
    <>
      {status ? (
        <Flex align={'center'} justify={'center'} style={{ height: '100vh' }}>
          <Loader variant={'dots'} />
        </Flex>
      ) : null}
    </>
  )
}

export default React.memo(PreloaderExt)
