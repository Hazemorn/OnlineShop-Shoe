import s from './ItemDetail.module.scss';
import {useEffect, useState} from 'react';
import { useAppDispatch, useAppSelector, } from "../../hooks/redux";
import { addItem } from "../../store/slices/cartSlicer";
import {SEXES} from '../../services/contentData'
import Button from '../../components/Button/Button';
import type { Item } from '../../store/types/types';

const ItemDetail = () => {
    const dispatch = useAppDispatch();
    const [selectedSize, setSelectedSize] = useState<number | null>(null);
    const [count, setCount] = useState<number>(1);
    const {good: reduxGood} = useAppSelector(state => state.detailReducer);
    const [good, setGood] = useState<Item | null>(null);

    useEffect(() => {
        if (reduxGood) {
            setGood(reduxGood);
            localStorage.setItem('itemDetail', JSON.stringify(reduxGood));
        } else {
            try {
                const savedItem = localStorage.getItem('itemDetail');
                if (savedItem) {
                    setGood(JSON.parse(savedItem));
                }
            } catch (error) {
                console.error("localStorage itemDetail error", error);
            }
        }
    }, [reduxGood]);

    if (!good) {
        return <div className={s.loading}>Loading product details...</div>;
    }

    const { title, price, size, imageUrl, color, sex } = good;

    const sizeArray = typeof size === 'string' 
    ? size.split(" ").filter(Boolean).map(Number) 
    : size;


    const onClickAddCart = () => {
        if (!selectedSize) {
            alert('Please select your shoe size');
            return;
        }
        const item = {
            ...good,
            size: selectedSize,
            count: count
        }; 

        const savedItems = localStorage.getItem('cart');
        const cartItems = savedItems ? JSON.parse(savedItems) : [];
        const existingItemIndex = cartItems.findIndex(
            (i: any) => i.id === item.id && i.size === item.size
        );

        if (existingItemIndex !== -1) {
            cartItems[existingItemIndex].count += count;
        } else {
            cartItems.push(item);
        }
        localStorage.setItem('cart', JSON.stringify(cartItems));
        dispatch(addItem(item))
    }
    function increase () {
        setCount(count + 1);
    }
    function decrease () {
        count === 1 ? 1 : setCount(count - 1);
    }

    return ( 
    <section className={s.detail}>
        <div className={s.detail__img}>
            <img src={imageUrl} alt={imageUrl} loading='lazy'/>
        </div>
        <div className={s.detail__content}>
            <h2 className={s.detail__title}>{title}</h2>
            <h3 className={s.detail__price}>$ {price}</h3>
            <p className={s.detail__size}>{sizeArray.map((i) => (<li
              key={i}
              onClick={() => setSelectedSize(selectedSize === i ? null : i)} 
              className={selectedSize === i ? s.active : ""}
            >
                {i}
            </li>))}</p>
            <div className={s.detail__color}>{color}</div>
            <div className={s.detail__sex}>{SEXES.find(item => item.id === Number(sex))?.name || sex}</div>
            <div className={s.detail__count}>
                <div className={s.detail__count_wrapper}> 
                    <button onClick = {() => decrease()} className={s.counter__decrease}>-</button>
                    <h4>{count}</h4>
                    <button onClick = {() => increase()} className={s.counter__increase}>+</button>
                </div>
            </div>
            <Button isDisabled={!selectedSize} onClick={onClickAddCart} title='Add to cart'></Button>
        </div>
        
    
    </section> );
}
 
export default ItemDetail;