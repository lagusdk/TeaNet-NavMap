import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

// 이 자리에 페이지 컴포넌트 임포트
import LandingPage from "./pages/LandingPage";
import AboutTeanet from "./pages/AboutTeanet";
import LoginPage from "./pages/LoginPage";
import SignupForm from "./pages/SignupForm";
import JobOrMajor from "./pages/JobOrMajor";
import GenerateRoadmap from "./pages/GenerateRoadmap";
import CareerPath from "./pages/CareerPath";
import MajorPath from "./pages/MajorPath";

const App = () => {
  return (
    <Router>
      <Header />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "black",
        }}
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutTeanet />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign" element={<SignupForm />} />
          <Route path="/job-or-major" element={<JobOrMajor />} />
          <Route path="/roadmap" element={<GenerateRoadmap />} />
          <Route path="/CareerPath" element={<CareerPath />} />
          <Route path="/MajorPath" element={<MajorPath />} />
          {/* 이 자리에 새 경로 추가 */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
