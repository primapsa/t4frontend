import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, RootStateType} from "../redux/store";
import {getCart, getIsAuth, getIsStaff, getTotalCart, getUser, getUserId} from "../selectors/selectors";
import {AuthUserType, checkAuth, logout} from "../redux/authReducer";
import {HeaderLinks} from "../const/routes";
import {NavLink} from "react-router-dom";
import React, {useCallback, useEffect} from "react";
import {useStyles} from "../components/Header/styles";
import CartIcon from "../components/CartIcon/CartIcon";
import {CartConcertsType, CartType} from "../api/api";
import {getCartCount} from "../utils/utils";
import {fetchCart} from "../redux/cartReducer";

export const useHeader = () => {

    const {classes} = useStyles()
    const dispatch = useDispatch()
    const isAuth = useSelector<RootStateType, boolean>(getIsAuth)
    const isAdmin = useSelector<RootStateType, boolean>(getIsStaff)
    const user = useSelector<RootStateType, AuthUserType>(getUser)
    const cart = useSelector<RootStateType, number>(getTotalCart)
    const userId = useSelector<RootStateType, number | null>(getUserId)

    const userToggler = isAdmin ? 'admin' : 'user'
    const items = HeaderLinks[userToggler]
        .map(
            ({label, link}, i) =>
                (
                    <NavLink key={i} to={link} className={classes.link}>
                        {label}
                    </NavLink>
                ));

    if (!isAdmin) {
        items.push(<CartIcon count={cart} key={items.length}/>)
    }

    useEffect(() => {
        isAuth || dispatch<AppDispatchType>(checkAuth())
    }, [])

    useEffect(() => {
        if (!isAdmin && userId)
            dispatch<AppDispatchType>(fetchCart(userId))
    }, [userId])

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