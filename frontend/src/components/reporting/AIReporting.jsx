import React, { useState } from 'react';
import styled from 'styled-components';

import cautionIcon from '../../assets/icons/caution-icon.png';
import checkIcon from '../../assets/icons/check-icon.png';
import reportIcon from '../../assets/icons/report-icon.png';
import { aiReportService } from '../../services/aiReportService';

// 메인 컨테이너
const Container = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 20px;
  font-family: 'NanumSquareRound', sans-serif;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 20px 0;
  font-family: 'NanumSquareRound', sans-serif;
`;

// 리포팅 섹션 컨테이너
const ReportingSections = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

// 개별 섹션 컨테이너
const ReportingSection = styled.div`
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
`;

// 섹션 헤더
const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #f0f0f0;
`;

const SectionIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  font-family: 'NanumSquareRound', sans-serif;
`;

// 섹션 내용
const SectionContent = styled.div`
  padding: 16px;
`;

// 위험 감지 섹션 스타일
const DangerItems = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const DangerItem = styled.div`
  h4 {
    font-size: 14px;
    font-weight: 500;
    margin: 0 0 8px 0;
    color: #555;
    font-family: 'NanumSquareRound', sans-serif;
  }

  p {
    margin: 0 0 6px 0;
    font-size: 14px;
    font-family: 'NanumSquareRound', sans-serif;
  }
`;

// 대응 지침 섹션 스타일
const GuideList = styled.div`
  margin: 0;

  p {
    margin: 0 0 12px 0;
    font-size: 14px;
    font-family: 'NanumSquareRound', sans-serif;
    line-height: 1.6;
  }

  p:last-child {
    margin-bottom: 0;
  }
`;

const GuideListOld = styled.ol`
  padding-left: 20px;
  margin: 0;

  li {
    margin-bottom: 12px;
    font-family: 'NanumSquareRound', sans-serif;
  }

  strong {
    display: block;
    margin-bottom: 4px;
    font-family: 'NanumSquareRound', sans-serif;
  }

  p {
    margin: 0;
    font-size: 14px;
    font-family: 'NanumSquareRound', sans-serif;
  }
`;

// 상세 설명 섹션 스타일
const DescriptionContent = styled.div`
  h4 {
    font-size: 14px;
    font-weight: 500;
    margin: 0 0 10px 0;
    font-family: 'NanumSquareRound', sans-serif;
  }
`;

const AlertMessage = styled.div`
  background-color: #fff8e1;
  border-left: 4px solid #ffc107;
  padding: 12px;
  border-radius: 4px;

  p {
    margin: 0 0 8px 0;
    font-size: 14px;
    font-family: 'NanumSquareRound', sans-serif;
  }
`;

// 신고하기 섹션 스타일
const ReportForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 14px;
    font-weight: 500;
    font-family: 'NanumSquareRound', sans-serif;
  }

  input,
  textarea {
    padding: 8px 12px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    font-size: 14px;
    font-family: 'NanumSquareRound', sans-serif;
  }

  textarea {
    min-height: 80px;
    resize: vertical;
  }
`;

const FormButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
`;

const ReportButton = styled.button`
  padding: 8px 20px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  font-family: 'NanumSquareRound', sans-serif;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #c0392b;
  }
`;

const CancelButton = styled.button`
  padding: 8px 20px;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  font-family: 'NanumSquareRound', sans-serif;

  &:hover {
    background-color: #e0e0e0;
  }
`;

// 로딩 메시지
const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
  font-style: italic;
`;

// 에러 메시지
const ErrorMessage = styled.div`
  background-color: #fee;
  border-left: 4px solid #e74c3c;
  padding: 12px;
  border-radius: 4px;
  color: #c00;
  margin-bottom: 12px;
`;

