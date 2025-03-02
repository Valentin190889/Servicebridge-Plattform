import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { Login } from './pages/auth/Login';
import { DashboardLayout } from './layouts/DashboardLayout';
import { AiCo } from './pages/AiCo';
import { News } from './pages/News';
import { Community } from './pages/Community';
import { KnowledgeHub } from './pages/knowledge/KnowledgeHub';
import { Experts } from './pages/Experts';
import { Workspace } from './pages/Workspace';
import { Support } from './pages/Support';
import { Challenges } from './pages/Challenges';
import { Settings } from './pages/Settings';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/aico" replace /> : <Login />
          } 
        />
        
        {/* Protected routes */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <DashboardLayout>
                <Outlet />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<Navigate to="/aico" replace />} />
          <Route path="aico" element={<AiCo />} />
          <Route path="challenges" element={<Challenges />} />
          <Route path="news" element={<News />} />
          <Route path="community" element={<Community />} />
          <Route path="knowledge" element={<KnowledgeHub />} />
          <Route path="experts" element={<Experts />} />
          <Route path="workspace" element={<Workspace />} />
          <Route path="support" element={<Support />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;