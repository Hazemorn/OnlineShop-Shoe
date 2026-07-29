//import {useMemo, useState} from 'react';
import s from './Cart.module.scss';
import CartFooter from './CartFooter/CartFooter';
import CartHeader from './CartHeader/CartHeader';
import { useAppSelector } from '../../hooks/redux';
import CartGood from './CartGood/CartGood'

const Cart: React.FC = () =>  {
    const { items , totalPrice, totalCount} = useAppSelector(state => state.cartReducer);

    return (
        <section className={s.section_cart}>
            <header className={s.section_cart__header}>
                <div className='container'>
                    <h2 className='titles-1'>Shopping Cart </h2>  
                </div>
                </header>
            <div className={s.section_cart__body}>
                <div className='container'>
                    <CartHeader />
                    {items.length > 0 ? items.map((item) =>
                        <CartGood key={`${item.id}-${item.size}`} item={item} />
                    ):
                    <h3>The cart is empty</h3>
                    }
                     <CartFooter totalCount={totalCount} totalPrice={totalPrice}/> 
                </div> 
            </div>
        </section>
    )
}

export default Cart;