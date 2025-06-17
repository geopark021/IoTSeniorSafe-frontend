import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import cautionIcon from '../../assets/icons/caution-icon.png';
import checkIcon from '../../assets/icons/check-icon.png';
import reportIcon from '../../assets/icons/report-icon.png';

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

const ReportingSections = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ReportingSection = styled.div`
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
`;

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

const SectionContent = styled.div`
  padding: 16px;
`;

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

const DescriptionContent = styled.div`
  h4 {
    font-size: 14px;
    font-weight: 500;
    margin: 0 0 10px 0;
    font-family: 'NanumSquareRound', sans-serif;
  }
`;

const AlertMessage = styled.div`
  background-color: ${props => {
    if (props.$riskLevel === '심각') return '#ffebee';
    if (props.$riskLevel === '의심') return '#fff8e1';
    return '#fff8e1';
  }};
  border-left: 4px solid
    ${props => {
      if (props.$riskLevel === '심각') return '#f44336';
      if (props.$riskLevel === '의심') return '#ff9800';
      return '#ffc107';
    }};
  padding: 12px;
  border-radius: 4px;

  p {
    margin: 0 0 8px 0;
    font-size: 14px;
    font-family: 'NanumSquareRound', sans-serif;
  }
`;

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
    min-height: 200px;
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

const AIButton = styled.button`
  padding: 8px 20px;
  background-color: #3498db;
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
    background-color: #2980b9;
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

const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
  font-style: italic;
  font-family: 'NanumSquareRound', sans-serif;
`;

const ErrorMessage = styled.div`
  background-color: #fee;
  border-left: 4px solid #e74c3c;
  padding: 12px;
  border-radius: 4px;
  color: #c00;
  margin-bottom: 12px;
  font-family: 'NanumSquareRound', sans-serif;
`;

const HouseholdInfo = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 16px;

  h4 {
    margin: 0 0 8px 0;
    font-size: 14px;
    font-weight: 600;
    color: #495057;
    font-family: 'NanumSquareRound', sans-serif;
  }

  p {
    margin: 4px 0;
    font-size: 13px;
    color: #6c757d;
    font-family: 'NanumSquareRound', sans-serif;
  }
