import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import HeaderUser from "../Header/HeaderUser";
import {LINKS} from "../../const/routes";
import {getIsAuth, getIsStaff} from "../../selectors/selectors";

const ProptectedRoute = () => {
    const isStaff = useSelector<RootStateType, boolean>(getIsStaff)
    const isAuth = useSelector<RootStateType, boolean>(getIsAuth)

    return (
        <>
            {
                isStaff ?
                    <>
                        <HeaderUser/>
                        <Outlet/>
                    </> :
                    <>
                        {
                            isAuth ?
                                <Navigate to={`../${LINKS.NOT_FOUND}`}/> :
                                <Navigate to={`../${LINKS.LOGIN}`}/>
                        }
                    </>
            }
        </>
    )
};

export default ProptectedRoute;