import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/CareerPath.css";

const CareerPath = () => {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const detailRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const careerItems = [
    "IT Product Manager",
    "IT Product Manager",
    "IT Product Manager",
    "IT Product Manager",
    "IT Product Manager",
    "IT Product Manager",
    "IT Product Manager",
    "IT Product Manager",
    "IT Product Manager",
    "IT Product Manager",
    "IT Product Manager",
    "IT Product Manager"
  ];

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.classList.add("visible");
    }

    if (detailRef.current) {
      detailRef.current.classList.add("visible");
    }
  }, []);

  const handleScroll = (direction) => {
    const scrollAmount = 588; // Adjusted for new card width (180px * 3 + gaps)
    const maxScroll = scrollContainerRef.current ? 
      scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth : 
      0;

    let newPosition;
    if (direction === 'left') {
      newPosition = Math.max(scrollPosition - scrollAmount, 0);
    } else {
      newPosition = Math.min(scrollPosition + scrollAmount, maxScroll);
    }

    setScrollPosition(newPosition);
    scrollContainerRef.current.style.transform = `translateX(-${newPosition}px)`;
  };

  const handleCardClick = (index) => {
    setSelectedCard(index);
    navigate("/Null");
  };

  return (
    <div className="CareerContainer">
      <h1 className="CareerTitle" ref={titleRef}>
        희망하는 <span className="Highlight">분야</span>를 선택해주세요.
      </h1>

      <div className="DetailCareer" ref={detailRef}>
        <div className="CardContainer">
          <div className="GradientMask GradientMaskLeft" />
          <div className="GradientMask GradientMaskRight" />
          
          <div className="ScrollWrapper">
            <div 
              className="CardContent" 
              ref={scrollContainerRef}
              style={{ transform: `translateX(-${scrollPosition}px)` }}
            >
              {careerItems.map((item, index) => (
                <div 
                  key={index} 
                  className={`CardItem ${selectedCard === index ? 'selected' : ''}`}
                  onClick={() => handleCardClick(index)}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <button 
            className="ScrollButton ScrollButtonLeft"
            onClick={() => handleScroll('left')}
            aria-label="Scroll left"
            style={{ display: scrollPosition === 0 ? 'none' : 'flex' }}
          >
            ←
          </button>
          <button 
            className="ScrollButton ScrollButtonRight"
            onClick={() => handleScroll('right')}
            aria-label="Scroll right"
            style={{ 
              display: 
                scrollContainerRef.current && 
                scrollPosition >= scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth 
                  ? 'none' 
                  : 'flex' 
            }}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerPath;