import React from 'react'

import { Flex, Loader } from '@mantine/core'

import { useStyles } from './style'

const PreloaderExt = ({ isLoaded = true }: PleloaderType) => {
  const { classes } = useStyles()

  return (
    <>
      {isLoaded && (
        <Flex className={classes.preloader}>
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
