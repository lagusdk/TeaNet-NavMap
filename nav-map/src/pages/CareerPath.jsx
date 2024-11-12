import React, { useState } from "react";
import "../css/CareerPath.css"; // CSS 파일 임포트

const CareerPath = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const items = [
    "IT Product Manager",
    "IT Product Manager",
    "IT Product Manager",
    "IT Product Manager",
    "IT Product Manager",
    "IT Product Manager",
    "IT Product Manager",
    "IT Product Manager",
  ];

  return (
    <div className="career-buttons-container">
      <div className="career-buttons-inner">
        <h1 className="career-buttons-title">
          희망하는 <span className="highlight">분야</span>를 선택해주세요.
        </h1>

        {/* 버튼 그리드 */}
        <div className="button-grid">
          {items.map((item, index) => (
            <button
              key={index}
              className={`career-button ${
                selectedItem === index ? "selected" : "default"
              }`}
              onClick={() => setSelectedItem(index)}
            >
              {item}
            </button>
          ))}
        </div>

        {/* 로드맵 생성 버튼 */}
        {selectedItem !== null && (
          <div className="button-center">
            <button
              className="create-button"
              onClick={() => console.log("로드맵 생성")}
            >
              로드맵 생성
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerPath;
