import React, { useState } from 'react';
import './DocumentPreview.css';

const DocumentPreview = ({ document, onEdit, onApprove, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(document.content);
  const [activeSection, setActiveSection] = useState(0);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    onEdit({
      ...document,
      content: editedContent
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedContent(document.content);
    setIsEditing(false);
  };

  const handleSectionEdit = (sectionIndex, newContent) => {
    const updatedSections = [...editedContent.sections];
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      content: newContent
    };
    setEditedContent({
      ...editedContent,
      sections: updatedSections
    });
  };

  const exportOptions = [
    { id: 'pdf', name: 'Export as PDF', icon: '📄' },
    { id: 'word', name: 'Export as Word', icon: '📝' },
    { id: 'print', name: 'Print Document', icon: '🖨️' }
  ];

  return (
    <div className="document-preview">
      <div className="preview-header">
        <div className="header-info">
          <h2>Document Preview</h2>
          <p>Review and edit the generated document before approval</p>
        </div>
        <div className="header-actions">
          {!isEditing ? (
            <>
              <button className="btn-icon" onClick={handleEdit} title="Edit Document">
                ✏️
              </button>
              <div className="export-dropdown">
                <button className="btn-icon" title="Export Options">
                  📤
                </button>
                <div className="dropdown-menu">
                  {exportOptions.map(option => (
                    <button key={option.id} className="dropdown-item">
                      <span className="item-icon">{option.icon}</span>
                      <span>{option.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <button className="btn-save" onClick={handleSaveEdit}>
                Save Changes
              </button>
              <button className="btn-cancel" onClick={handleCancelEdit}>
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      <div className="preview-container">
        <div className="document-sidebar">
          <h3>Document Sections</h3>
          <div className="section-list">
            {editedContent.sections.map((section, index) => (
              <div
                key={index}
                className={`section-item ${activeSection === index ? 'active' : ''}`}
                onClick={() => setActiveSection(index)}
              >
                <span className="section-number">{index + 1}</span>
                <span className="section-title">{section.title}</span>
              </div>
            ))}
          </div>
          
          <div className="document-actions">
            <button className="btn-secondary" onClick={onBack}>
              Back to Wizard
            </button>
            <button className="btn-primary" onClick={onApprove}>
              Approve Document
            </button>
          </div>
        </div>

        <div className="document-content">
          <div className="document-header-section">
            <div className="facility-info">
              <h1>Village Home Care</h1>
              <p>123 Main Street, Anytown, FL 12345</p>
              <p>Phone: (555) 123-4567 | Fax: (555) 123-4568</p>
            </div>
            
            <div className="document-title">
              <h2>{editedContent.header.documentType}</h2>
              <p>Document Date: {editedContent.header.documentDate}</p>
            </div>

            <div className="patient-header">
              <div className="patient-info-grid">
                <div className="info-item">
                  <label>Patient Name:</label>
                  <span>{editedContent.header.patientName}</span>
                </div>
                <div className="info-item">
                  <label>MRN:</label>
                  <span>{editedContent.header.mrn}</span>
                </div>
                <div className="info-item">
                  <label>Date of Birth:</label>
                  <span>{editedContent.header.dob}</span>
                </div>
                <div className="info-item">
                  <label>Insurance:</label>
                  <span>Medicare Part A/B</span>
                </div>
              </div>
            </div>
          </div>

          <div className="document-sections">
            {editedContent.sections.map((section, index) => (
              <div
                key={index}
                className={`document-section ${activeSection === index ? 'active' : ''}`}
              >
                <h3>{section.title}</h3>
                {isEditing ? (
                  <textarea
                    className="section-editor"
                    value={section.content}
                    onChange={(e) => handleSectionEdit(index, e.target.value)}
                    rows={8}
                  />
                ) : (
                  <div className="section-content">
                    {section.content.split('\n').map((paragraph, pIndex) => (
                      <p key={pIndex}>{paragraph}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="document-footer">
            <div className="signature-section">
              <div className="signature-block">
                <div className="signature-line"></div>
                <p>Therapist/Clinician Signature</p>
                <p>Date: _______________</p>
              </div>
              
              {editedContent.signature.requiresPhysicianSignature && (
                <div className="signature-block">
                  <div className="signature-line"></div>
                  <p>Physician Signature</p>
                  <p>Date: _______________</p>
                </div>
              )}
            </div>
            
            <div className="document-meta">
              <p>Generated by: {document.metadata.generatedBy}</p>
              <p>Version: {document.metadata.version}</p>
              <p>Status: {document.metadata.approvalStatus}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="preview-tools">
        <div className="zoom-controls">
          <button className="btn-icon" title="Zoom Out">➖</button>
          <span className="zoom-level">100%</span>
          <button className="btn-icon" title="Zoom In">➕</button>
        </div>
        
        <div className="page-navigation">
          <button className="btn-icon" title="Previous Section">⬅️</button>
          <span className="page-info">Section {activeSection + 1} of {editedContent.sections.length}</span>
          <button className="btn-icon" title="Next Section">➡️</button>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;