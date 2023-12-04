import React from 'react'

import { Flex, Loader } from '@mantine/core'

const PreloaderExt = ({ isLoaded = true }: PleloaderType) => {
  return (
    <>
      {isLoaded && (
        <Flex
          style={{
            alignItems: 'center',
            height: '100vh',
            justifyContent: 'center',
            position: 'absolute',
            top: '0',
            width: '100vw',
            zIndex: '10',
          }}
        >
          <Loader variant={'dots'} />
        </Flex>
      )}
    </>
  )
}

export default React.memo(PreloaderExt)

type PleloaderType = {
  isLoaded?: boolean
}
