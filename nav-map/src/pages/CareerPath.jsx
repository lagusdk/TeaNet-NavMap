import React, { useState, useEffect } from "react";
import "../css/CareerPath.css";

const CareerPath = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(true);

  const items = [
    "IT Product Manager",
    "Software Engineer",
    "Data Scientist",
    "UX Designer",
    "DevOps Engineer",
    "Cloud Architect",
    "AI Engineer",
    "Security Expert",
  ];

  const [loopItems, setLoopItems] = useState([
    ...items.slice(-4),
    ...items,
    ...items.slice(0, 4),
  ]);

  const initialItemsLength = items.length;
  const interval = 3000;
  const itemsToShow = 4;
  const itemMargin = 1; // 마진을 rem으로 설정

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsAnimating(true);
      setCurrentIndex((prev) => prev + 1);
    }, interval);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (currentIndex >= initialItemsLength + 4) {
      setTimeout(() => {
        setIsAnimating(false);
        setCurrentIndex(4);
      }, 500);
    } else if (currentIndex <= 0) {
      setTimeout(() => {
        setIsAnimating(false);
        setCurrentIndex(initialItemsLength);
      }, 500);
    }
  }, [currentIndex, initialItemsLength]);

  const getItemWidth = () => {
    const totalMargin = (itemsToShow - 1) * itemMargin; // 마진 총합
    return (100 - totalMargin) / itemsToShow; // 너비 계산
  };

  const getSliderStyle = () => {
    const offset = itemMargin / 2; // 오른쪽으로 이동할 거리
    return {
      transform: `translateX(-${
        currentIndex * (getItemWidth() + itemMargin) - offset
      }%)`,
      transition: isAnimating ? "transform 0.5s ease-in-out" : "none",
    };
  };

  const getItemStyle = (index) => ({
    width: `${getItemWidth()}%`,
    marginRight: index < itemsToShow - 1 ? `${itemMargin}rem` : "0", // 마지막 아이템 마진 제거
  });

  const getButtonStyle = (index) => `
    career-button
    ${selectedItem === index ? "selected" : ""}
  `;

  return (
    <div className="career-container">
      <h1 className="career-title">
        희망하는 <span className="career-title-highlight">분야</span>를
        선택해주세요.
      </h1>

      <div className="slider-container">
        <div className="slider-wrapper" style={getSliderStyle()}>
          {loopItems.map((item, index) => (
            <div
              key={index}
              className="slider-item"
              style={getItemStyle(index)}
            >
              <button
                className={getButtonStyle(index)}
                onClick={() => setSelectedItem(index)}
              >
                {item}
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedItem !== null && (
        <div className="create-button-container">
          <button
            className="create-button"
            onClick={() => console.log("로드맵 생성")}
          >
            로드맵 생성
          </button>
        </div>
      )}
    </div>
  );
};

export default CareerPath;
