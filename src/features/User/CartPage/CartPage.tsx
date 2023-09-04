import React, {useMemo} from 'react';
import Cart from "../../../components/Cart/Cart";
import {useSelector} from "react-redux";
import {CartConcertsType} from "../../../api/api";
import {RootStateType} from "../../../redux/store";
import {AuthUserType} from "../../../redux/authReducer";
import {AppStatus} from "../../../redux/appReducer";

const CartPage = () => {
    const purchases = useSelector<RootStateType, CartConcertsType[]>(state => state.cart.list)
    const user = useSelector<RootStateType, AuthUserType>(state => state.auth.user)
    const status = useSelector<RootStateType, AppStatus>(state => state.app.status)
    const memoPurchases = useMemo(() => purchases, [purchases])
    // const user = useSelector<RootStateType, AuthUserType>(state => state.auth.user)

    // if(!user.user_id){
    //     return <EmptyState/>
    // }
    return (
        <>

            {
                !!user.id &&
                <Cart purchases={memoPurchases} userId={user.id} status={status}></Cart>
            }

        </>
    );
};

export default React.memo(CartPage);