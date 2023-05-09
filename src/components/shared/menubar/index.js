import React from "react";
import { NavLink, useMatch } from "react-router-dom";
import "../../sass/Menubar.scss";

const Menubar = ({ setShow, show }) => {
  const contactMatch = useMatch("/contact");
  const aboutMatch = useMatch("/charts-and-maps");
  return (
    // <div className="menu">
    <div className="menubar">
      <NavLink
        to="/contact"
        exact
        className={contactMatch ? "menubar__nav--active" : "menubar__nav"}
      >
        Contact
      </NavLink>
      <NavLink
        to="/charts-and-maps"
        className={aboutMatch ? "menubar__nav--active" : "menubar__nav"}
      >
        Charts & Maps
      </NavLink>
    </div>
    // </div>
  );
};

export default Menubar;
