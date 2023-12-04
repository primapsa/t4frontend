import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Notice from '../components/Notice/Notice'
import { COLOR } from '../const/colors'
import { NOTIFICATION } from '../const/notification'
import { STATUS } from '../const/statuses'
import {
  AppNotificationType,
  PopupType,
  clearAppNotification,
  clearPopup,
} from '../redux/appReducer'
import { AppDispatchType, RootStateType } from '../redux/store'
import { getNotice, getPopup } from '../selectors/selectors'

export const useAlert = () => {
  const notice = useSelector<RootStateType, AppNotificationType[]>(getNotice)
  const popup = useSelector<RootStateType, PopupType | null>(getPopup)
  const dispatch = useDispatch()
  const [isShown, setIsShown] = useState<boolean>(false)

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout> | null = null

    if (notice.length) {
      setIsShown(true)
      timerId = setTimeout(onCloseHandler, NOTIFICATION.AUTO_CLOSE)
    } else {
      setIsShown(false)
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId)
      }
    }
  }, [notice])

  const onCloseHandler = useCallback(() => {
    dispatch<AppDispatchType>(clearAppNotification())
  }, [])

  const onPopupClose = useCallback(() => {
    dispatch<AppDispatchType>(clearPopup())
  }, [])

  const notifications = notice.map(({ message, status }, i) => {
    const color = status === STATUS.ERROR ? COLOR.RED : COLOR.TEAL

    return <Notice callback={onCloseHandler} color={color} key={i} message={message} />
  })

  return {
    isShown,
    notifications,
    onPopupClose,
    popup,
  }
}
