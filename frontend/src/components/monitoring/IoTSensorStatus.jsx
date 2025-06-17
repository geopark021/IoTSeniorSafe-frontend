// IoT 관리 페이지 전용
import React, { useState, useEffect } from 'react';
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

// API 설정
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const sensorStatusAPI = {
  getSensorStats: async () => {
    const response = await fetch(`${API_BASE_URL}/api/iot-manage/sensor-stats`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  },
};

function IoTSensorStatus() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 목업 데이터. API 연결 실패 시 사용
  const [statusData, setStatusData] = useState([
    {
      id: 1,
      label: '전체 가구',
      value: 5,
      icon: wholeHouseholdIcon,
      bgColor: '#F2FFF5',
    },
    {
      id: 2,
      label: 'LED 센서 부착 가구',
      value: 5,
      icon: iotSensorEquippedIcon,
      bgColor: '#F2FFFC',
    },
    {
      id: 3,
      label: '재실 감지센서 부착 가구',
      value: 5,
      icon: powerDataActiveIcon,
      bgColor: '#FFFDF2',
    },
    {
      id: 4,
      label: '소음 센서 부착 가구',
      value: 5,
      icon: powerDataUnactiveIcon,
      bgColor: '#F9F9F9',
    },
    {
      id: 5,
      label: 'LED 센서 오류 수',
      value: 10,
      icon: powerDataErrorIcon,
      bgColor: '#FFF9F2',
    },
  ]);

  // API 데이터 로드 함수
  const loadSensorStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await sensorStatusAPI.getSensorStats();

      if (response.success) {
        const newStatusData = [
          {
            id: 1,
            label: '전체 가구',
            value: response.totalHouseholds || 5,
            icon: wholeHouseholdIcon,
            bgColor: '#F2FFF5',
          },
          {
            id: 2,
            label: 'LED 센서 부착 가구',
            value: response.ledSensorCount || 5,
            icon: iotSensorEquippedIcon,
            bgColor: '#F2FFFC',
          },
          {
            id: 3,
            label: '재실 감지센서 부착 가구',
            value: response.occupancySensorCount || 5,
            icon: powerDataActiveIcon,
            bgColor: '#FFFDF2',
          },
          {
            id: 4,
            label: '소음 센서 부착 가구',
            value: response.noiseSensorCount || 5,
            icon: powerDataUnactiveIcon,
            bgColor: '#F9F9F9',
          },
          {
            id: 5,
            label: 'LED 센서 오류 수',
            value: response.errorCount || 10,
            icon: powerDataErrorIcon,
            bgColor: '#FFF9F2',
          },
        ];

        setStatusData(newStatusData);
      }
    } catch (err) {
      console.error('센서 상태 데이터 로드 실패:', err);
      setError(err.message);
      // 실패 시 기존 목업 데이터 유지
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    loadSensorStats();

    // 60초마다 자동 새로고침
    const interval = setInterval(() => {
      loadSensorStats();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <StatusContainer>
      <StatusTitle>
        IoT 센서 상태
        {loading && (
          <span style={{ fontSize: '14px', color: '#666', marginLeft: '10px' }}>
            업데이트 중...
          </span>
        )}
      </StatusTitle>
      {error && (
        <div
          style={{
            backgroundColor: '#fff3cd',
            color: '#856404',
            padding: '8px',
            borderRadius: '4px',
            marginBottom: '16px',
            fontSize: '12px',
          }}
        >
          API 연결 실패: 기본값으로 표시됩니다.
        </div>
      )}
      <StatusCardsContainer>
        {statusData.map(item => (
          <StatusCard key={item.id} bgColor={item.bgColor}>
            <IconContainer>
              <StatusIcon src={item.icon} alt={item.label} />
            </IconContainer>
            <StatusInfoContainer>
              <StatusLabel>{item.label}</StatusLabel>
              <StatusValue>{loading ? '...' : item.value}</StatusValue>
            </StatusInfoContainer>
          </StatusCard>
        ))}
      </StatusCardsContainer>
    </StatusContainer>
  );
}

export default IoTSensorStatus;
