import React, { useState, useEffect } from 'react';
import { 
  Users, User, Clock, Calendar, AlertCircle, CheckCircle,
  FileText, Brain, DollarSign, Activity, Bell,
  TrendingUp, Target, Heart, Shield, Zap,
  ChevronRight, Plus, RefreshCw, Download,
  MapPin, Phone, Stethoscope, ClipboardList,
  Home, Star, ArrowRight, MessageSquare
} from 'lucide-react';
import '../../styles/components/Dashboard.css';

const Dashboard = ({ onNavigate }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedPriority, setSelectedPriority] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // User data
  const user = {
    name: 'Dr. Sarah Wilson',
    role: 'Administrator',
    lastLogin: '2 hours ago'
  };

  // Priority tasks and alerts
  const priorities = [
    {
      id: 1,
      type: 'assessment',
      priority: 'urgent',
      title: 'OASIS Assessment Due',
      description: 'Sarah Johnson - Recertification OASIS due today',
      patient: 'Sarah Johnson',
      dueTime: 'Due by 5:00 PM',
      icon: ClipboardList,
      action: 'Start Assessment'
    },
    {
      id: 2,
      type: 'alert',
      priority: 'high',
      title: 'Readmission Risk Alert',
      description: 'Robert Chen showing indicators of potential readmission',
      patient: 'Robert Chen',
      dueTime: 'Immediate attention needed',
      icon: AlertCircle,
      action: 'Review Risk'
    },
    {
      id: 3,
      type: 'visit',
      priority: 'medium',
      title: 'Missed Visit Follow-up',
      description: 'Maria Rodriguez - PT visit needs rescheduling',
      patient: 'Maria Rodriguez',
      dueTime: 'Contact by 2:00 PM',
      icon: Calendar,
      action: 'Reschedule'
    },
    {
      id: 4,
      type: 'documentation',
      priority: 'medium',
      title: 'Pending Documentation',
      description: '3 visit notes pending completion from yesterday',
      patient: 'Multiple patients',
      dueTime: 'Complete by EOD',
      icon: FileText,
      action: 'Complete Notes'
    }
  ];

  // Today's schedule
  const todaySchedule = [
    {
      id: 1,
      time: '9:00 AM',
      patient: 'Sarah Johnson',
      type: 'Skilled Nursing',
      address: '123 Oak Street',
      status: 'completed',
      clinician: 'Linda Martinez, RN'
    },
    {
      id: 2,
      time: '10:30 AM',
      patient: 'John Williams',
      type: 'Physical Therapy',
      address: '456 Elm Avenue',
      status: 'completed',
      clinician: 'Mike Johnson, PT'
    },
    {
      id: 3,
      time: '2:00 PM',
      patient: 'Robert Chen',
      type: 'Skilled Nursing',
      address: '789 Pine Road',
      status: 'current',
      clinician: 'Linda Martinez, RN'
    },
    {
      id: 4,
      time: '3:30 PM',
      patient: 'Maria Rodriguez',
      type: 'Occupational Therapy',
      address: '321 Maple Drive',
      status: 'upcoming',
      clinician: 'Emma Davis, OT'
    },
    {
      id: 5,
      time: '4:45 PM',
      patient: 'David Brown',
      type: 'Speech Therapy',
      address: '654 Cedar Lane',
      status: 'upcoming',
      clinician: 'John Smith, SLP'
    }
  ];

  // Key metrics - UPDATED WITH VHC COLORS
  const metrics = [
    {
      label: 'Active Patients',
      value: 156,
      change: '+12',
      trend: 'up',
      icon: Users,
      color: '#0335b6'  // VHC Primary
    },
    {
      label: "Today's Visits",
      value: 12,
      change: '8 completed',
      trend: 'neutral',
      icon: Calendar,
      color: '#10b981'  // Keep green for success
    },
    {
      label: 'Pending Claims',
      value: 23,
      change: '$42.8K',
      trend: 'neutral',
      icon: DollarSign,
      color: '#70b3e1'  // VHC Light Blue
    },
    {
      label: 'Compliance Score',
      value: '98.4%',
      change: '+2.1%',
      trend: 'up',
      icon: Shield,
      color: '#10b981'  // Keep green for success
    }
  ];

  // Recent activity - UPDATED WITH VHC COLORS
  const recentActivity = [
    {
      id: 1,
      type: 'completion',
      title: 'OASIS Assessment Completed',
      description: 'Sarah Johnson - Start of Care assessment',
      user: 'Linda Martinez, RN',
      time: '15 minutes ago',
      icon: CheckCircle,
      color: '#10b981'  // Keep green for success
    },
    {
      id: 2,
      type: 'claim',
      title: 'Claim Submitted',
      description: 'CLM-2025-045 - $3,256.00 to Medicare',
      user: 'System',
      time: '1 hour ago',
      icon: DollarSign,
      color: '#70b3e1'  // VHC Light Blue
    },
    {
      id: 3,
      type: 'alert',
      title: 'Insurance Verified',
      description: 'Robert Chen - Medicare A coverage confirmed',
      user: 'Billing Team',
      time: '2 hours ago',
      icon: Shield,
      color: '#0335b6'  // VHC Primary
    },
    {
      id: 4,
      type: 'note',
      title: 'Clinical Note Added',
      description: 'Maria Rodriguez - PT progress note',
      user: 'Mike Johnson, PT',
      time: '3 hours ago',
      icon: FileText,
      color: '#f59e0b'  // Keep orange for warning
    }
  ];

  // AI Recommendations - UPDATED WITH VHC COLORS
  const aiRecommendations = [
    {
      id: 1,
      type: 'optimization',
      title: 'Route Optimization Available',
      description: 'Reordering today\'s remaining visits could save 45 minutes of travel time',
      icon: Target,
      color: '#0335b6',  // VHC Primary
      action: 'Optimize Routes'
    },
    {
      id: 2,
      type: 'risk',
      title: 'High Risk Patients',
      description: '3 patients showing early readmission indicators need intervention',
      icon: AlertCircle,
      color: '#ef4444',  // Keep red for alerts
      action: 'View Patients'
    },
    {
      id: 3,
      type: 'revenue',
      title: 'Billing Opportunity',
      description: 'Potential $12K additional revenue through care plan adjustments',
      icon: TrendingUp,
      color: '#10b981',  // Keep green for success
      action: 'Review Details'
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

  // UPDATED PRIORITY COLORS WITH VHC BRANDING
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'urgent': return '#ef4444';     // Keep red for urgent
      case 'high': return '#f59e0b';       // Keep orange for high
      case 'medium': return '#0335b6';     // VHC Primary for medium
      default: return '#6b7280';
    }
  };

  // UPDATED TYPE COLORS WITH VHC BRANDING
  const getTypeColor = (type) => {
    switch(type) {
      case 'assessment': return { bg: 'rgba(112, 179, 225, 0.2)', color: '#0335b6' };  // VHC Light Blue bg, Primary text
      case 'visit': return { bg: '#d1fae5', color: '#065f46' };  // Keep green
      case 'documentation': return { bg: '#e9d5ff', color: '#6b21a8' };  // Keep purple
      case 'alert': return { bg: '#fee2e2', color: '#991b1b' };  // Keep red
      default: return { bg: '#f3f4f6', color: '#6b7280' };
    }
  };

  return (
    <div className="dashboard-container">
      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="welcome-content">
          <h1 className="welcome-title">Good {currentTime.getHours() < 12 ? 'Morning' : currentTime.getHours() < 17 ? 'Afternoon' : 'Evening'}, {user.name}!</h1>
          <p className="welcome-subtitle">{formatDate(currentTime)} • {formatTime(currentTime)}</p>
          
          <div className="quick-stats">
            <div className="quick-stat">
              <div>
                <div className="quick-stat-value">8</div>
                <div className="quick-stat-label">Tasks Today</div>
              </div>
            </div>
            <div className="quick-stat">
              <div>
                <div className="quick-stat-value">4</div>
                <div className="quick-stat-label">Visits Remaining</div>
              </div>
            </div>
            <div className="quick-stat">
              <div>
                <div className="quick-stat-value">2</div>
                <div className="quick-stat-label">Urgent Items</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button 
          className="quick-action-btn primary"
          onClick={() => onNavigate('patients', 'new')}
        >
          <Plus size={16} />
          New Patient
        </button>
        <button 
          className="quick-action-btn"
          onClick={() => onNavigate('scheduling', 'new')}
        >
          <Calendar size={16} />
          Schedule Visit
        </button>
        <button 
          className="quick-action-btn"
          onClick={() => onNavigate('documentation', 'oasis')}
        >
          <FileText size={16} />
          Start OASIS
        </button>
        <button 
          className="quick-action-btn"
          onClick={() => onNavigate('documentation', 'ai-assistant')}
        >
          <Brain size={16} />
          AI Assistant
        </button>
        <button 
          className="quick-action-btn"
          onClick={() => onNavigate('revenue', 'new-claim')}
        >
          <DollarSign size={16} />
          Submit Claim
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
                if (metric.label === 'Active Patients') {
                  onNavigate('patients');
                } else if (metric.label === "Today's Visits") {
                  onNavigate('scheduling');
                } else if (metric.label === 'Pending Claims') {
                  onNavigate('revenue', 'pending');
                } else if (metric.label === 'Compliance Score') {
                  onNavigate('analytics', 'compliance');
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
                <div className={`metric-change ${metric.trend === 'up' ? 'change-positive' : metric.trend === 'down' ? 'change-negative' : ''}`}>
                  {metric.change}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Priority Actions & Alerts */}
      <div className="priority-section">
        <div className="section-header">
          <h3 className="section-title">
            <AlertCircle size={20} />
            Priority Actions & Alerts
          </h3>
          <button 
            className="action-secondary"
            onClick={() => onNavigate('patients', 'alerts')}
          >
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
                onClick={() => setSelectedPriority(priority)}
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
                        onNavigate('documentation', 'oasis', { patient: priority.patient });
                      } else if (priority.type === 'visit') {
                        onNavigate('scheduling', 'reschedule', { patient: priority.patient });
                      } else if (priority.type === 'documentation') {
                        onNavigate('documentation', 'pending');
                      } else if (priority.type === 'alert') {
                        onNavigate('patients', 'view', { patient: priority.patient });
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
        {/* Today's Schedule */}
        <div className="priority-section">
          <div className="section-header">
            <h3 className="section-title">
              <Calendar size={20} />
              Today's Schedule
            </h3>
            <button 
              className="action-secondary"
              onClick={() => onNavigate('scheduling')}
            >
              Full Calendar
              <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="schedule-timeline">
            <div className="timeline-line"></div>
            {todaySchedule.map((item) => (
              <div key={item.id} className="timeline-item">
                <div className={`timeline-dot ${item.status}`}></div>
                <div className="timeline-time">{item.time}</div>
                <div className={`timeline-content ${item.status === 'current' ? 'current' : ''}`}>
                  <div className="timeline-patient">{item.patient}</div>
                  <div className="timeline-details">
                    <span>{item.type}</span>
                    <span>•</span>
                    <MapPin size={12} />
                    <span>{item.address}</span>
                  </div>
                  <div className="timeline-details" style={{ marginTop: '4px' }}>
                    <User size={12} />
                    <span>{item.clinician}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="priority-section">
          <div className="section-header">
            <h3 className="section-title">
              <Activity size={20} />
              Recent Activity
            </h3>
            <button 
              className="action-secondary"
              onClick={() => onNavigate('analytics', 'activity')}
            >
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

      {/* AI Recommendations */}
      <div className="priority-section ai-recommendations">
        <div className="section-header">
          <h3 className="section-title">
            <div className="ai-header">
              <Zap size={20} />
              AI-Powered Recommendations
              <div className="ai-badge">
                <Brain size={14} />
                AI Insights
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
                      if (rec.type === 'optimization') {
                        onNavigate('scheduling', 'optimize');
                      } else if (rec.type === 'risk') {
                        onNavigate('patients', 'high-risk');
                      } else if (rec.type === 'revenue') {
                        onNavigate('revenue', 'opportunities');
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

export default Dashboard;