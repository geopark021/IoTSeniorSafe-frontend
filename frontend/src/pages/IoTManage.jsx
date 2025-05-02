import React from 'react';
import styled from 'styled-components';
import IoTSensorStatus from '../components/monitoring/IoTSensorStatus';
import IoTMaintenanceLog from '../components/monitoring/IoTMaintenanceLog';

const IoTContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const PageTitle = styled.h2`
  font-family: 'NanumSquareRound', sans-serif;
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

function IoTManage() {
  return (
    <IoTContainer>
      <PageTitle>IoT 관리</PageTitle>
      <IoTSensorStatus />
      <IoTMaintenanceLog />
    </IoTContainer>
  );
}

export default IoTManage;
