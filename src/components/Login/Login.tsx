import React from 'react'
import { Navigate } from 'react-router-dom'

import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Flex,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'

import { useLogin } from '../../hooks/useLogin'
import PreloaderExt from '../Preloader/PreloaderExt'
import { useStyles } from './style'

export const Login = () => {
  const { form, formHandler, isAuth, isLoading, onClickHandler, onGoogleSuccess, type } = useLogin()
  const { classes } = useStyles()

  if (isAuth) {
    return <Navigate to={'/'} />
  }

  return (
    <PreloaderExt isLoaded={!!isLoading}>
      <Flex className={classes.container}>
        <Paper className={classes.wrapper} p={'xl'} radius={'md'} withBorder>
          <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}>
            <Text size={'lg'}>{type === 'login' ? 'Войти с помощью' : 'Регистрация'}</Text>
            <Group grow mb={'md'} mt={'md'}>
              <GoogleLogin onSuccess={onGoogleSuccess} />
            </Group>
            <Divider label={'или продолжить с почтой'} labelPosition={'center'} my={'lg'} />
            <form onSubmit={formHandler}>
              <Stack>
                {type === 'register' && (
                  <TextInput
                    label={'Имя'}
                    placeholder={'имя'}
                    {...form.getInputProps('name')}
                    radius={'md'}
                  />
                )}
                <TextInput
                  label={'Почта'}
                  placeholder={'hello@mantine.dev'}
                  required
                  {...form.getInputProps('email')}
                  radius={'md'}
                />
                <PasswordInput
                  label={'Пароль'}
                  placeholder={'пароль'}
                  required
                  {...form.getInputProps('password')}
                  radius={'md'}
                />
                {type === 'register' && (
                  <Checkbox
                    label={'Я принимаю условия соглашения'}
                    {...form.getInputProps('terms')}
                  />
                )}
              </Stack>
              <Group mt={'xl'} position={'apart'}>
                <Anchor
                  color={'dimmed'}
                  component={'button'}
                  onClick={onClickHandler}
                  size={'xs'}
                  type={'button'}
                >
                  {type === 'register'
                    ? 'Есть аккаунт? Войдите!'
                    : 'Нет аккаунта? Зарегистрируйтесь'}
                </Anchor>
                <Button radius={'xl'} type={'submit'}>
                  {type === 'register' ? 'Регистрация' : 'Войти'}
                </Button>
              </Group>
            </form>
          </GoogleOAuthProvider>
        </Paper>
      </Flex>
    </PreloaderExt>
  )
}
export default Login
