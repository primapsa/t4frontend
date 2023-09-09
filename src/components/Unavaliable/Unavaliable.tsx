import {Container, Text, Title, Center, Flex} from '@mantine/core';
import {useStyles} from "./styles";
import React from "react";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {AppStatus} from "../../redux/appReducer";
import {getStatus} from "../../selectors/selectors";
import {STATUS} from "../../const/statuses";

const Unavaliable = ({children}: UnavalibalePropsType) => {
    const {classes} = useStyles();
    const status = useSelector<RootStateType, AppStatus>(getStatus)

    return (
        <>
            {status === STATUS.ERROR ?
                <Center>
                    <Flex className={classes.root}>
                        <div className={classes.label}>Unavaliable</div>
                        <Title className={classes.title}>Something went wrong.</Title>
                        <Text color="dimmed" size="lg" align="center" className={classes.description}>
                            Unfortunately,the server is unavailable. Please, try later
                        </Text>
                    </Flex>
                </Center>
                : children
            }
        </>
    );
}
export default Unavaliable

type UnavalibalePropsType = {
    children: React.ReactNode
}