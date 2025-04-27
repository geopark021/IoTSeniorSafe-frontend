import { createGlobalStyle } from 'styled-components';

// NanumSquareRound 폰트를 위한 글로벌 스타일
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'NanumSquareRound';
    src: url('../assets/fonts/NanumSquareRoundR.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'NanumSquareRound';
    src: url('../assets/fonts/NanumSquareRoundL.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'NanumSquareRound';
    src: url('../assets/fonts/NanumSquareRoundB.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'NanumSquareRound';
    src: url('../assets/fonts/NanumSquareRoundEB.ttf') format('truetype');
    font-weight: 800;
    font-style: normal;
  }

  html, body {
    font-family: 'NanumSquareRound', sans-serif;
    margin: 0;
    padding: 0;
    overflow: hidden; // 기본 스크롤 숨기기
    height: 100%; // 전체 높이를 100%로 지정
  }

  #root {
    height: 100%; // 루트 요소도 전체 높이로 설정
  }
`;

export default GlobalStyle;
