import React, { useState } from 'react';
import styled from 'styled-components';
import SuspiciousRiskEntries from './SuspiciousRiskEntries';
import AIReporting from './AIReporting';

const DashboardContainer = styled.div`
  padding: 20px;
  min-height: 100vh;
  background-color: #f8f9fa;
  font-family: 'NanumSquareRound', sans-serif;
`;

const DashboardTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 20px 0;
  color: #333;
  font-family: 'NanumSquareRound', sans-serif;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Dashboard = () => {
  // 선택된 위험 의심 내역 상태 관리
  const [selectedRiskEntry, setSelectedRiskEntry] = useState(null);

  // 위험 의심 내역 클릭 핸들러
  const handleRiskEntryClick = entry => {
    console.log('선택된 위험 내역:', entry);
    setSelectedRiskEntry(entry);
  };

  return (
    <DashboardContainer>
      <DashboardTitle>IoT 센서 기반 독거노인 안전 모니터링</DashboardTitle>

      <ContentWrapper>
        {/* 위험 의심 내역 컴포넌트 */}
        <SuspiciousRiskEntries onRowClick={handleRiskEntryClick} />

        {/* AI 리포팅 컴포넌트 */}
        <AIReporting selectedRiskEntry={selectedRiskEntry} />
      </ContentWrapper>
    </DashboardContainer>
  );
};

export default Dashboard;
