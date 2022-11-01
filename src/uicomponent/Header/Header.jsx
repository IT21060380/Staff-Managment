import React, { useRef, useEffect } from "react";

import { Container } from "reactstrap";
import logo from "../../assets/images/res-logo.png";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

 import { cartUiActions } from "../../store/shopping-cart/cartUiSlice";

import "../../styles/header.css";

const nav__links = [
  {
    display: 'Home',
    path: '/homeui',
  },
  {
    display: 'All-Foods',
    path: '/foodsui',
  },
  {
    display: 'Cart',
    path: '/cartui',
  },
  {
    display: 'Contact',
    path: '/contactui',
  },
];

const Header = () => {
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("header__shrink");
      } else {
        headerRef.current.classList.remove("header__shrink");
      }
    })

    return () => window.removeEventListener("scroll");
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">
          <div className="logo">
            <img src={logo} alt="logo" />
            <h5>Supermarket</h5>
          </div>

          {/* ======= menu ======= */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <div className="menu d-flex align-items-center gap-5">
              {nav__links.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={index}
                  className={(navClass) =>
                    navClass.isActive ? "active__menu" : ""
                  }

                  >
                  {item.display}
                </NavLink>
              ))}
            </div>
          </div>

          {/*========nav right icon*/}
          <div className="nav_right d-flex align-items-center gap-3">
            <span className="cart_icon" onClick={toggleCart}>
            <i class="ri-shopping-basket-line"></i>
            <span className="cart_badge">{totalQuantity}</span>
            </span>
            <span className="user">
              <Link to='/loginui'><i class="ri-user-line"></i></Link>
            </span>
            <span className="mobile_menu" onClick={toggleMenu}>
            <i class="ri-menu-line"></i>
            </span>
          </div> 
        </div>
      </Container>
    </header>
  );
};

export default Header;