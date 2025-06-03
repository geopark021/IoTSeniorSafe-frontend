// const API_BASE_URL = 'http://localhost:8080/api';

// export const aiReportService = {
//   async analyzeSensorData(sensorData) {
//     try {
//       const response = await fetch(`${API_BASE_URL}/ai-report/analyze`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           sensorData: sensorData,
//           userId: 'user123',
//           location: '거실',
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('서버 응답 오류');
//       }

//       return await response.json();
//     } catch (error) {
//       console.error('AI 분석 요청 중 오류:', error);
//       throw error;
//     }
//   },
// };
// services/aiReportService.js
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

export const aiReportService = {
  // 위험 의심 내역 조회 (기존 DB 구조 기반)
  async getRiskEntries(page = 0, size = 10, search = '', sort = 'latest') {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      search,
      sort,
    });

    const response = await fetch(
      `${API_BASE_URL}/api/ai-reporting/risk-entries?${params}`
    );
    if (!response.ok) {
      throw new Error('위험 의심 내역 조회 실패');
    }
    return response.json();
  },

  // 가구 위험도 분석 (위험 의심 내역 클릭 시 자동 실행)
  async analyzeHousehold(householdId) {
    const response = await fetch(
      `${API_BASE_URL}/api/ai-reporting/analyze-household/${householdId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('가구 위험도 분석 실패');
    }
    return response.json();
  },

  // 신고 문서 생성 (신고 버튼 클릭 시 실행)
  async generateReport(householdId, initialAnalysis) {
    const response = await fetch(
      `${API_BASE_URL}/api/ai-reporting/generate-report/${householdId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(initialAnalysis),
      }
    );

    if (!response.ok) {
      throw new Error('신고 문서 생성 실패');
    }
    return response.json();
  },

  // 가구 데이터 조회 (디버깅/확인용)
  async getHouseholdData(householdId) {
    const response = await fetch(
      `${API_BASE_URL}/api/ai-reporting/household-data/${householdId}`
    );
    if (!response.ok) {
      throw new Error('가구 데이터 조회 실패');
    }
    return response.json();
  },

  // 모든 가구 위험도 평가 (관리자용)
  async evaluateAllHouseholds() {
    const response = await fetch(
      `${API_BASE_URL}/api/ai-reporting/evaluate-all-households`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('전체 가구 위험도 평가 실패');
    }
    return response.json();
  },

  // 레거시 메서드 (하위 호환성 유지)
  async analyzeSensorData(sensorData) {
    // 기존 코드와의 호환성을 위해 유지
    console.warn(
      'analyzeSensorData는 더 이상 사용되지 않습니다. analyzeHousehold를 사용하세요.'
    );

    // 기본 응답 반환
    return {
      riskLevel: '확인필요',
      situation: '센서 데이터 분석이 필요합니다.',
      recommendation: '위험 의심 내역에서 가구를 선택해주세요.',
      reportingAgency: '시스템관리자',
      contactNumber: '내부문의',
    };
  },
};
