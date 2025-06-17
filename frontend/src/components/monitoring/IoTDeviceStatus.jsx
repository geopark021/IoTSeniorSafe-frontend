// 모니터링 페이지 전용

// src/components/monitoring/IoTDeviceStatus.jsx
import React, { useState, useEffect } from 'react';
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

// API 설정
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const deviceStatusAPI = {
  getDeviceStatus: async () => {
    const response = await fetch(`${API_BASE_URL}/api/monitoring/status`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  },
};

function IoTDeviceStatus() {
  // 목업 데이터. API 연결 실패 시 사용
  const [statusData, setStatusData] = useState([
    {
      label: '전체 가구',
      value: '300',
      icon: wholeHouseholdIcon,
      color: '#4CD964',
    },
    {
      label: 'LED 센서 부착 가구',
      value: '5',
      icon: iotSensorEquippedIcon,
      color: '#4CD964',
    },
    {
      label: '재실 감지 센서 연결 가구 수',
      value: '5',
      icon: powerDataIcon,
      color: '#FFD60A',
    },
    {
      label: '소음 감지 센서 연결 가구 수',
      value: '5',
      icon: anomalyDetectionIcon,
      color: '#FF3B30',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API 데이터 로드 함수
  const loadStatusData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await deviceStatusAPI.getDeviceStatus();

      if (response.success) {
        const newStatusData = [
          {
            label: '전체 가구',
            value: response.totalHouseholds?.toString() || '300',
            icon: wholeHouseholdIcon,
            color: '#4CD964',
          },
          {
            label: 'LED 센서 부착 가구',
            value: '5',
            icon: iotSensorEquippedIcon,
            color: '#4CD964',
          },
          {
            label: '재실 감지 센서 연결 가구 수',
            value: '5',
            icon: powerDataIcon,
            color: '#FFD60A',
          },
          {
            label: '소음 감지 센서 연결 가구 수',
            value: '5',
            icon: anomalyDetectionIcon,
            color: '#FF3B30',
          },
        ];

        setStatusData(newStatusData);
      }
    } catch (err) {
      console.error('상태 데이터 로드 실패:', err);
      setError(err.message);
      // 실패 시 기존 목업 데이터 유지
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    loadStatusData();

    // 60초마다 자동 새로고침
    const interval = setInterval(() => {
      loadStatusData();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <StatusContainer>
      <StatusTitle>
        IoT 장치 현황
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
      <StatusGrid>
        {statusData.map((item, index) => (
          <StatusItem key={index}>
            <IconWrapper>
              <img src={item.icon} alt={item.label} />
            </IconWrapper>
            <StatusInfo>
              <StatusLabel>{item.label}</StatusLabel>
              <StatusValue style={{ color: item.color }}>
                {loading ? '...' : item.value}
              </StatusValue>
            </StatusInfo>
          </StatusItem>
        ))}
      </StatusGrid>
    </StatusContainer>
  );
}

export default IoTDeviceStatus;
