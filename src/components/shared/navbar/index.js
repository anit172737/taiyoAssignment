import React, { useState } from "react";
import { Menu } from "react-feather";
import "../../sass/Navbar.scss";
import { NavLink } from "react-router-dom";
import Menubar from "../menubar";
import { set } from "react-hook-form";

const Navbar = () => {
  const [show, setShow] = useState(false);

  const handleToggle = () => {
    setShow(!show);
  };
  return (
    <div className="navbar">
      {show && <Menubar setShow={setShow} show={show} />}
      <NavLink to="/" className="navbar__nav">
        @TAIYO@
      </NavLink>
      <Menu className="navbar__menu" size={25} onClick={handleToggle} />
    </div>
  );
};

export default Navbar;
