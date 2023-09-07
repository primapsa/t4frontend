import React, {useMemo} from 'react';
import Cart from "../../../components/Cart/Cart";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";

const CartPage = () => {

    const paypalOptions = useMemo(() => ({clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID as string}), [])

    return (
        <PayPalScriptProvider options={paypalOptions}>
            <Cart/>
        </PayPalScriptProvider>
    );
};

export default React.memo(CartPage);