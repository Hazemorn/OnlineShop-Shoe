import React from 'react';
import s from './CartGood.module.scss';
import { useAppDispatch } from '../../../hooks/redux';
import { addItem, minusItem, removeItem } from '../../../store/slices/cartSlicer';
import { SEXES } from '../../../services/contentData';
import trashCanImg from '../../../assets/icons/trash-can.svg'
//import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate';

interface GoodProps {
    item: any; 
}

const CardGood = React.memo(({item}:GoodProps) => {
    const dispatch = useAppDispatch();
    //useWhyDidYouUpdate('CardGood', { item });
    const {id, title, price, size, imageUrl, color, sex, count } = item;

    const handleIncrease = () => {
        dispatch(addItem({id, size}));
    };

    const handleDecrease = () => {
        if (count > 1) {
            dispatch(minusItem({id, size}));
        }
    }
    return (
        <section key={`${id}-${size}`} className={s.good}>
            <div className={s.good__img}><img src={imageUrl} alt={imageUrl} loading='lazy'/></div>
            <div className={s.good__name}>{title}</div>
            <div className={s.good__option}>
                <div>Size: {size}</div>
                <div>Color: {color}</div>
                <div>Sex: {SEXES.find(item => item.id === sex)?.name}</div>
            </div>
            <div className={s.good__count}>
            
                <div className={s.good__count_wrapper}> 
                    <button onClick = {handleDecrease} className={s.counter__decrease}>-</button>
                    <h4>{count}</h4>
                    <button onClick = {handleIncrease} className={s.counter__increase}>+</button>
                </div>
            </div>
            <div className={s.good__price}>
                {price}
            </div>
            <div className={s.good__garbage} onClick={() => dispatch(removeItem({id, size}))}>
                <img src={trashCanImg} alt='trashCan' loading='lazy'/>
            </div>
            
        </section>
    );
});
 
export default CardGood;