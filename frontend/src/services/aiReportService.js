const API_BASE_URL = 'http://localhost:8080/api';

export const aiReportService = {
  async analyzeSensorData(sensorData) {
    try {
      const response = await fetch(`${API_BASE_URL}/ai-report/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sensorData: sensorData,
          userId: 'user123',
          location: '거실',
        }),
      });

      if (!response.ok) {
        throw new Error('서버 응답 오류');
      }

      return await response.json();
    } catch (error) {
      console.error('AI 분석 요청 중 오류:', error);
      throw error;
    }
  },
};
