import React from 'react';
import s from "./Footer.module.scss";
import { NavLink } from "react-router";
//import Logo from '../../assets/logo.svg?react';
import instagramImg from "../../assets/socials/instagram.svg";
import facebookImg from "../../assets/socials/facebook.svg";

const Footer = React.memo(() => {
  return (
    <footer className={s.footer}>
      <div className={s.footer__wrapper}>
        <div className={s.footer__logo}>
          <NavLink
            to={{
              pathname: "/",
              hash: "header",
            }}
          >
            <h3>Shoe Shop</h3>
          </NavLink>
        </div>
        <div className={s.footer__text}>
          <p>
            We have shoes that suits your style and which you’re proud to wear.
            From women to men.
          </p>
        </div>
        <div className={s.footer_socials}>
          <a href="#">
            <img src={facebookImg} alt="facebookImg" loading="lazy" />
          </a>
          <a href="#">
            <img src={instagramImg} alt="instagramImg" loading="lazy" />
          </a>
        </div>

        <div className={s.links_block}>
          <p className={s.title}>Company</p>
          <NavLink to={"/"} end>
            Home
          </NavLink>
          <NavLink to={"/catalog"}>Catalog</NavLink>
          <NavLink to={"/contact"}>Contact Us</NavLink>
        </div>
        <div className={s.links_block}>
          <p className={s.title}>Help</p>
          <NavLink to={"/privacy"}>Privacy Policy</NavLink>
          <NavLink to={"/terms&conditions"}>Terms & Conditions</NavLink>
        </div>

        <div className={s.footer__bottom}>
          <hr className={s.footer__lineSeparator} />
          <div className={s.footer__license}>
            <p>© 2026 Shoe Shop. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
