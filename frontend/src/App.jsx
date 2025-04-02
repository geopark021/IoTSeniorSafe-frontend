// src/App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Layout from './components/Layout';

// 페이지 임포트
// import Dashboard from './pages/Dashboard';
// import Monitoring from './pages/Monitoring';
// import AIReporting from './pages/AIReporting';
// import IoTManage from './pages/IoTManage';
import Login from './pages/Login';
//import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout 안에 사이드바 + Outlet */}
        <Route path="/" element={<Layout />}>
          {/* /dashboard => Dashboard 페이지 */}
          {/* 향후 구현할 페이지 목록
           
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="monitoring" element={<Monitoring />} />
          <Route path="ai" element={<AIReporting />} />
          <Route path="iot" element={<IoTManage />} />
          <Route path="register" element={<Register />} />

          */}
          <Route path="login" element={<Login />} />
          {/* <Route index element={<Navigate to="/login" />} /> */}

          {/* 루트(/)에 들어왔을 때 대시보드로 이동하고 싶으면 아래처럼 Redirect 가능
            <Route index element={<Navigate to="/dashboard" />} />
          */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
