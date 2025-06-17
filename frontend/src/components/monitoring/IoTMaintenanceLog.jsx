// IoT 관리 페이지 전용
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

// 페이지네이션 아이콘 가져오기
import firstPageIcon from '../../assets/icons/first-page-icon.png';
import previousPageIcon from '../../assets/icons/previous-page-icon.png';
import nextPageIcon from '../../assets/icons/next-page-icon.png';
import lastPageIcon from '../../assets/icons/last-page-icon.png';

const LogContainer = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  padding: 24px;
`;

const LogTitle = styled.h3`
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

const maintenanceAPI = {
  getMaintenanceLogs: async (page = 0, size = 10, sortBy = 'latest') => {
    const response = await fetch(
      `${API_BASE_URL}/api/iot-manage/maintenance-logs?page=${page}&size=${size}&sortBy=${sortBy}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  },
};

function IoTMaintenanceLog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('최신순');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 목업 데이터. API 연결 실패 시 사용
  const [logData, setLogData] = useState([
    {
      id: 1,
      time: '2024.12.01 08:31:31',
      sensorType: '진동센서',
      name: '박복녀',
      location: '전남 진도군 조도면 관매리',
      errorMessage: '연결 끊김 (오프라인)',
      status: '재부팅 완료',
    },
    {
      id: 2,
      time: '2024.12.03 06:10:22',
      sensorType: '진동센서',
      name: '이영수',
      location: '전남 진도군 진도읍 송도리...',
      errorMessage: '연결 끊김 (오프라인)',
      status: '미완료',
    },
    {
      id: 3,
      time: '2024.12.04 23:10:22',
      sensorType: '진동센서',
      name: '최준식',
      location: '전남 진도군 섬덕리 463...',
      errorMessage: '연결 끊김 (오프라인)',
      status: '재부팅 완료',
    },
    {
      id: 4,
      time: '2024.12.04 07:10:22',
      sensorType: '진동센서',
      name: '정말순',
      location: '전남 진도군 임회면 조리...',
      errorMessage: '연결 끊김 (오프라인)',
      status: '미완료',
    },
  ]);

  // API 데이터 로드 함수
  const loadMaintenanceData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const sortMapping = {
        최신순: 'latest',
        이름순: 'name',
        상태순: 'status',
      };

      const response = await maintenanceAPI.getMaintenanceLogs(
        0,
        100,
        sortMapping[filter] || 'latest'
      );

      if (response.success && response.data) {
        // API 데이터를 기존 형식으로 변환
        const convertedData = response.data.map((item, index) => ({
          id: index + 1,
          time: item.timestamp || '-',
          sensorType: item.sensorType || '-',
          name: item.householdName || '-',
          location: item.address || '-',
          errorMessage: item.errorMessage || '-',
          status: item.status || '-',
        }));

        setLogData(convertedData);
      }
    } catch (err) {
      console.error('API 연결 실패:', err);
      setError(err.message);
      // 실패 시 기존 목업 데이터 유지
    } finally {
      setLoading(false);
    }
  }, [filter]);

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    loadMaintenanceData();
  }, [loadMaintenanceData]);

  // 자동 새로고침 (60초마다)
  useEffect(() => {
    const interval = setInterval(() => {
      loadMaintenanceData();
    }, 60000);

    return () => clearInterval(interval);
  }, [loadMaintenanceData]);

  // 검색 필터링된 데이터
  const filteredData = logData.filter(
    item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sensorType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <LogContainer>
      <LogTitle>
        오류 및 유지보수 로그
        {loading && (
          <span style={{ fontSize: '14px', color: '#666', marginLeft: '10px' }}>
            새로고침 중...
          </span>
        )}
      </LogTitle>

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
            <col style={{ width: '40px' }} /> {/* 번호 */}
            <col style={{ width: '150px' }} /> {/* 시간 */}
            <col style={{ width: '80px' }} /> {/* 센서명 */}
            <col style={{ width: '80px' }} /> {/* 이름 */}
            <col style={{ width: '180px' }} /> {/* 주소 */}
            <col style={{ width: '150px' }} /> {/* 오류내용 */}
            <col style={{ width: '100px' }} /> {/* 조치 상황 */}
          </colgroup>
          <thead>
            <tr>
              <Th>번호</Th>
              <Th>시간</Th>
              <Th>센서명</Th>
              <Th>이름</Th>
              <Th>주소</Th>
              <Th>오류내용</Th>
              <Th>조치 상황</Th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((item, index) => (
              <tr key={item.id}>
                <Td>{startIndex + index + 1}</Td>
                <Td>{item.time}</Td>
                <Td>{item.sensorType}</Td>
                <Td>{item.name}</Td>
                <Td title={item.location}>{item.location}</Td>
                <Td>{item.errorMessage}</Td>
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
    </LogContainer>
  );
}

export default IoTMaintenanceLog;
