import React, {useMemo} from 'react';
import Cart from "../../../components/Cart/Cart";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";

const CartPage = () => {

    const paypalOptions = useMemo(() => ({clientId: 'Ab5CTj7CgscXepjRbqA-UKCiEBDPkJBO5k7MvD0QymM6590VuwJeE83LOM1qG78KSHH2uChLTY_k_ETj'}), [])

    return (
        <PayPalScriptProvider options={paypalOptions}>
            <Cart/>
        </PayPalScriptProvider>
    );
};

export default React.memo(CartPage);