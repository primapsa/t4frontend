import {Container, Group, Text, Title} from '@mantine/core';
import {NavLink} from "react-router-dom";
import {useStyles} from "./styles";

export function NotFound() {
    const { classes } = useStyles();

    return (
        <Container className={classes.root}>
            <div className={classes.label}>404</div>
            <Title className={classes.title}>You have found a secret place.</Title>
            <Text color="dimmed" size="lg" align="center" className={classes.description}>
                Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
                been moved to another URL.
            </Text>
            <Group position="center">
                <NavLink to={'/'}>На главную</NavLink>
            </Group>
        </Container>
    );
}