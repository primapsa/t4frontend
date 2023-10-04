import {useSelector} from "react-redux";
import {RootStateType, useAppDispatch} from "../redux/store";
import {PromocodesType} from "../api/api";
import {
    getPage,
    getPagePromocode,
    getPromocodes,
    getStatus,
    getStatusPromocode,
    getTotal,
    getTotalPromocode
} from "../selectors/selectors";
import {AppStatus} from "../redux/appReducer";
import React, {useCallback, useEffect, useState} from "react";
import {PromocodeInitValueType} from "../components/Promocode/PromocodeForm";
import {deletePromocode, fetchPromocodes, setPage} from "../redux/promocodesReducer";
import {PAGE} from "../const/page";
import {Flex} from "@mantine/core";
import Promocode from "../components/Promocode/Promocode";
import ActionBar from "../components/ActionBar/ActionBar";
import {useStyles} from "../features/Admin/Promocodes/styles";
import {ITEM_STATUS} from "../const/statuses";


export const usePromocodes = () => {

    const {classes} = useStyles()
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

    const list = promocodes.map(p =>
        <Flex key={p.id} className={classes.promocode}>
            <Promocode date={p.date} title={p.title} discount={p.discount}/>
            <ActionBar id={p.id} del={deleteItemHandler} edit={editItemHandler}
                       disabled={p.status === ITEM_STATUS.DELETE}/>
        </Flex>
    )

    return {
        status,
        onClickHandler,
        closeModal,
        isModal,
        itemEdit,
        onModalCloseHandler,
        pages,
        page,
        onChangePageHandler,
        list
    }
}