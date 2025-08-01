import React, { useState } from 'react';
import './ComplianceChecker.css';

const ComplianceChecker = ({ status, documentType }) => {
  const [expandedIssues, setExpandedIssues] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Compliance requirements by document type
  const complianceRequirements = {
    'poc': {
      title: 'CMS 485 Compliance',
      requirements: [
        'Patient demographics complete',
        'Physician orders documented',
        'Face-to-face encounter verified',
        'Functional limitations specified',
        'Treatment goals measurable',
        'Service frequency defined',
        'Safety measures included'
      ]
    },
    'pt-eval': {
      title: 'PT Evaluation Compliance',
      requirements: [
        'Referral information complete',
        'Medical history documented',
        'Functional assessment performed',
        'Standardized tests included',
        'SMART goals established',
        'Medical necessity justified',
        'Treatment plan defined'
      ]
    },
    'progress': {
      title: 'Progress Note Compliance',
      requirements: [
        'Visit date and duration',
        'Patient response documented',
        'Progress toward goals assessed',
        'Skilled interventions described',
        'Medical necessity continued',
        'Plan for next visit'
      ]
    }
  };

  const getComplianceColor = (score) => {
    if (score >= 90) return '#28a745';
    if (score >= 70) return '#ffc107';
    return '#dc3545';
  };

  const getComplianceStatus = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    return 'Needs Improvement';
  };

  const renderComplianceScore = () => {
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (status.score / 100) * circumference;

    return (
      <div className="compliance-score">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke="#e9ecef"
            strokeWidth="10"
          />
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke={getComplianceColor(status.score)}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 60 60)"
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>
        <div className="score-text">
          <div className="score-number">{status.score}%</div>
          <div className="score-label">{getComplianceStatus(status.score)}</div>
        </div>
      </div>
    );
  };

  const currentRequirements = complianceRequirements[documentType] || complianceRequirements['progress'];

  return (
    <div className="compliance-checker">
      <div className="compliance-header">
        <h3>Compliance Check</h3>
        <button 
          className="btn-details"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>

      <div className="compliance-summary">
        {renderComplianceScore()}
        
        <div className="compliance-status">
          <div className={`status-indicator ${status.isCompliant ? 'compliant' : 'non-compliant'}`}>
            <span className="status-icon">{status.isCompliant ? '✓' : '⚠️'}</span>
            <span className="status-text">
              {status.isCompliant ? 'Document Compliant' : 'Compliance Issues Found'}
            </span>
          </div>
          
          <p className="compliance-message">
            This document meets {status.score}% of {currentRequirements.title} requirements
          </p>
        </div>
      </div>

      {showDetails && (
        <div className="compliance-details">
          <div className="requirements-section">
            <h4>{currentRequirements.title} Requirements</h4>
            <div className="requirements-list">
              {currentRequirements.requirements.map((req, index) => (
                <div key={index} className="requirement-item">
                  <span className="requirement-check">✓</span>
                  <span className="requirement-text">{req}</span>
                </div>
              ))}
            </div>
          </div>

          {status.issues.length > 0 && (
            <div className="issues-section">
              <div 
                className="issues-header"
                onClick={() => setExpandedIssues(!expandedIssues)}
              >
                <h4>Issues Found ({status.issues.length})</h4>
                <span className="expand-icon">{expandedIssues ? '−' : '+'}</span>
              </div>
              
              {expandedIssues && (
                <div className="issues-list">
                  {status.issues.map((issue, index) => (
                    <div key={index} className="issue-item">
                      <span className="issue-icon">⚠️</span>
                      <span className="issue-text">{issue}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {status.recommendations.length > 0 && (
            <div className="recommendations-section">
              <h4>Recommendations</h4>
              <div className="recommendations-list">
                {status.recommendations.map((rec, index) => (
                  <div key={index} className="recommendation-item">
                    <span className="recommendation-icon">💡</span>
                    <span className="recommendation-text">{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="compliance-actions">
        <button className="btn-fix-issues">
          Auto-Fix Issues
        </button>
        <button className="btn-export-report">
          Export Compliance Report
        </button>
      </div>

      <div className="compliance-tips">
        <h4>Quick Tips</h4>
        <ul>
          <li>Ensure all required fields are completed</li>
          <li>Include specific medical necessity language</li>
          <li>Document measurable goals and outcomes</li>
          <li>Verify physician orders are current</li>
        </ul>
      </div>
    </div>
  );
};

export default ComplianceChecker;