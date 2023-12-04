import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

import { LINKS } from '../../const/routes'
import { STATUS } from '../../const/statuses'
import { AppStatus } from '../../redux/appReducer'
import { RootStateType } from '../../redux/store'
import { getIsAuth, getIsStaff, getStatusAuth } from '../../selectors/selectors'
import HeaderUser from '../Header/Header'

const PrivateRoute = () => {
  const isAuth = useSelector<RootStateType, boolean>(getIsAuth)
  const isAdmin = useSelector<RootStateType, boolean>(getIsStaff)
  const status = useSelector<RootStateType, AppStatus>(getStatusAuth)

  if (isAdmin) {
    return <Navigate to={'admin'} />
  }

  return (
    <>
      {isAuth ? (
        <>
          <HeaderUser />
          <Outlet />
        </>
      ) : status === STATUS.LOADING ? null : (
        <Navigate to={LINKS.LOGIN} />
      )}
    </>
  )
}

export default PrivateRoute
