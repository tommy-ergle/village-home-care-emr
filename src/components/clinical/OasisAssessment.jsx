import React, { useState, useEffect } from 'react';
import { 
  FileText, User, Heart, Activity, Brain, Calendar, 
  Home, Users, ChevronRight, Save, Send, Clock,
  CheckCircle, AlertCircle, Info, ChevronDown, ChevronUp,
  Cpu, Mic, Camera, Shield, TrendingUp, BarChart3,
  ArrowLeft, Sparkles, Eye, Pill, ClipboardList,
  Search, X, Plus, Trash2, Phone, MessageSquare,
  Zap, Download, Upload
} from 'lucide-react';
import '../../styles/components/OasisAssessment.css';

const OasisAssessment = ({ patient, onBack }) => {
  const [activeSection, setActiveSection] = useState('patient-info');
  const [formData, setFormData] = useState({
    // Patient Information
    assessmentDate: new Date().toISOString().split('T')[0],
    assessmentType: 'SOC',
    assessmentReason: '',
    medicareNumber: '',
    medicaidNumber: '',
    
    // Clinical Record Items
    m0090_infoCompletedDate: '',
    m0100_reasonForAssessment: '01',
    m0110_episodeTiming: '01',
    
    // Patient History & Diagnoses
    primaryDiagnosis: '',
    otherDiagnoses: [],
    m1021_primaryDiagnosisICD: '',
    m1023_otherDiagnosesICD: [],
    
    // ADL/IADL
    m1800_grooming: '',
    m1810_dressing_upper: '',
    m1820_dressing_lower: '',
    m1830_bathing: '',
    m1840_toilet_transferring: '',
    m1850_transferring: '',
    m1860_ambulation: '',
    
    // Medications
    m2001_drugRegimen: '',
    m2003_medicationFollowUp: '',
    m2005_medicationIntervention: '',
    
    // Care Management
    m2301_emergentCare: '',
    m2310_emergentCareReason: [],
    m2401_intervention: '',
    m2410_inpatientFacility: ''
  });
  
  const [errors, setErrors] = useState({});
  const [completionStatus, setCompletionStatus] = useState({});
  const [aiSuggestions, setAiSuggestions] = useState({});
  const [voiceRecording, setVoiceRecording] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const sections = [
    { id: 'patient-info', label: 'Patient Information', icon: User },
    { id: 'clinical-record', label: 'Clinical Record', icon: FileText },
    { id: 'patient-history', label: 'History & Diagnoses', icon: Heart },
    { id: 'living-conditions', label: 'Living Conditions', icon: Home },
    { id: 'sensory-status', label: 'Sensory Status', icon: Eye },
    { id: 'integumentary-status', label: 'Integumentary', icon: Shield },
    { id: 'respiratory-status', label: 'Respiratory', icon: Activity },
    { id: 'elimination-status', label: 'Elimination', icon: ClipboardList },
    { id: 'neuro-emotional', label: 'Neuro/Emotional', icon: Brain },
    { id: 'adl-iadl', label: 'ADL/IADL', icon: User },
    { id: 'medications', label: 'Medications', icon: Pill },
    { id: 'care-management', label: 'Care Management', icon: ClipboardList }
  ];

  // Calculate overall progress
  const overallProgress = Math.round(
    (Object.keys(completionStatus).filter(key => completionStatus[key]).length / sections.length) * 100
  );

  // AI Analysis simulation
  useEffect(() => {
    if (formData.primaryDiagnosis && !aiSuggestions['patient-history']) {
      setAiAnalyzing(true);
      setTimeout(() => {
        setAiSuggestions(prev => ({
          ...prev,
          'patient-history': {
            riskScore: 'Medium',
            recommendations: [
              'Consider cardiac monitoring based on diagnosis pattern',
              'Recommend fall risk assessment protocol',
              'Suggest medication reconciliation'
            ]
          }
        }));
        setAiAnalyzing(false);
      }, 1500);
    }
  }, [formData.primaryDiagnosis]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear validation error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateSection = (sectionId) => {
    const validationErrors = {};
    
    switch (sectionId) {
      case 'patient-info':
        if (!formData.assessmentDate) validationErrors.assessmentDate = 'Assessment date is required';
        if (!formData.assessmentType) validationErrors.assessmentType = 'Assessment type is required';
        break;
      case 'clinical-record':
        if (!formData.m0090_infoCompletedDate) validationErrors.m0090_infoCompletedDate = 'Date information completed is required';
        break;
      case 'patient-history':
        if (!formData.primaryDiagnosis) validationErrors.primaryDiagnosis = 'Primary diagnosis is required';
        if (!formData.m1021_primaryDiagnosisICD) validationErrors.m1021_primaryDiagnosisICD = 'Primary diagnosis ICD code is required';
        break;
      default:
        break;
    }
    
    return validationErrors;
  };

  const handleSectionComplete = () => {
    const validationErrors = validateSection(activeSection);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setCompletionStatus(prev => ({ ...prev, [activeSection]: true }));
    
    // Auto-advance to next section
    const currentIndex = sections.findIndex(s => s.id === activeSection);
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1].id);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save operation
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const handleSubmit = () => {
    // Submit assessment logic
    console.log('Submitting assessment:', formData);
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'patient-info':
        return <PatientInfoSection formData={formData} onChange={handleInputChange} errors={errors} />;
      case 'clinical-record':
        return <ClinicalRecordSection formData={formData} onChange={handleInputChange} errors={errors} />;
      case 'patient-history':
        return <PatientHistorySection formData={formData} onChange={handleInputChange} errors={errors} />;
      case 'adl-iadl':
        return <ADLIADLSection formData={formData} onChange={handleInputChange} errors={errors} />;
      case 'medications':
        return <MedicationsSection formData={formData} onChange={handleInputChange} errors={errors} />;
      case 'care-management':
        return <CareManagementSection formData={formData} onChange={handleInputChange} errors={errors} />;
      default:
        return (
          <div className="empty-section-apple">
            <div className="empty-icon">
              <FileText size={48} />
            </div>
            <h3>Section Under Development</h3>
            <p>This section is being enhanced with AI capabilities.</p>
          </div>
        );
    }
  };

  return (
    <div className="oasis-container apple-design">
      {/* AI Assistant Bar */}
      <div className="ai-assistant-bar">
        <div className="ai-status">
          <Cpu className="ai-icon" />
          <span className="ai-label">AI Assistant</span>
          <span className={`ai-indicator ${aiAnalyzing ? 'analyzing' : 'ready'}`} />
        </div>
        <div className="ai-actions">
          <button 
            className={`ai-action-btn ${voiceRecording ? 'recording' : ''}`}
            onClick={() => setVoiceRecording(!voiceRecording)}
          >
            <Mic size={18} />
            {voiceRecording ? 'Recording...' : 'Voice Input'}
          </button>
          <button className="ai-action-btn">
            <Camera size={18} />
            Scan Document
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="oasis-header-apple">
        <div className="header-nav">
          <button onClick={onBack} className="back-btn-apple">
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          {patient && (
            <div className="patient-badge">
              <span className="patient-name">{patient.firstName} {patient.lastName}</span>
              <span className="patient-meta">MRN: {patient.mrn}</span>
            </div>
          )}
        </div>
        <div className="header-content">
          <h1 className="page-title">OASIS-E Assessment</h1>
          <p className="page-subtitle">Comprehensive patient evaluation powered by AI</p>
        </div>
        <div className="header-actions">
          <button className="btn-icon-apple">
            <Download size={18} />
          </button>
          <button className="btn-icon-apple">
            <Upload size={18} />
          </button>
          <button className="btn-secondary-apple">
            <Clock size={18} />
            Save Draft
          </button>
          <button className="btn-primary-apple" onClick={handleSubmit}>
            <Send size={18} />
            Submit Assessment
          </button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="progress-container-apple">
        <div className="progress-stats">
          <div className="progress-stat">
            <span className="stat-value">{overallProgress}%</span>
            <span className="stat-label">Complete</span>
          </div>
          <div className="progress-stat">
            <span className="stat-value">{sections.filter(s => completionStatus[s.id]).length}</span>
            <span className="stat-label">of {sections.length} sections</span>
          </div>
          <div className="progress-stat">
            <TrendingUp size={16} className="stat-icon" />
            <span className="stat-label">AI Insights Available</span>
          </div>
        </div>
        <div className="progress-bar-apple">
          <div 
            className="progress-fill-apple"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="assessment-content-apple">
        {/* Sidebar Navigation */}
        <div className="oasis-sidebar-apple">
          <nav className="sidebar-nav">
            {sections.map((section, index) => {
              const isCompleted = completionStatus[section.id];
              const isActive = activeSection === section.id;
              const Icon = section.icon;
              
              return (
                <button
                  key={section.id}
                  className={`nav-item-apple ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <div className="nav-item-content">
                    <Icon size={20} className="nav-icon" />
                    <span className="nav-label">{section.label}</span>
                  </div>
                  {isCompleted && <CheckCircle size={18} className="complete-icon" />}
                </button>
              );
            })}
          </nav>

          {/* AI Insights Panel */}
          {aiSuggestions[activeSection] && (
            <div className="ai-insights-panel">
              <div className="insights-header">
                <Shield size={18} />
                <h4>AI Analysis</h4>
              </div>
              <div className="risk-indicator">
                <span className="risk-label">Risk Level:</span>
                <span className={`risk-value ${aiSuggestions[activeSection].riskScore?.toLowerCase()}`}>
                  {aiSuggestions[activeSection].riskScore}
                </span>
              </div>
              <div className="insights-list">
                {aiSuggestions[activeSection].recommendations?.map((rec, idx) => (
                  <div key={idx} className="insight-item">
                    <div className="insight-dot" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Form Content */}
        <main className="assessment-form-apple">
          <div className="form-section-apple">
            <div className="section-header-apple">
              <h2>{sections.find(s => s.id === activeSection)?.label}</h2>
              {completionStatus[activeSection] && (
                <div className="section-complete">
                  <CheckCircle size={20} />
                  <span>Section Complete</span>
                </div>
              )}
            </div>
            
            <div className="section-content-apple">
              {renderSectionContent()}
            </div>
            
            <div className="section-actions-apple">
              <button 
                className="btn-secondary-apple"
                onClick={() => {
                  const currentIndex = sections.findIndex(s => s.id === activeSection);
                  if (currentIndex > 0) {
                    setActiveSection(sections[currentIndex - 1].id);
                  }
                }}
                disabled={sections.findIndex(s => s.id === activeSection) === 0}
              >
                Previous
              </button>
              
              <button 
                className="btn-primary-apple"
                onClick={handleSectionComplete}
              >
                {sections.findIndex(s => s.id === activeSection) === sections.length - 1 
                  ? 'Complete Assessment' 
                  : 'Save & Continue'}
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Success Notification */}
      {showSuccess && (
        <div className="notification-apple success">
          <CheckCircle size={20} />
          <span>Assessment saved successfully</span>
        </div>
      )}
    </div>
  );
};

// Section Components
const PatientInfoSection = ({ formData, onChange, errors }) => {
  const assessmentTypes = [
    { 
      id: 'soc', 
      label: 'Start of Care', 
      description: 'Initial comprehensive assessment',
      aiFeature: 'AI-assisted intake analysis'
    },
    { 
      id: 'recert', 
      label: 'Recertification', 
      description: 'Periodic reassessment',
      aiFeature: 'Progress tracking & predictions'
    },
    { 
      id: 'followup', 
      label: 'Follow-up', 
      description: 'Routine evaluation',
      aiFeature: 'Automated change detection'
    },
    { 
      id: 'discharge', 
      label: 'Discharge', 
      description: 'End of care assessment',
      aiFeature: 'Outcome analysis & reporting'
    }
  ];

  return (
    <div className="form-content-apple">
      <div className="form-group-apple">
        <label className="form-label-apple required">Assessment Date</label>
        <input
          type="date"
          value={formData.assessmentDate}
          onChange={(e) => onChange('assessmentDate', e.target.value)}
          className={`form-input-apple ${errors.assessmentDate ? 'error' : ''}`}
        />
        {errors.assessmentDate && (
          <span className="error-message-apple">
            <AlertCircle size={14} />
            {errors.assessmentDate}
          </span>
        )}
      </div>

      <div className="form-group-apple">
        <label className="form-label-apple required">Assessment Type</label>
        <div className="assessment-type-grid-apple">
          {assessmentTypes.map(type => (
            <button 
              key={type.id}
              className={`assessment-type-card-apple ${formData.assessmentType === type.id.toUpperCase() ? 'selected' : ''}`}
              onClick={() => onChange('assessmentType', type.id.toUpperCase())}
            >
              <div className="type-header">
                <h3>{type.label}</h3>
                <ChevronRight size={20} className="type-arrow" />
              </div>
              <p className="type-description">{type.description}</p>
              <div className="ai-feature-tag">
                <Cpu size={14} />
                <span>{type.aiFeature}</span>
              </div>
            </button>
          ))}
        </div>
        {errors.assessmentType && (
          <span className="error-message-apple">
            <AlertCircle size={14} />
            {errors.assessmentType}
          </span>
        )}
      </div>

      <div className="form-row-apple">
        <div className="form-group-apple">
          <label className="form-label-apple">Medicare Number</label>
          <input
            type="text"
            value={formData.medicareNumber}
            onChange={(e) => onChange('medicareNumber', e.target.value)}
            className="form-input-apple"
            placeholder="Enter Medicare number"
          />
        </div>

        <div className="form-group-apple">
          <label className="form-label-apple">Medicaid Number</label>
          <input
            type="text"
            value={formData.medicaidNumber}
            onChange={(e) => onChange('medicaidNumber', e.target.value)}
            className="form-input-apple"
            placeholder="Enter Medicaid number"
          />
        </div>
      </div>

      <div className="form-group-apple">
        <label className="form-label-apple">Assessment Notes</label>
        <textarea
          value={formData.assessmentReason}
          onChange={(e) => onChange('assessmentReason', e.target.value)}
          className="form-textarea-apple"
          rows={4}
          placeholder="Enter any additional notes or observations..."
        />
      </div>
    </div>
  );
};

const ClinicalRecordSection = ({ formData, onChange, errors }) => {
  const reasonsForAssessment = [
    { value: '01', label: 'Start of care—further visits planned' },
    { value: '03', label: 'Resumption of care (after inpatient stay)' },
    { value: '04', label: 'Recertification (follow-up) reassessment' },
    { value: '05', label: 'Other follow-up' },
    { value: '06', label: 'Transferred to an inpatient facility—patient not discharged from agency' },
    { value: '07', label: 'Transferred to an inpatient facility—patient discharged from agency' },
    { value: '08', label: 'Death at home' },
    { value: '09', label: 'Discharge from agency' }
  ];

  const episodeTimings = [
    { value: '01', label: 'Early', description: 'Within first 30 days' },
    { value: '02', label: 'Later', description: '31 days or more after SOC/ROC' },
    { value: 'UK', label: 'Unknown', description: 'Timing uncertain' },
    { value: 'NA', label: 'Not Applicable', description: 'Does not apply' }
  ];

  return (
    <div className="form-content-apple">
      <div className="form-group-apple">
        <label className="form-label-apple required">M0090: Date Assessment Completed</label>
        <input
          type="date"
          value={formData.m0090_infoCompletedDate}
          onChange={(e) => onChange('m0090_infoCompletedDate', e.target.value)}
          className={`form-input-apple ${errors.m0090_infoCompletedDate ? 'error' : ''}`}
        />
        {errors.m0090_infoCompletedDate && (
          <span className="error-message-apple">
            <AlertCircle size={14} />
            {errors.m0090_infoCompletedDate}
          </span>
        )}
      </div>

      <div className="form-group-apple">
        <label className="form-label-apple required">M0100: Reason for Assessment</label>
        <select
          value={formData.m0100_reasonForAssessment}
          onChange={(e) => onChange('m0100_reasonForAssessment', e.target.value)}
          className="form-select-apple"
        >
          {reasonsForAssessment.map(reason => (
            <option key={reason.value} value={reason.value}>
              {reason.value} - {reason.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group-apple">
        <label className="form-label-apple">M0110: Episode Timing</label>
        <div className="radio-group-apple">
          {episodeTimings.map(timing => (
            <label key={timing.value} className="radio-item-apple">
              <input
                type="radio"
                name="episodeTiming"
                value={timing.value}
                checked={formData.m0110_episodeTiming === timing.value}
                onChange={(e) => onChange('m0110_episodeTiming', e.target.value)}
              />
              <div className="radio-content">
                <span className="radio-label">{timing.label}</span>
                <span className="radio-description">{timing.description}</span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

const PatientHistorySection = ({ formData, onChange, errors }) => {
  const [showDiagnosisSearch, setShowDiagnosisSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock diagnosis data - in production, this would come from an API
  const commonDiagnoses = [
    { code: 'E11.9', description: 'Type 2 diabetes mellitus without complications', category: 'Endocrine' },
    { code: 'I10', description: 'Essential (primary) hypertension', category: 'Cardiovascular' },
    { code: 'I50.9', description: 'Heart failure, unspecified', category: 'Cardiovascular' },
    { code: 'J44.0', description: 'COPD with acute lower respiratory infection', category: 'Respiratory' },
    { code: 'M79.3', description: 'Myalgia', category: 'Musculoskeletal' },
    { code: 'Z48.812', description: 'Encounter for surgical aftercare following surgery on the circulatory system', category: 'Aftercare' }
  ];

  const filteredDiagnoses = commonDiagnoses.filter(d => 
    d.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="form-content-apple">
      <div className="form-group-apple">
        <label className="form-label-apple required">M1021: Primary Diagnosis</label>
        <div className="diagnosis-input-group">
          <input
            type="text"
            value={formData.m1021_primaryDiagnosisICD}
            onChange={(e) => onChange('m1021_primaryDiagnosisICD', e.target.value)}
            className={`form-input-apple ${errors.m1021_primaryDiagnosisICD ? 'error' : ''}`}
            placeholder="ICD-10 Code"
          />
          <input
            type="text"
            value={formData.primaryDiagnosis}
            onChange={(e) => onChange('primaryDiagnosis', e.target.value)}
            className={`form-input-apple ${errors.primaryDiagnosis ? 'error' : ''}`}
            placeholder="Diagnosis Description"
          />
          <button 
            className="btn-icon-apple"
            onClick={() => setShowDiagnosisSearch(!showDiagnosisSearch)}
          >
            <Search size={18} />
          </button>
        </div>
        {errors.m1021_primaryDiagnosisICD && (
          <span className="error-message-apple">
            <AlertCircle size={14} />
            {errors.m1021_primaryDiagnosisICD}
          </span>
        )}
      </div>

      {showDiagnosisSearch && (
        <div className="diagnosis-search-panel-apple">
          <div className="search-header">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input-apple"
              placeholder="Search diagnoses..."
              autoFocus
            />
            <button 
              className="btn-icon-apple"
              onClick={() => setShowDiagnosisSearch(false)}
            >
              <X size={18} />
            </button>
          </div>
          <div className="search-results-apple">
            {filteredDiagnoses.map(diagnosis => (
              <button
                key={diagnosis.code}
                className="diagnosis-result-apple"
                onClick={() => {
                  onChange('m1021_primaryDiagnosisICD', diagnosis.code);
                  onChange('primaryDiagnosis', diagnosis.description);
                  setShowDiagnosisSearch(false);
                  setSearchTerm('');
                }}
              >
                <div className="diagnosis-info">
                  <span className="diagnosis-code">{diagnosis.code}</span>
                  <span className="diagnosis-desc">{diagnosis.description}</span>
                </div>
                <span className="diagnosis-category">{diagnosis.category}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="form-group-apple">
        <div className="section-header-flex">
          <label className="form-label-apple">M1023: Other Diagnoses</label>
          <button 
            className="btn-text-apple"
            onClick={() => onChange('otherDiagnoses', [...(formData.otherDiagnoses || []), { code: '', description: '' }])}
          >
            <Plus size={16} />
            Add Diagnosis
          </button>
        </div>
        
        {(formData.otherDiagnoses || []).map((diagnosis, index) => (
          <div key={index} className="diagnosis-row-apple">
            <span className="row-number">{index + 1}</span>
            <input
              type="text"
              value={diagnosis.code}
              onChange={(e) => {
                const updated = [...(formData.otherDiagnoses || [])];
                updated[index].code = e.target.value;
                onChange('otherDiagnoses', updated);
              }}
              className="form-input-apple"
              placeholder="ICD-10"
            />
            <input
              type="text"
              value={diagnosis.description}
              onChange={(e) => {
                const updated = [...(formData.otherDiagnoses || [])];
                updated[index].description = e.target.value;
                onChange('otherDiagnoses', updated);
              }}
              className="form-input-apple"
              placeholder="Description"
            />
            <button 
              className="btn-icon-apple"
              onClick={() => {
                const updated = [...(formData.otherDiagnoses || [])];
                updated.splice(index, 1);
                onChange('otherDiagnoses', updated);
              }}
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const ADLIADLSection = ({ formData, onChange, errors }) => {
  const adlItems = [
    { id: 'bathing', field: 'm1830_bathing', label: 'Bathing' },
    { id: 'dressing', field: 'm1810_dressing_upper', label: 'Dressing' },
    { id: 'toileting', field: 'm1840_toilet_transferring', label: 'Toileting' },
    { id: 'transferring', field: 'm1850_transferring', label: 'Transferring' },
    { id: 'eating', field: 'm1860_ambulation', label: 'Eating' },
    { id: 'walking', field: 'm1800_grooming', label: 'Walking' }
  ];

  return (
    <div className="form-section-apple">
      <div className="section-header-apple">
        <h2>Activities of Daily Living</h2>
        <p className="section-description">Assess patient's functional abilities</p>
      </div>
      
      <div className="adl-grid-apple">
        {adlItems.map(item => {
          const value = formData[item.field] || '';
          return (
            <div key={item.id} className="adl-item-apple">
              <h4>{item.label}</h4>
              <div className="adl-selector">
                {['Independent', 'Needs assistance', 'Dependent', 'Unable'].map((level, idx) => (
                  <button
                    key={idx}
                    className={`adl-option ${value == idx ? 'selected' : ''}`}
                    onClick={() => onChange(item.field, idx.toString())}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="adl-analysis-apple">
        <div className="analysis-card">
          <div className="analysis-header">
            <BarChart3 size={20} />
            <h3>Functional Analysis</h3>
          </div>
          <div className="analysis-metrics">
            <div className="metric">
              <span className="metric-value">
                {adlItems.reduce((sum, item) => sum + (parseInt(formData[item.field] || 0)), 0)}
              </span>
              <span className="metric-label">ADL Score</span>
            </div>
            <div className="metric">
              <span className="metric-value">Moderate</span>
              <span className="metric-label">Independence Level</span>
            </div>
          </div>
          <div className="ai-recommendation">
            <Cpu size={16} />
            <p>AI recommends occupational therapy evaluation based on ADL pattern</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MedicationsSection = ({ formData, onChange, errors }) => {
  const drugRegimenOptions = [
    { value: '0', label: 'No issues', description: 'Medication management is appropriate' },
    { value: '1', label: 'Minimal issues', description: 'Minor concerns, likely to improve' },
    { value: '2', label: 'Moderate issues', description: 'Significant concerns, unclear if improvement likely' },
    { value: '3', label: 'Significant issues', description: 'Major concerns, improvement unlikely' },
    { value: 'NA', label: 'Not applicable', description: 'No medications prescribed' }
  ];

  return (
    <div className="form-content-apple">
      <div className="form-group-apple">
        <label className="form-label-apple">M2001: Drug Regimen Review</label>
        <div className="radio-group-cards-apple">
          {drugRegimenOptions.map(option => (
            <label key={option.value} className="radio-card-apple">
              <input
                type="radio"
                name="drugRegimen"
                value={option.value}
                checked={formData.m2001_drugRegimen === option.value}
                onChange={(e) => onChange('m2001_drugRegimen', e.target.value)}
              />
              <div className="radio-card-content">
                <h4>{option.label}</h4>
                <p>{option.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="form-row-apple">
        <div className="form-group-apple">
          <label className="form-label-apple">M2003: Medication Follow-up</label>
          <div className="segmented-control">
            <button
              className={`segment ${formData.m2003_medicationFollowUp === '0' ? 'active' : ''}`}
              onClick={() => onChange('m2003_medicationFollowUp', '0')}
            >
              No
            </button>
            <button
              className={`segment ${formData.m2003_medicationFollowUp === '1' ? 'active' : ''}`}
              onClick={() => onChange('m2003_medicationFollowUp', '1')}
            >
              Yes
            </button>
          </div>
        </div>

        <div className="form-group-apple">
          <label className="form-label-apple">M2005: Medication Intervention</label>
          <div className="segmented-control">
            <button
              className={`segment ${formData.m2005_medicationIntervention === '0' ? 'active' : ''}`}
              onClick={() => onChange('m2005_medicationIntervention', '0')}
            >
              No
            </button>
            <button
              className={`segment ${formData.m2005_medicationIntervention === '1' ? 'active' : ''}`}
              onClick={() => onChange('m2005_medicationIntervention', '1')}
            >
              Yes
            </button>
            <button
              className={`segment ${formData.m2005_medicationIntervention === 'NA' ? 'active' : ''}`}
              onClick={() => onChange('m2005_medicationIntervention', 'NA')}
            >
              N/A
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CareManagementSection = ({ formData, onChange, errors }) => {
  const emergentCareReasons = [
    { value: '1', label: 'Medication issues' },
    { value: '2', label: 'Injury from fall' },
    { value: '3', label: 'Respiratory infection' },
    { value: '4', label: 'Other respiratory' },
    { value: '5', label: 'Heart failure' },
    { value: '6', label: 'Cardiac dysrhythmia' },
    { value: '7', label: 'MI or chest pain' },
    { value: '8', label: 'Other heart disease' },
    { value: '9', label: 'Stroke or TIA' },
    { value: '10', label: 'Diabetes issues' }
  ];

  return (
    <div className="form-content-apple">
      <div className="form-group-apple">
        <label className="form-label-apple">M2301: Emergent Care</label>
        <div className="segmented-control-large">
          <button
            className={`segment ${formData.m2301_emergentCare === '0' ? 'active' : ''}`}
            onClick={() => onChange('m2301_emergentCare', '0')}
          >
            No emergency care
          </button>
          <button
            className={`segment ${formData.m2301_emergentCare === '1' ? 'active' : ''}`}
            onClick={() => onChange('m2301_emergentCare', '1')}
          >
            ED visit (no admission)
          </button>
          <button
            className={`segment ${formData.m2301_emergentCare === '2' ? 'active' : ''}`}
            onClick={() => onChange('m2301_emergentCare', '2')}
          >
            ED visit with admission
          </button>
        </div>
      </div>

      {(formData.m2301_emergentCare === '1' || formData.m2301_emergentCare === '2') && (
        <div className="form-group-apple">
          <label className="form-label-apple">M2310: Reason for Emergent Care</label>
          <div className="checkbox-grid-apple">
            {emergentCareReasons.map(reason => (
              <label key={reason.value} className="checkbox-item-apple">
                <input
                  type="checkbox"
                  value={reason.value}
                  checked={(formData.m2310_emergentCareReason || []).includes(reason.value)}
                  onChange={(e) => {
                    const current = formData.m2310_emergentCareReason || [];
                    if (e.target.checked) {
                      onChange('m2310_emergentCareReason', [...current, reason.value]);
                    } else {
                      onChange('m2310_emergentCareReason', current.filter(v => v !== reason.value));
                    }
                  }}
                />
                <span>{reason.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OasisAssessment;