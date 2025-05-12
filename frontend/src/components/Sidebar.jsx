import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

import dashboardIcon from '../assets/icons/dashboard-btn-icon-unclick.png';
import monitoringIcon from '../assets/icons/monitoring-icon-unclick.png';
import aiIcon from '../assets/icons/ai-reporting-icon-unclick.png';
import iotIcon from '../assets/icons/iot-icon-unclick.png';
import logoutIcon from '../assets/icons/logout-icon-unclick.png';
import loginIcon from '../assets/icons/login-icon-click.png';

// 사이드바 컨테이너 스타일
const SidebarContainer = styled.aside`
  width: 100px;
  min-width: 100px;
  max-width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 2rem 0;
  position: relative;

  border: 1px solid #e8e7e7;
  background: #fff;
  box-shadow: 0px 1px 50px 0px rgba(0, 0, 0, 0.08);
  font-family: 'NanumSquareRound', sans-serif;
`;

// 메뉴 아이템 컨테이너
const MenuItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px 0;
  text-decoration: none;
  color: #666;
  margin-bottom: 10px;

  &.active {
    color: #333;

    img {
      filter: brightness(0.8);
    }
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
`;

// 로그아웃/로그인 버튼 스타일
const AuthButton = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px 0;
  text-decoration: none;
  color: #666;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
`;

// 아이콘 이미지 스타일
const IconImg = styled.img`
  width: 32px;
  height: 32px;
  margin-bottom: 8px;
`;

// 메뉴 텍스트 스타일 - 나눔스퀘어라운드 폰트 적용
const MenuText = styled.span`
  font-size: 12px;
  font-weight: 700; /* NanumSquareRoundB 굵기 */
  text-align: center;
  font-family: 'NanumSquareRound', sans-serif;
`;

// 메뉴 아이템 영역 컨테이너
const MenuItems = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

function Sidebar() {
  // AuthContext 사용 시 오류 방지를 위한 기본값 설정
  let auth = { isLoggedIn: false, logout: () => {} };

  try {
    auth = useAuth();
  } catch (error) {
    console.error('AuthContext를 사용할 수 없습니다:', error);
  }

  const { isLoggedIn, logout } = auth;
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (isLoggedIn) {
      logout();
      navigate('/login');
    }
  };

  return (
    <SidebarContainer>
      <MenuItems>
        <MenuItem to="/dashboard">
          <IconImg src={dashboardIcon} alt="대시보드" />
          <MenuText>대시보드</MenuText>
        </MenuItem>

        <MenuItem to="/monitoring">
          <IconImg src={monitoringIcon} alt="모니터링" />
          <MenuText>모니터링</MenuText>
        </MenuItem>

        <MenuItem to="/ai">
          <IconImg src={aiIcon} alt="AI 리포팅" />
          <MenuText>AI 리포팅</MenuText>
        </MenuItem>

        <MenuItem to="/iot">
          <IconImg src={iotIcon} alt="IoT 관리" />
          <MenuText>IoT 관리</MenuText>
        </MenuItem>

        {/* 로그인/로그아웃 버튼을 메뉴 아이템 안으로 이동 */}
        {isLoggedIn ? (
          <MenuItem as="div" onClick={handleAuthClick}>
            <IconImg src={logoutIcon} alt="로그아웃" />
            <MenuText>로그아웃</MenuText>
          </MenuItem>
        ) : (
          <MenuItem to="/login">
            <IconImg src={loginIcon} alt="로그인" />
            <MenuText>로그인</MenuText>
          </MenuItem>
        )}
      </MenuItems>
    </SidebarContainer>
  );
}

export default Sidebar;
