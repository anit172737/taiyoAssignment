import React from "react";
import "../../sass/Header.scss";

const Header = ({ title, add, handleAdd }) => {
  return (
    <div className="header">
      <h1>{title}</h1>
      {add && (
        <input
          className="header__add"
          type="button"
          value="Add Contact"
          onClick={handleAdd}
        />
      )}
    </div>
  );
};

export default Header;
