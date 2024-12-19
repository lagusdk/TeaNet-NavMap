import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "../css/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const startButtonRef = useRef(null);
  const stepCardsRef = useRef([]);
  const ctaButtonRef1 = useRef(null); // 로그인 버튼 ref
  const ctaButtonRef2 = useRef(null); // 다음 버튼 ref
  const fadeInElementsRef = useRef([]);

  useEffect(() => {
    const animateElements = [
      { ref: heroTitleRef, delay: 200 },
      { ref: heroSubtitleRef, delay: 400 },
      { ref: startButtonRef, delay: 600 },
    ];

    animateElements.forEach(({ ref, delay }) => {
      setTimeout(() => {
        if (ref.current) {
          ref.current.classList.add("visible");
        }
      }, delay);
    });

    const handleScroll = () => {
      fadeInElementsRef.current.forEach((element) => {
        if (element) {
          const position = element.getBoundingClientRect().top;
          if (position < window.innerHeight - 100) {
            element.classList.add("visible");
          }
        }
      });

      stepCardsRef.current.forEach((card) => {
        if (card) {
          const cardPosition = card.getBoundingClientRect().top;
          if (cardPosition < window.innerHeight - 100) {
            card.classList.add("visible");
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNextPage = () => {
    navigate("/job-or-major");
  };

  const handleLoginBtnClick = () => {
    navigate("/login");
  };

  return (
    <div className="landing">
      {/* Hero Section */}
      <div
        className="hero-section fade-in"
        ref={(el) => fadeInElementsRef.current.push(el)}
      >
        <div className="text-center">
          <h2 className="hero-title" ref={heroTitleRef}>
            AI가 제시하는 <span className="highlight">맞춤형 길잡이</span>
          </h2>
          <p className="hero-subtitle" ref={heroSubtitleRef}>
            전공 커리큘럼부터 진로 계획까지, <br /> 당신만의 특별한 여정을 AI와
            함께 설계하세요
          </p>
          <div className="button-container">
            <button
              className="button large"
              ref={startButtonRef}
              onClick={handleNextPage}
            >
              시작하기
            </button>
          </div>
        </div>
      </div>

      {/* Main Features */}
      <div
        className="features-container fade-in"
        ref={(el) => fadeInElementsRef.current.push(el)}
      >
        {/* 전공 로드맵 카드 */}
        <div
          className="card fade-in"
          ref={(el) => fadeInElementsRef.current.push(el)}
        >
          <div className="icon-container">
            <span className="icon">📖</span>
          </div>
          <h3 className="card-title">전공 로드맵</h3>
          <ul className="card-description">
            <li className="feature-item">
              ➡️ 관심 키워드 기반 학과 커리큘럼 설계
            </li>
            <li className="feature-item">➡️ 복수전공/부전공 연계 추천</li>
            <li className="feature-item">➡️ 학기별 최적화된 과목 조합 제안</li>
          </ul>
        </div>

        {/* 진로 로드맵 카드 */}
        <div
          className="card fade-in"
          ref={(el) => fadeInElementsRef.current.push(el)}
        >
          <div className="icon-container">
            <span className="icon">🎯</span>
          </div>
          <h3 className="card-title">진로 로드맵</h3>
          <ul className="card-description">
            <li className="feature-item">
              ➡️ 희망 진로별 맞춤형 역량 개발 가이드
            </li>
            <li className="feature-item">
              ➡️ 산업 트렌드 기반 커리어 방향 제시
            </li>
            <li className="feature-item">
              ➡️ 단계별 목표 설정 및 실행 계획 수립
            </li>
          </ul>
        </div>
      </div>

      {/* How It Works */}
      <div
        className="how-it-works fade-in"
        ref={(el) => fadeInElementsRef.current.push(el)}
      >
        <h3 className="section-title">AI 기반 맞춤형 가이드</h3>
        <div className="steps-container vertical">
          {["01", "02", "03"].map((num, idx) => (
            <div
              className="step-card fade-in"
              key={idx}
              ref={(el) => {
                stepCardsRef.current[idx] = el;
                fadeInElementsRef.current.push(el);
              }}
            >
              <div className="icon-container">
                <span className="step-number">{num}</span>
              </div>
              <h4 className="step-title">
                {num === "01"
                  ? "키워드 선택"
                  : num === "02"
                  ? "AI 분석"
                  : "맞춤형 플랜"}
              </h4>
              <p className="step-description">
                {num === "01"
                  ? "관심 분야와 목표를 선택하여 맞춤형 분석을 시작합니다"
                  : num === "02"
                  ? "AI가 최적의 학습 경로와 진로 방향을 분석합니다"
                  : "상세한 학습 계획과 진로 로드맵을 제공받습니다"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div
        className="call-to-action fade-in"
        ref={(el) => fadeInElementsRef.current.push(el)}
      >
        <h3 className="section-title">나만의 길을 찾아보세요</h3>
        <p className="cta-description">AI와 함께 더 명확한 미래를 설계하세요</p>
        <div className="button-container">
          <button
            className="button large visible"
            ref={ctaButtonRef1}
            onClick={handleLoginBtnClick}
          >
            로그인하고 시작하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
