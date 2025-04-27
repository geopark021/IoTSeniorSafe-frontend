import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './Sidebar';

const LayoutContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh; // 전체 화면 높이로 설정
  overflow: hidden; // 레이아웃 컨테이너에서 오버플로우 방지
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: #f9f9f9;
  overflow-y: auto; // 여기에만 스크롤 허용
`;

function Layout() {
  return (
    <LayoutContainer>
      <Sidebar />
      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutContainer>
  );
}

export default Layout;
