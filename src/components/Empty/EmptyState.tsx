import React from 'react'

import { Center, Flex, Image } from '@mantine/core'

import Img from '../../media/img/not_found.png'

const EmptyState = () => {
  return (
    <Center style={{ height: '80vh' }}>
      <Flex align={'center'} justify={'center'}>
        <Image height={300} src={Img} width={200} />
      </Flex>
    </Center>
  )
}

export default EmptyState
