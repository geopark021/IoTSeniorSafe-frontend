import React, { useState } from 'react';
import styled from 'styled-components';
import SuspiciousRiskEntries from '../components/reporting/SuspiciousRiskEntries';
import AIReporting from '../components/reporting/AIReporting';

// 페이지 컨테이너
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;

  /* 상위 컴포넌트의 스타일 오버라이드 */
  margin: 0 !important;
  max-width: none !important;
`;

// 페이지 타이틀 스타일
const PageTitle = styled.h2`
  font-family: 'NanumSquareRound', sans-serif;
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 8px;
  color: #333;
`;

const PageDescription = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0 0 20px 0;
  font-family: 'NanumSquareRound', sans-serif;
`;

const AIReportingPage = () => {
  // 선택된 위험 내역을 관리하는 state 추가
  const [selectedRiskEntry, setSelectedRiskEntry] = useState(null);

  // 행 클릭 핸들러
  const handleRowClick = entry => {
    console.log('AIReportingPage - 선택된 위험 내역:', entry);
    setSelectedRiskEntry(entry);
  };

  return (
    <PageContainer>
      <div>
        <PageTitle>AI 리포팅</PageTitle>
        <PageDescription>위험 감지 및 보고 시스템</PageDescription>
      </div>

      {/* 위험 의심 내역 컴포넌트  */}
      <SuspiciousRiskEntries onRowClick={handleRowClick} />

      {/* AI 리포팅 컴포넌트  */}
      <AIReporting selectedRiskEntry={selectedRiskEntry} />
    </PageContainer>
  );
};

export default AIReportingPage;
