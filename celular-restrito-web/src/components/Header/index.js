import React from "react";
import logo from "../../assets/logo.png";

const Header = ({ title }) => (
  <header className="text-center">
    <img src={logo} alt="logo" width="330px" />
    <h1 className="font-weight-bold">{title}</h1>
  </header>
);

export default Header;
