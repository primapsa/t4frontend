import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useForm, yupResolver } from '@mantine/form'
import { CredentialResponse } from '@react-oauth/google'

import { FORM } from '../const/form'
import { AppStatus } from '../redux/appReducer'
import {
  AuthUserType,
  LoginType,
  login,
  registerUser,
  setLoginType,
  socialLogin,
} from '../redux/authReducer'
import { AppDispatchType, RootStateType } from '../redux/store'
import {
  getAuthError,
  getAuthType,
  getIsAuth,
  getMemoLoadingStatus,
  getUser,
} from '../selectors/selectors'

export const useLogin = () => {
  const type = useSelector<RootStateType, LoginType>(getAuthType)
  const isAuth = useSelector<RootStateType, boolean>(getIsAuth)
  const isLoading = useSelector<RootStateType, AppStatus | undefined>(getMemoLoadingStatus)
  const error = useSelector<RootStateType, null | string>(getAuthError)
  const user = useSelector<RootStateType, AuthUserType>(getUser)

  const form = useForm({
    initialValues: FORM.INIT.AUTH,
    validate: yupResolver(FORM.VALIDATION.FORM),
  })

  useEffect(() => {
    if (error) {
      form.setFieldValue('email', user.email || '')
      form.setFieldError('email', error)
    }
  }, [error])

  const dispatch = useDispatch()

  const onGoogleSuccess = useCallback(({ credential }: CredentialResponse) => {
    if (credential) {
      dispatch<AppDispatchType>(socialLogin(credential))
    }
  }, [])

  const formHandler = form.onSubmit(fields => {
    const credentials = { ...fields, username: fields.email }
    const action = type === 'login' ? login : registerUser

    dispatch<AppDispatchType>(action(credentials))
  })

  const onClickHandler = useCallback(() => {
    const toggleType = type === 'register' ? 'login' : 'register'

    dispatch<AppDispatchType>(setLoginType(toggleType))
    form.reset()
  }, [type])

  return {
    form,
    formHandler,
    isAuth,
    isLoading,
    onClickHandler,
    onGoogleSuccess,
    type,
  }
}
