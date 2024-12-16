import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/GenerateHeader.css";
import refresh from "../imgs/refresh.svg";
import download from "../imgs/download.svg";

const GenerateHeader = ({ isCareer }) => {
  const navigate = useNavigate();

  const handleJobOrMajorClick = () => {
    navigate("/job-or-major");
  };

  return (
    <div className="roadmap-header-container">
      <div className="header-controls">
        <div className="regenerate-button" onClick={handleJobOrMajorClick}>
          <img src={refresh} alt="regenerate" className="icon-medium" />
          <span className="regenerate-text">다시 생성하기</span>
        </div>
        <button className="download-button">
          <img src={download} alt="download" className="icon-small" />
          <span>다운로드</span>
        </button>
      </div>

      <div className="content-section">
        {isCareer === 1 ? (
          <>
            <h1 className="roadmap-title">AI Engineer</h1>
            <p className="roadmap-description">
              선택한 분야에 대한 로드맵을 AI로 생성했습니다.
            </p>
          </>
        ) : isCareer === 2 ? (
          <>
            <h1 className="roadmap-title">Data Science</h1>
            <p className="roadmap-description">
              선택한 세부 전공에 대한 로드맵을 AI로 생성했습니다.
            </p>
          </>
        ) : isCareer === 3 ? (
          <>
            <h1 className="roadmap-title">웹 개발</h1>
            <p className="roadmap-description">
              선택한 개념에 대한 로드맵을 AI로 생성했습니다.
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default GenerateHeader;
