import React from "react";
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
} from '@mantine/core';
import {GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google';
import PreloaderExt from "../Preloader/PreloaderExt";
import {useLogin} from "../../hooks/useLogin";
import {useStyles} from "./style";
import {Navigate} from "react-router-dom";

export const Login = () => {

    const {isLoading, type, form, formHandler, onClickHandler, onGoogleSuccess, isAuth} = useLogin()
    const {classes} = useStyles()


    return (
        <>
            { isAuth &&  <Navigate to="/" />}
            <PreloaderExt isLoaded={!!isLoading}>
            <Flex className={classes.container}>
                <Paper radius="md" p="xl" withBorder className={classes.wrapper}>
                    <GoogleOAuthProvider
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}>
                        <Text size="lg">
                            {type === 'login' ? 'Войти с помощью' : 'Регистрация'}
                        </Text>
                        <Group grow mb="md" mt="md">
                            <GoogleLogin onSuccess={onGoogleSuccess}/>
                        </Group>
                        <Divider label="или продолжить с почтой" labelPosition="center" my="lg"/>
                        <form onSubmit={formHandler}>
                            <Stack>
                                {type === 'register' && (
                                    <TextInput
                                        label="Имя"
                                        placeholder="имя"
                                        {...form.getInputProps('name')}
                                        radius="md"
                                    />
                                )}
                                <TextInput
                                    required
                                    label="Почта"
                                    placeholder="hello@mantine.dev"
                                    {...form.getInputProps('email')}
                                    radius="md"
                                />
                                <PasswordInput
                                    required
                                    label="Пароль"
                                    placeholder="пароль"
                                    {...form.getInputProps('password')}
                                    radius="md"
                                />
                                {type === 'register' && (
                                    <Checkbox
                                        label="Я принимаю условия соглашения"
                                        {...form.getInputProps('terms')}
                                    />
                                )}
                            </Stack>
                            <Group position="apart" mt="xl">
                                <Anchor
                                    component="button"
                                    type="button"
                                    color="dimmed"
                                    onClick={onClickHandler}
                                    size="xs">
                                    {type === 'register'
                                        ? 'Есть аккаунт? Войдите!'
                                        : "Нет аккаунта? Зарегистрируйтесь"}
                                </Anchor>
                                <Button type="submit" radius="xl">
                                    {type === 'register'
                                        ? 'Регистрация'
                                        : "Войти"}
                                </Button>
                            </Group>
                        </form>
                    </GoogleOAuthProvider>
                </Paper>
            </Flex>
        </PreloaderExt>
        </>

    );
}
export default Login