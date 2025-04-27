import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import GlobalStyle from './GlobalStyle'; // 글꼴
import Layout from './components/Layout';
import Login from './pages/Login';
import Monitoring from './pages/Monitoring';
// 페이지 구현시마다 임포트
// import Dashboard from './pages/Dashboard';
// import AIReporting from './pages/AIReporting';
// import IoTManage from './pages/IoTManage';
function App() {
  return (
    <Router>
      <Routes>
        {/* Layout 컴포넌트 =  사이드바 +  메인 콘텐츠 영역 */}
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<div>대시보드 페이지</div>} />
          <Route path="monitoring" element={<Monitoring />} />
          <Route path="ai" element={<div>AI 리포팅 페이지</div>} />
          <Route path="iot" element={<div>IoT 관리 페이지</div>} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<div>로그아웃 처리 페이지</div>} />

          {/*default 경로 moniotring  */}
          <Route index element={<Navigate to="/monitoring" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
