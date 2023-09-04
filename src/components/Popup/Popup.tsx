import {Modal} from "@mantine/core";
import React from "react";

const Popup = ({title, message, onClose, isOpened}:PopupPropsType) => {

    return (
        <Modal opened={isOpened} onClose={onClose} title={title}>
            {message}
        </Modal>
    )
}
export default React.memo(Popup)

type PopupPropsType = {
    title: string
    message: string
    onClose: () => void
    isOpened: boolean
}