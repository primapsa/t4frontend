import React from 'react'

import { Pagination as Paginate } from '@mantine/core'

import { PAGE } from '../../const/page'

const Pagination = ({ onChange, page, total }: PaginationPropsType) => {
  return (
    <>
      {total > PAGE.PAGINATION && (
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
