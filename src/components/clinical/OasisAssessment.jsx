// src/components/clinical/OasisAssessment.jsx
import React, { useState, useEffect } from 'react';
import './OasisAssessment.css';

const OasisAssessment = ({ patient, onBack }) => {
  const [activeSection, setActiveSection] = useState('patient-info');
  const [formData, setFormData] = useState({
    assessmentDate: '',
    assessmentReason: '',
    medicareNumber: '',
    medicaidNumber: '',
  });

  const sections = [
    { id: 'patient-info', label: 'Patient Information', icon: '👤' },
    { id: 'clinical-record', label: 'Clinical Record Items', icon: '📋' },
    { id: 'patient-history', label: 'Patient History & Diagnoses', icon: '❤️' },
    { id: 'living-conditions', label: 'Living Conditions', icon: '🏠' },
    { id: 'sensory-status', label: 'Sensory Status', icon: '👁️' },
    { id: 'integumentary-status', label: 'Integumentary Status', icon: '❤️' },
    { id: 'respiratory-status', label: 'Respiratory Status', icon: '🌬️' },
    { id: 'elimination-status', label: 'Elimination Status', icon: '🚿' },
    { id: 'neuro-emotional', label: 'Neuro/Emotional/Behavioral', icon: '🧠' },
    { id: 'adl-iadl', label: 'ADL/IADL', icon: '🏃' },
    { id: 'medications', label: 'Medications', icon: '💊' },
    { id: 'care-management', label: 'Care Management', icon: '📋' },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '24px' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <h1 style={{ margin: 0 }}>OASIS-E Assessment</h1>
          {patient && <span style={{ color: '#6b7280' }}>Patient: {patient.name} • MRN: {patient.id}</span>}
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{
            padding: '8px 16px',
            background: 'white',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            ✓ Auto-saved
          </button>
          <button style={{
            padding: '8px 16px',
            background: 'white',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            🤖 AI Assist
          </button>
          <button style={{
            padding: '8px 16px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            💾 Save Progress
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontWeight: '600' }}>Assessment Progress</span>
          <span style={{ color: '#3b82f6', fontWeight: '600' }}>17%</span>
        </div>
        <div style={{ 
          height: '8px', 
          background: '#e5e7eb', 
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{ 
            width: '17%', 
            height: '100%', 
            background: '#3b82f6',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Section Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '4px',
        marginBottom: '32px',
        overflowX: 'auto',
        paddingBottom: '4px'
      }}>
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            style={{
              padding: '12px 20px',
              background: activeSection === section.id ? '#3b82f6' : 'white',
              color: activeSection === section.id ? 'white' : '#374151',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              minWidth: '140px',
              transition: 'all 0.2s'
            }}
          >
            <span style={{ fontSize: '20px' }}>{section.icon}</span>
            <span style={{ fontSize: '12px', textAlign: 'center' }}>{section.label}</span>
          </button>
        ))}
      </div>

      {/* Form Content */}
      <div style={{ 
        background: 'white', 
        padding: '32px', 
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h2 style={{ margin: 0 }}>Patient Information</h2>
          <span style={{ color: '#6b7280' }}>Section 1 of 12</span>
        </div>

        <div style={{ display: 'grid', gap: '24px' }}>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '500' 
            }}>
              Assessment Date (M0090) <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="date"
              value={formData.assessmentDate}
              onChange={(e) => handleInputChange('assessmentDate', e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '500' 
            }}>
              Reason for Assessment (M0100) <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <select
              value={formData.assessmentReason}
              onChange={(e) => handleInputChange('assessmentReason', e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                background: 'white'
              }}
            >
              <option value="">Select reason...</option>
              <option value="start-of-care">Start of care</option>
              <option value="resumption">Resumption of care</option>
              <option value="recertification">Recertification</option>
              <option value="other">Other follow-up</option>
              <option value="transfer">Transfer</option>
              <option value="discharge">Discharge</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '500' 
              }}>
                Medicare Number
              </label>
              <input
                type="text"
                value={formData.medicareNumber}
                onChange={(e) => handleInputChange('medicareNumber', e.target.value)}
                placeholder="123456789A"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '500' 
              }}>
                Medicaid Number
              </label>
              <input
                type="text"
                value={formData.medicaidNumber}
                onChange={(e) => handleInputChange('medicaidNumber', e.target.value)}
                placeholder="12345678"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>

          <div style={{
            background: '#eff6ff',
            border: '1px solid #c7d2fe',
            borderRadius: '6px',
            padding: '16px',
            display: 'flex',
            gap: '12px',
            alignItems: 'start'
          }}>
            <span>ℹ️</span>
            <p style={{ margin: 0, fontSize: '14px', color: '#4b5563' }}>
              The OASIS-E assessment is required for all Medicare and Medicaid patients receiving skilled services. 
              Ensure all required fields are completed accurately.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div style={{
        marginTop: '32px',
        padding: '16px 0',
        borderTop: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <button
          onClick={() => {
            const currentIndex = sections.findIndex(s => s.id === activeSection);
            if (currentIndex < sections.length - 1) {
              setActiveSection(sections[currentIndex + 1].id);
            }
          }}
          style={{
            padding: '10px 24px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default OasisAssessment;