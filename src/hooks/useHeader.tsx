import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { CartConcertsType, CartType } from '../api/api'
import CartIcon from '../components/CartIcon/CartIcon'
import { useStyles } from '../components/Header/styles'
import { HeaderLinks } from '../const/routes'
import { AuthUserType, checkAuth, logout } from '../redux/authReducer'
import { fetchCart } from '../redux/cartReducer'
import { AppDispatchType, RootStateType } from '../redux/store'
import {
  getCart,
  getIsAuth,
  getIsStaff,
  getTotalCart,
  getUser,
  getUserId,
} from '../selectors/selectors'
import { getCartCount } from '../utils/utils'

export const useHeader = () => {
  const { classes } = useStyles()
  const dispatch = useDispatch()
  const isAuth = useSelector<RootStateType, boolean>(getIsAuth)
  const isAdmin = useSelector<RootStateType, boolean>(getIsStaff)
  const user = useSelector<RootStateType, AuthUserType>(getUser)
  const cart = useSelector<RootStateType, number>(getTotalCart)
  const userId = useSelector<RootStateType, null | number>(getUserId)

  const userToggler = isAdmin ? 'admin' : 'user'
  const items = HeaderLinks[userToggler].map(({ label, link }, i) => (
    <NavLink className={classes.link} key={i} to={link}>
      {label}
    </NavLink>
  ))

  if (!isAdmin) {
    items.push(<CartIcon count={cart} key={items.length} />)
  }

  useEffect(() => {
    isAuth || dispatch<AppDispatchType>(checkAuth())
  }, [])

  useEffect(() => {
    if (!isAdmin && userId) {
      dispatch<AppDispatchType>(fetchCart(userId))
    }
  }, [userId])

  const onLogoutHandler = useCallback(() => {
    dispatch<AppDispatchType>(logout())
  }, [])

  const onLoginHandler = useCallback(() => {
    return <NavLink to={'login'} />
  }, [])

  return {
    isAuth,
    items,
    onLoginHandler,
    onLogoutHandler,
    user,
  }
}
