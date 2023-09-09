import React, {useEffect} from 'react';
import {AppDispatchType} from "../../redux/store";
import {checkAuth} from "../../redux/authReducer";
import {useDispatch} from "react-redux";

const Auth = ({children}: AuthPropsType) => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch<AppDispatchType>(checkAuth())
    }, [])

    return (
        <>
            {
                children
            }
        </>
    )
};

export default React.memo(Auth);


type AuthPropsType = {
    children: React.ReactNode
}