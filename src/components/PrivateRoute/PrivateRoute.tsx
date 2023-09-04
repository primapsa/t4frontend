import React from 'react';
import {Center, MantineProvider} from "@mantine/core";
import {Navigate, Outlet} from "react-router-dom";
import Preloader from "../Preloader/Preloader";
import {LINKS} from "../../const/routes";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {AppStatus} from "../../redux/appReducer";
import {STATUS} from "../../const/statuses";
import HeaderProps from "../Header/HeaderProps";
import {AuthUserType} from "../../redux/authReducer";
import HeaderUser from "../Header/HeaderUser";

const PrivateRoute = () => {
    const isAuth = useSelector<RootStateType, boolean>(state => state.auth.isAuth)
    const isAdmin = useSelector<RootStateType, boolean>(state => state.auth.isStaff)
    const user = useSelector<RootStateType, AuthUserType>(state => state.auth.user)
    //const status = useSelector<RootStateType, AppStatus>(state => state.app.status)

    // if (status === STATUS.LOADING)
    //     return <Preloader/>


    return (
        <>
            {
                isAuth ?
                    <>
                        { isAdmin &&  <Navigate to={LINKS.ADMIN}/>}
                        <HeaderUser/>
                        <Outlet/>
                    </> :
                    <Navigate to={LINKS.LOGIN}/>
            }
        </>
    )
};

export default PrivateRoute;