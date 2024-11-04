import React, { useState } from 'react';
import { Lock, User } from 'lucide-react';

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
      {/* Logo Section */}
      <div className="mb-8 text-center">
        <h1 className="text-red-500 text-4xl font-bold mb-2">KW NAVMAP</h1>
      </div>
      
      {/* Login Form */}
      <div className="w-full max-w-md space-y-4">
        {/* ID Input */}
        <div className="relative">
          <User className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="ID"
            className="w-full px-10 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        
        {/* Password Input */}
        <div className="relative">
          <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="password"
            placeholder="PASSWORD"
            className="w-full px-10 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        
        {/* Remember Me Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="mr-2"
          />
          <label className="text-white text-sm">아이디 저장</label>
        </div>
        
        {/* Login Button */}
        <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors">
          로그인
        </button>
        
        {/* Additional Links */}
        <div className="flex flex-col space-y-2">
          <button className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-600 transition-colors">
            비밀번호 찾기
          </button>
          <div className="flex space-x-2">
            <button className="flex-1 bg-gray-700 text-white py-2 rounded-md hover:bg-gray-600 transition-colors">
              개인정보 수정
            </button>
            <button className="flex-1 bg-gray-700 text-white py-2 rounded-md hover:bg-gray-600 transition-colors">
              비밀번호 최초 등록
            </button>
          </div>
          <button className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-600 transition-colors">
            개인정보처리방침
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;