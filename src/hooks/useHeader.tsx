import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, RootStateType} from "../redux/store";
import {getIsAuth, getIsStaff, getUser} from "../selectors/selectors";
import {AuthUserType, checkAuth, logout} from "../redux/authReducer";
import {HeaderLinks} from "../const/routes";
import {NavLink} from "react-router-dom";
import React, {useCallback, useEffect} from "react";
import {useStyles} from "../components/Header/styles";

export const useHeader = () => {

    const {classes} = useStyles()
    const dispatch = useDispatch()
    const isAuth = useSelector<RootStateType, boolean>(getIsAuth)
    const isAdmin = useSelector<RootStateType, boolean>(getIsStaff)
    const user = useSelector<RootStateType, AuthUserType>(getUser)

    const userToggler = isAdmin ? 'admin' : 'user'
    const items = HeaderLinks[userToggler]
        .map(
            ({label, link}, i) =>
                (
                    <NavLink key={i} to={link} className={classes.link}>
                        {label}
                    </NavLink>
                ));

    useEffect(() => {
        dispatch<AppDispatchType>(checkAuth())
    }, [])

    const onLogoutHandler = useCallback(() => {
        dispatch<AppDispatchType>(logout())
    }, [])

    const onLoginHandler = useCallback(() => {
        return <NavLink to={'login'}/>
    }, [])


    return {
        items,
        user,
        isAuth,
        onLoginHandler,
        onLogoutHandler
    }

}