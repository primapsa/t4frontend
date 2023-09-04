import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import Preloader from "../Preloader/Preloader";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {AppStatus} from "../../redux/appReducer";
import {STATUS} from "../../const/statuses";
import {NotFound} from "../404/NotFound";
import HeaderUser from "../Header/HeaderUser";

const ProptectedRoute = () => {
    const isStaff = useSelector<RootStateType, boolean>(state => state.auth.isStaff)
    //const status = useSelector<RootStateType, AppStatus>(state => state.app.status)

    // if(status === STATUS.LOADING)
    //     return <Preloader/>

    return (
        <>
            {
                isStaff ?
                    <>
                        <HeaderUser/>
                        <Outlet/>
                    </>
                    :
                    <NotFound/>
            }
        </>
    )

};

export default ProptectedRoute;