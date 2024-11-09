// JS (React Component)
import React, { useState } from 'react';
import "../css/SignupForm.css";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    emailVerificationCode: '',
    password: '',
    confirmPassword: '',
    phone: '',
    phoneVerificationCode: '',
    birthDate: ''
  });

  const [verificationStatus, setVerificationStatus] = useState({
    emailCodeSent: false,
    emailVerified: false,
    phoneCodeSent: false,
    phoneVerified: false
  });

  const [verificationCodes, setVerificationCodes] = useState({
    email: '',
    phone: ''
  });

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSendEmailVerification = () => {
    if (!formData.email) {
      alert('이메일을 입력해주세요.');
      return;
    }
    if (!validateEmail(formData.email)) {
      alert('유효한 이메일 형식을 입력해주세요.');
      return;
    }
    const code = generateVerificationCode();
    setVerificationCodes(prev => ({ ...prev, email: code }));
    setVerificationStatus(prev => ({ ...prev, emailCodeSent: true }));
    alert(`이메일 인증번호는 [${code}] 입니다.`);
  };

  const handleVerifyEmail = () => {
    if (formData.emailVerificationCode === verificationCodes.email) {
      setVerificationStatus(prev => ({ ...prev, emailVerified: true }));
      alert('이메일 인증이 완료되었습니다.');
    } else {
      alert('인증번호가 일치하지 않습니다. 다시 확인해주세요.');
    }
  };

  const handleSendPhoneVerification = () => {
    if (!formData.phone) {
      alert('전화번호를 입력해주세요.');
      return;
    }
    if (!validatePhone(formData.phone)) {
      alert('유효한 전화번호 형식을 입력해주세요. (예: 010-0000-0000)');
      return;
    }
    const code = generateVerificationCode();
    setVerificationCodes(prev => ({ ...prev, phone: code }));
    setVerificationStatus(prev => ({ ...prev, phoneCodeSent: true }));
    alert(`휴대폰 인증번호는 [${code}] 입니다.`);
  };

  const handleVerifyPhone = () => {
    if (formData.phoneVerificationCode === verificationCodes.phone) {
      setVerificationStatus(prev => ({ ...prev, phoneVerified: true }));
      alert('전화번호 인증이 완료되었습니다.');
    } else {
      alert('인증번호가 일치하지 않습니다. 다시 확인해주세요.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!verificationStatus.emailVerified || !verificationStatus.phoneVerified) {
      alert('이메일과 전화번호 인증을 완료해주세요.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!validatePassword(formData.password)) {
      alert('비밀번호는 8자 이상이어야 하며, 최소 1개의 기호를 포함해야 합니다.');
      return;
    }
    console.log('Form submitted:', formData);
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">회원가입</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <label htmlFor="name">이름 *</label>
            <input
              className="input"
              id="name"
              name="name"
              required
              placeholder="실명 또는 닉네임"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="birthDate">생년월일 *</label>
            <input
              className="input"
              id="birthDate"
              name="birthDate"
              type="date"
              required
              value={formData.birthDate}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">이메일 *</label>
            <div className="input-row">
              <input
                className="input"
                id="email"
                name="email"
                type="email"
                required
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                disabled={verificationStatus.emailVerified}
              />
              <button className="verification-button" type="button" onClick={handleSendEmailVerification}
                disabled={verificationStatus.emailVerified}
              >
                인증번호 전송
              </button>
            </div>
            {verificationStatus.emailCodeSent && !verificationStatus.emailVerified && (
              <div className="input-row">
                <input
                  className="input"
                  name="emailVerificationCode"
                  placeholder="인증번호 6자리 입력"
                  value={formData.emailVerificationCode}
                  onChange={handleChange}
                />
                <button className="confirm-button" type="button" onClick={handleVerifyEmail}>확인</button>

              </div>
            )}
            {verificationStatus.emailVerified && (
              <p className="success-message">이메일 인증이 완료되었습니다.</p>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="phone">전화번호 *</label>
            <div className="input-row">
              <input
                className="input"
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="010-0000-0000"
                value={formData.phone}
                onChange={handleChange}
                disabled={verificationStatus.phoneVerified}
              />
              <button className="verification-button" type="button" onClick={handleSendPhoneVerification}
                disabled={verificationStatus.phoneVerified}
              >
                인증번호 전송
              </button>
            </div>
            {verificationStatus.phoneCodeSent && !verificationStatus.phoneVerified && (
              <div className="input-row">
                <input
                  className="input"
                  name="phoneVerificationCode"
                  placeholder="인증번호 6자리 입력"
                  value={formData.phoneVerificationCode}
                  onChange={handleChange}
                />
                <button className="confirm-button" type="button" onClick={handleVerifyPhone}>확인</button>

              </div>
            )}
            {verificationStatus.phoneVerified && (
              <p className="success-message">전화번호 인증이 완료되었습니다.</p>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="password">비밀번호 *</label>
            <input
              className="input"
              id="password"
              name="password"
              type="password"
              required
              placeholder="최소 8자, 특수 문자 1개 포함 필수"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
          <label htmlFor="confirmPassword">비밀번호 확인 *</label>
            <input
              className="input"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              placeholder="비밀번호 재입력"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-button">회원가입</button>
          <p className="redirect-link">
            이미 계정이 있으신가요? <a href="/login">로그인하기</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;

add