import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, RootStateType} from "../redux/store";
import {AuthUserType, login, LoginType, registerUser, setLoginType, socialLogin} from "../redux/authReducer";
import {getAuthError, getAuthType, getIsAuth, getMemoLoadingStatus, getUser} from "../selectors/selectors";
import {AppStatus} from "../redux/appReducer";
import {useForm, yupResolver} from "@mantine/form";
import {FORM} from "../const/form";
import {useCallback, useEffect} from "react";
import {CredentialResponse} from "@react-oauth/google";

export const useLogin = () => {

    const type = useSelector<RootStateType, LoginType>(getAuthType)
    const isAuth = useSelector<RootStateType, boolean>(getIsAuth)
    const isLoading = useSelector<RootStateType, AppStatus | undefined>(getMemoLoadingStatus)
    const error = useSelector<RootStateType, string | null>(getAuthError)
    const user =  useSelector<RootStateType, AuthUserType>(getUser)


    const form = useForm({
        initialValues: FORM.INIT.AUTH,
        validate: yupResolver(FORM.VALIDATION.FORM)
    });

    useEffect(() => {
        if(error){
            form.setFieldValue('email', user.email || '')
            form.setFieldError('email', error)
        }
    },[error])

    const dispatch = useDispatch()

    const onGoogleSuccess = useCallback(({credential}: CredentialResponse) => {
        if (credential)
            dispatch<AppDispatchType>(socialLogin(credential))
    }, [])

    const formHandler = form.onSubmit((fields) => {
        const credentials = {...fields, username: fields.email}
        const action = type === 'login' ? login : registerUser
        dispatch<AppDispatchType>(action(credentials))
    })

    const onClickHandler = useCallback(() => {
        const toggleType = type === 'register' ? 'login' : 'register'
        dispatch<AppDispatchType>(setLoginType(toggleType))
        form.reset()
    }, [type])


    return {
        isLoading,
        type,
        onGoogleSuccess,
        formHandler,
        form,
        onClickHandler,
        isAuth
    }
}