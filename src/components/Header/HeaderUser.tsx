import {Button, Container, Flex, Group, Header as HeaderMantine, Title} from '@mantine/core';
import {NavLink} from "react-router-dom";
import {useStyles} from "./HeaderStyle";
import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, RootStateType} from "../../redux/store";
import {AuthUserType, checkAuth, logout} from "../../redux/authReducer";
import {HeaderLinks} from "../../const/routes";

const HeaderUser = () => {

    const {classes} = useStyles()
    const dispatch = useDispatch()
    const isAuth = useSelector<RootStateType, boolean>(state => state.auth.isAuth)
    const isAdmin = useSelector<RootStateType, boolean>(state => state.auth.isStaff)
    const user = useSelector<RootStateType, AuthUserType>(state => state.auth.user)

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
    }, [])


    return (
        <HeaderMantine height={'100%'} className={classes.header}>
            <Container className={classes.container}>
                <NavLink to={'/'} className={classes.home}>
                    <Title order={1} className={classes.linkHeader}>T4u</Title>
                </NavLink>
                <Group spacing={5} className={classes.links}>
                    {items}
                </Group>
                <Flex>
                    {
                        isAuth ?
                            <Flex direction={"column"} align={"center"}>
                                {user.email}
                                <Button onClick={onLogoutHandler} className={classes.button}>Выйти</Button>
                            </Flex>
                            :
                            <Button onClick={onLoginHandler}>Войти</Button>
                    }
                </Flex>
            </Container>
        </HeaderMantine>
    );
}
export default React.memo(HeaderUser)



