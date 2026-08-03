import React from 'react';
import s from './CartFooter.module.scss'
import trashCanImg from '../../../assets/icons/trash-can.svg';
import { useAppDispatch } from '../../../hooks/redux';
import { clearItems } from '../../../store/slices/cartSlicer';

interface FooterProps {
    totalCount: number;
    totalPrice: number;
}

const CartFooter: React.FC<FooterProps> = React.memo(({...total}) => {
    const dispatch = useAppDispatch();
    const {totalCount, totalPrice} = total;

    const isDisabled = totalCount === 0;
    return ( 
        <footer className={s.cart_footer}>
            <button disabled={isDisabled}>Buy Now</button>
            <div className={s.cart_footer_garbage} onClick={() => dispatch(clearItems())}><img src={trashCanImg} alt='trashCan' loading='lazy'/></div>
            <div className={s.cart_footer__count}>{totalCount} {(totalCount === 1 || totalCount === 0) ? 'item' : 'items'}</div>
            <div className={s.cart_footer__cost}>$ {totalPrice}</div>
        </footer>
     );
});
 
export default CartFooter;