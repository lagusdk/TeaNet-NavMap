import React, { useState } from "react";
import '../css/MajorPath.css';

const MajorPath = () => {
    // 전공 선택 시 알림을 띄워주는 함수
    const selectMajor = (major) => {
        alert(`${major} 전공이 선택되었습니다.`);
    };

    // 로드맵 생성 버튼 클릭 시 알림을 띄워주는 함수
    const createRoadmap = () => {
        alert("로드맵이 생성되었습니다.");
    };

    return (
        <div className="container">
          <h1>나의 전공을 선택해 주세요.</h1>
          <div className="box">
            <div className="scrollable">
              <p className="section-title">정보융합학부</p>
              <button className="major-button" onClick={() => selectMajor('Data Science')}>Data Science</button>
              <button className="major-button" onClick={() => selectMajor('Visual Tech')}>Visual Tech</button>
    
              <p className="section-title">학부 이름</p>
              <button className="sub-major-button">세부전공1</button>
              <button className="sub-major-button">세부전공2</button>
    
              <p className="section-title">학부 이름</p>
              <button className="sub-major-button">세부전공1</button>
              <button className="sub-major-button">세부전공2</button>
            </div>
            <button className="roadmap-button" onClick={createRoadmap}>로드맵 생성</button>
          </div>
        </div>
    );
};

export default MajorPath;