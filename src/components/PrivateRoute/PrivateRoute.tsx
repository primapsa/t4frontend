import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {LINKS} from "../../const/routes";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import HeaderUser from "../Header/HeaderUser";
import {getIsAuth, getIsStaff} from "../../selectors/selectors";

const PrivateRoute = () => {

    const isAuth = useSelector<RootStateType, boolean>(getIsAuth)
    const isAdmin = useSelector<RootStateType, boolean>(getIsStaff)

    if (isAdmin) {
        return <Navigate to={'admin'}/>
    }
    return (
        <>
            {
                isAuth ?
                    <>
                        <HeaderUser/>
                        <Outlet/>
                    </> :
                    <Navigate to={LINKS.LOGIN}/>
            }
        </>
    )
};

export default PrivateRoute;