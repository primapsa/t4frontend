import {useSelector} from "react-redux";
import {RootStateType, useAppDispatch} from "../redux/store";
import {PromocodesType} from "../api/api";
import {getPage, getPagePromocode, getPromocodes, getStatus, getTotal, getTotalPromocode} from "../selectors/selectors";
import {AppStatus} from "../redux/appReducer";
import React, {useCallback, useEffect, useState} from "react";
import {PromocodeInitValueType} from "../components/Promocode/PromocodeForm";
import {deletePromocode, fetchPromocodes,setPage} from "../redux/promocodesReducer";
import {PAGE} from "../const/page";


export const usePromocodes = () => {
    const promocodes = useSelector<RootStateType, PromocodesType[]>(getPromocodes)
    const status = useSelector<RootStateType, AppStatus>(getStatus)

    const [isModal, setIsModal] = useState<boolean>(false)
    const [itemEdit, setItemEdit] = useState<PromocodeInitValueType>(undefined)
    const dispatch = useAppDispatch()

    const page = useSelector<RootStateType, number>(getPagePromocode)
    const total = useSelector<RootStateType, number>(getTotalPromocode)

    const pages = Math.ceil(total / PAGE.ITEM_PER_PAGE)


    const deleteItemHandler = useCallback((id: number) => {
        dispatch(deletePromocode(id))
    }, [promocodes])

    const editItemHandler = useCallback((pId: number) => {
        if (promocodes) {
            const promocode = promocodes.find(({id}) => id === pId)
            if (promocode) {
                setItemEdit(promocode)
                setIsModal(true)
            }
        }
    }, [promocodes])

    useEffect(() => {
        dispatch(fetchPromocodes(page))
    }, [page])

    const onModalCloseHandler = useCallback(() => setIsModal(false), [])
    const onClickHandler = useCallback(() => {
        setItemEdit(undefined)
        setIsModal(true)
    }, [])
    const closeModal = useCallback(() => setIsModal(false), [])

    const onChangePageHandler = useCallback((page: number) => {
        dispatch(setPage(page))
    }, [page])

    return {
        promocodes,
        deleteItemHandler,
        editItemHandler,
        status,
        onClickHandler,
        closeModal,
        isModal,
        itemEdit,
        onModalCloseHandler,
        pages,
        page,
        onChangePageHandler
    }
}