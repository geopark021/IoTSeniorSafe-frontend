// src/components/monitoring/IntegratedSensorMonitoring.jsx
import React, { useState } from 'react';
import styled from 'styled-components';

// 전구 아이콘 가져오기
import bulbOn from '../../assets/icons/bulb-on.png';
import bulbOff from '../../assets/icons/bulb-off.png';

// 페이지네이션 아이콘 가져오기
import firstPageIcon from '../../assets/icons/first-page-icon.png';
import previousPageIcon from '../../assets/icons/previous-page-icon.png';
import nextPageIcon from '../../assets/icons/next-page-icon.png';
import lastPageIcon from '../../assets/icons/last-page-icon.png';

const MonitoringContainer = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  padding: 24px;
`;

const MonitoringTitle = styled.h3`
  font-family: 'NanumSquareRound', sans-serif;
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 24px;
  color: #333;
`;

const SearchFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const SearchBox = styled.div`
  position: relative;

  input {
    width: 240px;
    padding: 8px 12px;
    padding-left: 36px;
    border: 1px solid #e8e7e7;
    border-radius: 6px;
    font-family: 'NanumSquareRound', sans-serif;
    font-size: 14px;

    &::placeholder {
      color: #ccc;
    }
  }

  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
  }
`;

const FilterBox = styled.div`
  display: flex;
  align-items: center;

  span {
    font-family: 'NanumSquareRound', sans-serif;
    font-size: 14px;
    color: #666;
    margin-right: 8px;
  }

  select {
    padding: 8px 12px;
    border: 1px solid #e8e7e7;
    border-radius: 6px;
    font-family: 'NanumSquareRound', sans-serif;
    font-size: 14px;
    color: #333;
    background-color: #fff;
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
  table-layout: fixed;
`;

const Th = styled.th`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e8e7e7;
  font-family: 'NanumSquareRound', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #666;
  background-color: #f9f9f9;
`;

const Td = styled.td`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e8e7e7;
  font-family: 'NanumSquareRound', sans-serif;
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// 센서 값(전구)을 위한 특별 셀 - 텍스트 오버플로우 속성 없음
const SensorTd = styled(Td)`
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
`;

const BulbContainer = styled.div`
  display: flex;
  align-items: center;
`;

const BulbIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 4px;
  vertical-align: middle;
`;

const BulbValue = styled.span`
  vertical-align: middle;
  margin-left: 4px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
`;

const PageButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: ${props => (props.active ? '#3A86FF' : 'transparent')};
  color: ${props => (props.active ? '#FFF' : '#666')};
  border-radius: 4px;
  margin: 0 4px;
  cursor: pointer;

  &:hover {
    background-color: ${props => (props.active ? '#3A86FF' : '#F0F0F0')};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  img {
    width: 16px;
    height: 16px;
  }
`;

function IntegratedSensorMonitoring() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('최신순');

  // 목업 데이터. API 연결 필요
  const sensorData = [
    {
      id: 1,
      name: '김길순',
      phone: '010-5464-8787',
      address: '전남 진도군 조도면 관매리',
      manager: '김성현',
      managerPhone: '010-3215-7897',
      lighting: 2.5,
      onOff: 0,
      temp: 1.2,
      humidity: 0,
      lastCheck: '1시간 전',
      status: '정한 진동 감지',
    },
    {
      id: 2,
      name: '박복녀',
      phone: '010-1172-4712',
      address: '전남 진도군 진도읍 송도리...',
      manager: '박지형',
      managerPhone: '010-3588-1234',
      lighting: 0.5,
      onOff: 0,
      temp: 0.8,
      humidity: 2.7,
      lastCheck: '30분 전',
      status: '이상 없음',
    },
    {
      id: 3,
      name: '이영수',
      phone: '010-3488-4882',
      address: '전남 진도군 섬덕리 463...',
      manager: '남민지',
      managerPhone: '010-7888-1222',
      lighting: 0,
      onOff: 0.8,
      temp: 1.2,
      humidity: 0,
      lastCheck: '1시간 전',
      status: '이상 없음',
    },
    {
      id: 4,
      name: '최준식',
      phone: '010-1327-5258',
      address: '전남 진도군 임회면 조리...',
      manager: '김성현',
      managerPhone: '010-3215-7897',
      lighting: 1,
      onOff: 0.6,
      temp: 0,
      humidity: 0,
      lastCheck: '3시간 전',
      status: '이상 없음',
    },
    {
      id: 5,
      name: '정말순',
      phone: '010-1156-2377',
      address: '전남 진도군 지산면 삼당리...',
      manager: '박지형',
      managerPhone: '010-3588-1234',
      lighting: 0,
      onOff: 0,
      temp: 0,
      humidity: 0,
      lastCheck: '5시간 전',
      status: '이상 없음',
    },
    {
      id: 6,
      name: '정병철',
      phone: '010-1463-4642',
      address: '전남 진도군 진도읍 송도리...',
      manager: '남민지',
      managerPhone: '010-7888-1222',
      lighting: 0,
      onOff: 0,
      temp: 0.8,
      humidity: 0,
      lastCheck: '2시간 전',
      status: '이상 없음',
    },
    {
      id: 7,
      name: '한정자',
      phone: '010-1188-3257',
      address: '전남 진도군 임회면 조리...',
      manager: '정승환',
      managerPhone: '010-6548-5777',
      lighting: 1.5,
      onOff: 0,
      temp: 1,
      humidity: 0,
      lastCheck: '1시간 전',
      status: '이상 없음',
    },
    {
      id: 8,
      name: '윤순남',
      phone: '010-5464-8787',
      address: '전남 진도군 섬덕리 463...',
      manager: '정승환',
      managerPhone: '010-6548-5777',
      lighting: 1.1,
      onOff: 0,
      temp: 0,
      humidity: 0,
      lastCheck: '21시간 전',
      status: '이상 없음',
    },
    {
      id: 9,
      name: '조석호',
      phone: '010-2472-4123',
      address: '전남 진도군 조도면 관매리',
      manager: '박지형',
      managerPhone: '010-3588-1234',
      lighting: 1.1,
      onOff: 0,
      temp: 0,
      humidity: 0,
      lastCheck: '3시간 전',
      status: '이상 없음',
    },
    {
      id: 10,
      name: '송덕수',
      phone: '010-1233-8787',
      address: '전남 진도군 지산면 삼당리...',
      manager: '정승환',
      managerPhone: '010-6548-5777',
      lighting: 0.3,
      onOff: 0,
      temp: 0,
      humidity: 0,
      lastCheck: '3시간 전',
      status: '이상 없음',
    },
  ];

  // 페이지 변경 핸들러
  const handlePageChange = page => {
    setCurrentPage(page);
  };

  // 전구 아이콘 및 값 렌더링 함수
  const renderBulbIcon = value => {
    const icon = value > 0 ? bulbOn : bulbOff;
    return (
      <BulbContainer>
        <BulbIcon src={icon} alt={value > 0 ? '켜짐' : '꺼짐'} />
        <BulbValue>{value}</BulbValue>
      </BulbContainer>
    );
  };

  return (
    <MonitoringContainer>
      <MonitoringTitle>통합 센서 모니터링</MonitoringTitle>
      <SearchFilterContainer>
        <SearchBox>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="#999999"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="text"
            placeholder="검색"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </SearchBox>
        <FilterBox>
          <span>정렬 :</span>
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="최신순">최신순</option>
            <option value="이름순">이름순</option>
            <option value="상태순">상태순</option>
          </select>
        </FilterBox>
      </SearchFilterContainer>

      <TableContainer>
        <Table>
          <colgroup>
            <col style={{ width: '50px' }} /> {/* 번호 */}
            <col style={{ width: '60px' }} /> {/* 이름 - 가로 간격 줄임 */}
            <col style={{ width: '120px' }} /> {/* 연락처 */}
            <col style={{ width: '180px' }} /> {/* 주소 */}
            <col style={{ width: '70px' }} /> {/* 담당자 */}
            <col style={{ width: '120px' }} /> {/* 담당자 연락처 */}
            <col style={{ width: '50px' }} /> {/* 안방 */}
            <col style={{ width: '50px' }} /> {/* 거실 */}
            <col style={{ width: '50px' }} /> {/* 주방 */}
            <col style={{ width: '50px' }} /> {/* 현관 */}
            <col style={{ width: '100px' }} /> {/* 마지막 활동시간 */}
            <col style={{ width: '140px' }} /> {/* 상태/메세지 */}
          </colgroup>
          <thead>
            <tr>
              <Th>No</Th>
              <Th>이름</Th>
              <Th>연락처</Th>
              <Th>주소</Th>
              <Th>담당자</Th>
              <Th>담당자 연락처</Th>
              <Th>안방</Th>
              <Th>거실</Th>
              <Th>주방</Th>
              <Th>현관</Th>
              <Th>마지막 활동시간</Th>
              <Th>상태/메세지</Th>
            </tr>
          </thead>
          <tbody>
            {sensorData.map(item => (
              <tr key={item.id}>
                <Td>{item.id}</Td>
                <Td>{item.name}</Td>
                <Td>{item.phone}</Td>
                <Td title={item.address}>{item.address}</Td>
                <Td>{item.manager}</Td>
                <Td>{item.managerPhone}</Td>
                <SensorTd>{renderBulbIcon(item.lighting)}</SensorTd>
                <SensorTd>{renderBulbIcon(item.onOff)}</SensorTd>
                <SensorTd>{renderBulbIcon(item.temp)}</SensorTd>
                <SensorTd>{renderBulbIcon(item.humidity)}</SensorTd>
                <Td>{item.lastCheck}</Td>
                <Td>{item.status}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>

      <PaginationContainer>
        <PageButton onClick={() => handlePageChange(1)}>
          <img src={firstPageIcon} alt="첫 페이지" />
        </PageButton>
        <PageButton
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        >
          <img src={previousPageIcon} alt="이전 페이지" />
        </PageButton>

        {[1, 2, 3, 4, 5].map(page => (
          <PageButton
            key={page}
            active={page === currentPage}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </PageButton>
        ))}

        <PageButton
          onClick={() => handlePageChange(Math.min(5, currentPage + 1))}
        >
          <img src={nextPageIcon} alt="다음 페이지" />
        </PageButton>
        <PageButton onClick={() => handlePageChange(5)}>
          <img src={lastPageIcon} alt="마지막 페이지" />
        </PageButton>
      </PaginationContainer>
    </MonitoringContainer>
  );
}

export default IntegratedSensorMonitoring;
