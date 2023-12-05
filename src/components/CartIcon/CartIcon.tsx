import React from 'react'
import { NavLink } from 'react-router-dom'

import { IconShoppingCart } from '@tabler/icons-react'

import { LINKS } from '../../const/routes'
import { ICONS } from '../../const/settings'
import { useStyles } from './style'

const CartIcon = ({ count }: CartIconPropsType) => {
  const { classes } = useStyles()

  return (
    <NavLink className={classes.container} to={LINKS.CART}>
      {!!count && <div className={classes.round}>{count}</div>}
      <IconShoppingCart size={ICONS.CART} />
    </NavLink>
  )
}

export default React.memo(CartIcon)

type CartIconPropsType = {
  count: number
}
