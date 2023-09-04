import {Container, Flex, Group, Header as HeaderMantine, Title, Button} from '@mantine/core';
import {NavLink} from "react-router-dom";
import {useStyles} from "./styles";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, RootStateType} from "../../redux/store";
import {AuthInitialType, AuthUserType, checkAuth, logout} from "../../redux/authReducer";
import {HeaderLinks} from "../../const/routes";

export function Header() {

    const {classes} = useStyles()
    const dispatch = useDispatch()
    const isAuth = useSelector<RootStateType, boolean>(state => state.auth.isAuth)
    const isAdmin = useSelector<RootStateType, boolean>(state => state.auth.isStaff)
    const user = useSelector<RootStateType, AuthUserType>(state => state.auth.user)

    const userToggler = isAdmin ? 'admin' : 'user'
    const items = HeaderLinks[userToggler]
        .map(({label, link}, i) => (
            <NavLink key={i} to={link} className={classes.link}>
                {label}
            </NavLink>
        ));

    useEffect(() => {
        dispatch<AppDispatchType>(checkAuth())
    }, [])

    const onLogoutHandler = () => {
        dispatch<AppDispatchType>(logout())
    }
    const onLoginHandler = () => {
        return <NavLink to={'login/'}/>
    }
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
                                {user.email}
                                <Button onClick={onLogoutHandler}>Выйти</Button>
                            </Flex>
                            : <Button onClick={onLoginHandler}>Войти</Button>
                    }
                </Flex>
            </Container>

        </HeaderMantine>
    );
}


