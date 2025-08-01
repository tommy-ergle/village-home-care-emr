import React, { useState, useEffect } from 'react';
import './ClinicalDashboard.css';
import OasisAssessment from './OasisAssessment';
import ClinicalNotes from './ClinicalNotes';
import DocumentGenerator from './DocumentGenerator/DocumentGenerator';
import { 
  FileText, ClipboardList, FileSignature, Pill, 
  Activity, Heart, Brain, Calendar, TrendingUp,
  Clock, AlertCircle, CheckCircle, ChevronRight,
  Plus, RefreshCw, Download, MapPin, Phone,
  Stethoscope, Home, Star, ArrowRight, MessageSquare,
  User, Shield, Zap, Target, Timer, FileCheck
} from 'lucide-react';

const ClinicalDashboard = ({ patient, onNavigate }) => {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedPatient, setSelectedPatient] = useState(patient);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // User data
  const user = {
    name: 'Dr. Sarah Wilson',
    role: 'Clinical Director',
    lastLogin: '2 hours ago'
  };

  // Clinical metrics with VHC colors
  const metrics = [
    {
      label: 'Pending Assessments',
      value: 12,
      change: '3 due today',
      trend: 'urgent',
      icon: ClipboardList,
      color: '#ef4444'  // Red for urgent
    },
    {
      label: 'Documents Generated',
      value: 45,
      change: '22.5h saved',
      trend: 'up',
      icon: FileSignature,
      color: '#0335b6'  // VHC Primary
    },
    {
      label: 'Compliance Score',
      value: '95.8%',
      change: '+2.3%',
      trend: 'up',
      icon: Shield,
      color: '#10b981'  // Green for success
    },
    {
      label: 'Active Care Plans',
      value: 78,
      change: '6 expiring',
      trend: 'neutral',
      icon: Brain,
      color: '#70b3e1'  // VHC Light Blue
    }
  ];

  // Priority clinical tasks
  const priorities = [
    {
      id: 1,
      type: 'assessment',
      priority: 'urgent',
      title: 'OASIS Recertification Due',
      description: 'Sarah Johnson - 60-day recertification assessment',
      patient: 'Sarah Johnson',
      dueTime: 'Due by 5:00 PM today',
      icon: ClipboardList,
      action: 'Start Assessment'
    },
    {
      id: 2,
      type: 'documentation',
      priority: 'high',
      title: 'PT Evaluation Needed',
      description: 'New admission requires initial PT evaluation',
      patient: 'Robert Chen',
      dueTime: 'Within 48 hours',
      icon: FileSignature,
      action: 'Generate Document'
    },
    {
      id: 3,
      type: 'compliance',
      priority: 'medium',
      title: 'Physician Signature Required',
      description: '3 Plans of Care pending physician signature',
      patient: 'Multiple patients',
      dueTime: 'Complete by EOD',
      icon: FileCheck,
      action: 'Review Documents'
    }
  ];

  // Recent clinical activity
  const recentActivity = [
    {
      id: 1,
      type: 'completion',
      title: 'POC Generated',
      description: 'Plan of Care for Maria Rodriguez',
      user: 'AI Assistant',
      time: '10 minutes ago',
      icon: FileSignature,
      color: '#0335b6'  // VHC Primary
    },
    {
      id: 2,
      type: 'assessment',
      title: 'OASIS Completed',
      description: 'Start of Care - John Williams',
      user: 'Linda Martinez, RN',
      time: '45 minutes ago',
      icon: CheckCircle,
      color: '#10b981'  // Green
    },
    {
      id: 3,
      type: 'note',
      title: 'Progress Note Added',
      description: 'PT visit documentation',
      user: 'Mike Johnson, PT',
      time: '2 hours ago',
      icon: FileText,
      color: '#70b3e1'  // VHC Light Blue
    }
  ];

  // AI Clinical Recommendations
  const aiRecommendations = [
    {
      id: 1,
      type: 'documentation',
      title: 'Documentation Opportunity',
      description: '5 visits missing progress notes from yesterday',
      icon: FileText,
      color: '#0335b6',  // VHC Primary
      action: 'Complete Notes'
    },
    {
      id: 2,
      type: 'compliance',
      title: 'Compliance Alert',
      description: '2 care plans expiring this week need renewal',
      icon: AlertCircle,
      color: '#ef4444',  // Red for alerts
      action: 'Review Plans'
    },
    {
      id: 3,
      type: 'efficiency',
      title: 'Efficiency Tip',
      description: 'Use AI to generate 3 pending therapy evaluations',
      icon: Zap,
      color: '#10b981',  // Green
      action: 'Start Generation'
    }
  ];

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'urgent': return '#ef4444';
      case 'high': return '#f59e0b';
      case 'medium': return '#0335b6';
      default: return '#6b7280';
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'assessment': return { bg: 'rgba(112, 179, 225, 0.2)', color: '#0335b6' };
      case 'documentation': return { bg: '#e9d5ff', color: '#6b21a8' };
      case 'compliance': return { bg: '#fee2e2', color: '#991b1b' };
      default: return { bg: '#f3f4f6', color: '#6b7280' };
    }
  };

  const handleToolClick = (toolId) => {
    setActiveView(toolId);
  };

  const handleBack = () => {
    setActiveView('dashboard');
  };

  // Render the active view
  const renderActiveView = () => {
    switch (activeView) {
      case 'assessments':
        return (
          <OasisAssessment 
            patient={selectedPatient} 
            onBack={handleBack}
          />
        );
      
      case 'documentation':
        return (
          <DocumentGenerator 
            patientId={selectedPatient?.id}
            onClose={handleBack}
          />
        );
      
      case 'notes':
        return (
          <ClinicalNotes
            patient={selectedPatient}
            onBack={handleBack}
          />
        );
      
      case 'medications':
      case 'vitals':
      case 'care-plans':
        return (
          <div className="coming-soon-container">
            <h2>{activeView === 'medications' ? 'Medication Management' : 
                 activeView === 'vitals' ? 'Vitals Tracking' : 
                 'Care Planning'}</h2>
            <p>This feature is coming soon!</p>
            <button className="quick-action-btn primary" onClick={handleBack}>
              Back to Clinical Dashboard
            </button>
          </div>
        );
      
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => {
    return (
      <div className="clinical-dashboard">
        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-content">
            <h1 className="welcome-title">Clinical Dashboard</h1>
            <p className="welcome-subtitle">{formatDate(currentTime)} • {formatTime(currentTime)}</p>
            
            <div className="quick-stats">
              <div className="quick-stat">
                <div>
                  <div className="quick-stat-value">12</div>
                  <div className="quick-stat-label">Pending Tasks</div>
                </div>
              </div>
              <div className="quick-stat">
                <div>
                  <div className="quick-stat-value">45</div>
                  <div className="quick-stat-label">Completed Today</div>
                </div>
              </div>
              <div className="quick-stat">
                <div>
                  <div className="quick-stat-value">95.8%</div>
                  <div className="quick-stat-label">Compliance Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button 
            className="quick-action-btn primary"
            onClick={() => handleToolClick('documentation')}
          >
            <FileSignature size={16} />
            Generate Document
          </button>
          <button 
            className="quick-action-btn"
            onClick={() => handleToolClick('assessments')}
          >
            <ClipboardList size={16} />
            Start OASIS
          </button>
          <button 
            className="quick-action-btn"
            onClick={() => handleToolClick('notes')}
          >
            <FileText size={16} />
            Clinical Note
          </button>
          <button 
            className="quick-action-btn"
            onClick={() => handleToolClick('medications')}
          >
            <Pill size={16} />
            Medications
          </button>
          <button 
            className="quick-action-btn"
            onClick={() => handleToolClick('vitals')}
          >
            <Activity size={16} />
            Record Vitals
          </button>
        </div>

        {/* Key Metrics */}
        <div className="metrics-grid">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div 
                key={index} 
                className="metric-card"
                onClick={() => {
                  if (metric.label === 'Pending Assessments') {
                    handleToolClick('assessments');
                  } else if (metric.label === 'Documents Generated') {
                    handleToolClick('documentation');
                  }
                }}
                style={{ cursor: 'pointer' }}
              >
                <div 
                  className="metric-icon" 
                  style={{ backgroundColor: metric.color + '20' }}
                >
                  <Icon size={24} color={metric.color} />
                </div>
                <div className="metric-content">
                  <div className="metric-value">{metric.value}</div>
                  <div className="metric-label">{metric.label}</div>
                  <div className={`metric-change ${metric.trend === 'up' ? 'change-positive' : metric.trend === 'urgent' ? 'change-negative' : ''}`}>
                    {metric.change}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Priority Clinical Tasks */}
        <div className="priority-section">
          <div className="section-header">
            <h3 className="section-title">
              <AlertCircle size={20} />
              Priority Clinical Tasks
            </h3>
            <button className="action-secondary">
              View All
              <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="priority-grid">
            {priorities.map((priority) => {
              const Icon = priority.icon;
              const typeStyle = getTypeColor(priority.type);
              
              return (
                <div 
                  key={priority.id} 
                  className={`priority-card priority-${priority.priority}`}
                >
                  <div className="priority-header">
                    <span 
                      className="priority-type"
                      style={{ backgroundColor: typeStyle.bg, color: typeStyle.color }}
                    >
                      {priority.type}
                    </span>
                    <Icon size={16} color={getPriorityColor(priority.priority)} />
                  </div>
                  
                  <h4 className="priority-title">{priority.title}</h4>
                  <p className="priority-description">{priority.description}</p>
                  
                  <div className="priority-meta">
                    <span>{priority.patient}</span>
                    <span>•</span>
                    <span>{priority.dueTime}</span>
                  </div>
                  
                  <div className="priority-action">
                    <button 
                      className="action-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (priority.type === 'assessment') {
                          handleToolClick('assessments');
                        } else if (priority.type === 'documentation') {
                          handleToolClick('documentation');
                        }
                      }}
                    >
                      {priority.action}
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="dashboard-grid">
          {/* Clinical Tools */}
          <div className="priority-section">
            <div className="section-header">
              <h3 className="section-title">
                <Stethoscope size={20} />
                Clinical Tools
              </h3>
            </div>
            
            <div className="tools-list">
              <div 
                className="tool-item featured"
                onClick={() => handleToolClick('documentation')}
              >
                <div className="tool-icon" style={{ backgroundColor: '#0335b6' }}>
                  <FileSignature size={20} color="white" />
                </div>
                <div className="tool-content">
                  <div className="tool-header">
                    <h4>AI Documentation Generator</h4>
                    <span className="tool-badge new">NEW</span>
                  </div>
                  <p>Generate CMS-compliant documents in seconds</p>
                  <div className="tool-stats">
                    <span>45 generated</span>
                    <span>•</span>
                    <span>22.5h saved</span>
                  </div>
                </div>
              </div>

              <div 
                className="tool-item"
                onClick={() => handleToolClick('assessments')}
              >
                <div className="tool-icon" style={{ backgroundColor: '#70b3e1' }}>
                  <ClipboardList size={20} color="white" />
                </div>
                <div className="tool-content">
                  <div className="tool-header">
                    <h4>OASIS Assessments</h4>
                    <span className="tool-badge">3 Pending</span>
                  </div>
                  <p>Complete and manage OASIS assessments</p>
                </div>
              </div>

              <div 
                className="tool-item"
                onClick={() => handleToolClick('notes')}
              >
                <div className="tool-icon" style={{ backgroundColor: '#f59e0b' }}>
                  <FileText size={20} color="white" />
                </div>
                <div className="tool-content">
                  <h4>Clinical Notes</h4>
                  <p>View and create visit documentation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="priority-section">
            <div className="section-header">
              <h3 className="section-title">
                <Activity size={20} />
                Recent Clinical Activity
              </h3>
              <button className="action-secondary">
                View All
                <ChevronRight size={16} />
              </button>
            </div>
            
            <div className="activity-feed">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="activity-item">
                    <div 
                      className="activity-icon"
                      style={{ backgroundColor: activity.color + '20' }}
                    >
                      <Icon size={16} color={activity.color} />
                    </div>
                    <div className="activity-content">
                      <div className="activity-title">{activity.title}</div>
                      <div className="activity-description">{activity.description}</div>
                      <div className="activity-time">
                        {activity.user} • {activity.time}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* AI Clinical Insights */}
        <div className="priority-section ai-recommendations">
          <div className="section-header">
            <h3 className="section-title">
              <div className="ai-header">
                <Zap size={20} />
                AI Clinical Insights
                <div className="ai-badge">
                  <Brain size={14} />
                  AI Assistant
                </div>
              </div>
            </h3>
          </div>
          
          <div className="recommendation-list">
            {aiRecommendations.map((rec) => {
              const Icon = rec.icon;
              return (
                <div key={rec.id} className="recommendation-item">
                  <div 
                    className="recommendation-icon"
                    style={{ backgroundColor: rec.color + '20' }}
                  >
                    <Icon size={16} color={rec.color} />
                  </div>
                  <div className="recommendation-content">
                    <div className="recommendation-title">{rec.title}</div>
                    <div className="recommendation-text">{rec.description}</div>
                    <div 
                      className="recommendation-action"
                      onClick={() => {
                        if (rec.type === 'documentation') {
                          handleToolClick('notes');
                        } else if (rec.type === 'efficiency') {
                          handleToolClick('documentation');
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {rec.action} →
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      {renderActiveView()}
    </div>
  );
};

export default ClinicalDashboard;