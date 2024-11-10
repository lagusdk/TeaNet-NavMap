import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

// 이 아래에 페이지 컴포넌트 임포트
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupForm from "./pages/SignupForm";
import JobOrMajor from "./pages/JobOrMajor";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign" element={<SignupForm />} />
        <Route path="/job-or-major" element={<JobOrMajor />} />

        {/* 이 자리에 컴포넌트 추가 */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
