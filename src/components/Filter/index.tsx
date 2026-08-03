import React from 'react';
import s from './Filter.module.scss'
import { SIZES, COLOURS, SEXES } from "../../services/contentData";
import filterImg from "../../assets/icons/filter.svg";
import { setSize, setColor, setSex } from '../../store/slices/filterSlicer';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Tooltip from '../Tooltip/Tooltip';


const Filter = React.memo(() => {
  
  const dispatch = useAppDispatch();
  // const { size, color, sex } = useAppSelector(state => state.filterReducer);
  const size = useAppSelector(state => state.filterReducer.size);
  const color = useAppSelector(state => state.filterReducer.color);
  const sex = useAppSelector(state => state.filterReducer.sex);
  const filterReset = () => {
    dispatch(setSize(null));
    dispatch(setColor(null));
    dispatch(setSex(1));//"both"
  };
  return ( 

      <div className={s.filter}>
      <div className={s.filter__header}>
        <h2>Filter</h2>
        <div className={s.filter__header__reset}>
          <p>
            <Tooltip behaviour='click' children='!' placement='right' content='Click to reset all filters'/>
          </p>
          <img src={filterImg} alt={filterImg} loading="lazy" onClick={()=>filterReset()}/>
        </div>
       
      </div>
      {/* <div className={s.filter__price}>
        <h4>Price:</h4>
        <div className={s.filter__price__values}>
            <input />
            <input />
        </div>
      </div> */}
      <div className={s.filter__size}>
        <h4>Size:</h4>
        <ul className={s.selector}>
          {SIZES.map((sz) => (
            <li
              key={sz.id}
              onClick={() => dispatch(setSize(size === sz.value ? '' : sz.value))} //null
              className={size === sz.value ? s.active : ""}
            >
              {sz.size}
            </li>
          ))}
        </ul>
      </div>
      <div className={s.filter__color}>
        <h4>Colour:</h4>
        <ul className={s.selector}>
          {COLOURS.map((c) => (
            <li
              key={c.id}
              onClick={() => dispatch(setColor(color === c.colour.slice(6, -1) ? null : c.colour.slice(6, -1)))}
              className={`${color === c.colour.slice(6, -1) ? s.active : ""} ${s.border}`}
              style={{ backgroundColor: c.colour }}
            ></li>
          ))}
        </ul>
      </div>
      <div className={s.filter__sex}>
        <h4>Sex:</h4>
        <ul className={s.selectorSex}>
          {SEXES.map((sx) => (
            <li
              key={sx.id}
              onClick={() => dispatch(setSex(sx.id))}
              className={sex === sx.id ? s.active : ""}
            >
              {sx.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
    );
});

export default Filter;