import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Sidebar from './Sidebar';

const LayoutContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center; /*추가*/
  overflow: hidden;
`;

const MainContent = styled.main`
  flex: 2;
  height: 100%;
  background-color: #f9f9f9;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  /* 로그인 페이지일 때 세로·가로 중앙 정렬 */
  ${props =>
    props.center &&
    css`
      justify-content: center;
      align-items: center;
    `}
`;

function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <LayoutContainer>
      <Sidebar />
      {/* center prop이 true면 내부를 중앙 정렬합니다 */}
      <MainContent center={isLoginPage}>
        <Outlet />
      </MainContent>
    </LayoutContainer>
  );
}

export default Layout;
