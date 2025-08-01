import React, { useState } from 'react';
import './ClinicalDashboard.css';
import OasisAssessment from './OasisAssessment';
import ClinicalNotes from './ClinicalNotes';
import DocumentGenerator from './DocumentGenerator/DocumentGenerator';
import { 
  FileText, ClipboardList, FileSignature, Pill, 
  Activity, Heart, Brain, Calendar, TrendingUp,
  Clock, AlertCircle, CheckCircle
} from 'lucide-react';

const ClinicalDashboard = ({ patient, onNavigate }) => {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedPatient, setSelectedPatient] = useState(patient);

  // Clinical tools configuration
  const clinicalTools = [
    {
      id: 'assessments',
      title: 'OASIS Assessments',
      description: 'Complete and manage OASIS assessments',
      icon: ClipboardList,
      color: '#4CAF50',
      stats: { pending: 3, completed: 12 },
      badge: '3 Pending'
    },
    {
      id: 'documentation',
      title: 'AI Documentation',
      description: 'Generate CMS-compliant documents with AI',
      icon: FileSignature,
      color: '#2196F3',
      stats: { generated: 45, time_saved: '22.5 hrs' },
      badge: 'NEW',
      featured: true
    },
    {
      id: 'notes',
      title: 'Clinical Notes',
      description: 'View and create clinical visit notes',
      icon: FileText,
      color: '#FF9800',
      stats: { today: 8, week: 42 }
    },
    {
      id: 'medications',
      title: 'Medication Management',
      description: 'Track and manage patient medications',
      icon: Pill,
      color: '#9C27B0',
      stats: { active: 156, alerts: 4 },
      badge: '4 Alerts'
    },
    {
      id: 'vitals',
      title: 'Vitals Tracking',
      description: 'Monitor patient vital signs',
      icon: Activity,
      color: '#F44336',
      stats: { abnormal: 2, normal: 18 }
    },
    {
      id: 'care-plans',
      title: 'Care Planning',
      description: 'AI-powered care plan generation',
      icon: Brain,
      color: '#00BCD4',
      stats: { active: 24, due: 6 }
    }
  ];

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'assessment',
      patient: 'John Doe',
      action: 'OASIS Start of Care completed',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'document',
      patient: 'Jane Smith',
      action: 'PT Evaluation generated',
      time: '3 hours ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'alert',
      patient: 'Robert Johnson',
      action: 'Medication interaction alert',
      time: '4 hours ago',
      status: 'alert'
    },
    {
      id: 4,
      type: 'note',
      patient: 'Mary Williams',
      action: 'Progress note added',
      time: '5 hours ago',
      status: 'completed'
    }
  ];

  // Pending tasks
  const pendingTasks = [
    {
      id: 1,
      task: 'Complete OASIS assessment',
      patient: 'Michael Brown',
      due: 'Today',
      priority: 'high'
    },
    {
      id: 2,
      task: 'Generate Plan of Care',
      patient: 'Sarah Davis',
      due: 'Tomorrow',
      priority: 'medium'
    },
    {
      id: 3,
      task: 'Review therapy evaluation',
      patient: 'James Wilson',
      due: 'In 2 days',
      priority: 'low'
    }
  ];

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
            <h2>{clinicalTools.find(t => t.id === activeView)?.title}</h2>
            <p>This feature is coming soon!</p>
            <button className="btn-primary" onClick={handleBack}>
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
        <div className="dashboard-header">
          <div className="header-content">
            <h1>Clinical Dashboard</h1>
            <p>Access all clinical tools and documentation in one place</p>
          </div>
          <div className="header-actions">
            <button className="btn-secondary">
              <Calendar size={18} />
              <span>Today's Schedule</span>
            </button>
            <button className="btn-primary">
              <FileSignature size={18} />
              <span>Quick Document</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="quick-stats">
          <div className="stat-card">
            <div className="stat-icon pending">
              <Clock size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-value">12</div>
              <div className="stat-label">Pending Tasks</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon completed">
              <CheckCircle size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-value">45</div>
              <div className="stat-label">Completed Today</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon alerts">
              <AlertCircle size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-value">4</div>
              <div className="stat-label">Active Alerts</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon trending">
              <TrendingUp size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-value">22.5h</div>
              <div className="stat-label">Time Saved</div>
            </div>
          </div>
        </div>

        {/* Clinical Tools Grid */}
        <div className="tools-section">
          <h2>Clinical Tools</h2>
          <div className="tools-grid">
            {clinicalTools.map(tool => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.id}
                  className={`tool-card ${tool.featured ? 'featured' : ''}`}
                  onClick={() => handleToolClick(tool.id)}
                  style={{ '--tool-color': tool.color }}
                >
                  <div className="tool-header">
                    <div className="tool-icon" style={{ backgroundColor: tool.color }}>
                      <Icon size={28} />
                    </div>
                    {tool.badge && (
                      <span className={`tool-badge ${tool.badge === 'NEW' ? 'new' : ''}`}>
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <h3>{tool.title}</h3>
                  <p>{tool.description}</p>
                  {tool.stats && (
                    <div className="tool-stats">
                      {Object.entries(tool.stats).map(([key, value]) => (
                        <div key={key} className="stat">
                          <span className="stat-value">{value}</span>
                          <span className="stat-key">{key.replace('_', ' ')}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="dashboard-grid">
          {/* Recent Activities */}
          <div className="activity-section">
            <div className="section-header">
              <h2>Recent Activities</h2>
              <button className="btn-link">View All</button>
            </div>
            <div className="activity-list">
              {recentActivities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className={`activity-icon ${activity.status}`}>
                    {activity.status === 'completed' ? 
                      <CheckCircle size={16} /> : 
                      <AlertCircle size={16} />
                    }
                  </div>
                  <div className="activity-content">
                    <div className="activity-patient">{activity.patient}</div>
                    <div className="activity-action">{activity.action}</div>
                  </div>
                  <div className="activity-time">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="tasks-section">
            <div className="section-header">
              <h2>Pending Tasks</h2>
              <button className="btn-link">Manage Tasks</button>
            </div>
            <div className="tasks-list">
              {pendingTasks.map(task => (
                <div key={task.id} className="task-item">
                  <div className={`task-priority ${task.priority}`}></div>
                  <div className="task-content">
                    <div className="task-name">{task.task}</div>
                    <div className="task-patient">{task.patient}</div>
                  </div>
                  <div className="task-due">{task.due}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Assistant Card */}
        <div className="ai-assistant-card">
          <div className="ai-icon">
            <Brain size={32} />
          </div>
          <div className="ai-content">
            <h3>AI Clinical Assistant</h3>
            <p>Your AI assistant has helped generate 45 documents this week, saving approximately 22.5 hours of documentation time.</p>
            <div className="ai-suggestions">
              <h4>Suggestions:</h4>
              <ul>
                <li>3 patients are due for OASIS recertification this week</li>
                <li>2 Plans of Care need physician signatures</li>
                <li>Consider generating therapy evaluations for new admissions</li>
              </ul>
            </div>
          </div>
          <button className="btn-primary">
            View AI Insights
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="clinical-container">
      {renderActiveView()}
    </div>
  );
};

export default ClinicalDashboard;