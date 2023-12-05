import React from 'react'
import { NavLink } from 'react-router-dom'

import {
  Button,
  Container,
  Flex,
  Group,
  Header as HeaderMantine,
  Text,
  Title,
  TitleOrder,
} from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'

import { GROUP, HEADER, TITLE } from '../../const/settings'
import { useHeader } from '../../hooks/useHeader'
import { useStyles } from './styles'

const Header = () => {
  const { classes } = useStyles()
  const { isAuth, items, onLoginHandler, onLogoutHandler, user } = useHeader()

  return (
    <HeaderMantine className={classes.header} height={HEADER.HEIGHT}>
      <Container className={classes.container}>
        <NavLink className={classes.home} to={'/'}>
          <Title className={classes.linkHeader} order={TITLE.ORDER1}>
            T4u
          </Title>
        </NavLink>
        <Group className={classes.links} spacing={GROUP.SPACING5}>
          {items}
        </Group>
        <Flex>
          {isAuth ? (
            <Flex>
              <Text className={classes.text}>{user.email}</Text>
              <IconLogout className={classes.button} onClick={onLogoutHandler} />
            </Flex>
          ) : (
            <Button onClick={onLoginHandler}>Войти</Button>
          )}
        </Flex>
      </Container>
    </HeaderMantine>
  )
}

export default React.memo(Header)
