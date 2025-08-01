import React, { useState } from 'react';
import {
  Brain, Target, Calendar, Clock, AlertTriangle, CheckCircle,
  TrendingUp, Heart, Activity, Pill, Users, FileText,
  ChevronRight, Plus, Edit2, Download, Share2, Filter,
  BarChart, Sparkles, Shield, Bell, MessageSquare, Star, Eye
} from 'lucide-react';
import './AICarePlans.css';

const AICarePlans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid, list, timeline
  const [filterStatus, setFilterStatus] = useState('all');
  const [showNewPlanModal, setShowNewPlanModal] = useState(false);

  // Sample care plans data
  const [carePlans] = useState([
    {
      id: 1,
      patientName: 'Sarah Johnson',
      patientId: 'PT001',
      diagnosis: 'Post-surgical recovery - Knee replacement',
      status: 'active',
      priority: 'high',
      startDate: '2025-07-01',
      reviewDate: '2025-08-15',
      endDate: '2025-09-01',
      completion: 65,
      aiScore: 92,
      goals: [
        { id: 1, title: 'Improve mobility', progress: 75, target: '100% weight bearing' },
        { id: 2, title: 'Pain management', progress: 80, target: 'Pain level < 3/10' },
        { id: 3, title: 'Independence in ADLs', progress: 60, target: 'Full independence' }
      ],
      interventions: [
        { type: 'Physical Therapy', frequency: '3x/week', duration: '45 min' },
        { type: 'Pain Management', frequency: 'Daily', duration: 'As needed' },
        { type: 'Wound Care', frequency: '2x/week', duration: '30 min' }
      ],
      aiInsights: [
        { type: 'positive', message: 'Patient showing 25% faster recovery than average' },
        { type: 'warning', message: 'Risk of decreased compliance in week 3-4' },
        { type: 'recommendation', message: 'Consider adding aqua therapy for better outcomes' }
      ]
    },
    {
      id: 2,
      patientName: 'Robert Chen',
      patientId: 'PT002',
      diagnosis: 'Type 2 Diabetes with neuropathy',
      status: 'active',
      priority: 'medium',
      startDate: '2025-06-15',
      reviewDate: '2025-08-01',
      endDate: '2025-12-15',
      completion: 45,
      aiScore: 78,
      goals: [
        { id: 1, title: 'Blood glucose control', progress: 50, target: 'HbA1c < 7%' },
        { id: 2, title: 'Foot care compliance', progress: 40, target: 'Daily inspection' },
        { id: 3, title: 'Medication adherence', progress: 85, target: '95% compliance' }
      ],
      interventions: [
        { type: 'Skilled Nursing', frequency: '2x/week', duration: '60 min' },
        { type: 'Diabetic Education', frequency: 'Weekly', duration: '30 min' },
        { type: 'Podiatry Consult', frequency: 'Monthly', duration: '45 min' }
      ],
      aiInsights: [
        { type: 'warning', message: 'Inconsistent blood glucose readings detected' },
        { type: 'recommendation', message: 'Implement continuous glucose monitoring' },
        { type: 'positive', message: 'Excellent medication compliance trend' }
      ]
    },
    {
      id: 3,
      patientName: 'Maria Rodriguez',
      patientId: 'PT003',
      diagnosis: 'CHF with recent exacerbation',
      status: 'active',
      priority: 'critical',
      startDate: '2025-07-15',
      reviewDate: '2025-08-05',
      endDate: '2025-10-15',
      completion: 30,
      aiScore: 85,
      goals: [
        { id: 1, title: 'Fluid management', progress: 40, target: 'Daily weight ±2 lbs' },
        { id: 2, title: 'Medication compliance', progress: 90, target: '100% adherence' },
        { id: 3, title: 'Activity tolerance', progress: 25, target: '150 min/week' }
      ],
      interventions: [
        { type: 'Telemonitoring', frequency: 'Daily', duration: '15 min' },
        { type: 'Cardiac Nursing', frequency: '3x/week', duration: '45 min' },
        { type: 'PT/OT Eval', frequency: '2x/week', duration: '60 min' }
      ],
      aiInsights: [
        { type: 'critical', message: '15% readmission risk in next 30 days' },
        { type: 'recommendation', message: 'Increase visit frequency for next 2 weeks' },
        { type: 'positive', message: 'Responding well to current medication regimen' }
      ]
    }
  ]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'priority-critical';
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'status-active';
      case 'pending': return 'status-pending';
      case 'completed': return 'status-completed';
      case 'discontinued': return 'status-discontinued';
      default: return '';
    }
  };

  const PlanCard = ({ plan }) => (
    <div className="care-plan-card" onClick={() => setSelectedPlan(plan)}>
      <div className="plan-card-header">
        <div className="patient-info">
          <h3 className="patient-name">{plan.patientName}</h3>
          <p className="patient-diagnosis">{plan.diagnosis}</p>
        </div>
        <div className="plan-badges">
          <span className={`priority-badge ${getPriorityColor(plan.priority)}`}>
            {plan.priority}
          </span>
          <span className={`status-badge ${getStatusColor(plan.status)}`}>
            {plan.status}
          </span>
        </div>
      </div>

      <div className="ai-score-section">
        <div className="ai-score">
          <Brain size={16} />
          <span>AI Score: {plan.aiScore}%</span>
        </div>
        <div className="completion-bar">
          <div className="completion-progress" style={{ width: `${plan.completion}%` }} />
        </div>
        <span className="completion-text">{plan.completion}% Complete</span>
      </div>

      <div className="plan-goals">
        <h4>Goals</h4>
        {plan.goals.map(goal => (
          <div key={goal.id} className="goal-item">
            <span className="goal-title">{goal.title}</span>
            <div className="goal-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${goal.progress}%` }} />
              </div>
              <span className="progress-text">{goal.progress}%</span>
            </div>
          </div>
        ))}
      </div>

      <div className="plan-insights">
        <h4>AI Insights</h4>
        {plan.aiInsights.slice(0, 2).map((insight, index) => (
          <div key={index} className={`insight-item insight-${insight.type}`}>
            <Sparkles size={14} />
            <span>{insight.message}</span>
          </div>
        ))}
      </div>

      <div className="plan-actions">
        <button className="action-btn">
          <Eye size={16} />
          View Details
        </button>
        <button className="action-btn">
          <Edit2 size={16} />
          Edit
        </button>
        <button className="action-btn">
          <Share2 size={16} />
          Share
        </button>
      </div>
    </div>
  );

  const PlanDetails = ({ plan }) => (
    <div className="plan-details-panel">
      <div className="details-header">
        <button className="back-btn" onClick={() => setSelectedPlan(null)}>
          <ChevronRight size={20} style={{ transform: 'rotate(180deg)' }} />
          Back to Plans
        </button>
        <div className="details-actions">
          <button className="apple-button apple-button-small">
            <Download size={16} />
            Export
          </button>
          <button className="apple-button apple-button-small apple-button-primary">
            <Edit2 size={16} />
            Edit Plan
          </button>
        </div>
      </div>

      <div className="details-content">
        <div className="patient-header">
          <div>
            <h2>{plan.patientName}</h2>
            <p>{plan.diagnosis}</p>
          </div>
          <div className="ai-metrics">
            <div className="metric-card">
              <Brain size={24} />
              <div>
                <span className="metric-value">{plan.aiScore}%</span>
                <span className="metric-label">AI Confidence</span>
              </div>
            </div>
            <div className="metric-card">
              <TrendingUp size={24} />
              <div>
                <span className="metric-value">{plan.completion}%</span>
                <span className="metric-label">Progress</span>
              </div>
            </div>
          </div>
        </div>

        <div className="timeline-section">
          <h3>Care Plan Timeline</h3>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker start" />
              <div className="timeline-content">
                <span className="timeline-date">{new Date(plan.startDate).toLocaleDateString()}</span>
                <span className="timeline-label">Plan Started</span>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker review" />
              <div className="timeline-content">
                <span className="timeline-date">{new Date(plan.reviewDate).toLocaleDateString()}</span>
                <span className="timeline-label">Next Review</span>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker end" />
              <div className="timeline-content">
                <span className="timeline-date">{new Date(plan.endDate).toLocaleDateString()}</span>
                <span className="timeline-label">Target End</span>
              </div>
            </div>
          </div>
        </div>

        <div className="goals-section">
          <h3>Goals & Objectives</h3>
          {plan.goals.map(goal => (
            <div key={goal.id} className="goal-detail-card">
              <div className="goal-header">
                <h4>{goal.title}</h4>
                <span className="goal-target">{goal.target}</span>
              </div>
              <div className="goal-progress-detail">
                <div className="progress-bar-large">
                  <div className="progress-fill-large" style={{ width: `${goal.progress}%` }}>
                    <span className="progress-label">{goal.progress}%</span>
                  </div>
                </div>
              </div>
              <div className="goal-actions">
                <button className="apple-button apple-button-small">Update Progress</button>
                <button className="apple-button apple-button-small">Add Note</button>
              </div>
            </div>
          ))}
        </div>

        <div className="interventions-section">
          <h3>Interventions</h3>
          <div className="interventions-grid">
            {plan.interventions.map((intervention, index) => (
              <div key={index} className="intervention-card">
                <div className="intervention-icon">
                  <Activity size={20} />
                </div>
                <h4>{intervention.type}</h4>
                <div className="intervention-details">
                  <span><Clock size={14} /> {intervention.frequency}</span>
                  <span><Calendar size={14} /> {intervention.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="ai-recommendations">
          <h3>AI Recommendations</h3>
          {plan.aiInsights.map((insight, index) => (
            <div key={index} className={`recommendation-card ${insight.type}`}>
              <div className="recommendation-icon">
                {insight.type === 'critical' ? <AlertTriangle size={20} /> :
                 insight.type === 'warning' ? <Bell size={20} /> :
                 insight.type === 'positive' ? <CheckCircle size={20} /> :
                 <Sparkles size={20} />}
              </div>
              <div className="recommendation-content">
                <p>{insight.message}</p>
                <button className="recommendation-action">
                  {insight.type === 'recommendation' ? 'Apply Suggestion' : 'View Details'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="ai-care-plans">
      <div className="care-plans-header">
        <div>
          <h1 className="page-title">AI Care Plans</h1>
          <p className="page-subtitle">Intelligent care planning powered by AI insights</p>
        </div>
        <button 
          className="apple-button apple-button-primary"
          onClick={() => setShowNewPlanModal(true)}
        >
          <Plus size={20} />
          Generate New Plan
        </button>
      </div>

      <div className="ai-banner">
        <div className="ai-banner-content">
          <Brain size={24} />
          <div>
            <h3>AI Analysis Active</h3>
            <p>Continuously monitoring patient data and optimizing care plans for better outcomes</p>
          </div>
        </div>
        <div className="ai-stats">
          <div className="ai-stat">
            <span className="stat-value">94%</span>
            <span className="stat-label">Accuracy Rate</span>
          </div>
          <div className="ai-stat">
            <span className="stat-value">2.3x</span>
            <span className="stat-label">Faster Planning</span>
          </div>
          <div className="ai-stat">
            <span className="stat-value">18%</span>
            <span className="stat-label">Better Outcomes</span>
          </div>
        </div>
      </div>

      <div className="filters-section">
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            All Plans
          </button>
          <button 
            className={`filter-tab ${filterStatus === 'active' ? 'active' : ''}`}
            onClick={() => setFilterStatus('active')}
          >
            Active
          </button>
          <button 
            className={`filter-tab ${filterStatus === 'pending' ? 'active' : ''}`}
            onClick={() => setFilterStatus('pending')}
          >
            Pending Review
          </button>
          <button 
            className={`filter-tab ${filterStatus === 'critical' ? 'active' : ''}`}
            onClick={() => setFilterStatus('critical')}
          >
            Critical
          </button>
        </div>
        <div className="view-toggles">
          <button 
            className={`view-toggle ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            Grid
          </button>
          <button 
            className={`view-toggle ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            List
          </button>
          <button 
            className={`view-toggle ${viewMode === 'timeline' ? 'active' : ''}`}
            onClick={() => setViewMode('timeline')}
          >
            Timeline
          </button>
        </div>
      </div>

      {selectedPlan ? (
        <PlanDetails plan={selectedPlan} />
      ) : (
        <div className="care-plans-grid">
          {carePlans
            .filter(plan => filterStatus === 'all' || 
                           (filterStatus === 'critical' && plan.priority === 'critical') ||
                           plan.status === filterStatus)
            .map(plan => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
        </div>
      )}
    </div>
  );
};

export default AICarePlans;