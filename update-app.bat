@echo off
(
echo import React, { useState } from 'react';
echo import LoginScreen from './components/auth/LoginScreen';
echo import PatientList from './components/patients/PatientList';
echo.
echo function App(^) {
echo   const [user, setUser] = useState(null^);
echo   const [activeTab, setActiveTab] = useState('dashboard'^);
echo.
echo   const handleLogin = (userData^) =^> {
echo     setUser(userData^);
echo   };
echo.
echo   const handleLogout = (^) =^> {
echo     setUser(null^);
echo   };
echo.
echo   if (!user^) {
echo     return ^<LoginScreen onLogin={handleLogin} /^>;
echo   }
echo.
echo   const renderContent = (^) =^> {
echo     switch (activeTab^) {
echo       case 'dashboard':
echo         return (
echo           ^<div style={{ padding: '24px' }}^>
echo             ^<h2^>Dashboard^</h2^>
echo             ^<div style={{
echo               display: 'grid',
echo               gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr^)^)',
echo               gap: '16px',
echo               marginTop: '24px'
echo             }}^>
echo               ^<div style={{
echo                 padding: '16px',
echo                 backgroundColor: '#dbeafe',
echo                 borderRadius: '8px'
echo               }}^>
echo                 ^<h3^>Active Patients^</h3^>
echo                 ^<p style={{ fontSize: '24px', fontWeight: 'bold' }}^>156^</p^>
echo               ^</div^>
echo               ^<div style={{
echo                 padding: '16px',
echo                 backgroundColor: '#d1fae5',
echo                 borderRadius: '8px'
echo               }}^>
echo                 ^<h3^>Today's Visits^</h3^>
echo                 ^<p style={{ fontSize: '24px', fontWeight: 'bold' }}^>12^</p^>
echo               ^</div^>
echo               ^<div style={{
echo                 padding: '16px',
echo                 backgroundColor: '#e9d5ff',
echo                 borderRadius: '8px'
echo               }}^>
echo                 ^<h3^>Revenue This Month^</h3^>
echo                 ^<p style={{ fontSize: '24px', fontWeight: 'bold' }}^>$284K^</p^>
echo               ^</div^>
echo             ^</div^>
echo           ^</div^>
echo         ^);
echo       case 'patients':
echo         return ^<PatientList /^>;
echo       default:
echo         return ^<div style={{ padding: '24px' }}^>^<h2^>{activeTab} - Coming Soon!^</h2^>^</div^>;
echo     }
echo   };
echo.
echo   return (
echo     ^<div style={{ 
echo       minHeight: '100vh',
echo       backgroundColor: '#f3f4f6',
echo       display: 'flex'
echo     }}^>
echo       {/* Sidebar */}
echo       ^<div style={{
echo         width: '256px',
echo         backgroundColor: 'white',
echo         boxShadow: '1px 0 3px rgba(0, 0, 0, 0.1^)',
echo         paddingTop: '24px'
echo       }}^>
echo         ^<div style={{ padding: '0 24px', marginBottom: '32px' }}^>
echo           ^<h2 style={{ fontSize: '20px', color: '#111827', margin: 0 }}^>
echo             Village Home Care
echo           ^</h2^>
echo           ^<p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}^>
echo             EMR System
echo           ^</p^>
echo         ^</div^>
echo         
echo         ^<nav^>
echo           {[
echo             { id: 'dashboard', label: 'Dashboard', icon: '📊' },
echo             { id: 'patients', label: 'Patients', icon: '👥' },
echo             { id: 'scheduling', label: 'Scheduling', icon: '📅' },
echo             { id: 'documentation', label: 'AI Documentation', icon: '📄' },
echo             { id: 'revenue', label: 'Revenue Cycle', icon: '💰' },
echo             { id: 'analytics', label: 'Analytics', icon: '📈' },
echo             { id: 'settings', label: 'Settings', icon: '⚙️' }
echo           ].map((item^) =^> (
echo             ^<button
echo               key={item.id}
echo               onClick={(^) =^> setActiveTab(item.id^)}
echo               style={{
echo                 width: '100%%',
echo                 padding: '12px 24px',
echo                 border: 'none',
echo                 background: activeTab === item.id ? '#eff6ff' : 'transparent',
echo                 color: activeTab === item.id ? '#2563eb' : '#4b5563',
echo                 fontWeight: activeTab === item.id ? '500' : 'normal',
echo                 textAlign: 'left',
echo                 cursor: 'pointer',
echo                 display: 'flex',
echo                 alignItems: 'center',
echo                 gap: '12px',
echo                 fontSize: '14px'
echo               }}
echo             ^>
echo               ^<span^>{item.icon}^</span^>
echo               {item.label}
echo             ^</button^>
echo           ^)^)}
echo         ^</nav^>
echo       ^</div^>
echo.
echo       {/* Main Content */}
echo       ^<div style={{ flex: 1 }}^>
echo         {/* Header */}
echo         ^<header style={{
echo           backgroundColor: 'white',
echo           padding: '16px 24px',
echo           boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1^)',
echo           display: 'flex',
echo           justifyContent: 'space-between',
echo           alignItems: 'center'
echo         }}^>
echo           ^<h1 style={{ margin: 0, fontSize: '24px', color: '#111827' }}^>
echo             {activeTab.charAt(0^).toUpperCase(^) + activeTab.slice(1^)}
echo           ^</h1^>
echo           ^<div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}^>
echo             ^<span^>Welcome, {user.name}^</span^>
echo             ^<button
echo               onClick={handleLogout}
echo               style={{
echo                 padding: '8px 16px',
echo                 background: '#dc2626',
echo                 color: 'white',
echo                 border: 'none',
echo                 borderRadius: '6px',
echo                 cursor: 'pointer'
echo               }}
echo             ^>
echo               Logout
echo             ^</button^>
echo           ^</div^>
echo         ^</header^>
echo         
echo         {/* Page Content */}
echo         {renderContent(^)}
echo       ^</div^>
echo     ^</div^>
echo   ^);
echo }
echo.
echo export default App;
) > src\App.js
echo App.js updated successfully!