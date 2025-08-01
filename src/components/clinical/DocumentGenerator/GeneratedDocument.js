import React from 'react';
import './GeneratedDocument.css';

const GeneratedDocument = ({ document, onStartOver, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    // Simulate PDF export
    console.log('Exporting as PDF...');
    alert('Document exported as PDF successfully!');
  };

  const handleExportWord = () => {
    // Simulate Word export
    console.log('Exporting as Word...');
    alert('Document exported as Word successfully!');
  };

  const handleSendToEHR = () => {
    // Simulate sending to EHR
    console.log('Sending to EHR...');
    alert('Document sent to patient chart successfully!');
  };

  const successMetrics = [
    { label: 'Time Saved', value: '45 min', icon: '⏱️' },
    { label: 'Compliance Score', value: `${document.complianceStatus.score}%`, icon: '✓' },
    { label: 'Auto-Generated', value: '85%', icon: '🤖' },
    { label: 'Ready for Signature', value: 'Yes', icon: '✍️' }
  ];

  return (
    <div className="generated-document">
      <div className="success-header">
        <div className="success-icon">✓</div>
        <h2>Document Generated Successfully!</h2>
        <p>Your document has been created and is ready for review and approval</p>
      </div>

      <div className="document-info">
        <div className="info-grid">
          <div className="info-card">
            <span className="info-label">Document Type</span>
            <span className="info-value">
              {document.documentType === 'poc' ? 'Plan of Care' :
               document.documentType === 'pt-eval' ? 'PT Evaluation' :
               document.documentType === 'ot-eval' ? 'OT Evaluation' :
               document.documentType === 'st-eval' ? 'ST Evaluation' :
               document.documentType === 'progress' ? 'Progress Note' :
               'Clinical Document'}
            </span>
          </div>
          <div className="info-card">
            <span className="info-label">Patient</span>
            <span className="info-value">{document.content.header.patientName}</span>
          </div>
          <div className="info-card">
            <span className="info-label">Generated</span>
            <span className="info-value">{new Date(document.metadata.generatedAt).toLocaleString()}</span>
          </div>
          <div className="info-card">
            <span className="info-label">Status</span>
            <span className="info-value status-badge draft">
              {document.metadata.approvalStatus}
            </span>
          </div>
        </div>
      </div>

      <div className="success-metrics">
        <h3>Generation Summary</h3>
        <div className="metrics-grid">
          {successMetrics.map((metric, index) => (
            <div key={index} className="metric-card">
              <div className="metric-icon">{metric.icon}</div>
              <div className="metric-details">
                <span className="metric-value">{metric.value}</span>
                <span className="metric-label">{metric.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="document-actions">
        <h3>What would you like to do next?</h3>
        
        <div className="primary-actions">
          <button className="action-btn primary" onClick={handleSendToEHR}>
            <span className="btn-icon">📤</span>
            <span className="btn-text">Send to Patient Chart</span>
            <span className="btn-description">Add to patient's medical record</span>
          </button>
          
          <button className="action-btn secondary" onClick={handlePrint}>
            <span className="btn-icon">🖨️</span>
            <span className="btn-text">Print Document</span>
            <span className="btn-description">Print for physical signature</span>
          </button>
        </div>

        <div className="export-actions">
          <button className="export-btn" onClick={handleExportPDF}>
            <span className="btn-icon">📄</span>
            <span>Export as PDF</span>
          </button>
          
          <button className="export-btn" onClick={handleExportWord}>
            <span className="btn-icon">📝</span>
            <span>Export as Word</span>
          </button>
          
          <button className="export-btn">
            <span className="btn-icon">📧</span>
            <span>Email Document</span>
          </button>
        </div>
      </div>

      <div className="next-steps">
        <h3>Next Steps</h3>
        <div className="steps-list">
          <div className="step-item">
            <span className="step-number">1</span>
            <div className="step-content">
              <h4>Physician Signature</h4>
              <p>Route to physician for electronic signature or print for wet signature</p>
            </div>
          </div>
          <div className="step-item">
            <span className="step-number">2</span>
            <div className="step-content">
              <h4>File in Chart</h4>
              <p>Ensure document is properly filed in patient's medical record</p>
            </div>
          </div>
          <div className="step-item">
            <span className="step-number">3</span>
            <div className="step-content">
              <h4>Submit for Billing</h4>
              <p>Forward to billing department if required for claims processing</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-actions">
        <button className="btn-secondary" onClick={onStartOver}>
          Generate Another Document
        </button>
        <button className="btn-primary" onClick={onClose}>
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default GeneratedDocument;