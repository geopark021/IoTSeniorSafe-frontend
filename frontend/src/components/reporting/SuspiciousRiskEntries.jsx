import React, { useState } from 'react';
import styled from 'styled-components';

// 컴포넌트 컨테이너
const Container = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin-bottom: 20px;
  font-family: 'NanumSquareRound', sans-serif;
  display: flex;
  flex-direction: column;
  height: 300px; // 고정 높이 설정
`;

// 헤더 영역
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

// 테이블 컨테이너
const TableContainer = styled.div`
  overflow-y: auto;
  flex: 1;
`;

// 테이블 스타일
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
  background-color: ${props => (props.isActive ? '#f0f8ff' : '#fff0f0')};
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  background-color: ${props => (props.active ? '#e3f7e9' : '#fbe9e7')};
  color: ${props => (props.active ? '#1e7e34' : '#d32f2f')};
  font-family: 'NanumSquareRound', sans-serif;
`;

const SuspiciousRiskEntries = () => {
  // 목업 데이터. API 연결 필요
  const [riskEntries, setRiskEntries] = useState([
    {
      id: 1,
      timestamp: '2024.12.08 16:10:22',
      type: 'IoT 센서',
      reporter: '남민지',
      source: '진동센서',
      location: '전라남도 나주시',
      status: 'Active',
    },
    {
      id: 2,
      timestamp: '2024.12.08 13:07:33',
      type: '통합',
      reporter: '김성현',
      source: '진동센서, 전력 사용량',
      location: '전라남도 영광군',
      status: 'Inactive',
    },
    {
      id: 3,
      timestamp: '2024.12.09 13:07:33',
      type: '환전',
      reporter: '박지형',
      source: '전력 사용량',
      location: '전라남도 나주시',
      status: 'Inactive',
    },
    {
      id: 4,
      timestamp: '2024.12.09 15:32:21',
      type: '환전',
      reporter: '박지형',
      source: '전력 사용량',
      location: '전라남도 나주시',
      status: 'Inactive',
    },
    {
      id: 5,
      timestamp: '2024.12.10 09:15:33',
      type: 'IoT 센서',
      reporter: '정승환',
      source: '진동센서',
      location: '전라남도 나주시',
      status: 'Inactive',
    },
    {
      id: 6,
      timestamp: '2024.12.10 11:42:17',
      type: '통합',
      reporter: '김성현',
      source: '진동센서, 전력 사용량',
      location: '전라남도 영광군',
      status: 'Inactive',
    },
    {
      id: 7,
      timestamp: '2024.12.11 08:22:45',
      type: '환전',
      reporter: '박지형',
      source: '전력 사용량',
      location: '전라남도 나주시',
      status: 'Inactive',
    },
  ]);

  return (
    <Container>
      <Header>
        <Title>위험 의심 내역</Title>
        <SearchBar>
          <SearchInput type="text" placeholder="검색" />
          <SortButton>최신순</SortButton>
        </SearchBar>
      </Header>

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
            {riskEntries.map(entry => (
              <Row key={entry.id} isActive={entry.status === 'Active'}>
                <Td>{entry.timestamp}</Td>
                <Td>{entry.type}</Td>
                <Td>{entry.reporter}</Td>
                <Td>{entry.source}</Td>
                <Td>{entry.location}</Td>
                <Td>
                  <StatusBadge active={entry.status === 'Active'}>
                    {entry.status === 'Active' ? 'Active' : 'Inactive'}
                  </StatusBadge>
                </Td>
              </Row>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default SuspiciousRiskEntries;
