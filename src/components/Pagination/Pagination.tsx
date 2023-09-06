import React from 'react';
import {Pagination as Paginate} from '@mantine/core';

const Pagination = ({total, page, onChange}: PaginationPropsType) => {
    return (
        <>
            {
                total > 1 &&
                <Paginate total={total} value={page} onChange={onChange} position={'center'}></Paginate>
            }
        </>
    )

};
type PaginationPropsType = {
    total: number
    page: number
    onChange: (p: number) => void
}
export default React.memo(Pagination);