# IoTSeniorSafe-frontend
종합설계1,2 미컴공 프론트엔드 레포지토리

## 📌 주요 화면 & 기능

- **모니터링 페이지**  
  * 가구별·공간별 LED 센서 **ON/OFF** 상태를 실시간으로 시각화하여 통합 관리

- **AI 리포팅 페이지**  
  * LED·재실·소음 3종 센서 데이터를 **어제 vs 오늘 비율**로 분석 → `정상 / 의심 / 심각` 상태 자동 분류  
  * `의심·심각` 건은 **〈위험 의심 내역〉** 리스트에 자동 노출  
  * 관리자가 항목을 선택하면 **AWS Bedrock**으로 상황 보고 & 대응 지침을 자동 생성  
  * “신고” 버튼 한 번으로 관련 기관에 즉시 전송

- **IoT 관리 페이지**  
  * 가구별 센서 **오류·장애 로그**를 열람하고 필터·검색으로 문제 센서를 빠르게 파악

# 모니터링 페이지 
![image](https://github.com/user-attachments/assets/dd2e6915-227b-430d-be1f-000ff6932bb4)
![image](https://github.com/user-attachments/assets/c92f5784-6f81-4e53-bd55-e204e1356d6a)


# AI 리포팅 페이지
![image](https://github.com/user-attachments/assets/e84ca5db-51d0-4e38-bed9-9ab9fd34a070)
![image](https://github.com/user-attachments/assets/d03515db-21ad-4930-b3e9-7f69f4d027d4)


# IoT 관리 페이지
![image](https://github.com/user-attachments/assets/7b04070a-904b-4d55-a9b3-e559b84f6ecb)
![image](https://github.com/user-attachments/assets/7fcb5d45-6bd3-4485-8947-aeac17965906)
