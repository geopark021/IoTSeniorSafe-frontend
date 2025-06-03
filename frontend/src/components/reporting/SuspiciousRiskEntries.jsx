import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin-bottom: 20px;
  font-family: 'NanumSquareRound', sans-serif;
  display: flex;
  flex-direction: column;
  height: 300px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  font-family: 'NanumSquareRound', sans-serif;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-right: 10px;
  font-family: 'NanumSquareRound', sans-serif;
`;

const SortButton = styled.button`
  padding: 8px 16px;
  background-color: transparent;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'NanumSquareRound', sans-serif;
`;

const RefreshButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
  font-family: 'NanumSquareRound', sans-serif;
`;

const TableContainer = styled.div`
  overflow-y: auto;
  flex: 1;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #f9f9f9;
  padding: 12px;
  text-align: left;
  font-weight: 500;
  color: #666;
  border-bottom: 1px solid #e0e0e0;
  font-family: 'NanumSquareRound', sans-serif;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
  font-family: 'NanumSquareRound', sans-serif;
`;

const Row = styled.tr`
  background-color: ${props => {
    if (props.$riskLevel === '심각') return '#ffe6e6';
    if (props.$riskLevel === '의심') return '#fff3cd';
    return props.$statusCode === 1 ? '#f0f8ff' : '#fff';
  }};
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  font-family: 'NanumSquareRound', sans-serif;
`;

const RiskBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${props =>
    props.$level === '심각' ? '#ffebee' : '#fff8e1'};
  color: ${props => (props.$level === '심각' ? '#c62828' : '#f57c00')};
  margin-left: 8px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #d32f2f;
  background-color: #ffebee;
  border-radius: 4px;
  margin: 10px 0;
`;

const DebugInfo = styled.div`
  font-size: 12px;
  color: #666;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
  font-family: monospace;
