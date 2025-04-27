import React from 'react';
import styled from 'styled-components';
import IoTDeviceStatus from '../components/monitoring/IoTDeviceStatus';
import IntegratedSensorMonitoring from '../components/monitoring/IntegratedSensorMonitoring';

const MonitoringContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  // 높이와 오버플로우 속성 제거 - 스크롤 제어는 Layout 컴포넌트에서 처리
`;

const PageTitle = styled.h2`
  font-family: 'NanumSquareRound', sans-serif;
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

function Monitoring() {
  return (
    <MonitoringContainer>
      <PageTitle>모니터링</PageTitle>
      <IoTDeviceStatus />
      <IntegratedSensorMonitoring />
    </MonitoringContainer>
  );
}

export default Monitoring;
