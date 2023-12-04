import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

import { LINKS } from '../../const/routes'
import { RootStateType } from '../../redux/store'
import { getIsAuth, getIsStaff } from '../../selectors/selectors'
import HeaderUser from '../Header/Header'

const ProptectedRoute = () => {
  const isStaff = useSelector<RootStateType, boolean>(getIsStaff)
  const isAuth = useSelector<RootStateType, boolean>(getIsAuth)

  return (
    <>
      {isStaff ? (
        <>
          <HeaderUser />
          <Outlet />
        </>
      ) : (
        <>
          {isAuth ? (
            <Navigate to={`../${LINKS.NOT_FOUND}`} />
          ) : (
            <Navigate to={`../${LINKS.LOGIN}`} />
          )}
        </>
      )}
    </>
  )
}

export default ProptectedRoute
