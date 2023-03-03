import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to={"/"}>Gateway List</Link>
      </div>
      <ul>
        <li>
          <Link to={"/login"}>Login</Link>
        </li>
        <li>
          <Link to={"/register"}>Register</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
