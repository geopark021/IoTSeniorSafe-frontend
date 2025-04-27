import React from 'react';
import styled from 'styled-components';
import SuspiciousRiskEntries from '../components/reporting/SuspiciousRiskEntries';
import AIReporting from '../components/reporting/AIReporting';

// 페이지 컨테이너 스타일
const PageContainer = styled.div`
  padding: 20px;
`;

// 페이지 헤더 스타일
const PageHeader = styled.div`
  margin-bottom: 24px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #333;
  font-family: 'NanumSquareRound', sans-serif;
`;

const PageDescription = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0;
  font-family: 'NanumSquareRound', sans-serif;
`;

// 페이지 콘텐츠 스타일
const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const AIReportingPage = () => {
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>AI 리포팅</PageTitle>
        <PageDescription>위험 감지 및 보고 시스템</PageDescription>
      </PageHeader>

      <PageContent>
        {/* 위험 의심 내역 컴포넌트 */}
        <SuspiciousRiskEntries />

        {/* AI 리포팅 컴포넌트 */}
        <AIReporting />
      </PageContent>
    </PageContainer>
  );
};

export default AIReportingPage;
