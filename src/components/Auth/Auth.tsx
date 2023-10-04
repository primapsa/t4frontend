import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, RootStateType} from "../../redux/store";
import {getIsAuth} from "../../selectors/selectors";
import {checkAuth} from "../../redux/authReducer";

const Auth = () => {
    console.log('AUTH')
    const dispatch = useDispatch()
    const isAuth = useSelector<RootStateType, boolean>(getIsAuth)
    console.log('AUTH - isAuth', isAuth)
    useEffect(() => {
        isAuth || dispatch<AppDispatchType>(checkAuth())
    }, [])

    return null

};

export default Auth;