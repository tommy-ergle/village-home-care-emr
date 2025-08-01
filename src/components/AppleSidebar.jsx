import React from 'react';
import { 
  Home, Users, Calendar, FileText, Shield, DollarSign, 
  BarChart, Settings, HelpCircle, LogOut, Cpu, 
  Activity, Heart, Brain, Pill, ClipboardList, FileSignature
} from 'lucide-react';
import '../styles/AppleSidebar.css';

const AppleSidebar = ({ activeView, setActiveView, currentUser, onLogout }) => {
  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'patients', label: 'Patients', icon: Users, badge: 3 },
    { id: 'scheduling', label: 'Scheduling', icon: Calendar },
    { id: 'clinical', label: 'Clinical', icon: FileText },
    { id: 'careplans', label: 'Care Plans', icon: Shield },
    { id: 'revenue', label: 'Revenue Cycle', icon: DollarSign },
    { id: 'analytics', label: 'Analytics', icon: BarChart }
  ];

  // Clinical nav items removed - now handled by Clinical Dashboard

  const bottomNavItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help & Support', icon: HelpCircle }
  ];

  const NavItem = ({ item, section = 'main' }) => {
    const Icon = item.icon;
    const isActive = activeView === item.id;

    return (
      <button
        className={`nav-item-apple ${isActive ? 'active' : ''}`}
        onClick={() => setActiveView(item.id)}
        title={item.label}
      >
        <div className="nav-icon-apple">
          <Icon size={18} />
        </div>
        <span className="nav-label-apple">{item.label}</span>
        {item.badge && (
          <span className="nav-badge-apple">{item.badge}</span>
        )}
      </button>
    );
  };

  return (
    <aside className="sidebar-apple">
      {/* Header */}
      <div className="sidebar-header-apple">
        <div className="sidebar-logo">
          <Brain size={20} />
        </div>
        <div className="sidebar-brand">
          <h3 className="brand-title">Village Care</h3>
          <p className="brand-subtitle">AI-Powered EMR</p>
        </div>
      </div>

      {/* AI Status */}
      <div className="sidebar-ai-status">
        <Cpu size={14} className="ai-status-icon" />
        <span className="ai-status-text">AI Assistant Active</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav-apple">
        {/* Main Navigation */}
        <div className="nav-section-apple">
          <h4 className="nav-section-title">Main</h4>
          {mainNavItems.map(item => (
            <NavItem key={item.id} item={item} />
          ))}
        </div>


        {/* Bottom Items */}
        <div className="nav-section-apple" style={{ marginTop: 'auto' }}>
          {bottomNavItems.map(item => (
            <NavItem key={item.id} item={item} section="bottom" />
          ))}
        </div>
      </nav>

      {/* User Section */}
      <div className="sidebar-footer-apple">
        <div className="user-section-apple">
          <div className="user-avatar-apple">
            {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="user-info-apple">
            <span className="user-name-sidebar">{currentUser?.name || 'User'}</span>
            <span className="user-role-sidebar">{currentUser?.role || 'Role'}</span>
          </div>
        </div>
        <button
          className="nav-item-apple"
          onClick={onLogout}
          style={{ marginTop: '0.5rem' }}
          title="Logout"
        >
          <div className="nav-icon-apple">
            <LogOut size={18} />
          </div>
          <span className="nav-label-apple">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AppleSidebar;