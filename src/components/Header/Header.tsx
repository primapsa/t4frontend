import {Button, Container, Flex, Group, Header as HeaderMantine, Text, Title} from '@mantine/core';
import {NavLink} from "react-router-dom";
import {useStyles} from "./styles";
import React from "react";
import {IconLogout} from "@tabler/icons-react"
import {useHeader} from "../../hooks/useHeader";

const Header = () => {

    const {classes} = useStyles()
    const {items, user, isAuth, onLogoutHandler, onLoginHandler} = useHeader()


    return (
        <HeaderMantine height={'85px'} className={classes.header}>
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
                            <Flex>
                                <Text className={classes.text}>{user.email}</Text>
                                <IconLogout
                                    onClick={onLogoutHandler}
                                    className={classes.button}/>
                            </Flex> :
                            <Button onClick={onLoginHandler}>Войти</Button>
                    }
                </Flex>
            </Container>
        </HeaderMantine>
    );
}
export default React.memo(Header)



