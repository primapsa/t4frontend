import React from 'react'

import { Center, Flex, Image } from '@mantine/core'

import Img from '../../media/img/not_found.png'
import { useStyles } from './styles'

const EmptyState = () => {
  const { classes } = useStyles()

  return (
    <Center className={classes.center}>
      <Flex className={classes.imgContainer}>
        <Image src={Img} />
      </Flex>
    </Center>
  )
}

export default EmptyState
