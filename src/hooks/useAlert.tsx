import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, RootStateType} from "../redux/store";
import {AppNotificationType, clearAppNotification, clearPopup, PopupType} from "../redux/appReducer";
import {getNotice, getPopup} from "../selectors/selectors";
import React, {useCallback, useEffect, useState} from "react";
import {NOTIFICATION} from "../const/notification";
import {STATUS} from "../const/statuses";
import {COLOR} from "../const/colors";
import Notice from "../components/Notice/Notice";

export const useAlert = () => {

    const notice = useSelector<RootStateType, AppNotificationType[]>(getNotice)
    const popup = useSelector<RootStateType, PopupType | null>(getPopup)
    const dispatch = useDispatch()
    const [isShown, setIsShown] = useState<boolean>(false)

    useEffect(() => {

        let timerId: null | ReturnType<typeof setTimeout> = null

        if (notice.length) {
            setIsShown(true)
            timerId = setTimeout(onCloseHandler, NOTIFICATION.AUTO_CLOSE)
        } else {
            setIsShown(false)
        }

        return () => {
            if (timerId)
                clearTimeout(timerId)
        }

    }, [notice])

    const onCloseHandler = useCallback(() => {

        dispatch<AppDispatchType>(clearAppNotification())
    }, [])

    const onPopupClose = useCallback(() => {

        dispatch<AppDispatchType>(clearPopup())
    }, [])

    const notifications = notice.map(({status, message}, i) => {
        const color = (status === STATUS.ERROR) ? COLOR.RED : COLOR.TEAL
        return <Notice color={color} message={message} callback={onCloseHandler} key={i}/>
    })

    return {
        notifications, isShown, popup, onPopupClose
    }
}