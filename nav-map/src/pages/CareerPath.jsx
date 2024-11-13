import React, { useState } from "react";
import "../css/CareerPath.css";

const CareerPath = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(4);
  const [isAnimating, setIsAnimating] = useState(true);

  const items = [
    { id: 1, contents: "IT Product Manager" },
    { id: 2, contents: "Software Engineer" },
    { id: 3, contents: "Data Scientist" },
    { id: 4, contents: "UX Designer" },
    { id: 5, contents: "DevOps Engineer" },
    { id: 6, contents: "Cloud Architect" },
    { id: 7, contents: "AI Engineer" },
    { id: 8, contents: "Security Expert" },
  ];

  const [loopItems, setLoopItems] = useState([
    ...items.slice(-4),
    ...items,
    ...items.slice(0, 4),
  ]);

  const initialItemsLength = items.length;
  const itemsToShow = 3;
  const itemMargin = 1;

  const handlePrev = () => {
    setIsAnimating(true);
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        setTimeout(() => {
          setIsAnimating(false);
          setCurrentIndex(initialItemsLength);
        }, 500);
        return prev - 1;
      }
      return prev - 1;
    });
  };

  const handleNext = () => {
    setIsAnimating(true);
    setCurrentIndex((prev) => {
      if (prev >= initialItemsLength + 4) {
        setTimeout(() => {
          setIsAnimating(false);
          setCurrentIndex(4);
        }, 500);
        return prev + 1;
      }
      return prev + 1;
    });
  };

  const getItemWidth = () => {
    const totalMargin = (itemsToShow - 1) * itemMargin;
    return (100 - totalMargin) / itemsToShow;
  };

  const getSliderStyle = () => {
    const offset = itemMargin / 2;
    return {
      transform: `translateX(-${
        currentIndex * (getItemWidth() + itemMargin) - offset
      }%)`,
      transition: isAnimating ? "transform 0.5s ease-in-out" : "none",
    };
  };

  const getItemStyle = (index) => ({
    width: `${getItemWidth()}%`,
    marginRight: index < itemsToShow - 1 ? `${itemMargin}rem` : "0",
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
        <div className="slide-navigation prev">
          <button onClick={handlePrev}>&lt;</button>
        </div>
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
                {item.contents}
              </button>
            </div>
          ))}
        </div>
        <div className="slide-navigation next">
          <button onClick={handleNext}>&gt;</button>
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
