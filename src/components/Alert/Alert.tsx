import React from 'react';
import {Modal} from '@mantine/core';
import {useAlert} from "../../hooks/useAlert";
import {useStyles} from "./style";


const Alert = () => {

    const {notifications, isShown, popup, onPopupClose} = useAlert()
    const {style} = useStyles()

    return (
        <>
            {
                isShown && <div style={style}>{notifications}</div>
            }
            <Modal opened={!!popup}
                   onClose={onPopupClose}
                   title={popup?.title}
                   withCloseButton={true}
                   zIndex={10}
                   centered={true}>
                {popup?.message}
            </Modal>
        </>
    )
};


export default Alert;
