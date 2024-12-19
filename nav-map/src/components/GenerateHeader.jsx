import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/GenerateHeader.css";
import refresh from "../imgs/refresh.svg";
import download from "../imgs/download.svg";

const GenerateHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const key = queryParams.get("key") || "로드맵"; // 기본값 설정

  const handleJobOrMajorClick = () => {
    navigate("/job-or-major");
  };

  const getTitle = () => {
    switch (key) {
      case "Big Data Analyst":
        return "Big Data Analyst";
      case "AI Expert":
        return "AI Engineer";
      case "VR Expert":
        return "VR Expert";
      case "UX engineer":
        return "UX Designer";
      case "Data Science":
        return "데이터사이언스 Data Science";
      case "Visual Technology":
        return "비주얼 테크놀로지 Visual Technology";
      default:
        return "로드맵"; // 기본 제목
    }
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
        <h1 className="roadmap-title">{getTitle()}</h1>
        <p className="roadmap-description">
          선택한 직무에 대한 로드맵을 AI로 생성했습니다.
        </p>
      </div>
    </div>
  );
};

export default GenerateHeader;
