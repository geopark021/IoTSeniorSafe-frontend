import React, { createContext, useState, useContext, useEffect } from 'react';

// AuthContext 생성
const AuthContext = createContext(null);

// Custom hook 생성
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider 컴포넌트
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로컬 스토리지에서 로그인 상태 불러오기
  useEffect(() => {
    const storedAuthState = localStorage.getItem('isLoggedIn');
    if (storedAuthState === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // 로그인 처리 함수
  const login = (email, password) => {
    // 여기에 실제 로그인 로직 구현 (API 요청 등)
    // 지금은 예시로 간단히 구현
    if (email && password) {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    return false;
  };

  // 로그아웃 처리 함수
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  const value = {
    isLoggedIn,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
