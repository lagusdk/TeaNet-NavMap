import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Swiper 스타일을 가져옵니다.
import "../css/CareerPath.css";

const CareerPath = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCreateBtnClick = () => {
    if (selectedItem !== null) {
      const jobKeys = [
        "Big Data Analyst",
        "AI Expert",
        "VR Expert",
        "UX engineer",
      ];
      const selectedJobKey = jobKeys[selectedItem]; // 인덱스 조정
      navigate(`/roadmap?key=${selectedJobKey}`);
    }
  };

  const items = [
    { id: 1, contents: "Big Data Analyst" },
    { id: 2, contents: "AI Expert" },
    { id: 3, contents: "VR Expert" },
    { id: 4, contents: "UX Engineer" },
  ];

  return (
    <div className="career-container">
      <h1 className="career-title">
        희망하는 <span className="career-title-highlight">분야</span>를
        선택해주세요.
      </h1>

      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        loop={true} // Infinite loop 활성화
        onSlideChange={(swiper) => setSelectedItem(swiper.activeIndex)}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className="slider-item">
            <button
              className={`career-button ${
                selectedItem === index ? "selected" : ""
              }`}
              onClick={() => setSelectedItem(index)}
            >
              {item.contents}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedItem !== null && (
        <div className="create-button-container">
          <button className="create-button" onClick={handleCreateBtnClick}>
            로드맵 생성
          </button>
        </div>
      )}
    </div>
  );
};

export default CareerPath;
