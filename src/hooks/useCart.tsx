import {useSelector} from "react-redux";
import {RootStateType, useAppDispatch} from "../redux/store";
import {CartConcertsType} from "../api/api";
import {getCart, getStatus, getUserId} from "../selectors/selectors";
import {AppStatus} from "../redux/appReducer";
import React, {useCallback, useEffect} from "react";
import {
    deleteCart,
    deleteCartUser,
    fetchCart,
    setCartPromocode,
    updateCart,
    validatePromocode
} from "../redux/cartReducer";
import CartItem from "../components/CartItem/CartItem";

export const useCart = () => {

    const purchases = useSelector<RootStateType, CartConcertsType[]>(getCart)
    const userId = useSelector<RootStateType, number | null>(getUserId)
    const status = useSelector<RootStateType, AppStatus>(getStatus)
    const dispatch = useAppDispatch()
    const length = purchases.length


    useEffect(() => {
        if (userId)
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
        if (userId)
            dispatch(deleteCartUser({userId, data}))
    }, [userId])

    const cart = purchases.reduce((acc, p) => {
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


    return {
        length,
        cart,
        status,
        paymentSuccess
    }
}

