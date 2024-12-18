import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/MajorPath.css";

const MajorPath = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 네비게이션 기능을 추가

  const selectMajor = () => {
    alert(`해당 전공은 아직 준비 중입니다.`);
  };

  return (
    <div className="container">
      <h1>
        나의 <span class="highlight">전공</span>을 선택해 주세요.
      </h1>

      <div className="box">
        <p className="departmentName">정보융합학부</p>
        <div className="majorbtns">
          <button
            className="majorButton"
            onClick={() => {
              navigate(`/roadmap?key=Data Science`);
            }}
          >
            데이터 사이언스 전공
          </button>
          <button
            className="majorButton"
            onClick={() => {
              navigate(`/roadmap?key=Visual Technology`);
            }}
          >
            비주얼 테크놀로지 전공
          </button>
        </div>

        <p className="departmentName">컴퓨터정보공학부</p>
        <div className="majorbtns">
          <button className="majorButton" onClick={() => selectMajor()}>
            지능컴퓨팅시스템전공
          </button>
          <button className="majorButton" onClick={() => selectMajor()}>
            지능정보전공
          </button>
        </div>

        <p className="departmentName">소프트웨어학부</p>
        <div className="majorbtns">
          <button className="majorButton" onClick={() => selectMajor()}>
            소프트웨어전공
          </button>
          <button className="majorButton" onClick={() => selectMajor()}>
            인공지능전공
          </button>
        </div>
      </div>
    </div>
  );
};

export default MajorPath;
