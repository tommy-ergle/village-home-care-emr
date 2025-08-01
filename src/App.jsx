// src/App.jsx
import React, { useState } from 'react';
import LoginScreen from './components/auth/LoginScreen';
import Dashboard from './components/dashboard/Dashboard';
import Patients from './components/patients/Patients';
import PatientList from './components/patients/PatientList';
import SchedulingSystem from './components/scheduling/SchedulingSystem';
import OasisAssessment from './components/clinical/OasisAssessment';
import ClinicalNotes from './components/clinical/ClinicalNotes';
import AIDocumentation from './components/documentation/AIDocumentation';
import RevenueCycle from './components/revenue/RevenueCycle';
import Analytics from './components/analytics/Analytics';
import './styles/App.css';

function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPatient, setSelectedPatient] = useState(null);

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
      
      case 'oasis':
        return (
          <OasisAssessment 
            patient={selectedPatient} 
            onBack={() => setActiveTab('patients')}
          />
        );
      
      case 'clinical-notes':
        return (
          <ClinicalNotes
            patient={selectedPatient}
            onBack={() => setActiveTab('patients')}
          />
        );
      
      case 'documentation':
        return <AIDocumentation />;
      
      case 'revenue':
        return <RevenueCycle />;
      
      case 'analytics':
        return <Analytics />;
      
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
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Top Header Bar */}
      <header style={{
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1000
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <h2 style={{ fontSize: '20px', color: '#111827', margin: 0 }}>
            🏥 Village Home Care
          </h2>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>
            EMR System
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Notification Bell */}
          <button
            style={{
              padding: '8px',
              background: 'transparent',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            🔔
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: '#ef4444',
              color: 'white',
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              3
            </span>
          </button>

          {/* User Profile */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            padding: '8px 16px',
            background: '#f9fafb',
            borderRadius: '8px'
          }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '14px', color: '#111827', fontWeight: '500', margin: 0 }}>
                {user.name}
              </p>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                {user.role || 'Healthcare Provider'}
              </p>
            </div>
            <span style={{ fontSize: '24px' }}>👤</span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              background: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.background = '#b91c1c'}
            onMouseLeave={(e) => e.target.style.background = '#dc2626'}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <div style={{
          width: '256px',
          backgroundColor: 'white',
          boxShadow: '1px 0 3px rgba(0, 0, 0, 0.1)',
          paddingTop: '24px'
        }}>
          <nav>
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '📊' },
              { id: 'patients', label: 'Patients', icon: '👥' },
              { id: 'scheduling', label: 'Scheduling', icon: '📅' },
              { id: 'oasis', label: 'OASIS Assessment', icon: '📋' },
              { id: 'clinical-notes', label: 'Clinical Notes', icon: '📝' },
              { id: 'documentation', label: 'AI Documentation', icon: '🤖' },
              { id: 'revenue', label: 'Revenue Cycle', icon: '💰' },
              { id: 'analytics', label: 'Analytics', icon: '📈' },
              { id: 'settings', label: 'Settings', icon: '⚙️' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  width: '100%',
                  padding: '12px 24px',
                  border: 'none',
                  background: activeTab === item.id ? '#eff6ff' : 'transparent',
                  color: activeTab === item.id ? '#2563eb' : '#4b5563',
                  fontWeight: activeTab === item.id ? '500' : 'normal',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '14px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== item.id) {
                    e.target.style.background = '#f9fafb';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== item.id) {
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Page Header */}
          <div style={{
            backgroundColor: 'white',
            padding: '16px 24px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h1 style={{ margin: 0, fontSize: '24px', color: '#111827' }}>
              {activeTab.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </h1>
            
            {/* Quick Actions */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {activeTab === 'patients' && (
                <button
                  onClick={() => handleNavigation('patients', 'add-patient')}
                  style={{
                    padding: '8px 16px',
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span>+</span> Add Patient
                </button>
              )}
            </div>
          </div>

          {/* Page Content */}
          <main style={{ flex: 1, overflow: 'auto' }}>
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;