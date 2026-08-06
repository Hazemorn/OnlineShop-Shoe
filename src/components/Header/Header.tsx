import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router";
import s from "./Header.module.scss";

import trolleyImg from "../../assets/icons/trolley.svg";
import burgerImg from "../../assets/icons/burger.svg";
import closeImg from "../../assets/icons/close.svg";
import { useAppSelector } from "../../hooks/redux";

const Header = () => {
  const { totalPrice, totalCount } = useAppSelector(
    (state) => state.cartReducer
  );
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header>
      <div className={s.header} id={"#header"}>
        <NavLink to={"/"}>
          <h3>Shoe Shop</h3>
        </NavLink>
        <div className={`${s.header__links} ${s.header__desktop}`}>
          <NavLink to={"/"} end>
            Home
          </NavLink>
          <NavLink to={"/catalog"}>Catalog</NavLink>
          <NavLink to={"/contact"}>Contact Us</NavLink>
          {/* <NavLink to={
                    "/#reviews"
                }>Reviews</NavLink> */}
        </div>
        <div className={s.header__trolley}>
          <NavLink to={"/cart"}>
            <div className={s.header__trolley__content}>
              <h4>$ {totalPrice}</h4>
              <img src={trolleyImg} alt="trolleyImg" loading="lazy" />
              <span>{totalCount}</span>
            </div>
          </NavLink>
        </div>
        <div className={`${s.header__burger}`}>
          <img
            src={burgerImg}
            alt="burgerIcon"
            loading="lazy"
            onClick={() => setIsMenuOpen(true)}
          />
        </div>
      </div>

      {isMenuOpen && (
        <div className={s.mobile_popup_menu}>
          <img
            src={closeImg}
            alt="close"
            loading="lazy"
            className={s.close}
            onClick={() => setIsMenuOpen(false)}
          />
          <div className={s.mobile__links}>
            <NavLink to={"/"} end>
              Home
            </NavLink>
            <NavLink to={"/catalog"}>Catalog</NavLink>
            <NavLink to={"/contact"}>Contact Us</NavLink>
            <NavLink
              to={{
                pathname: "/",
                hash: "reviews",
              }}
            >
              Reviews
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
