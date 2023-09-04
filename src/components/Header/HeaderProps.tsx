import {Button, Container, Flex, Group, Header as HeaderMantine, Title} from '@mantine/core';
import {NavLink} from "react-router-dom";
import {useStyles} from "./styles";
import React, {useCallback, useEffect} from "react";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../redux/store";
import {checkAuth, logout} from "../../redux/authReducer";
import {HeaderLinks} from "../../const/routes";

const HeaderProps = ({isAuth, isAdmin, email}: HeaderPropsType) => {

    const {classes} = useStyles()
    const dispatch = useDispatch()
    // const isAuth = useSelector<RootStateType, boolean>(state => state.auth.isAuth)
    // const isAdmin = useSelector<RootStateType, boolean>(state => state.auth.isStaff)
    // const user = useSelector<RootStateType, AuthUserType>(state => state.auth.user)

    const userToggler = isAdmin ? 'admin' : 'user'

    const items = HeaderLinks[userToggler]
        .map(
            ({label, link}, i) =>
                (
                    <NavLink key={i} to={link} className={classes.link}>
                        {label}
                    </NavLink>
                ));

    useEffect(() => {
        dispatch<AppDispatchType>(checkAuth())
    }, [])

    const onLogoutHandler = useCallback(() => {
        dispatch<AppDispatchType>(logout())
    }, [])
    const onLoginHandler = useCallback(() => {
        return <NavLink to={'login/'}/>
    },[])
    return (
        <HeaderMantine height={'100%'} className={classes.header}>
            <Container className={classes.container}>
                <NavLink to={'/'} className={classes.home}>
                    <img src={''} alt={'logo'}/>
                    <Title order={1} className={classes.linkHeader}>T4u</Title>
                </NavLink>
                <Group spacing={5} className={classes.links}>
                    {items}
                </Group>
                <Flex>
                    {
                        isAuth ? <Flex>
                                {email}
                                <Button onClick={onLogoutHandler}>Выйти</Button>
                            </Flex>
                            : <Button onClick={onLoginHandler}>Войти</Button>
                    }
                </Flex>
            </Container>

        </HeaderMantine>
    );
}
export default React.memo(HeaderProps)

type HeaderPropsType = {
    isAuth: boolean
    isAdmin: boolean
    email: string
}


