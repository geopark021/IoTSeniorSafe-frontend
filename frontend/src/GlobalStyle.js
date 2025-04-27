import { createGlobalStyle } from 'styled-components';

// 글꼴 폰트를 위한 글로벌 스타일
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

  body {
    font-family: 'NanumSquareRound', sans-serif;
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyle;
