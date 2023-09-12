import {CartConcertsType} from "../api/api";
import CartItem from "../components/CartItem/CartItem";
import React, {useMemo} from "react";

export const useCartItem = ({
                                purchases,
                                deleteItemHandler,
                                promocodeAddHandler,
                                counterHandler,
                                changePromocdeHandler
                            }: UseCartItemPropsType) => {

    const cart = useMemo(() =>
            purchases.reduce((acc, p) => {
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
        , [purchases])


}

type UseCartItemPropsType = {
    purchases: CartConcertsType[]
    deleteItemHandler: (id: number) => void
    promocodeAddHandler: (p: string, id: number) => void
    changePromocdeHandler: (id: number, value: string) => void
    counterHandler: (v: number, c: number) => void

}