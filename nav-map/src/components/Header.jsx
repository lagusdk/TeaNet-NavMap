import React from "react";
import { useNavigate } from "react-router-dom";

import "../css/Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLandingBtnClick = () => {
    navigate("/");
  };
  const handleAboutBtnClick = () => {
    navigate("/about");
  };
  const handleLoginBtnClick = () => {
    navigate("/login");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <h1 className="logo" onClick={handleLandingBtnClick}>
            KW NAVMAP
          </h1>
          <div className="navbar-menu">
            <h2 className="about" onClick={handleAboutBtnClick}>
              about
            </h2>
            <button className="button" onClick={handleLoginBtnClick}>
              로그인
            </button>
          </div>
        </div>
        <hr className="navbar-line" />
      </nav>
    </>
  );
};

export default Header;
