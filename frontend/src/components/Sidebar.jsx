// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import dashboardIcon from '../assets/icons/dashboard-btn-icon-unclick.png';
import monitoringIcon from '../assets/icons/monitoring-icon-unclick.png';
import aiIcon from '../assets/icons/ai-reporting-icon-unclick.png';
import iotIcon from '../assets/icons/iot-icon-unclick.png';
import loginIcon from '../assets/icons/login-icon-click.png';

const SidebarContainer = styled.aside`
  width: 100px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;

  row-gap: 1rem; /* 세로 간격만 1rem 적용 */
  column-gap: 0; /* 가로 간격은 0 */
  height: 100vh;
  padding-top: 1rem;
  padding-bottom: 1rem;
  height: 100vh;
`;

const IconWrapper = styled(NavLink)`
  margin: 1rem 0;
  width: 32px;
  height: 32px;

  &.active {
    filter: brightness(0.8);
  }
`;

const IconImg = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

function Sidebar() {
  return (
    <SidebarContainer>
      <IconWrapper to="/dashboard">
        <IconImg src={dashboardIcon} alt="Dashboard" />
      </IconWrapper>
      <IconWrapper to="/monitoring">
        <IconImg src={monitoringIcon} alt="Monitoring" />
      </IconWrapper>
      <IconWrapper to="/ai">
        <IconImg src={aiIcon} alt="AI Reporting" />
      </IconWrapper>
      <IconWrapper to="/iot">
        <IconImg src={iotIcon} alt="IoT Manage" />
      </IconWrapper>
      <IconWrapper to="/login">
        <IconImg src={loginIcon} alt="Login" />
      </IconWrapper>
    </SidebarContainer>
  );
}

export default Sidebar;
