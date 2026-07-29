import s from "./CardItem.module.scss";
import { useAppDispatch } from "../../hooks/redux";
import type { Item } from "../../store/types/types"
import { useNavigate } from "react-router";
import { openDetails } from "../../store/slices/detailSlicer";

const CardItem = ({ ...item }: Item) => {//id, title, imageUrl, price
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onClickAdd = () => {
    navigate('/details');
    dispatch(openDetails(item))
  }
  return (
    <div className={s.cardItem}>
      <div className={s.cardItem__wrapper} onClick={onClickAdd}>
        <div className={s.cardItem__img}>
          <img src={item.imageUrl} alt={item.imageUrl} loading="lazy" />
        </div>
        <div className={s.cardItem__bottom}>
          <div className={s.cardItem__text}>
            <h4>{item.title}</h4>
            {/* <div className={s.cardItem__rate}></div> */}
            <div className={s.cardItem__price}>$ {item.price}</div>
          </div>
          <button> + Add </button>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
