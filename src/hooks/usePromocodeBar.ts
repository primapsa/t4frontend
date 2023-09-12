import React, {useCallback, useState} from "react";
import {PromocodePropsType} from "../components/PromocodeBar/PromocodeBar";

export const usePromocodeBar = ({addCallback, id, promocode}:PromocodePropsType) => {

    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [value, setValue] = useState<string>(promocode || '')
    const addHandler = useCallback(() => {
        addCallback(value, id)
        setValue('')
        setIsVisible(false)
    },[id, value, addCallback])

    const showHandler = useCallback(() => {
        setIsVisible(!isVisible)
    },[isVisible])

    const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) =>
        setValue(e.target.value),[value])

    const buttonName = isVisible ? 'Закрыть' : 'Промокод'

    return {
        buttonName,
        isVisible,
        value,
        onChangeHandler,
        addHandler,
        showHandler
    }
}

