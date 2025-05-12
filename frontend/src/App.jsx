import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import GlobalStyle from './GlobalStyle';
import Layout from './components/Layout';
import Login from './pages/Login';
import Monitoring from './pages/Monitoring';
import AIReportingPage from './pages/AIReporting';
import IoTManage from './pages/IoTManage';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<div>대시보드 페이지</div>} />
            <Route path="monitoring" element={<Monitoring />} />
            <Route path="ai" element={<AIReportingPage />} />
            <Route path="iot" element={<IoTManage />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Navigate to="/login" />} />
            <Route index element={<Navigate to="/monitoring" />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
