import React from 'react';
import {PayPalButtons, usePayPalScriptReducer} from "@paypal/react-paypal-js";
import {Center, Flex, Text} from '@mantine/core';
import EmptyStateWithLoader from "../Empty/EmptyStateWithLoader";
import {createPayOrder} from "../../utils/paypal";
import {discountFormat} from "../../utils/utils";
import {useStyles} from "./styles";
import Preloader from "../Preloader/Preloader";
import {useCart} from "../../hooks/useCart";


const Cart = () => {

    const [{isPending}] = usePayPalScriptReducer();
    const {classes} = useStyles()
    const { cart, length, status, paymentSuccess } = useCart()

    return (
        <EmptyStateWithLoader isEmpty={!length} status={status}>
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
