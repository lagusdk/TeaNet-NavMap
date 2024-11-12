import React from "react";
import { useNavigate } from "react-router-dom";

import "../css/Header.css";

const HeaderContents = [
  { name: "test-roadmap", path: "roadmap" },
  { name: "about", path: "about" },
];

const Header = () => {
  const navigate = useNavigate();

  const handleBtnClick = (path) => () => {
    navigate(`/${path}`);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <h1 className="logo" onClick={handleBtnClick("")}>
            KW NAVMAP
          </h1>
          <div className="navbar-menu">
            {HeaderContents.map((contents) => (
              <h2
                className="menu-content"
                onClick={handleBtnClick(contents.path)}
              >
                {contents.name}
              </h2>
            ))}
            <button className="button" onClick={handleBtnClick("login")}>
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
