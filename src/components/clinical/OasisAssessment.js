// src/components/clinical/OasisAssessment.js
import React, { useState, useEffect } from 'react';
import {
  ClipboardList,
  User,
  Home,
  Heart,
  Brain,
  Activity,
  Pill,
  AlertCircle,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Save,
  FileCheck,
  Download,
  Clock,
  CheckCircle,
  XCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import './OasisAssessment.css';

const OasisAssessment = ({ patient, onBack }) => {
  // Form sections configuration
  const sections = [
    { id: 'patient-info', title: 'Patient Information', icon: User },
    { id: 'clinical-record', title: 'Clinical Record Items', icon: ClipboardList },
    { id: 'patient-history', title: 'Patient History & Diagnoses', icon: Heart },
    { id: 'living-conditions', title: 'Living Conditions', icon: Home },
    { id: 'sensory-status', title: 'Sensory Status', icon: Activity },
    { id: 'integumentary', title: 'Integumentary Status', icon: Heart },
    { id: 'respiratory', title: 'Respiratory Status', icon: Activity },
    { id: 'elimination', title: 'Elimination Status', icon: Activity },
    { id: 'neuro-emotional', title: 'Neuro/Emotional/Behavioral', icon: Brain },
    { id: 'adl-iadl', title: 'ADL/IADL', icon: Activity },
    { id: 'medications', title: 'Medications', icon: Pill },
    { id: 'care-management', title: 'Care Management', icon: ClipboardList }
  ];

  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState({
    // Patient Information
    patientId: patient?.id || '',
    patientName: patient?.name || '',
    medicare: patient?.insurance?.includes('Medicare') ? patient.insurance : '',
    assessmentDate: new Date().toISOString().split('T')[0],
    assessmentReason: '',
    
    // Clinical Record Items
    dateOfReferral: '',
    startOfCare: '',
    resumptionOfCare: '',
    lastVisit: '',
    
    // Patient History & Diagnoses
    primaryDiagnosis: '',
    primaryDiagnosisDate: '',
    otherDiagnoses: [],
    
    // Living Conditions
    livingArrangement: '',
    assistanceAvailable: '',
    primaryCaregiver: '',
    
    // Sensory Status
    vision: '',
    hearing: '',
    speechExpression: '',
    
    // And more fields for each section...
  });

  const [errors, setErrors] = useState({});
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState('saved');
  const [completionProgress, setCompletionProgress] = useState(0);

  // Auto-save functionality
  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      saveProgress();
    }, 30000); // Auto-save every 30 seconds

    return () => clearTimeout(autoSaveTimer);
  }, [formData]);

  // Calculate completion progress
  useEffect(() => {
    calculateProgress();
  }, [formData]);

  const calculateProgress = () => {
    const requiredFields = [
      'assessmentDate', 'assessmentReason', 'primaryDiagnosis',
      'livingArrangement', 'vision', 'hearing'
      // Add all required fields
    ];
    
    const completedFields = requiredFields.filter(field => formData[field]);
    const progress = (completedFields.length / requiredFields.length) * 100;
    setCompletionProgress(progress);
  };

  const saveProgress = () => {
    setAutoSaveStatus('saving');
    // Save to localStorage or API
    localStorage.setItem(`oasis-assessment-${patient?.id}`, JSON.stringify(formData));
    setTimeout(() => {
      setAutoSaveStatus('saved');
    }, 1000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateSection = () => {
    const newErrors = {};
    
    switch (sections[currentSection].id) {
      case 'patient-info':
        if (!formData.assessmentDate) newErrors.assessmentDate = 'Assessment date is required';
        if (!formData.assessmentReason) newErrors.assessmentReason = 'Assessment reason is required';
        break;
      
      case 'patient-history':
        if (!formData.primaryDiagnosis) newErrors.primaryDiagnosis = 'Primary diagnosis is required';
        break;
      
      // Add validation for other sections
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateSection()) {
      if (currentSection < sections.length - 1) {
        setCurrentSection(currentSection + 1);
        window.scrollTo(0, 0);
      }
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = () => {
    if (validateSection()) {
      // Submit assessment
      console.log('Submitting OASIS assessment:', formData);
      alert('OASIS assessment submitted successfully!');
    }
  };

  const renderSectionContent = () => {
    const section = sections[currentSection];
    
    switch (section.id) {
      case 'patient-info':
        return <PatientInfoSection formData={formData} onChange={handleInputChange} errors={errors} />;
      
      case 'clinical-record':
        return <ClinicalRecordSection formData={formData} onChange={handleInputChange} errors={errors} />;
      
      case 'patient-history':
        return <PatientHistorySection formData={formData} onChange={handleInputChange} errors={errors} />;
      
      case 'living-conditions':
        return <LivingConditionsSection formData={formData} onChange={handleInputChange} errors={errors} />;
      
      case 'sensory-status':
        return <SensoryStatusSection formData={formData} onChange={handleInputChange} errors={errors} />;
      
      // Add other sections
      
      default:
        return <div className="section-placeholder">Section content for {section.title}</div>;
    }
  };

  return (
    <div className="oasis-assessment">
      <div className="assessment-header">
        <div className="header-left">
          <button onClick={onBack} className="back-btn">
            <ChevronLeft size={20} />
            <span>Back to Patient</span>
          </button>
          <div className="header-info">
            <h1>OASIS-E Assessment</h1>
            <p>Patient: {patient?.name} • MRN: {patient?.id}</p>
          </div>
        </div>
        
        <div className="header-actions">
          <div className="auto-save-status">
            {autoSaveStatus === 'saving' ? (
              <>
                <Clock size={16} className="spinning" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <CheckCircle size={16} />
                <span>Auto-saved</span>
              </>
            )}
          </div>
          
          <button className="btn-secondary" onClick={() => setShowAiAssistant(true)}>
            <Brain size={18} />
            <span>AI Assist</span>
          </button>
          
          <button className="btn-primary" onClick={saveProgress}>
            <Save size={18} />
            <span>Save Progress</span>
          </button>
        </div>
      </div>

      <div className="assessment-content">
        <div className="progress-sidebar">
          <div className="progress-header">
            <h3>Assessment Progress</h3>
            <div className="progress-percentage">{Math.round(completionProgress)}%</div>
          </div>
          
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ height: `${completionProgress}%` }}
            />
          </div>
          
          <div className="section-list">
            {sections.map((section, index) => {
              const Icon = section.icon;
              const isActive = index === currentSection;
              const isCompleted = index < currentSection;
              
              return (
                <button
                  key={section.id}
                  className={`section-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                  onClick={() => setCurrentSection(index)}
                >
                  <div className="section-icon">
                    <Icon size={18} />
                  </div>
                  <span className="section-title">{section.title}</span>
                  {isCompleted && <CheckCircle size={16} className="check-icon" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="form-container">
          <div className="section-header">
            <h2>{sections[currentSection].title}</h2>
            <p>Section {currentSection + 1} of {sections.length}</p>
          </div>
          
          <div className="section-content">
            {renderSectionContent()}
          </div>
          
          <div className="form-navigation">
            <button 
              className="btn-secondary"
              onClick={handlePrevious}
              disabled={currentSection === 0}
            >
              <ChevronLeft size={18} />
              <span>Previous</span>
            </button>
            
            {currentSection === sections.length - 1 ? (
              <button className="btn-primary" onClick={handleSubmit}>
                <FileCheck size={18} />
                <span>Submit Assessment</span>
              </button>
            ) : (
              <button className="btn-primary" onClick={handleNext}>
                <span>Next</span>
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      {showAiAssistant && (
        <AiAssistantModal 
          onClose={() => setShowAiAssistant(false)}
          section={sections[currentSection]}
          formData={formData}
          onSuggestion={handleInputChange}
        />
      )}
    </div>
  );
};

// Section Components
const PatientInfoSection = ({ formData, onChange, errors }) => {
  return (
    <div className="form-section">
      <div className="form-group">
        <label htmlFor="assessmentDate">
          Assessment Date (M0090) <span className="required">*</span>
        </label>
        <input
          type="date"
          id="assessmentDate"
          value={formData.assessmentDate}
          onChange={(e) => onChange('assessmentDate', e.target.value)}
          className={errors.assessmentDate ? 'error' : ''}
        />
        {errors.assessmentDate && (
          <span className="error-message">{errors.assessmentDate}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="assessmentReason">
          Reason for Assessment (M0100) <span className="required">*</span>
        </label>
        <select
          id="assessmentReason"
          value={formData.assessmentReason}
          onChange={(e) => onChange('assessmentReason', e.target.value)}
          className={errors.assessmentReason ? 'error' : ''}
        >
          <option value="">Select reason...</option>
          <option value="01">01 - Start of care</option>
          <option value="03">03 - Resumption of care</option>
          <option value="04">04 - Recertification</option>
          <option value="05">05 - Other follow-up</option>
          <option value="06">06 - Transfer to inpatient facility</option>
          <option value="07">07 - Transfer to inpatient facility - discharged</option>
          <option value="08">08 - Death at home</option>
          <option value="09">09 - Discharge from agency</option>
        </select>
        {errors.assessmentReason && (
          <span className="error-message">{errors.assessmentReason}</span>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="medicare">Medicare Number</label>
          <input
            type="text"
            id="medicare"
            value={formData.medicare}
            onChange={(e) => onChange('medicare', e.target.value)}
            placeholder="1234567890A"
          />
        </div>

        <div className="form-group">
          <label htmlFor="medicaid">Medicaid Number</label>
          <input
            type="text"
            id="medicaid"
            value={formData.medicaid || ''}
            onChange={(e) => onChange('medicaid', e.target.value)}
            placeholder="12345678"
          />
        </div>
      </div>

      <div className="info-box">
        <HelpCircle size={16} />
        <p>
          The OASIS-E assessment is required for all Medicare and Medicaid patients 
          receiving skilled services. Ensure all required fields are completed accurately.
        </p>
      </div>
    </div>
  );
};

const ClinicalRecordSection = ({ formData, onChange, errors }) => {
  return (
    <div className="form-section">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="dateOfReferral">
            Date of Referral (M0104)
          </label>
          <input
            type="date"
            id="dateOfReferral"
            value={formData.dateOfReferral}
            onChange={(e) => onChange('dateOfReferral', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="startOfCare">
            Start of Care Date (M0030)
          </label>
          <input
            type="date"
            id="startOfCare"
            value={formData.startOfCare}
            onChange={(e) => onChange('startOfCare', e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="referralSource">
          Referral Source (M1000)
        </label>
        <select
          id="referralSource"
          value={formData.referralSource || ''}
          onChange={(e) => onChange('referralSource', e.target.value)}
        >
          <option value="">Select source...</option>
          <option value="01">01 - Physician</option>
          <option value="02">02 - Clinic or physician group</option>
          <option value="03">03 - HMO</option>
          <option value="04">04 - Court/law enforcement</option>
          <option value="05">05 - Patient/family/friend</option>
          <option value="06">06 - Hospital social service/discharge planner</option>
          <option value="07">07 - Internal referral</option>
          <option value="08">08 - Skilled nursing facility</option>
          <option value="09">09 - Area Agency on Aging</option>
          <option value="10">10 - Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="inpatientFacility">
          Inpatient Facility (M1005)
        </label>
        <input
          type="text"
          id="inpatientFacility"
          value={formData.inpatientFacility || ''}
          onChange={(e) => onChange('inpatientFacility', e.target.value)}
          placeholder="Name of facility"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="inpatientAdmitDate">
            Inpatient Admission Date
          </label>
          <input
            type="date"
            id="inpatientAdmitDate"
            value={formData.inpatientAdmitDate || ''}
            onChange={(e) => onChange('inpatientAdmitDate', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="inpatientDischargeDate">
            Inpatient Discharge Date (M1005)
          </label>
          <input
            type="date"
            id="inpatientDischargeDate"
            value={formData.inpatientDischargeDate || ''}
            onChange={(e) => onChange('inpatientDischargeDate', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

const PatientHistorySection = ({ formData, onChange, errors }) => {
  const [showDiagnosisSearch, setShowDiagnosisSearch] = useState(false);
  const [diagnosisSearch, setDiagnosisSearch] = useState('');

  // Mock ICD-10 codes for demonstration
  const icdCodes = [
    { code: 'E11.9', description: 'Type 2 diabetes mellitus without complications' },
    { code: 'I10', description: 'Essential (primary) hypertension' },
    { code: 'M79.3', description: 'Myalgia' },
    { code: 'Z47.1', description: 'Aftercare following joint replacement surgery' },
    { code: 'I50.9', description: 'Heart failure, unspecified' }
  ];

  const filteredCodes = icdCodes.filter(code => 
    code.code.toLowerCase().includes(diagnosisSearch.toLowerCase()) ||
    code.description.toLowerCase().includes(diagnosisSearch.toLowerCase())
  );

  return (
    <div className="form-section">
      <div className="form-group">
        <label htmlFor="primaryDiagnosis">
          Primary Diagnosis (M1021) <span className="required">*</span>
        </label>
        <div className="diagnosis-input">
          <input
            type="text"
            id="primaryDiagnosis"
            value={formData.primaryDiagnosis}
            onChange={(e) => onChange('primaryDiagnosis', e.target.value)}
            placeholder="Enter ICD-10 code or diagnosis"
            className={errors.primaryDiagnosis ? 'error' : ''}
          />
          <button 
            type="button"
            className="search-btn"
            onClick={() => setShowDiagnosisSearch(!showDiagnosisSearch)}
          >
            <HelpCircle size={16} />
          </button>
        </div>
        {errors.primaryDiagnosis && (
          <span className="error-message">{errors.primaryDiagnosis}</span>
        )}
        
        {showDiagnosisSearch && (
          <div className="diagnosis-search">
            <input
              type="text"
              placeholder="Search ICD-10 codes..."
              value={diagnosisSearch}
              onChange={(e) => setDiagnosisSearch(e.target.value)}
              className="search-input"
            />
            <div className="search-results">
              {filteredCodes.map(code => (
                <div
                  key={code.code}
                  className="search-result"
                  onClick={() => {
                    onChange('primaryDiagnosis', `${code.code} - ${code.description}`);
                    setShowDiagnosisSearch(false);
                    setDiagnosisSearch('');
                  }}
                >
                  <strong>{code.code}</strong> - {code.description}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="primaryDiagnosisDate">
          Primary Diagnosis Date
        </label>
        <input
          type="date"
          id="primaryDiagnosisDate"
          value={formData.primaryDiagnosisDate}
          onChange={(e) => onChange('primaryDiagnosisDate', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Other Diagnoses (M1023)</label>
        <div className="diagnosis-list">
          {[1, 2, 3, 4, 5].map(num => (
            <input
              key={num}
              type="text"
              placeholder={`Diagnosis ${num}`}
              value={formData[`otherDiagnosis${num}`] || ''}
              onChange={(e) => onChange(`otherDiagnosis${num}`, e.target.value)}
              className="diagnosis-input-field"
            />
          ))}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="prognosis">
          Patient Overall Prognosis (M1034)
        </label>
        <select
          id="prognosis"
          value={formData.prognosis || ''}
          onChange={(e) => onChange('prognosis', e.target.value)}
        >
          <option value="">Select prognosis...</option>
          <option value="00">00 - Stable</option>
          <option value="01">01 - Temporarily impaired</option>
          <option value="02">02 - Ongoing impairment</option>
          <option value="03">03 - Fragile</option>
          <option value="04">04 - Terminally ill</option>
        </select>
      </div>
    </div>
  );
};

const LivingConditionsSection = ({ formData, onChange, errors }) => {
  return (
    <div className="form-section">
      <div className="form-group">
        <label htmlFor="livingArrangement">
          Living Arrangement (M1100) <span className="required">*</span>
        </label>
        <select
          id="livingArrangement"
          value={formData.livingArrangement}
          onChange={(e) => onChange('livingArrangement', e.target.value)}
          className={errors.livingArrangement ? 'error' : ''}
        >
          <option value="">Select arrangement...</option>
          <option value="01">01 - Patient lives alone</option>
          <option value="02">02 - Patient lives with other person(s) in the home</option>
          <option value="03">03 - Patient lives in congregate situation</option>
        </select>
        {errors.livingArrangement && (
          <span className="error-message">{errors.livingArrangement}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="primaryCaregiver">
          Primary Caregiver
        </label>
        <input
          type="text"
          id="primaryCaregiver"
          value={formData.primaryCaregiver}
          onChange={(e) => onChange('primaryCaregiver', e.target.value)}
          placeholder="Name and relationship"
        />
      </div>

      <div className="form-group">
        <label htmlFor="assistanceAvailable">
          Assistance Available
        </label>
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.adlAssistance || false}
              onChange={(e) => onChange('adlAssistance', e.target.checked)}
            />
            <span>ADL assistance</span>
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.iadlAssistance || false}
              onChange={(e) => onChange('iadlAssistance', e.target.checked)}
            />
            <span>IADL assistance</span>
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.medicationAssistance || false}
              onChange={(e) => onChange('medicationAssistance', e.target.checked)}
            />
            <span>Medication administration</span>
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.medicalProcedures || false}
              onChange={(e) => onChange('medicalProcedures', e.target.checked)}
            />
            <span>Medical procedures/treatments</span>
          </label>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="structuralBarriers">
          Structural Barriers in Home (M1041)
        </label>
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.stairsBarrier || false}
              onChange={(e) => onChange('stairsBarrier', e.target.checked)}
            />
            <span>Stairs inside/outside home</span>
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.narrowDoorsBarrier || false}
              onChange={(e) => onChange('narrowDoorsBarrier', e.target.checked)}
            />
            <span>Narrow doors/hallways</span>
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.bathroomBarrier || false}
              onChange={(e) => onChange('bathroomBarrier', e.target.checked)}
            />
            <span>Bathroom not accessible</span>
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.noBarriers || false}
              onChange={(e) => onChange('noBarriers', e.target.checked)}
            />
            <span>None</span>
          </label>
        </div>
      </div>
    </div>
  );
};

const SensoryStatusSection = ({ formData, onChange, errors }) => {
  return (
    <div className="form-section">
      <div className="form-group">
        <label htmlFor="vision">
          Vision (M1200) <span className="required">*</span>
        </label>
        <select
          id="vision"
          value={formData.vision}
          onChange={(e) => onChange('vision', e.target.value)}
          className={errors.vision ? 'error' : ''}
        >
          <option value="">Select vision status...</option>
          <option value="00">00 - Normal vision</option>
          <option value="01">01 - Partially impaired</option>
          <option value="02">02 - Severely impaired</option>
        </select>
        {errors.vision && (
          <span className="error-message">{errors.vision}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="hearing">
          Hearing (M1210) <span className="required">*</span>
        </label>
        <select
          id="hearing"
          value={formData.hearing}
          onChange={(e) => onChange('hearing', e.target.value)}
          className={errors.hearing ? 'error' : ''}
        >
          <option value="">Select hearing status...</option>
          <option value="00">00 - No impairment</option>
          <option value="01">01 - Minimal difficulty</option>
          <option value="02">02 - Moderate difficulty</option>
          <option value="03">03 - Severe impairment</option>
          <option value="04">04 - Unable to hear</option>
        </select>
        {errors.hearing && (
          <span className="error-message">{errors.hearing}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="speechExpression">
          Understanding Verbal Content (M1220)
        </label>
        <select
          id="speechExpression"
          value={formData.speechExpression}
          onChange={(e) => onChange('speechExpression', e.target.value)}
        >
          <option value="">Select status...</option>
          <option value="00">00 - Understands</option>
          <option value="01">01 - Usually understands</option>
          <option value="02">02 - Sometimes understands</option>
          <option value="03">03 - Rarely/never understands</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="speechClarity">
          Speech and Oral Expression (M1230)
        </label>
        <select
          id="speechClarity"
          value={formData.speechClarity || ''}
          onChange={(e) => onChange('speechClarity', e.target.value)}
        >
          <option value="">Select clarity...</option>
          <option value="00">00 - Expresses complex ideas clearly</option>
          <option value="01">01 - Exhibits some difficulty</option>
          <option value="02">02 - Exhibits considerable difficulty</option>
          <option value="03">03 - Speech is not functional</option>
          <option value="04">04 - Unable to speak</option>
        </select>
      </div>
    </div>
  );
};

// AI Assistant Modal
const AiAssistantModal = ({ onClose, section, formData, onSuggestion }) => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Simulate AI generating suggestions
    setLoading(true);
    setTimeout(() => {
      setSuggestions([
        {
          field: 'primaryDiagnosis',
          suggestion: 'Based on referral notes: Z47.1 - Aftercare following joint replacement surgery',
          confidence: 95
        },
        {
          field: 'vision',
          suggestion: 'Patient wears corrective lenses: 01 - Partially impaired',
          confidence: 88
        },
        {
          field: 'hearing',
          suggestion: 'No hearing issues noted: 00 - No impairment',
          confidence: 92
        }
      ]);
      setLoading(false);
    }, 1500);
  }, [section]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content ai-assistant-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-content">
            <h2>AI Assessment Assistant</h2>
            <p>Smart suggestions for {section.title}</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <XCircle size={20} />
          </button>
        </div>

        <div className="modal-body">
          {loading ? (
            <div className="ai-loading">
              <Sparkles size={32} className="spinning" />
              <p>Analyzing patient data and generating suggestions...</p>
            </div>
          ) : (
            <div className="ai-suggestions">
              <div className="suggestion-header">
                <Brain size={20} />
                <h3>AI-Generated Suggestions</h3>
              </div>
              
              {suggestions.map((suggestion, index) => (
                <div key={index} className="suggestion-card">
                  <div className="suggestion-content">
                    <h4>{suggestion.field}</h4>
                    <p>{suggestion.suggestion}</p>
                    <div className="confidence-bar">
                      <span>Confidence: {suggestion.confidence}%</span>
                      <div className="bar">
                        <div 
                          className="fill" 
                          style={{ width: `${suggestion.confidence}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <button 
                    className="apply-btn"
                    onClick={() => {
                      onSuggestion(suggestion.field, suggestion.suggestion.split(': ')[1]);
                      onClose();
                    }}
                  >
                    Apply
                  </button>
                </div>
              ))}
              
              <div className="ai-notes">
                <AlertCircle size={16} />
                <p>
                  These suggestions are based on patient history and common patterns. 
                  Always verify with clinical assessment.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OasisAssessment;