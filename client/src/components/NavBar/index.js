import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

const Navbar = () => {
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
          <NavLink to="/login" activeStyle>
            Home
          </NavLink>
          <NavLink to="/MyFiles" activeStyle>
            My Files
          </NavLink>
          <NavLink to="/contact-us" activeStyle>
            Contact Us
          </NavLink>
          <NavLink to="/register" activeStyle>
            Sign Up
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/login">Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
