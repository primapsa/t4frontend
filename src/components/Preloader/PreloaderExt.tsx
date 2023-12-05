import React from 'react'

import { Flex, Loader } from '@mantine/core'

import { useStyles } from './style'

const PreloaderExt = ({ children, isLoaded = true }: PleloaderType) => {
  const { classes } = useStyles()

  return (
    <>
      {isLoaded ? (
        <Flex className={classes.preloaderExt}>
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
