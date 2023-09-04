import React from 'react';
import {IconShoppingCart} from '@tabler/icons-react'
import {NavLink} from "react-router-dom";
import {LINKS} from "../../const/routes";

const CartIcon = () => {
    return (
        <NavLink to={LINKS.CART}>
            <IconShoppingCart size={'30px'}/>
        </NavLink>
    );
};

export default React.memo(CartIcon);