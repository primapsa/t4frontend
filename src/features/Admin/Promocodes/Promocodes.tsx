import React, {useCallback, useEffect, useState} from 'react';
import {Button, Center, Flex, Modal} from '@mantine/core';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, RootStateType} from "../../../redux/store";
import {PromocodesType} from "../../../api/api";
import {deletePromocode, fetchPromocodes} from "../../../redux/promocodesReducer";
import ActionBar from "../../../components/ActionBar/ActionBar";
import PromocodeForm, {PromocodeInitValueType} from "../../../components/Promocode/PromocodeForm";
import Promocode from "../../../components/Promocode/Promocode";
import {useStyles} from "./styles";
import EmptyStateWithLoader from "../../../components/Empty/EmptyStateWithLoader";
import {AppStatus} from "../../../redux/appReducer";
import {getPromocodes, getStatus} from "../../../selectors/selectors";

const Promocodes = () => {

    const {classes} = useStyles()
    const promocodes = useSelector<RootStateType, PromocodesType[]>(getPromocodes)
    const status = useSelector<RootStateType, AppStatus>(getStatus)

    const [isModal, setIsModal] = useState<boolean>(false)
    const [itemEdit, setItemEdit] = useState<PromocodeInitValueType>(undefined)
    const dispatch = useDispatch()

    const deleteItemHandler = useCallback((id: number) => {
        dispatch<AppDispatchType>(deletePromocode(id))
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

    const list = promocodes.map(p =>
        <Flex key={p.id} className={classes.promocode}>
            <Promocode date={p.date} title={p.title} discount={p.discount}/>
            <ActionBar id={p.id} del={deleteItemHandler} edit={editItemHandler}/>
        </Flex>
    )

    useEffect(() => {
        dispatch<AppDispatchType>(fetchPromocodes())
    }, [])

    const onModalCloseHandler = useCallback(() => setIsModal(false), [])
    const onClickHandler = useCallback(() => {
        setItemEdit(undefined)
        setIsModal(true)
    }, [])
    const closeModal = useCallback(() => setIsModal(false), [])


    return (
        <EmptyStateWithLoader isEmpty={!promocodes.length} status={status}>
            <Center>
                <Flex className={classes.wrapper}>
                    <Button className={classes.button} onClick={onClickHandler}>Добавить промокод</Button>
                    <Modal opened={isModal} onClose={closeModal}>
                        <PromocodeForm initValues={itemEdit} onClose={onModalCloseHandler}/>
                    </Modal>
                    <Flex className={classes.promocodes}>
                        {list}
                    </Flex>
                </Flex>
            </Center>
        </EmptyStateWithLoader>
    );
};


export default Promocodes;