// IoT 관리 페이지 전용
import React from 'react';
import styled from 'styled-components';

// 아이콘 가져오기
import wholeHouseholdIcon from '../../assets/icons/whole-household-icon.png';
import iotSensorEquippedIcon from '../../assets/icons/iot-sensor-equipped-icon.png';
import powerDataActiveIcon from '../../assets/icons/power-data-active-icon.png';
import powerDataUnactiveIcon from '../../assets/icons/power-data-unactive-icon.png';
import powerDataErrorIcon from '../../assets/icons/power-data-error-icon.png';

const StatusContainer = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  padding: 24px;
`;

const StatusTitle = styled.h3`
  font-family: 'NanumSquareRound', sans-serif;
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 24px;
  color: #333;
`;

const StatusCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const StatusCard = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 24px;
  background: ${props => props.bgColor || '#f9f9f9'};
  border-radius: 10px;
  min-width: 200px;
`;

const IconContainer = styled.div`
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;

// 아이콘 크기
const StatusIcon = styled.img`
  width: 48px;
  height: 48px;
`;

const StatusInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatusLabel = styled.span`
  font-family: 'NanumSquareRound', sans-serif;
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
`;

const StatusValue = styled.span`
  font-family: 'NanumSquareRound', sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: #333;
`;

function IoTSensorStatus() {
  // 목업 데이터. API 연결 필요
  const statusData = [
    {
      id: 1,
      label: '전체 가구',
      value: 300,
      icon: wholeHouseholdIcon,
      bgColor: '#F2FFF5',
    },
    {
      id: 2,
      label: '전력 센서 부착 가구',
      value: 260,
      icon: iotSensorEquippedIcon,
      bgColor: '#F2FFFC',
    },
    {
      id: 3,
      label: '전력센서 활성 수',
      value: 243,
      icon: powerDataActiveIcon,
      bgColor: '#FFFDF2',
    },
    {
      id: 4,
      label: '전력센서 비활성 수',
      value: 7,
      icon: powerDataUnactiveIcon,
      bgColor: '#F9F9F9',
    },
    {
      id: 5,
      label: '전력센서 오류 수',
      value: 10,
      icon: powerDataErrorIcon,
      bgColor: '#FFF9F2',
    },
  ];

  return (
    <StatusContainer>
      <StatusTitle>IoT 센서 상태</StatusTitle>
      <StatusCardsContainer>
        {statusData.map(item => (
          <StatusCard key={item.id} bgColor={item.bgColor}>
            <IconContainer>
              <StatusIcon src={item.icon} alt={item.label} />
            </IconContainer>
            <StatusInfoContainer>
              <StatusLabel>{item.label}</StatusLabel>
              <StatusValue>{item.value}</StatusValue>
            </StatusInfoContainer>
          </StatusCard>
        ))}
      </StatusCardsContainer>
    </StatusContainer>
  );
}

export default IoTSensorStatus;
