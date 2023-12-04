import React from 'react'

import { Flex, Loader } from '@mantine/core'

const PreloaderExt = ({ children, isLoaded = true }: PleloaderType) => {
  return (
    <>
      {isLoaded ? (
        <Flex align={'center'} justify={'center'} style={{ height: '80vh' }}>
          <Loader variant={'dots'} />
        </Flex>
      ) : (
        children
      )}
    </>
  )
}

export default React.memo(PreloaderExt)

type PleloaderType = {
  children: React.ReactNode
  isLoaded: boolean
}
