// src/components/monitoring/IoTDeviceStatus.jsx
import React from 'react';
import styled from 'styled-components';

import wholeHouseholdIcon from '../../assets/icons/whole-household-icon.png';
import iotSensorEquippedIcon from '../../assets/icons/iot-sensor-equipped-icon.png';
import powerDataIcon from '../../assets/icons/power-data-icon.png';
import anomalyDetectionIcon from '../../assets/icons/anomaly-detection-icon.png';

const StatusContainer = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  padding: 24px;
  margin-bottom: 16px;
`;

const StatusTitle = styled.h3`
  font-family: 'NanumSquareRound', sans-serif;
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 16px;
  color: #333;
`;

const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
`;

const StatusItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  margin-right: 14px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const StatusInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatusLabel = styled.span`
  font-family: 'NanumSquareRound', sans-serif;
  font-size: 14px;
  color: #666;
  margin-bottom: 2px;
`;

const StatusValue = styled.span`
  font-family: 'NanumSquareRound', sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: #333;
`;

function IoTDeviceStatus() {
  // 목업 데이터. API 연결 필요
  const statusData = [
    {
      label: '전체 가구',
      value: '300',
      icon: wholeHouseholdIcon,
      color: '#4CD964',
    },
    {
      label: 'IoT 센서 부착 가구',
      value: '260',
      icon: iotSensorEquippedIcon,
      color: '#4CD964',
    },
    {
      label: '전력 데이터 연결 수',
      value: '285',
      icon: powerDataIcon,
      color: '#FFD60A',
    },
    {
      label: '이상 감지 수',
      value: '12',
      icon: anomalyDetectionIcon,
      color: '#FF3B30',
    },
  ];

  return (
    <StatusContainer>
      <StatusTitle>IoT 장치 현황</StatusTitle>
      <StatusGrid>
        {statusData.map((item, index) => (
          <StatusItem key={index}>
            <IconWrapper>
              <img src={item.icon} alt={item.label} />
            </IconWrapper>
            <StatusInfo>
              <StatusLabel>{item.label}</StatusLabel>
              <StatusValue style={{ color: item.color }}>
                {item.value}
              </StatusValue>
            </StatusInfo>
          </StatusItem>
        ))}
      </StatusGrid>
    </StatusContainer>
  );
}

export default IoTDeviceStatus;
