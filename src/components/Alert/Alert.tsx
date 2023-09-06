import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Notification, Modal} from '@mantine/core';
import {STATUS} from "../../const/statuses";
import {COLOR} from "../../const/colors";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, RootStateType} from "../../redux/store";
import {AppNotificationType, clearAppNotification, clearPopup, PopupType} from "../../redux/appReducer";
import {NOTIFICATION} from "../../const/notification";
import {getNotice, getPopup} from "../../selectors/selectors";


const Alert = () => {
    const notice = useSelector<RootStateType, AppNotificationType[]>(getNotice)
    const popup = useSelector<RootStateType, PopupType | null>(getPopup)
    const dispatch = useDispatch()
    const [isShown, setIsShown] = useState<boolean>(false)

    useEffect(() => {

        let timerId: null | ReturnType<typeof setTimeout> = null

        if (notice.length) {
            setIsShown(true)
            timerId = setTimeout( onCloseHandler, NOTIFICATION.AUTO_CLOSE)
        } else {
            setIsShown(false)
        }

        return () => {
            if(timerId)
                clearTimeout(timerId)
        }

    }, [notice])

    const onCloseHandler = useCallback(() => {

        dispatch<AppDispatchType>(clearAppNotification())
    },[])

    const onPopupClose = useCallback(() => {

        dispatch<AppDispatchType>(clearPopup())
    },[])

    const notifications = notice.map(({status, message}, i) => {
        const color = (status === STATUS.ERROR) ? COLOR.RED : COLOR.TEAL
        return <Notice color={color} message={message} callback={onCloseHandler} key={i}/>
    })

    return (
        <>
            {
                isShown && <div style={{
                    position: 'fixed',
                    bottom: '1%',
                    right: '1%',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: '1'
                }}>{notifications}</div>
            }
            <Modal opened={!!popup} onClose={onPopupClose} title={popup?.title} withCloseButton={true} zIndex={10} centered={true}>
                {popup?.message}
            </Modal>
        </>
    )
};

const Notice = React.memo(({color, callback, message}: NoticePropsType) => {

    const styles = useMemo(() => ({
        root:
            {   maxWidth: '500px',
                minWidth: '300px',
                width: '100%',
                minHeight: '100px',
                margin: '10px 0'
            } as const
    }),[])

    return (
        <Notification color={color} styles={styles} onClose={callback}>
            {message}
        </Notification>
    )
})

type NoticePropsType = {
    color: string
    message: string
    callback: () => void
}
export default Alert;
