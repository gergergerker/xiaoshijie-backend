import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout, ConfigProvider, theme } from 'antd';
import AdminLayout from './components/layout/AdminLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MemberPromotion from './pages/MemberPromotion';
import CityMuseum from './pages/museum/CityMuseum';
import SeasonMuseum from './pages/museum/SeasonMuseum';
import TimeSequence from './pages/citytravel/TimeSequence';
import CityCard from './pages/citytravel/CityCard';
import PKQuestions from './pages/questions/PKQuestions';
import TrainingQuestions from './pages/questions/TrainingQuestions';
import UserManagement from './pages/UserManagement';
import NotFound from './pages/NotFound';

// 强制刷新触发器 - 时间戳: 20230501

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#4CAF50',
          colorSuccess: '#4CAF50',
          colorWarning: '#FFC107',
          colorError: '#F44336',
          colorInfo: '#2196F3',
          borderRadius: 6,
        },
      }}
    >
      <div className="green-theme">
        <Layout style={{ minHeight: '100vh' }}>
          <Routes>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route
              path="/*"
              element={
                isLoggedIn ? (
                  <AdminLayout setIsLoggedIn={setIsLoggedIn}>
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/member-promotion" element={<MemberPromotion />} />
                      <Route path="/museum/city/*" element={<CityMuseum />} />
                      <Route path="/museum/season/*" element={<SeasonMuseum />} />
                      <Route path="/citytravel/carousel" element={<TimeSequence />} />
                      <Route path="/citytravel/city-card" element={<CityCard />} />
                      <Route path="/questions/pk" element={<PKQuestions />} />
                      <Route path="/questions/training" element={<TrainingQuestions />} />
                      <Route path="/user-management" element={<UserManagement />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </AdminLayout>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </Layout>
      </div>
    </ConfigProvider>
  );
};

export default App; 