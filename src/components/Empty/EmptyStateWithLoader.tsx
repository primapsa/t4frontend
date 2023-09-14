import React from 'react';
import {AppStatus} from "../../redux/appReducer";
import {STATUS} from "../../const/statuses";
import Preloader from "../Preloader/Preloader";
import EmptyState from "./EmptyState";

const EmptyStateWithLoader = ({isEmpty, children, status}: EmptyStateWithLoaderType) => {

    if (status === STATUS.LOADING) {
        return <Preloader/>
    }

    return (
        <>
            {
                status === STATUS.IDLE && isEmpty ? <EmptyState/> : children
            }
        </>
    );
};

export default React.memo(EmptyStateWithLoader);


type EmptyStateWithLoaderType = {
    isEmpty: boolean
    status: AppStatus
    children?: React.ReactNode
}