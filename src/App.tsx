/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

// Components
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

// Pages
import AdminDashboard from './pages/admin/Dashboard';
import SuperAdminDashboard from './pages/superadmin/Dashboard';
import Monitoring from './pages/admin/Monitoring';
import Attendance from './pages/admin/Attendance';
import Alerts from './pages/admin/Alerts';
import UserManagement from './pages/admin/UserManagement';
import Settings from './pages/Settings';
import Login from './pages/Login';
import AdminsManagement from './pages/superadmin/AdminsManagement';
import GlobalAnalytics from './pages/superadmin/GlobalAnalytics';
import UserDashboard from './pages/user/Dashboard';
import MyAttendance from './pages/user/Attendance';
import UserProfile from './pages/user/Profile';
import UserNotifications from './pages/user/Notifications';

const Layout = ({ children, userRole, onLogout, onRoleChange }: { 
  children: ReactNode, 
  userRole: 'admin' | 'super_admin' | 'user',
  onLogout: () => void,
  onRoleChange: (role: 'user' | 'admin' | 'super_admin') => void
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  if (location.pathname === '/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-surface-base text-slate-200 font-sans selection:bg-primary/30 selection:text-primary">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="flex relative z-10">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} userRole={userRole} />
        
        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'pl-64' : 'pl-20'}`}>
          <Navbar onLogout={onLogout} userRole={userRole} onRoleChange={onRoleChange} />
          <div className="p-4 lg:p-8 pt-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'super_admin' | 'user'>('admin');

  useEffect(() => {
    const auth = localStorage.getItem('vg_auth');
    const role = localStorage.getItem('vg_role') as 'admin' | 'super_admin' | 'user';
    if (auth === 'true') {
      setIsAuthenticated(true);
      if (role) setUserRole(role);
    }
  }, []);

  const handleLogin = (role: 'admin' | 'super_admin' | 'user') => {
    localStorage.setItem('vg_auth', 'true');
    localStorage.setItem('vg_role', role);
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Layout userRole={userRole} onLogout={handleLogout} onRoleChange={handleLogin}>
        <Routes>
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} 
          />
          <Route 
            path="/" 
            element={
              isAuthenticated 
                ? (userRole === 'user' ? <Navigate to="/user-dashboard" /> : (userRole === 'super_admin' ? <Navigate to="/super-admin-dashboard" /> : <Navigate to="/admin-dashboard" />)) 
                : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/admin-dashboard" 
            element={isAuthenticated && userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} 
          />
          <Route 
            path="/super-admin-dashboard" 
            element={isAuthenticated && userRole === 'super_admin' ? <SuperAdminDashboard /> : <Navigate to="/" />} 
          />
          <Route 
            path="/user-dashboard" 
            element={isAuthenticated && userRole === 'user' ? <UserDashboard /> : <Navigate to="/" />} 
          />
          <Route 
            path="/my-attendance" 
            element={isAuthenticated && userRole === 'user' ? <MyAttendance /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/profile" 
            element={isAuthenticated && userRole === 'user' ? <UserProfile /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/notifications" 
            element={isAuthenticated && userRole === 'user' ? <UserNotifications /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/monitoring" 
            element={isAuthenticated && userRole !== 'user' ? <Monitoring /> : <Navigate to="/" />} 
          />
          <Route 
            path="/attendance" 
            element={isAuthenticated && userRole !== 'user' ? <Attendance /> : <Navigate to="/" />} 
          />
          <Route 
            path="/alerts" 
            element={isAuthenticated && userRole !== 'user' ? <Alerts /> : <Navigate to="/" />} 
          />
          <Route 
            path="/users" 
            element={isAuthenticated && userRole !== 'user' ? <UserManagement /> : <Navigate to="/" />} 
          />
          <Route 
            path="/settings" 
            element={isAuthenticated ? <Settings userRole={userRole} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/admins" 
            element={isAuthenticated && userRole === 'super_admin' ? <AdminsManagement /> : <Navigate to="/" />} 
          />
          <Route 
            path="/analytics" 
            element={isAuthenticated && userRole === 'super_admin' ? <GlobalAnalytics /> : <Navigate to="/" />} 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}
