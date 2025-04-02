// src/components/Layout.jsx
import React from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f9f9f9;

  border: 1px solid #e8e7e7;
  background: #fff;
  box-shadow: 0px 1px 50px 0px rgba(0, 0, 0, 0.08);
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Layout() {
  return (
    <Container>
      <Sidebar />
      <ContentArea>
        <Outlet /> {/* 라우트에 따라 Login, Dashboard 등 페이지가 렌더링 */}
      </ContentArea>
    </Container>
  );
}

export default Layout;
