import React from 'react';
import EmptyState from "./EmptyState";

const EmptyStateExt = ({isEmpty, children}: EmptyStateProps) => {
    return (
        <>
            {isEmpty ? <EmptyState/> : children}
        </>
    );
};

export default React.memo(EmptyStateExt);

type EmptyStateProps = {
    isEmpty: boolean
    children: React.ReactNode
}