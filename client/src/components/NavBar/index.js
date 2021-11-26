import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/users";
import { useHistory } from "react-router-dom";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  NavBtnLinkLogout,
} from "./NavbarElements";

const Navbar = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const history = useHistory();

  /*   console.log("Navbar");
  if (userInfo) {
    console.log("User ID");
    console.log(userInfo.id);
  } */

  const PushHome = () => {
    if (userInfo) {
      if (userInfo.isSeller) {
        return (
          <NavLink to="/sellerhome" activeStyle>
            Home
          </NavLink>
        );
      } else {
        return (
          <NavLink to="/buyerhome" activeStyle>
            Home
          </NavLink>
        );
      }
    } else {
      return (
        <NavLink to="/login" activeStyle>
          Home
        </NavLink>
      );
    }
  };

  const DisplayLoginOrLogout = () => {
    if (!userInfo) {
      return <NavBtnLink to="/login">Sign In</NavBtnLink>;
    } else {
      return (
        <NavBtnLinkLogout onClick={logoutHandler}>Logout</NavBtnLinkLogout>
      );
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/login");
  };

  return (
    <>
      <Nav>
        <NavLink to="/">
          <img
            src={require("../../images/gold-png.png").default}
            alt="logo"
            width="120px"
            height="97px"
          />
        </NavLink>
        <Bars />
        <NavMenu>
          <PushHome />
          <NavLink to="/contact-us" activeStyle>
            Contact Us
          </NavLink>
          <NavLink to="/templates" activeStyle>
            SOP Templates
          </NavLink>
          <NavLink to="/register" activeStyle>
            Sign Up
          </NavLink>
        </NavMenu>
        <NavBtn>
          <DisplayLoginOrLogout />
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