const AIReporting = () => {
  // 상태 관리
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [aiResponse, setAiResponse] = useState(null);
  const [formData, setFormData] = useState({
    manager: '정승환',
    report: '',
  });

  // 하드코딩된 센서 데이터 (현재 상황)
  const hardcodedSensorData = [
    {
      sensorType: 'LED',
      location: '거실',
      value: 120.0,
      threshold: 100.0,
      timestamp: new Date().toISOString(),
    },
    {
      sensorType: '재실감지',
      location: '거실',
      value: 85.0,
      threshold: 70.0,
      timestamp: new Date().toISOString(),
    },
    {
      sensorType: '소음감지',
      location: '거실',
      value: 75.0,
      threshold: 80.0,
      timestamp: new Date().toISOString(),
    },
  ];

  // 신고 버튼 클릭 핸들러
  const handleReport = async () => {
    setLoading(true);
    setError(null);

    try {
      // API 호출
      const response =
        await aiReportService.analyzeSensorData(hardcodedSensorData);

      // 응답 저장
      setAiResponse(response);

      // 신고 양식에 AI 응답 내용 자동 입력
      setFormData(prev => ({
        ...prev,
        report: `[AI 분석 결과]\n위험도: ${response.riskLevel}\n\n${response.situation}\n\n[대응 지침]\n${response.recommendation}\n\n[신고 기관]\n${response.reportingAgency} (${response.contactNumber})`,
      }));

      console.log('AI 분석 완료:', response);
    } catch (err) {
      console.error('AI 분석 실패:', err);
      setError('AI 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  // 취소 버튼 클릭 핸들러
  const handleCancel = () => {
    setFormData({
      manager: '정승환',
      report: '',
    });
    setAiResponse(null);
    setError(null);
  };

  // 폼 입력 변경 핸들러
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container>
      <Title>AI 리포팅</Title>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <ReportingSections>
        {/* 위험 상황 감지 섹션 */}
        <ReportingSection>
          <SectionHeader>
            <SectionIcon src={cautionIcon} alt="위험 상황 감지" />
            <SectionTitle>위험 상황 감지</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <DangerItems>
              <DangerItem>
                <h4>발생 위치</h4>
                <p>감지된 측정 수치</p>
                <p>LED 상태</p>
              </DangerItem>
              <DangerItem>
                <h4>거실</h4>
                <p>평소보다 120% 증가</p>
                <p>10:35부터 켜짐</p>
              </DangerItem>
            </DangerItems>
          </SectionContent>
        </ReportingSection>

        {/* 대응 지침 섹션 */}
        <ReportingSection>
          <SectionHeader>
            <SectionIcon src={checkIcon} alt="대응 지침" />
            <SectionTitle>대응 지침</SectionTitle>
          </SectionHeader>
          <SectionContent>
            {loading ? (
              <LoadingMessage>AI가 상황을 분석하고 있습니다...</LoadingMessage>
            ) : aiResponse ? (
              <GuideList>
                {aiResponse.recommendation
                  .split('\n')
                  .filter(item => item.trim())
                  .map((item, index) => (
                    <p key={index}>{item}</p>
                  ))}
              </GuideList>
            ) : (
              <GuideListOld>
                <li>
                  <strong>증감 화면 확인</strong>
                  <p>
                    어르신의 낙상이나 사고 가능성이 높으므로 빠르게 현장 확인.
                  </p>
                </li>
                <li>
                  <strong>안전 확인</strong>
                  <p>어르신에게 음성 통화 또는 전화를 통해 상태 확인.</p>
                </li>
                <li>
                  <strong>응급 대응</strong>
                  <p>이상 상태 지속 시 즉시 응급 연락망에 알림 조치.</p>
                </li>
              </GuideListOld>
            )}
          </SectionContent>
        </ReportingSection>

        {/* 상세 설명 섹션 */}
        <ReportingSection>
          <SectionHeader>
            <SectionIcon src={cautionIcon} alt="상세 설명" />
            <SectionTitle>상세 설명</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <DescriptionContent>
              <h4>상황 보고 및 대응 지침</h4>
              <AlertMessage>
                <p>[ 위험 상황 감지 ]</p>
                <p>
                  오늘 오전 10시 35분부터 거실에서 비정상적으로 높은 움직임이
                  감지되었습니다.
                </p>
                <p>
                  이 수치는 평소 대비 120%로 매우 높은 수준입니다. LED 상태는
                  증격 감지 이후 켜진 상태로 유지되고 있습니다.
                </p>
              </AlertMessage>
            </DescriptionContent>
          </SectionContent>
        </ReportingSection>

        {/* 신고하기 섹션 */}
        <ReportingSection>
          <SectionHeader>
            <SectionIcon src={reportIcon} alt="신고하기" />
            <SectionTitle>신고하기</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <ReportForm>
              <FormRow>
                <label>담당자</label>
                <input
                  type="text"
                  name="manager"
                  value={formData.manager}
                  onChange={handleInputChange}
                />
              </FormRow>
              <FormRow>
                <label>상황 보고 및 대응 지침</label>
                <textarea
                  name="report"
                  value={formData.report}
                  onChange={handleInputChange}
                  placeholder="상황을 상세히 기록해주세요"
                />
              </FormRow>
              <FormButtons>
                <ReportButton onClick={handleReport} disabled={loading}>
                  {loading ? 'AI 분석 중...' : '신고'}
                </ReportButton>
                <CancelButton onClick={handleCancel}>취소</CancelButton>
              </FormButtons>
            </ReportForm>
          </SectionContent>
        </ReportingSection>
      </ReportingSections>
    </Container>
  );
};

export default AIReporting;
