// 모니터링 페이지 전용
// src/components/monitoring/IntegratedSensorMonitoring.jsx

import React, { useState, useEffect, useCallback } from 'react';
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

// API 설정
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const monitoringAPI = {
  getHouseholdMonitoring: async (page = 0, size = 10, sortBy = 'latest') => {
    const response = await fetch(
      `${API_BASE_URL}/api/monitoring/households?page=${page}&size=${size}&sortBy=${sortBy}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  },
};

function IntegratedSensorMonitoring() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('최신순');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 목업 데이터. API 연결 실패 시 사용
  const [sensorData, setSensorData] = useState([
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
  ]);

  // API 데이터 로드 함수
  const loadMonitoringData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const sortMapping = {
        최신순: 'latest',
        이름순: 'name',
        상태순: 'status',
      };

      const response = await monitoringAPI.getHouseholdMonitoring(
        0,
        100,
        sortMapping[filter] || 'latest'
      );

      if (response.success && response.data) {
        // API 데이터를 기존 형식으로 변환
        const convertedData = response.data.map((item, index) => ({
          id: index + 1,
          name: item.name || '-',
          phone: item.contactNumber || '-',
          address: item.address || '-',
          manager: item.managerName || '-',
          managerPhone: item.managerContact || '-',
          lighting: item.lightLevel || 0,
          onOff: item.occupancyLevel || 0,
          temp: item.noiseLevel || 0,
          humidity: item.toiletLevel || 0,
          lastCheck: formatTimeDifference(item.lastActivityTime),
          status: item.status || '알 수 없음',
        }));

        setSensorData(convertedData);
      }
    } catch (err) {
      console.error('API 연결 실패:', err);
      setError(err.message);
      // 실패 시 기존 목업 데이터 유지
    } finally {
      setLoading(false);
    }
  }, [filter]);

  // 시간 차이 포맷팅 함수
  const formatTimeDifference = dateTimeString => {
    if (!dateTimeString) return '데이터 없음';

    const now = new Date();
    const activityTime = new Date(dateTimeString);
    const diffMinutes = Math.floor((now - activityTime) / (1000 * 60));

    if (diffMinutes < 60) {
      return `${diffMinutes}분 전`;
    } else if (diffMinutes < 1440) {
      return `${Math.floor(diffMinutes / 60)}시간 전`;
    } else {
      return `${Math.floor(diffMinutes / 1440)}일 전`;
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    loadMonitoringData();
  }, [loadMonitoringData]);

  // 자동 새로고침 (30초마다)
  useEffect(() => {
    const interval = setInterval(() => {
      loadMonitoringData();
    }, 30000);

    return () => clearInterval(interval);
  }, [loadMonitoringData]);

  // 검색 필터링된 데이터
  const filteredData = sensorData.filter(
    item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.manager.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 페이지네이션 관련 계산
  const itemsPerPage = 10;
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 현재 페이지에 표시할 데이터
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = filteredData.slice(startIndex, endIndex);

  // 페이지 번호 생성 함수
  const generatePageNumbers = () => {
    if (totalPages <= 1) return []; // 1페이지 이하면 페이지 번호 안 보여줌

    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // 끝 페이지가 조정되면 시작 페이지도 조정
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  // 현재 페이지가 총 페이지 수를 초과하면 첫 번째 페이지로 이동
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  // 페이지 변경 핸들러
  const handlePageChange = page => {
    setCurrentPage(page);
  };

  // 전구 아이콘 및 값 렌더링 함수
  const renderBulbIcon = value => {
    const numValue = parseFloat(value) || 0;
    const icon = numValue > 0 ? bulbOn : bulbOff;
    return (
      <BulbContainer>
        <BulbIcon src={icon} alt={numValue > 0 ? '켜짐' : '꺼짐'} />
        <BulbValue>{numValue.toFixed(1)}</BulbValue>
      </BulbContainer>
    );
  };

  return (
    <MonitoringContainer>
      <MonitoringTitle>
        통합 센서 모니터링
        {loading && (
          <span style={{ fontSize: '14px', color: '#666', marginLeft: '10px' }}>
            새로고침 중...
          </span>
        )}
      </MonitoringTitle>

      {error && (
        <div
          style={{
            backgroundColor: '#fff3cd',
            color: '#856404',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '14px',
          }}
        >
          API 연결 실패: {error} (목업 데이터로 표시됩니다)
        </div>
      )}

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
            <col style={{ width: '60px' }} /> {/* 이름  */}
            <col style={{ width: '120px' }} /> {/* 연락처 */}
            <col style={{ width: '180px' }} /> {/* 주소 */}
            <col style={{ width: '70px' }} /> {/* 담당자 */}
            <col style={{ width: '120px' }} /> {/* 담당자 연락처 */}
            <col style={{ width: '50px' }} /> {/* 안방 */}
            <col style={{ width: '50px' }} /> {/* 거실 */}
            <col style={{ width: '50px' }} /> {/* 주방 */}
            <col style={{ width: '50px' }} /> {/* 현관 */}
            <col style={{ width: '110px' }} /> {/* 마지막 활동시간 */}
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
            {currentPageData.map((item, index) => (
              <tr key={item.id}>
                <Td>{startIndex + index + 1}</Td>
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

      {/* 데이터가 없을 때 메시지 표시 */}
      {filteredData.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '40px',
            color: '#666',
            fontSize: '16px',
          }}
        >
          표시할 데이터가 없습니다.
        </div>
      )}

      {/* 페이지네이션 - 2페이지 이상일 때만 표시 */}
      {totalPages > 1 && (
        <PaginationContainer>
          <PageButton
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            <img src={firstPageIcon} alt="첫 페이지" />
          </PageButton>
          <PageButton
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <img src={previousPageIcon} alt="이전 페이지" />
          </PageButton>

          {generatePageNumbers().map(page => (
            <PageButton
              key={page}
              active={page === currentPage}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </PageButton>
          ))}

          <PageButton
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
          >
            <img src={nextPageIcon} alt="다음 페이지" />
          </PageButton>
          <PageButton
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            <img src={lastPageIcon} alt="마지막 페이지" />
          </PageButton>
        </PaginationContainer>
      )}

      {/* 페이지 정보 표시 */}
      {totalPages > 1 && (
        <div
          style={{
            textAlign: 'center',
            marginTop: '10px',
            fontSize: '14px',
            color: '#666',
          }}
        >
          전체 {totalItems}개 중 {startIndex + 1}-
          {Math.min(endIndex, totalItems)}개 표시 (페이지 {currentPage}/
          {totalPages})
        </div>
      )}
    </MonitoringContainer>
  );
}

export default IntegratedSensorMonitoring;
