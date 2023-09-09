import React, {useCallback, useEffect, useMemo} from 'react';
import {PayPalButtons, usePayPalScriptReducer} from "@paypal/react-paypal-js";
import {Center, Flex, Text} from '@mantine/core';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, RootStateType, useAppDispatch} from "../../redux/store";
import {CartConcertsType} from "../../api/api";
import {
    deleteCart,
    deleteCartUser,
    fetchCart,
    setCartPromocode,
    updateCart,
    validatePromocode
} from "../../redux/cartReducer";
import {AppStatus} from "../../redux/appReducer";
import EmptyStateWithLoader from "../Empty/EmptyStateWithLoader";
import CartItem from "../CartItem/CartItem";
import {createPayOrder} from "../../utils/paypal";
import {discountFormat} from "../../utils/utils";
import {useStyles} from "./styles";
import {AuthUserType} from "../../redux/authReducer";
import Preloader from "../Preloader/Preloader";
import {getCart, getStatus, getUser} from "../../selectors/selectors";


const Cart = () => {

    const dispatch = useAppDispatch()
    const [{isPending}] = usePayPalScriptReducer();
    const purchases = useSelector<RootStateType, CartConcertsType[]>(getCart)
    const user = useSelector<RootStateType, AuthUserType>(getUser)
    const status = useSelector<RootStateType, AppStatus>(getStatus)
    const {classes} = useStyles()


    const userId = user.id
    useEffect(() => {
        dispatch(fetchCart(userId))
    }, [userId])

    const deleteItemHandler = useCallback((id: number) => {
        dispatch(deleteCart(id))
    }, [])

    const promocodeAddHandler = useCallback((promocode: string, id: number) => {
        dispatch(validatePromocode({promocode, id}))
    }, [])

    const changePromocdeHandler = useCallback((id: number, value: string) => {
        dispatch(setCartPromocode({id, value}))
    }, [])

    const counterHandler = useCallback((id: number, count: number) => {
        dispatch(updateCart({id, data: {count}}))
    }, [])

    const paymentSuccess = useCallback(async (data: any, actions: any) => {
        dispatch(deleteCartUser({userId, data}))
    }, [userId])

    let cart = purchases.reduce((acc, p) => {
        const price = p.price * p.count
        const discount = p.discount ? price - price * (1 - p.discount / 100) : 0
        const fullPrice = discount ? price - discount : discount

        acc.discount += discount
        acc.price += price - discount
        acc.ids.push(p.id)
        acc.items.push(
            <CartItem
                id={p.id}
                title={p.title}
                price={price}
                count={p.count}
                discount={fullPrice}
                poster={p.poster}
                key={p.id}
                promocode={p.promocode}
                onAdd={promocodeAddHandler}
                onDelete={deleteItemHandler}
                onChange={changePromocdeHandler}
                onDecrement={(count) => counterHandler(p.id, count)}
                onIncrement={(count) => counterHandler(p.id, count)}
            />)
        return acc
    }, {price: 0, items: [] as any[], ids: [] as number[], discount: 0})

    cart = useMemo(() => cart, [purchases])


    return (
        <EmptyStateWithLoader isEmpty={!purchases.length} status={status}>
            <Center className={classes.center}>
                <Flex direction={'column'}>
                    {cart.items}
                </Flex>
                <Flex className={classes.payblock}>
                    {
                        isPending ? <Preloader/> :
                            <>
                                <Text classNames={classes.text}>{`Итого:  ${cart.price} USD`}</Text>
                                {
                                    !!cart.discount &&
                                    <Text
                                        className={classes.text}>{`Скидка:  ${discountFormat(cart.discount)} USD`}</Text>
                                }
                                <PayPalButtons style={{layout: "horizontal"}}
                                               createOrder={createPayOrder(cart.ids)}
                                               onApprove={paymentSuccess}/>
                            </>
                    }
                </Flex>
            </Center>
        </EmptyStateWithLoader>
    );
};

export default Cart;
