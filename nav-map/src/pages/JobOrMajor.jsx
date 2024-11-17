import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../css/JobOrMajor.css";

const JobOrMajor = () => {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const detailRef = useRef(null);
  const pRef1 = useRef(null); // p 태그용 ref 추가
  const pRef2 = useRef(null); // 두 번째 p 태그용 ref 추가

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.classList.add("visible");
    }

    if (detailRef.current) {
      detailRef.current.classList.add("visible");
    }

    if (pRef1.current) {
      pRef1.current.classList.add("visible"); // 첫 번째 p 태그에 visible 클래스 추가
    }

    if (pRef2.current) {
      pRef2.current.classList.add("visible"); // 두 번째 p 태그에 visible 클래스 추가
    }
  }, []);

  return (
    <div className="job-or-major-container">
      <h1 className="main-title" ref={titleRef}>
        희망하는 <span className="highlight">분야</span>나, 지금 공부 중인{" "}
        <span className="highlight">전공</span>이 정해져 있나요?
      </h1>

      <div className="Detail-jobormajor" ref={detailRef}>
        <button className="button-option" onClick={() => navigate("/career-path")}>
          관심있는 분야(직무)
          <br />
          로드맵 보기
          <p ref={pRef1}>확실하게 분야를 결정한 당신에게</p>
        </button>
        <button className="button-option" onClick={() => navigate("/major-path")}>
          내 전공
          <br />
          로드맵 보기
          <p ref={pRef2}>주어진 학과 커리큘럼에 집중하고픈 당신에게</p>
        </button>
      </div>
    </div>
  );
};

export default JobOrMajor;


