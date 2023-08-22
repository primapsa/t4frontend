import React, {useEffect} from 'react';
import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";
import {Paper, Title, Text, Flex, Center, Image, NumberInput, Loader} from '@mantine/core';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, RootStateType} from "../../redux/store";
import {CartConcertsType, CartType, ConcertsType} from "../../api/api";
import {MEDIA} from "../../const/media";
import {deleteCart, fetchCart} from "../../redux/cartReducer";
import ActionBar from "../ActionBar/ActionBar";
import {PAYPAL} from "../../const/PayPal";

const Cart = () => {

    const userId = 1;
    const purchases = useSelector<RootStateType, CartConcertsType[]>(state => state.cart.list)
    const paypalOptions = {clientId: PAYPAL.CLIENT_ID}
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch<AppDispatchType>(fetchCart(userId))
    }, [])
    const deleteItemHandler = (id: number) => {
        dispatch<AppDispatchType>(deleteCart(id))
    }
    //
    // const list = purchases.map(p => <CartItem
    //     id={p.id}
    //     title={p.title}
    //     price={p.price}
    //     count={p.count}
    //     poster={p.poster}
    //     key={p.id}
    //     callback={deleteItemHandler}
    // />)
    const cart = purchases.reduce((acc, p) => {
        acc.price += p.discount ? p.price * p.count * (1 - p.discount / 100) : p.price
        acc.items.push(<CartItem
            id={p.id}
            title={p.title}
            price={p.price}
            count={p.count}
            poster={p.poster}
            key={p.id}
            callback={deleteItemHandler}
        />)
        return acc
    },  {price: 0, items: [] as any[]})

    if (!purchases) {
        return <Loader/>
    }
    // @ts-ignore
    return (
        <PayPalScriptProvider options={paypalOptions}>
            <Center>
                <Flex>
                    <Flex direction={'column'}>
                        {cart.items}
                    </Flex>
                    <Flex direction={'column'}>
                        <Text fw={700}>{`Итого  ${cart.price}`}</Text>
                        <PayPalButtons style={{layout: "horizontal"}}
                                       createOrder={(data, actions) => {
                                           return actions.order.create({
                                               purchase_units: [
                                                   {
                                                       amount: {
                                                           currency_code: 'USD',
                                                           value: "10.00",
                                                       },
                                                   },
                                               ],
                                           });
                                       }}
                                       onCancel = { () => {console.log('Canceled')}}
                                       onError = {(err) => {console.log(err)} }
                                       onApprove={(data, actions) => {
                                           return actions?.order?.capture().then(function (details) {
                                               console.log('Payment completed. Thank you, ' + details?.payer?.name?.given_name)
                                           });
                                       }}/>
                    </Flex>
                </Flex>
            </Center>

        </PayPalScriptProvider>
    );
};
const CartItem = ({id, poster, title, price, count, callback}: CartItemPropsType) => {
    return (
        <Paper style={{margin: '10px'}}>
            <Flex>
                <Image src={`${MEDIA.URL}${poster}`} width={'100px'} height={'100px'}></Image>
                <Flex direction={"column"}>
                    <Text fw={700}>{title}</Text>
                    <div>
                        <Flex>
                            <NumberInput value={count}></NumberInput>
                            <Text>{`Стоимость: ${price} BYN`}</Text>
                        </Flex>
                    </div>
                </Flex>
                <ActionBar id={id} del={callback}/>
            </Flex>
        </Paper>
    )
}
type CartItemPropsType = {
    id: number
    poster: string
    title: string
    count: number
    price: number
    callback: (id: number) => void
}
export default Cart;