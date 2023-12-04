import React from 'react'

import { STATUS } from '../../const/statuses'
import { AppStatus } from '../../redux/appReducer'
import Preloader from '../Preloader/Preloader'
import EmptyState from './EmptyState'

const EmptyStateWithLoader = ({ children, isEmpty, status }: EmptyStateWithLoaderType) => {
  if (status === STATUS.LOADING) {
    return <Preloader />
  }

  return <>{isEmpty ? <EmptyState /> : children}</>
}

export default React.memo(EmptyStateWithLoader)

type EmptyStateWithLoaderType = {
  children?: React.ReactNode
  isEmpty: boolean
  status: AppStatus
}
