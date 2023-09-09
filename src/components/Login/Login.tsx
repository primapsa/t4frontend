import React, {useCallback, useEffect} from "react";
import {useForm, yupResolver} from '@mantine/form';
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
import {CredentialResponse, GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google';
import {AppDispatchType, RootStateType} from "../../redux/store";
import {login, LoginType, registerUser, setLoginType, socialLogin} from "../../redux/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {FORM} from "../../const/form";
import {useNavigate} from "react-router-dom";
import {getIsAuth} from "../../selectors/selectors";


export const Login = () => {

    const type = useSelector<RootStateType, LoginType>(state => state.auth.type)
    const isAuth = useSelector<RootStateType, boolean>(getIsAuth)
    const navigate = useNavigate();

    const form = useForm({
        initialValues: FORM.INIT.AUTH,
        validate: yupResolver(FORM.VALIDATION.FORM)
    });

    const dispatch = useDispatch()

    const onGoogleSuccess = useCallback(({credential}: CredentialResponse) => {
        if (credential)
            dispatch<AppDispatchType>(socialLogin(credential))
    }, [])

    const formHandler = form.onSubmit((fields) => {

        const credentials = {...fields, username: fields.email}
        const action = type === 'login' ? login : registerUser
        dispatch<AppDispatchType>(action(credentials))

    })

    const onClickHandler = useCallback(() => {
        const toggleType = type === 'register' ? 'login' : 'register'
        dispatch<AppDispatchType>(setLoginType(toggleType))
        form.reset()
    }, [type])

    useEffect(() => {
        if (isAuth)
            navigate('/')
    }, [isAuth])


    return (
        <Flex align={"center"} justify={"center"} h={'80vh'} m={'10px'}>
            <Paper radius="md" p="xl" withBorder w={'100%'} maw={'320px'}>
                <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}>
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
    );
}
export default Login