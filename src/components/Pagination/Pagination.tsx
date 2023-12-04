import React from 'react'

import { Pagination as Paginate } from '@mantine/core'

const Pagination = ({ onChange, page, total }: PaginationPropsType) => {
  return (
    <>
      {total > 1 && (
        <Paginate onChange={onChange} position={'center'} total={total} value={page}></Paginate>
      )}
    </>
  )
}

type PaginationPropsType = {
  onChange: (p: number) => void
  page: number
  total: number
}
export default React.memo(Pagination)
