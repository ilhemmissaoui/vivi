import React, { Fragment, useContext, useState } from "react";
/// React router dom
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeContext";
import logo from "../../../images/header/vivitool-logo.png";

const NavHader = () => {
  const { navigationHader, openMenuToggle, background, toggle, setToggle } =
    useContext(ThemeContext);
  return (
    <div className="nav-header">
      <Link to="/dashboard" className="brand-logo">
        {background.value === "dark" || navigationHader !== "color_1" ? (
          <Fragment>
            <img className="logo-vivitool" src={logo} alt="vivitool-logo" />
          </Fragment>
        ) : (
          <Fragment>
            <img className="logo-vivitool" src={logo} alt="vivitool-logo" />
          </Fragment>
        )}
      </Link>
    </div>
  );
};

export default NavHader;
