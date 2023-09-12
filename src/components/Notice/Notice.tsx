import React from "react";
import {Notification} from "@mantine/core";
import {useStyles} from "./style";

const Notice = ({color, callback, message}: NoticePropsType) => {

    const {classes} = useStyles()

    return (
        <Notification color={color} classNames={{root: classes.root}} onClose={callback}>
            {message}
        </Notification>
    )
}

export default React.memo(Notice)

type NoticePropsType = {
    color: string
    message: string
    callback: () => void
}