`;

const AIReporting = ({ selectedRiskEntry, onReportSubmitted }) => {
  // 상태 관리
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [aiResponse, setAiResponse] = useState(null);
  const [reportingDocument, setReportingDocument] = useState(null);
  const [submittedHouseholds, setSubmittedHouseholds] = useState(new Set());
  const [formData, setFormData] = useState({
    manager: '박지형',
    report: '',
  });

  // 상태 텍스트 변환 함수
  const getStatusText = (statusCode, householdId) => {
    if (submittedHouseholds.has(householdId)) {
      return '처리 중';
    }

    switch (statusCode) {
      case 0:
        return '접수';
      case 1:
        return '처리 중';
      case 2:
        return '완료';
      default:
        return '미처리';
    }
  };

  // 상태에 따른 색상 함수
  const getStatusColor = (statusCode, householdId) => {
    if (submittedHouseholds.has(householdId)) {
      return '#ff9800'; // 주황색 (처리 중)
    }

    switch (statusCode) {
      case 0:
        return '#2196f3'; // 파란색 (접수)
      case 1:
        return '#ff9800'; // 주황색 (처리 중)
      case 2:
        return '#4caf50'; // 초록색 (완료)
      default:
        return '#757575'; // 회색 (미처리)
    }
  };

  // 선택된 위험 내역이 변경될 때 초기화 및 자동 분석
  useEffect(() => {
    if (selectedRiskEntry && selectedRiskEntry.householdId) {
      console.log('선택된 위험 내역:', selectedRiskEntry);
      setAiResponse(null);
      setReportingDocument(null);
      setError(null);

      // 자동으로 AI 분석 시작
      handleAnalyzeHousehold();
    }
  }, [selectedRiskEntry]);

  // AWS Bedrock을 통한 가구 위험도 분석
  const handleAnalyzeHousehold = async () => {
    if (!selectedRiskEntry || !selectedRiskEntry.householdId) {
      setError('선택된 위험 내역이 없습니다.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log(`AI 분석 시작: householdId=${selectedRiskEntry.householdId}`);

      const baseURL =
        import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
      const response = await fetch(
        `${baseURL}/api/ai-reporting/analyze-household/${selectedRiskEntry.householdId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      console.log('AWS Bedrock 응답 상태:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: AI 분석 요청 실패`);
      }

      const data = await response.json();
      console.log('AWS Bedrock AI 분석 결과:', data);

      setAiResponse(data);

      // 자동으로 신고 내용 미리 생성
      if (data && data.situation) {
        const autoReport = `[AI 분석 결과]\n위험도: ${data.riskLevel}\n발생위치: ${data.location || '확인필요'}\n\n[상황 분석]\n${data.situation}\n\n[대응 지침]\n${data.recommendation}\n\n[비교 분석]\n${data.comparisonDetails || '공통 활동 비율: ' + (data.commonDataRatio?.toFixed(1) || '0') + '%'}\n\n[긴급도]\n${data.urgencyLevel || '보통'}\n\n[신고 기관]\n${data.reportingAgency || '119'} (${data.contactNumber || '119'})`;

        setFormData(prev => ({
          ...prev,
          report: autoReport,
        }));
      }
    } catch (err) {
      console.error('AWS Bedrock AI 분석 실패:', err);
      setError(`AI 분석 중 오류가 발생했습니다: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // AI 보고서 생성 (기존 handleReport)
  const handleGenerateReport = async () => {
    if (!selectedRiskEntry || !aiResponse) {
      setError('분석 결과가 없습니다.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log(
        `신고 문서 생성 시작: householdId=${selectedRiskEntry.householdId}`
      );

      const baseURL =
        import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
      const response = await fetch(
        `${baseURL}/api/ai-reporting/generate-report/${selectedRiskEntry.householdId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(aiResponse),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: 신고 문서 생성 실패`);
      }

      const reportingDocument = await response.json();
      console.log('신고 문서 생성 완료:', reportingDocument);

      setReportingDocument(reportingDocument);

      // 신고 양식에 보고서 내용 자동 입력 (reportTitle부터 시작)
      const detailedReport = [
        reportingDocument.reportTitle || '',
        reportingDocument.summary || '',
        reportingDocument.detailedSituation || '',
        reportingDocument.riskAssessment || '',
        reportingDocument.immediateActions || '',
        reportingDocument.followUpPlan || '',
        reportingDocument.contactInfo || '',
      ]
        .filter(section => section.trim())
        .join('\n\n');

      setFormData(prev => ({
        ...prev,
        report: detailedReport,
      }));
    } catch (err) {
      console.error('신고 문서 생성 실패:', err);
      setError(`신고 문서 생성 중 오류가 발생했습니다: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 최종 신고 제출 (상태 업데이트 포함)
  const handleFinalSubmit = async () => {
    if (!selectedRiskEntry || !formData.report.trim()) {
      setError('신고 내용이 없습니다.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const finalReport = {
        householdId: selectedRiskEntry.householdId,
        managerId: 1,
        agencyName: aiResponse?.reportingAgency || '119소방서',
        reportContent: formData.report,
      };

      const baseURL =
        import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
      const response = await fetch(
        `${baseURL}/api/ai-reporting/submit-final-report`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(finalReport),
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        // 성공 시 해당 가구를 처리 중 상태로 추가
        setSubmittedHouseholds(
          prev => new Set([...prev, selectedRiskEntry.householdId])
        );

        alert(
          `신고가 성공적으로 접수되었습니다.\n신고번호: ${result.reportId}\n신고기관: ${result.agencyName || finalReport.agencyName}`
        );
        handleCancel(); // 폼 초기화

        // 부모 컴포넌트에 상태 변경 알림 (위험 의심 내역 새로고침)
        if (onReportSubmitted) {
          onReportSubmitted(selectedRiskEntry.householdId);
        }
      } else {
        throw new Error(result.message || '신고 제출 실패');
      }
    } catch (error) {
      console.error('신고 접수 실패:', error);
      setError(`신고 접수 중 오류가 발생했습니다: ${error.message}`);
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
    setReportingDocument(null);
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

  // 날짜 포맷팅 함수
  const formatDateTime = dateString => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <Container>
      <Title>AI 리포팅</Title>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {/* 선택된 가구 정보 표시 */}
      {selectedRiskEntry && (
        <HouseholdInfo>
          <h4>선택된 가구 정보</h4>
          <p>
            <strong>가구 ID:</strong> {selectedRiskEntry.householdId}
          </p>
          <p>
            <strong>가구명:</strong> {selectedRiskEntry.householdName}
          </p>
          <p>
            <strong>발생 시간:</strong>{' '}
            {formatDateTime(selectedRiskEntry.createdAt)}
          </p>
          <p>
            <strong>위험도:</strong> {selectedRiskEntry.riskLevel}
          </p>
          {selectedRiskEntry.commonDataRatio !== undefined && (
            <p>
              <strong>공통 활동 비율:</strong>{' '}
              {selectedRiskEntry.commonDataRatio?.toFixed(1)}%
            </p>
          )}
          <p>
            <strong>지역:</strong> {selectedRiskEntry.address}
          </p>
          <p>
            <strong>담당자:</strong> {selectedRiskEntry.managerName}
          </p>
          <p>
            <strong>처리 상태:</strong>
            <span
              style={{
                color: getStatusColor(
                  selectedRiskEntry.statusCode,
                  selectedRiskEntry.householdId
                ),
                fontWeight: 'bold',
                marginLeft: '8px',
              }}
            >
              {getStatusText(
                selectedRiskEntry.statusCode,
                selectedRiskEntry.householdId
              )}
            </span>
          </p>
        </HouseholdInfo>
      )}

      <ReportingSections>
        {/* 위험 상황 감지 섹션 */}
        <ReportingSection>
          <SectionHeader>
            <SectionIcon src={cautionIcon} alt="위험 상황 감지" />
            <SectionTitle>위험 상황 감지</SectionTitle>
          </SectionHeader>
          <SectionContent>
            {loading ? (
              <LoadingMessage>
                AWS Bedrock AI가 상황을 분석하고 있습니다...
              </LoadingMessage>
            ) : aiResponse ? (
              <DangerItems>
                <DangerItem>
                  <h4>
                    <b>발생 위치</b>
                  </h4>
                  <p>
                    <b>하루 전날 비교 수치</b>
                  </p>
                  <p>
                    <b>위험도 수준</b>
                  </p>
                </DangerItem>
                <DangerItem>
                  <p>{aiResponse.location || '거실'}</p>
                  <p>
                    {aiResponse.comparisonDetails ||
                      `공통 활동 ${aiResponse.commonDataRatio?.toFixed(1)}%`}
                  </p>
                  <p
                    style={{
                      color:
                        aiResponse.riskLevel === '심각' ? '#d32f2f' : '#f57c00',
                      fontWeight: 'bold',
                    }}
                  >
                    {aiResponse.riskLevel}
                  </p>
                </DangerItem>
              </DangerItems>
            ) : selectedRiskEntry ? (
              <LoadingMessage>
                AWS AI 분석을 준비하고 있습니다...
              </LoadingMessage>
            ) : (
              <DangerItems>
                <DangerItem>
                  <h4>
                    <b>발생 위치</b>
                  </h4>
                  <p>
                    <b>하루 전날 비교 수치</b>
                  </p>
                  <p>
                    <b>위험도 수준</b>
                  </p>
                </DangerItem>
                <DangerItem>
                  <h4>위험 의심 내역을 선택해주세요</h4>
                  <p>-</p>
                  <p>-</p>
                </DangerItem>
              </DangerItems>
            )}
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
              <LoadingMessage>
                AWS AI가 대응 지침을 생성하고 있습니다...
              </LoadingMessage>
            ) : reportingDocument && reportingDocument.immediateActions ? (
              <GuideList>
                {reportingDocument.immediateActions
                  .split('\n')
                  .filter(item => item.trim())
                  .map((item, index) => {
                    // "즉시 필요한 조치사항은 다음과 같습니다:" 같은 헤더 텍스트 제거
                    if (
                      (item.includes('즉시') && item.includes('조치')) ||
                      (item.includes('다음과') && item.includes('같습니다'))
                    ) {
                      return null;
                    }
                    return <p key={index}>{item}</p>;
                  })
                  .filter(Boolean)}
              </GuideList>
            ) : aiResponse && aiResponse.recommendation ? (
              <GuideList>
                {aiResponse.recommendation
                  .split('\n')
                  .filter(item => item.trim())
                  .map((item, index) => (
                    <p key={index}>{item}</p>
                  ))}
              </GuideList>
            ) : (
              <GuideList>
                <p>
                  <strong>1. 즉각 화면 확인</strong>
                </p>
                <p>
                  어르신의 낙상이나 사고 가능성이 높으므로 빠르게 현장 확인.
                </p>
                <p>
                  <strong>2. 안전 확인</strong>
                </p>
                <p>어르신에게 음성 통화 또는 전화를 통해 상태 확인.</p>
                <p>
                  <strong>3. 응급 대응</strong>
                </p>
                <p>이상 상태 지속 시 즉시 응급 연락망에 알림 조치.</p>
              </GuideList>
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
              {aiResponse ? (
                <AlertMessage $riskLevel={aiResponse.riskLevel}>
                  <p>
                    <strong>[ {aiResponse.riskLevel} 위험 상황 감지 ]</strong>
                  </p>
                  <p>{aiResponse.situation}</p>
                  {aiResponse.comparisonDetails && (
                    <p>
                      <strong>비교 분석:</strong> {aiResponse.comparisonDetails}
                    </p>
                  )}
                  {aiResponse.urgencyLevel && (
                    <p>
                      <strong>긴급도:</strong> {aiResponse.urgencyLevel}
                    </p>
                  )}
                </AlertMessage>
              ) : (
                <AlertMessage>
                  <p>[ 위험 상황 대기 중 ]</p>
                  <p>
                    위험 의심 내역을 선택하면 AWS Bedrock AI가 상황을 분석하여
                    상세한 정보를 제공합니다.
                  </p>
                </AlertMessage>
              )}
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
                  placeholder="AWS AI 분석 결과를 기반으로 신고 내용이 자동 생성됩니다"
                />
              </FormRow>
              <FormButtons>
                <AIButton
                  onClick={handleGenerateReport}
                  disabled={loading || !aiResponse}
                >
                  {loading ? '문서 생성 중...' : 'AI 작성'}
                </AIButton>
                <ReportButton
                  onClick={handleFinalSubmit}
                  disabled={loading || !formData.report.trim()}
                >
                  신고
                </ReportButton>
                <CancelButton onClick={handleCancel}>취소</CancelButton>
              </FormButtons>
              {aiResponse && aiResponse.reportingAgency && (
                <div
                  style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}
                >
                  <strong>신고 기관:</strong> {aiResponse.reportingAgency} (
                  {aiResponse.contactNumber})
                </div>
              )}
            </ReportForm>
          </SectionContent>
        </ReportingSection>
      </ReportingSections>
    </Container>
  );
};

export default AIReporting;
