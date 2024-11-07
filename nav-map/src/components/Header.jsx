import React from "react";
import { useNavigate } from "react-router-dom";

import "../css/Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLoginBtnClick = () => {
    navigate("/login");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <h1 className="logo">KW NAVMAP</h1>
          <button className="button" onClick={handleLoginBtnClick}>
            로그인
          </button>
        </div>
        <hr className="navbar-line" />
      </nav>
    </>
  );
};

export default Header;