`;

const SuspiciousRiskEntries = ({ onRowClick }) => {
  const [riskEntries, setRiskEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('latest');
  const [debugInfo, setDebugInfo] = useState('');

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchRiskEntries();
  }, []);

  // 검색어나 정렬 변경 시 데이터 재로드 (디바운싱 적용)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchRiskEntries();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, sortOrder]);

  const fetchRiskEntries = async () => {
    try {
      setLoading(true);
      setError(null);
      setDebugInfo('API 요청 시작...');

      // Vite 환경변수 접근 방식
      const baseURL =
        import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
      const url = `${baseURL}/api/ai-reporting/risk-entries?page=0&size=50&search=${encodeURIComponent(searchTerm)}&sort=${sortOrder}`;

      console.log('환경 변수 확인:', import.meta.env.VITE_API_BASE_URL);
      console.log('실제 요청 URL:', url);
      setDebugInfo(
        `환경변수: ${import.meta.env.VITE_API_BASE_URL}, 요청: ${url}`
      );

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      console.log('응답 객체:', response);
      setDebugInfo(`응답 상태: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('API 응답 데이터:', data);

      setDebugInfo(`성공: ${data.length}개 항목 로드됨`);
      setRiskEntries(data);
    } catch (error) {
      console.error('위험 의심 내역 조회 실패:', error);
      setError(error.message);
      setDebugInfo(`오류: ${error.message}`);

      // 개발 중 테스트용 목업 데이터 (실제 DB 데이터 구조 반영)
      if (import.meta.env.DEV) {
        console.warn('개발 모드: DB 기반 목업 데이터 사용');
        setRiskEntries([
          {
            reportId: 1,
            householdId: 2000002,
            householdName: '김철수',
            managerName: '남민지',
            deptName: '관제센터',
            address: '전라남도 나주시 금계면',
            contactNumber: '061-1234-5678',
            statusCode: 0,
            agencyName: '119소방서',
            createdAt: '2025-06-03T15:07:15',
            updatedAt: '2025-06-03T17:07:15',
            description: 'AI 시스템 자동 감지: 심각 위험도',
            commonDataRatio: 28.0,
            riskLevel: '심각',
          },
          {
            reportId: 2,
            householdId: 1234567,
            householdName: '박영희',
            managerName: '김성현',
            deptName: '운영팀',
            address: '전라남도 영광군 홍농읍',
            contactNumber: '061-2345-6789',
            statusCode: 1,
            agencyName: '119소방서',
            createdAt: '2025-06-03T13:07:15',
            updatedAt: '2025-06-03T16:07:15',
            description: 'AI 시스템 자동 감지: 심각 위험도',
            commonDataRatio: 35.0,
            riskLevel: '심각',
          },
          {
            reportId: 3,
            householdId: 1004008,
            householdName: '최순자',
            managerName: '남민지',
            deptName: '관제센터',
            address: '전라남도 무안군 삼향읍',
            contactNumber: '061-3456-7890',
            statusCode: 0,
            agencyName: '지역복지센터',
            createdAt: '2025-06-03T16:07:15',
            updatedAt: '2025-06-03T17:07:15',
            description: 'AI 시스템 자동 감지: 의심 위험도',
            commonDataRatio: 52.0,
            riskLevel: '의심',
          },
          {
            reportId: 4,
            householdId: 1004007,
            householdName: '이영수',
            managerName: '이재훈',
            deptName: '기술팀',
            address: '전라남도 함평군 해보면',
            contactNumber: '061-4567-8901',
            statusCode: 0,
            agencyName: '동주민센터',
            createdAt: '2025-06-03T11:07:15',
            updatedAt: '2025-06-03T17:07:15',
            description: 'AI 시스템 자동 감지: 의심 위험도',
            commonDataRatio: 58.0,
            riskLevel: '의심',
          },
        ]);
        setDebugInfo('개발모드: 목업 데이터 4개 로드됨');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = entry => {
    console.log('행 클릭:', entry);
    if (onRowClick) {
      onRowClick(entry);
    }
  };

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const toggleSort = () => {
    setSortOrder(prev => (prev === 'latest' ? 'oldest' : 'latest'));
  };

  const handleRefresh = () => {
    setSearchTerm('');
    setSortOrder('latest');
    fetchRiskEntries();
  };

  // 상태 코드를 한국어로 변환
  const getStatusText = statusCode => {
    switch (statusCode) {
      case 0:
        return '접수';
      case 1:
        return '출동중';
      case 2:
        return '처리중';
      case 3:
        return '완료';
      default:
        return '알수없음';
    }
  };

  // 상태에 따른 배지 스타일
  const getStatusBadgeStyle = statusCode => {
    switch (statusCode) {
      case 0:
        return { backgroundColor: '#fff3cd', color: '#856404' }; // 접수
      case 1:
        return { backgroundColor: '#d1ecf1', color: '#0c5460' }; // 출동중
      case 2:
        return { backgroundColor: '#d4edda', color: '#155724' }; // 처리중
      case 3:
        return { backgroundColor: '#f8d7da', color: '#721c24' }; // 완료
      default:
        return { backgroundColor: '#e2e3e5', color: '#383d41' };
    }
  };

  // 날짜 포맷팅
  const formatDateTime = dateString => {
    if (!dateString) return '';

    try {
      const date = new Date(dateString);
      return date
        .toLocaleString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })
        .replace(/\. /g, '.')
        .replace(/\.$/, '');
    } catch (error) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <Title>위험 의심 내역</Title>
          <RefreshButton onClick={handleRefresh}>새로고침</RefreshButton>
        </Header>
        <LoadingMessage>데이터를 불러오는 중...</LoadingMessage>
        {process.env.NODE_ENV === 'development' && (
          <DebugInfo>{debugInfo}</DebugInfo>
        )}
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>위험 의심 내역</Title>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="가구명 또는 담당자 검색"
            value={searchTerm}
            onChange={handleSearch}
          />
          <SortButton onClick={toggleSort}>
            {sortOrder === 'latest' ? '최신순' : '오래된순'}
          </SortButton>
          <RefreshButton onClick={handleRefresh}>새로고침</RefreshButton>
        </SearchBar>
      </Header>

      {error && (
        <ErrorMessage>
          데이터 로드 오류: {error}
          <br />
          <button onClick={fetchRiskEntries} style={{ marginTop: '5px' }}>
            다시 시도
          </button>
        </ErrorMessage>
      )}

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th>발생 시간</Th>
              <Th>측정 기기</Th>
              <Th>업무 담당자</Th>
              <Th>측정 데이터</Th>
              <Th>지역</Th>
              <Th>신고 처리상태</Th>
            </tr>
          </thead>
          <tbody>
            {riskEntries.length === 0 ? (
              <tr>
                <Td
                  colSpan="6"
                  style={{
                    textAlign: 'center',
                    padding: '40px',
                    color: '#666',
                  }}
                >
                  {error
                    ? '데이터를 불러올 수 없습니다.'
                    : '위험 의심 내역이 없습니다.'}
                </Td>
              </tr>
            ) : (
              riskEntries.map(entry => (
                <Row
                  key={entry.reportId}
                  $statusCode={entry.statusCode}
                  $riskLevel={entry.riskLevel}
                  onClick={() => handleRowClick(entry)}
                >
                  <Td>{formatDateTime(entry.createdAt)}</Td>
                  <Td>IoT 센서</Td>
                  <Td>
                    {entry.managerName}
                    {entry.deptName && (
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {entry.deptName}
                      </div>
                    )}
                  </Td>
                  <Td>
                    LED센서, 재실감지센서, 소음감지센서
                    <RiskBadge $level={entry.riskLevel}>
                      {entry.riskLevel}
                    </RiskBadge>
                    {entry.commonDataRatio !== undefined && (
                      <div
                        style={{
                          fontSize: '12px',
                          color: '#666',
                          marginTop: '2px',
                        }}
                      >
                        공통활동: {entry.commonDataRatio.toFixed(1)}%
                      </div>
                    )}
                  </Td>
                  <Td>
                    {entry.address}
                    {entry.householdName && (
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {entry.householdName}
                      </div>
                    )}
                  </Td>
                  <Td>
                    <StatusBadge style={getStatusBadgeStyle(entry.statusCode)}>
                      {getStatusText(entry.statusCode)}
                    </StatusBadge>
                    {entry.agencyName && (
                      <div
                        style={{
                          fontSize: '12px',
                          color: '#666',
                          marginTop: '2px',
                        }}
                      >
                        {entry.agencyName}
                      </div>
                    )}
                  </Td>
                </Row>
              ))
            )}
          </tbody>
        </Table>
      </TableContainer>

      {/* 개발 모드에서만 디버그 정보 표시 */}
      {/* {import.meta.env.DEV && debugInfo && (
        <DebugInfo>
          디버그: {debugInfo}
          <br />총 {riskEntries.length}개 항목
        </DebugInfo>
      )} */}
    </Container>
  );
};

export default SuspiciousRiskEntries;
