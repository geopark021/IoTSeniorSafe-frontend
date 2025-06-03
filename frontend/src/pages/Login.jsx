import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const LoginPageWrapper = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  width: 100%;
  max-width: 400p x;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginBox = styled.div`
  width: 100%;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  padding: 40px;
  box-sizing: border-box;
`;

const LoginTitle = styled.h2`
  font-family: 'NanumSquareRound', sans-serif;
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 40px;
  text-align: center;
  color: #333;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  font-family: 'NanumSquareRound', sans-serif;
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #e8e7e7;
  border-radius: 6px;
  font-family: 'NanumSquareRound', sans-serif;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #3a86ff;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #3a86ff;
  color: white;
  border: none;
  border-radius: 30px;
  font-family: 'NanumSquareRound', sans-serif;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2a75e8;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 16px;
`;

const TextButton = styled.button`
  background: none;
  border: none;
  font-family: 'NanumSquareRound', sans-serif;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #333;
  }
`;

const SignupButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #00a160;
  color: white;
  border: none;
  border-radius: 30px;
  font-family: 'NanumSquareRound', sans-serif;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #008f55;
  }
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.classList.add('main-content-login');
    }

    // 컴포넌트 언마운트 시 클래스 제거
    return () => {
      if (mainContent) {
        mainContent.classList.remove('main-content-login');
      }
    };
  }, []);

  let auth = { login: () => false };

  try {
    auth = useAuth();
  } catch (error) {
    console.error('AuthContext를 사용할 수 없습니다:', error);
  }

  const { login } = auth;

  const handleSubmit = e => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      const success = login(email, password);
      if (success) {
        navigate('/monitoring');
      } else {
        setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
      }
    } catch (error) {
      setError('로그인 처리 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  return (
    <LoginPageWrapper>
      <LoginContainer>
        <LoginBox>
          <LoginTitle>로그인</LoginTitle>
          <form onSubmit={handleSubmit}>
            <InputGroup>
              <InputLabel>이메일</InputLabel>
              <Input
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputLabel>패스워드</InputLabel>
              <Input
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </InputGroup>
            {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
            <LoginButton type="submit">로그인</LoginButton>
            <ButtonGroup>
              <TextButton type="button">이메일 찾기</TextButton>
              <TextButton type="button">비밀번호 찾기</TextButton>
            </ButtonGroup>
          </form>
          <SignupButton type="button">회원가입</SignupButton>
        </LoginBox>
      </LoginContainer>
    </LoginPageWrapper>
  );
}

export default Login;
