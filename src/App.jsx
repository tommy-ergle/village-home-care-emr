// src/App.jsx
import React, { useState } from 'react';
import LoginScreen from './components/auth/LoginScreen';
import Dashboard from './components/dashboard/Dashboard';
import Patients from './components/patients/Patients';
import PatientList from './components/patients/PatientList';
import SchedulingSystem from './components/scheduling/SchedulingSystem';
import ClinicalDashboard from './components/clinical/ClinicalDashboard';
import AIDocumentation from './components/documentation/AIDocumentation';
import RevenueCycle from './components/revenue/RevenueCycle';
import Analytics from './components/analytics/Analytics';
import AICarePlans from './components/careplans/AICarePlans';
import AppleSidebar from './components/AppleSidebar';
import './styles/App.css';
import './styles/AppleSidebar.css';
import './styles/AIHealthcareEMR.css';

function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPatient, setSelectedPatient] = useState(null);
  
  // Map AppleSidebar view names to App.jsx tab names
  const handleViewChange = (view) => {
    const viewMapping = {
      'dashboard': 'dashboard',
      'patients': 'patients',
      'scheduling': 'scheduling',
      'clinical': 'clinical-notes',
      'assessments': 'oasis',
      'careplans': 'careplans',
      'revenue': 'revenue',
      'analytics': 'analytics',
      'settings': 'settings'
    };
    setActiveTab(viewMapping[view] || view);
  };
  
  // Reverse mapping for activeView prop
  const getActiveView = () => {
    const reverseMapping = {
      'dashboard': 'dashboard',
      'patients': 'patients',
      'scheduling': 'scheduling',
      'clinical-notes': 'clinical',
      'oasis': 'assessments',
      'careplans': 'careplans',
      'revenue': 'revenue',
      'analytics': 'analytics',
      'settings': 'settings'
    };
    return reverseMapping[activeTab] || activeTab;
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
    setSelectedPatient(null);
  };

  const handleNavigation = (tab, action, data) => {
    setActiveTab(tab);
    
    if (data?.patient) {
      setSelectedPatient(data.patient);
    }
    
    if (action || data) {
      const navigationContext = {
        action: action || null,
        data: data || null,
        timestamp: new Date().toISOString()
      };
      
      sessionStorage.setItem('navigationContext', JSON.stringify(navigationContext));
      console.log(`Navigating to ${tab} with action: ${action}`, data);
    } else {
      sessionStorage.removeItem('navigationContext');
    }
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigation} />;
      
      case 'patients':
        return <Patients onNavigate={handleNavigation} />;
      
      case 'scheduling':
        return <SchedulingSystem />;
      
      case 'clinical':
      case 'oasis':
      case 'clinical-notes':
      case 'documentation':
      case 'assessments':
      case 'medications':
      case 'vitals':
      case 'diagnoses':
        return (
          <ClinicalDashboard 
            patient={selectedPatient}
            onNavigate={handleNavigation}
          />
        );
      
      case 'revenue':
        return <RevenueCycle />;
      
      case 'analytics':
        return <Analytics />;
      
      case 'careplans':
        return <AICarePlans />;
      
      case 'settings':
        return (
          <div style={{ padding: '24px' }}>
            <h2>Settings - Coming Soon!</h2>
          </div>
        );
      
      default:
        return (
          <div style={{ padding: '24px' }}>
            <h2>{activeTab} - Coming Soon!</h2>
          </div>
        );
    }
  };

  return (
    <div className="ai-healthcare-emr apple-design">

      {/* Main Layout */}
      <div className="emr-layout-apple">
        {/* Apple-style Sidebar */}
        <AppleSidebar 
          activeView={getActiveView()} 
          setActiveView={handleViewChange}
          currentUser={user}
          onLogout={handleLogout}
        />

        {/* Main Content */}
        <main className="main-content-apple">
          {/* Page Content */}
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;