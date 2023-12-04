import React from 'react'

import EmptyState from './EmptyState'

const EmptyStateExt = ({ children, isEmpty }: EmptyStateProps) => {
  return <>{isEmpty ? <EmptyState /> : children}</>
}

export default React.memo(EmptyStateExt)

type EmptyStateProps = {
  children: React.ReactNode
  isEmpty: boolean
}
