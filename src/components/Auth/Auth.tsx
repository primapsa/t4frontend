import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { STATUS } from '../../const/statuses'
import { AppStatus } from '../../redux/appReducer'
import { checkAuth } from '../../redux/authReducer'
import { AppDispatchType, RootStateType } from '../../redux/store'
import { getStatusAuth } from '../../selectors/selectors'
import Preloader from '../Preloader/Preloader'

const Auth = ({ children }: AuthPropsType) => {
  const dispatch = useDispatch()
  const status = useSelector<RootStateType, AppStatus>(getStatusAuth)

  useEffect(() => {
    dispatch<AppDispatchType>(checkAuth())
  }, [])

  return <>{status === STATUS.LOADING ? <Preloader /> : children}</>
}

export default Auth

type AuthPropsType = {
  children: React.ReactNode
}
