import React from 'react'

import { Badge, Button, Flex, Input } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'

import { usePromocodeBar } from '../../hooks/usePromocodeBar'
import { useStyles } from './style'

const PromocodeBar = ({ addCallback, id, promocode }: PromocodePropsType) => {
  const { classes } = useStyles()
  const { addHandler, buttonName, isVisible, onChangeHandler, showHandler, value } =
    usePromocodeBar({ addCallback, id, promocode })

  return (
    <Flex className={classes.badge}>
      {promocode ? (
        <Badge className={classes.badge} variant={'outline'}>
          {promocode}
        </Badge>
      ) : (
        <Button compact onClick={showHandler} variant={'subtle'}>
          {buttonName}
        </Button>
      )}
      {isVisible && (
        <Flex>
          <Input
            classNames={{ input: classes.input }}
            onChange={onChangeHandler}
            placeholder={'Промокод'}
            value={value}
          />
          <Button
            className={classes.button}
            compact
            disabled={!value}
            onClick={addHandler}
            size={'xs'}
            variant={'outline'}
          >
            <IconPlus className={classes.icon} />
          </Button>
        </Flex>
      )}
    </Flex>
  )
}

export default React.memo(PromocodeBar)

export type PromocodePropsType = {
  addCallback: (promocode: string, id: number) => void
  id: number
  promocode: null | string
}
