// IoT 관리 페이지 전용
import React, { useState } from 'react';
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

function IoTMaintenanceLog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('최신순');

  // 목업 데이터. API 연결 필요
  const logData = [
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
    {
      id: 5,
      time: '2024.12.04 08:10:22',
      sensorType: '진동센서',
      name: '정병철',
      location: '전남 진도군 지산면 삼당리...',
      errorMessage: '연결 끊김 (오프라인)',
      status: '재부팅 완료',
    },
    {
      id: 6,
      time: '2024.12.05 11:10:22',
      sensorType: '진동센서',
      name: '한정자',
      location: '전남 진도군 진도읍 송도리...',
      errorMessage: '연결 끊김 (오프라인)',
      status: '재부팅 완료',
    },
    {
      id: 7,
      time: '2024.12.05 06:10:22',
      sensorType: '진동센서',
      name: '윤순남',
      location: '전남 진도군 임회면 조리...',
      errorMessage: '연결 끊김 (오프라인)',
      status: '재부팅 완료',
    },
    {
      id: 8,
      time: '2024.12.08 09:10:22',
      sensorType: '진동센서',
      name: '윤순남',
      location: '전남 진도군 섬덕리 463...',
      errorMessage: '연결 끊김 (오프라인)',
      status: '재부팅 완료',
    },
    {
      id: 9,
      time: '2024.12.08 12:10:22',
      sensorType: '진동센서',
      name: '조석호',
      location: '전남 진도군 조도면 관매리',
      errorMessage: '연결 끊김 (오프라인)',
      status: '재부팅 완료',
    },
    {
      id: 10,
      time: '2024.12.08 18:10:22',
      sensorType: '진동센서',
      name: '송덕수',
      location: '전남 진도군 지산면 삼당리...',
      errorMessage: '연결 끊김 (오프라인)',
      status: '재부팅 완료',
    },
  ];

  // 페이지 변경 핸들러
  const handlePageChange = page => {
    setCurrentPage(page);
  };

  return (
    <LogContainer>
      <LogTitle>오류 및 유지보수 로그</LogTitle>
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
            {logData.map(item => (
              <tr key={item.id}>
                <Td>{item.id}</Td>
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
    </LogContainer>
  );
}

export default IoTMaintenanceLog;
