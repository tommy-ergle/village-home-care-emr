import React, { useState } from 'react';
import { 
  Brain, FileText, Heart, Shield, Plus, Save, 
  ChevronRight, Check, AlertCircle, Sparkles,
  Clock, TrendingUp, Award, BarChart3, 
  Stethoscope, Activity, Edit
} from 'lucide-react';
import '../../styles/AIDocumentation.css';

const AIDocumentation = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [oasisSection, setOasisSection] = useState('administrative');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [noteType, setNoteType] = useState('skilled-nursing');
  const [noteContent, setNoteContent] = useState('');
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Sample OASIS form data
  const [oasisData, setOasisData] = useState({
    patientName: '',
    assessmentDate: '',
    assessmentReason: '',
    primaryDiagnosis: '',
    livingArrangement: '',
    priorFunctioning: '',
    cognitiveFunction: '',
    communicationStatus: '',
    visionStatus: '',
    hearingStatus: '',
    painFrequency: '',
    painInterfering: '',
    adlDressing: '',
    adlBathing: '',
    adlToileting: '',
    adlTransferring: '',
    medicationManagement: '',
    woundStatus: '',
    fallRisk: ''
  });

  // Sample patients for OASIS
  const patients = [
    { id: 1, name: 'Sarah Johnson', lastOasis: '2025-06-28', due: '2025-08-28' },
    { id: 2, name: 'Robert Chen', lastOasis: '2025-06-15', due: '2025-08-15' },
    { id: 3, name: 'Maria Rodriguez', lastOasis: '2025-07-01', due: '2025-09-01' }
  ];

  // AI Templates for notes
  const aiTemplates = [
    {
      id: 1,
      title: 'Skilled Nursing Visit',
      description: 'Standard nursing assessment template',
      icon: Stethoscope
    },
    {
      id: 2,
      title: 'Wound Care Assessment',
      description: 'Detailed wound documentation',
      icon: Activity
    },
    {
      id: 3,
      title: 'Medication Management',
      description: 'Medication reconciliation and education',
      icon: Shield
    },
    {
      id: 4,
      title: 'Fall Risk Assessment',
      description: 'Comprehensive fall risk evaluation',
      icon: AlertCircle
    }
  ];

  // Care plan sections
  const [carePlanData, setCarePlanData] = useState({
    diagnosis: '',
    goals: [],
    interventions: [],
    expectedOutcomes: []
  });

  const oasisSections = [
    { id: 'administrative', label: 'Administrative', completed: false },
    { id: 'demographics', label: 'Demographics', completed: false },
    { id: 'diagnoses', label: 'Diagnoses', completed: false },
    { id: 'livingArrangement', label: 'Living Arrangement', completed: false },
    { id: 'sensory', label: 'Sensory Status', completed: false },
    { id: 'integumentary', label: 'Integumentary', completed: false },
    { id: 'respiratory', label: 'Respiratory', completed: false },
    { id: 'elimination', label: 'Elimination', completed: false },
    { id: 'neurological', label: 'Neuro/Emotional', completed: false },
    { id: 'adl', label: 'ADLs/IADLs', completed: false },
    { id: 'medications', label: 'Medications', completed: false },
    { id: 'careManagement', label: 'Care Management', completed: false }
  ];

  const calculateOasisProgress = () => {
    const completedSections = oasisSections.filter(s => s.completed).length;
    return Math.round((completedSections / oasisSections.length) * 100);
  };

  const handleAIGenerate = async (type) => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      if (type === 'note') {
        setNoteContent(`Patient visited for skilled nursing assessment.

SUBJECTIVE:
Patient reports feeling well today with no new complaints. States pain level is 2/10, well-controlled with current medications. Ambulating independently with walker, no recent falls.

OBJECTIVE:
Vital Signs: BP 128/78, HR 72, RR 18, Temp 98.4°F, O2 Sat 98% on RA
General: Alert and oriented x4, pleasant and cooperative
Cardiovascular: Regular rate and rhythm, no edema noted
Respiratory: Lungs clear to auscultation bilaterally
Integumentary: Surgical incision clean, dry, and intact with no signs of infection

ASSESSMENT:
Patient demonstrating good progress with post-surgical recovery. Vital signs stable, wound healing appropriately.

PLAN:
1. Continue current medication regimen
2. Monitor surgical site for signs of infection
3. Encourage ambulation with assistive device
4. PT evaluation scheduled for next week
5. Follow up visit in 3 days`);
      } else if (type === 'careplan') {
        setCarePlanData({
          diagnosis: oasisData.primaryDiagnosis || 'Post-surgical recovery',
          goals: [
            'Patient will demonstrate proper wound care technique by next visit',
            'Patient will ambulate 150 feet with walker independently within 2 weeks',
            'Patient will verbalize understanding of medication regimen within 1 week',
            'Patient will maintain pain level at 3/10 or less'
          ],
          interventions: [
            'Skilled nursing visits 3x/week for wound assessment and care',
            'Physical therapy evaluation and treatment 2x/week',
            'Medication reconciliation and education each visit',
            'Pain assessment and management strategies',
            'Fall risk assessment and home safety evaluation'
          ],
          expectedOutcomes: [
            'Wound healing without complications',
            'Increased independence with mobility',
            'Medication compliance at 100%',
            'No falls or adverse events'
          ]
        });
      }
      setIsGenerating(false);
    }, 2000);
  };

  const renderDashboard = () => (
    <div>
      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">47</div>
          <div className="stat-label">OASIS Completed</div>
          <div className="stat-change positive">
            <TrendingUp size={12} />
            <span>23% this month</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-value">156</div>
          <div className="stat-label">Clinical Notes</div>
          <div className="stat-change positive">
            <TrendingUp size={12} />
            <span>18% this week</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-value">34</div>
          <div className="stat-label">Care Plans Generated</div>
          <div className="stat-change positive">
            <TrendingUp size={12} />
            <span>AI-assisted</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-value">52%</div>
          <div className="stat-label">Time Saved</div>
          <div className="stat-change positive">
            <Award size={12} />
            <span>With AI assistance</span>
          </div>
        </div>
      </div>

      {/* Documentation Cards */}
      <div className="doc-cards-grid">
        <div className="doc-card" onClick={() => setActiveModule('oasis')}>
          <div className="doc-card-header">
            <div className="doc-card-icon icon-blue">
              <FileText size={24} color="#2563eb" />
            </div>
            <div className="doc-card-content">
              <h3>OASIS Assessments</h3>
              <p>AI-powered OASIS completion with smart suggestions</p>
            </div>
          </div>
          <div style={{ marginTop: '16px' }}>
            <div style={{ 
              padding: '12px', 
              background: '#eff6ff', 
              borderRadius: '8px',
              fontSize: '14px'
            }}>
              <strong style={{ color: '#1e40af' }}>3 assessments due this week</strong>
              <div style={{ marginTop: '8px', color: '#3730a3' }}>
                Next: Sarah Johnson - Due tomorrow
              </div>
            </div>
            <button className="ai-action-btn" style={{ marginTop: '12px', width: '100%' }}>
              Start Assessment →
            </button>
          </div>
        </div>

        <div className="doc-card" onClick={() => setActiveModule('notes')}>
          <div className="doc-card-header">
            <div className="doc-card-icon icon-purple">
              <Edit size={24} color="#7c3aed" />
            </div>
            <div className="doc-card-content">
              <h3>Clinical Notes</h3>
              <p>Intelligent note generation with templates</p>
            </div>
          </div>
          <div style={{ marginTop: '16px' }}>
            <div style={{ 
              padding: '12px', 
              background: '#f3e8ff', 
              borderRadius: '8px',
              fontSize: '14px'
            }}>
              <strong style={{ color: '#6b21a8' }}>Quick Templates Available</strong>
              <div style={{ marginTop: '8px', color: '#581c87' }}>
                Skilled Nursing • PT/OT • Wound Care
              </div>
            </div>
            <button className="ai-action-btn" style={{ marginTop: '12px', width: '100%' }}>
              Create Note →
            </button>
          </div>
        </div>

        <div className="doc-card" onClick={() => setActiveModule('careplan')}>
          <div className="doc-card-header">
            <div className="doc-card-icon icon-green">
              <Heart size={24} color="#10b981" />
            </div>
            <div className="doc-card-content">
              <h3>Care Plan Generator</h3>
              <p>Evidence-based care plans in seconds</p>
            </div>
          </div>
          <div style={{ marginTop: '16px' }}>
            <div style={{ 
              padding: '12px', 
              background: '#d1fae5', 
              borderRadius: '8px',
              fontSize: '14px'
            }}>
              <strong style={{ color: '#065f46' }}>Recent Generation</strong>
              <div style={{ marginTop: '8px', color: '#064e3b' }}>
                Post-surgical care plan • 5 goals • 8 interventions
              </div>
            </div>
            <button className="ai-action-btn" style={{ marginTop: '12px', width: '100%' }}>
              Generate Plan →
            </button>
          </div>
        </div>

        <div className="doc-card">
          <div className="doc-card-header">
            <div className="doc-card-icon icon-yellow">
              <Shield size={24} color="#f59e0b" />
            </div>
            <div className="doc-card-content">
              <h3>Compliance Check</h3>
              <p>Automated quality assurance</p>
            </div>
          </div>
          <div style={{ marginTop: '16px' }}>
            <div style={{ 
              padding: '12px', 
              background: '#fef3c7', 
              borderRadius: '8px',
              fontSize: '14px'
            }}>
              <strong style={{ color: '#92400e' }}>Compliance Score: 98.4%</strong>
              <div style={{ marginTop: '8px', color: '#78350f' }}>
                2 items need review
              </div>
            </div>
            <button className="ai-action-btn" style={{ marginTop: '12px', width: '100%' }}>
              Review Items →
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOasisForm = () => (
    <div className="oasis-container">
      <div className="oasis-header">
        <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>
          OASIS-E Assessment
        </h3>
        <p style={{ margin: '8px 0 0 0', color: '#6b7280' }}>
          {selectedPatient ? selectedPatient.name : 'Select a patient to begin'}
        </p>
        <div className="oasis-progress">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>Progress</span>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>{calculateOasisProgress()}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${calculateOasisProgress()}%` }}></div>
          </div>
        </div>
      </div>

      <div className="oasis-navigation">
        {oasisSections.map((section) => (
          <button
            key={section.id}
            className={`oasis-nav-item ${oasisSection === section.id ? 'active' : ''} ${section.completed ? 'completed' : ''}`}
            onClick={() => setOasisSection(section.id)}
          >
            {section.completed && <Check size={14} style={{ marginRight: '4px' }} />}
            {section.label}
          </button>
        ))}
      </div>

      <div className="oasis-form-section">
        {oasisSection === 'administrative' && (
          <>
            <h3 className="form-section-title">Administrative Information</h3>
            
            {!selectedPatient && (
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ marginBottom: '12px' }}>Select Patient</h4>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {patients.map(patient => (
                    <div
                      key={patient.id}
                      onClick={() => setSelectedPatient(patient)}
                      style={{
                        padding: '16px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      className="template-item"
                    >
                      <div style={{ fontWeight: '500' }}>{patient.name}</div>
                      <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
                        Last OASIS: {patient.lastOasis} • Due: {patient.due}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="oasis-form-group">
              <label className="oasis-label">
                Assessment Date <span className="required">*</span>
              </label>
              <input
                type="date"
                className="oasis-input"
                value={oasisData.assessmentDate}
                onChange={(e) => setOasisData({...oasisData, assessmentDate: e.target.value})}
              />
            </div>

            <div className="oasis-form-group">
              <label className="oasis-label">
                Reason for Assessment <span className="required">*</span>
              </label>
              <select
                className="oasis-select"
                value={oasisData.assessmentReason}
                onChange={(e) => setOasisData({...oasisData, assessmentReason: e.target.value})}
              >
                <option value="">Select reason...</option>
                <option value="start">Start of Care</option>
                <option value="resumption">Resumption of Care</option>
                <option value="recert">Recertification</option>
                <option value="other">Other Follow-up</option>
                <option value="transfer">Transfer</option>
                <option value="discharge">Discharge</option>
              </select>
            </div>

            <div className="ai-suggestion-box">
              <div className="ai-suggestion-header">
                <Sparkles size={16} />
                <span>AI Suggestion</span>
              </div>
              <div className="ai-suggestion-content">
                Based on the patient's last assessment date, this appears to be a Recertification assessment. 
                The 60-day recertification period ended on {selectedPatient?.due || 'N/A'}.
              </div>
              <div className="ai-actions">
                <button className="ai-action-btn" onClick={() => setOasisData({...oasisData, assessmentReason: 'recert'})}>
                  Apply Suggestion
                </button>
                <button className="ai-action-btn">
                  Learn More
                </button>
              </div>
            </div>
          </>
        )}

        {oasisSection === 'diagnoses' && (
          <>
            <h3 className="form-section-title">Diagnoses</h3>
            
            <div className="oasis-form-group">
              <label className="oasis-label">
                M1021 - Primary Diagnosis <span className="required">*</span>
              </label>
              <input
                type="text"
                className="oasis-input"
                placeholder="Enter ICD-10 code or diagnosis"
                value={oasisData.primaryDiagnosis}
                onChange={(e) => setOasisData({...oasisData, primaryDiagnosis: e.target.value})}
              />
            </div>

            <div className="ai-suggestion-box">
              <div className="ai-suggestion-header">
                <Brain size={16} />
                <span>AI Auto-Complete</span>
              </div>
              <div className="ai-suggestion-content">
                Common diagnoses for post-surgical patients:
                <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                  <li>Z48.815 - Encounter for surgical aftercare following surgery on digestive system</li>
                  <li>M79.3 - Panniculitis, unspecified</li>
                  <li>Z96.651 - Presence of right artificial knee joint</li>
                </ul>
              </div>
              <div className="ai-actions">
                <button className="ai-action-btn">
                  Search ICD-10
                </button>
              </div>
            </div>
          </>
        )}

        {oasisSection === 'adl' && (
          <>
            <h3 className="form-section-title">Activities of Daily Living (ADLs)</h3>
            
            <div className="oasis-form-group">
              <label className="oasis-label">
                M1800 - Grooming <span className="required">*</span>
              </label>
              <div className="oasis-radio-group">
                <div className={`oasis-radio-item ${oasisData.adlDressing === '0' ? 'selected' : ''}`}>
                  <input type="radio" name="grooming" value="0" />
                  <label style={{ marginLeft: '8px', cursor: 'pointer' }}>
                    0 - Able to groom self unaided
                  </label>
                </div>
                <div className={`oasis-radio-item ${oasisData.adlDressing === '1' ? 'selected' : ''}`}>
                  <input type="radio" name="grooming" value="1" />
                  <label style={{ marginLeft: '8px', cursor: 'pointer' }}>
                    1 - Grooming utensils must be placed within reach
                  </label>
                </div>
                <div className={`oasis-radio-item ${oasisData.adlDressing === '2' ? 'selected' : ''}`}>
                  <input type="radio" name="grooming" value="2" />
                  <label style={{ marginLeft: '8px', cursor: 'pointer' }}>
                    2 - Someone must assist the patient
                  </label>
                </div>
                <div className={`oasis-radio-item ${oasisData.adlDressing === '3' ? 'selected' : ''}`}>
                  <input type="radio" name="grooming" value="3" />
                  <label style={{ marginLeft: '8px', cursor: 'pointer' }}>
                    3 - Patient depends entirely upon someone else
                  </label>
                </div>
              </div>
            </div>
          </>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
          <button 
            style={{
              padding: '10px 20px',
              border: '1px solid #e5e7eb',
              backgroundColor: 'white',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Save Draft
          </button>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              style={{
                padding: '10px 20px',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Next Section <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderClinicalNotes = () => (
    <div className="clinical-notes-container">
      <div className="notes-editor">
        <div className="notes-toolbar">
          <div className="note-type-selector">
            <button 
              className={`note-type-btn ${noteType === 'skilled-nursing' ? 'active' : ''}`}
              onClick={() => setNoteType('skilled-nursing')}
            >
              Skilled Nursing
            </button>
            <button 
              className={`note-type-btn ${noteType === 'therapy' ? 'active' : ''}`}
              onClick={() => setNoteType('therapy')}
            >
              Therapy
            </button>
            <button 
              className={`note-type-btn ${noteType === 'aide' ? 'active' : ''}`}
              onClick={() => setNoteType('aide')}
            >
              Home Health Aide
            </button>
          </div>
          <button 
            className="ai-assistant-btn"
            onClick={() => handleAIGenerate('note')}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <div className="ai-loading-spinner"></div>
                Generating...
              </>
            ) : (
              <>
                <Brain size={16} />
                AI Generate
              </>
            )}
          </button>
        </div>

        <textarea
          className="notes-textarea"
          placeholder="Start typing your clinical note or use AI to generate..."
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
          <button style={{
            padding: '10px 20px',
            border: '1px solid #e5e7eb',
            backgroundColor: 'white',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            Save as Draft
          </button>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Save size={16} />
            Sign & Submit
          </button>
        </div>
      </div>

      <div className="ai-templates">
        <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>AI Templates</h4>
        {aiTemplates.map(template => {
          const Icon = template.icon;
          return (
            <div key={template.id} className="template-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Icon size={20} color="#6b7280" />
                <div>
                  <div style={{ fontWeight: '500' }}>{template.title}</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>{template.description}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderCarePlanGenerator = () => (
    <div className="care-plan-generator">
      <h3 style={{ marginBottom: '24px', fontSize: '20px', fontWeight: 'bold' }}>
        AI Care Plan Generator
      </h3>

      <div className="diagnosis-input">
        <input
          type="text"
          className="oasis-input"
          placeholder="Enter primary diagnosis..."
          value={carePlanData.diagnosis}
          onChange={(e) => setCarePlanData({...carePlanData, diagnosis: e.target.value})}
        />
        <button 
          className="generate-btn"
          onClick={() => handleAIGenerate('careplan')}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <div className="ai-loading-spinner"></div>
              Generating...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Generate Care Plan
            </>
          )}
        </button>
      </div>

      {carePlanData.goals.length > 0 && (
        <div className="generated-plan">
          <div className="plan-section">
            <h4>Goals</h4>
            <ul className="plan-goals">
              {carePlanData.goals.map((goal, index) => (
                <li key={index}>
                  <div className="goal-indicator"></div>
                  {goal}
                </li>
              ))}
            </ul>
          </div>

          <div className="plan-section">
            <h4>Interventions</h4>
            <ul className="plan-interventions">
              {carePlanData.interventions.map((intervention, index) => (
                <li key={index}>
                  <Activity size={16} color="#6b7280" />
                  {intervention}
                </li>
              ))}
            </ul>
          </div>

          <div className="plan-section">
            <h4>Expected Outcomes</h4>
            <ul className="plan-interventions">
              {carePlanData.expectedOutcomes.map((outcome, index) => (
                <li key={index}>
                  <TrendingUp size={16} color="#10b981" />
                  {outcome}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button style={{
              padding: '10px 20px',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              Save Care Plan
            </button>
            <button style={{
              padding: '10px 20px',
              border: '1px solid #e5e7eb',
              backgroundColor: 'white',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              Edit Plan
            </button>
            <button style={{
              padding: '10px 20px',
              border: '1px solid #e5e7eb',
              backgroundColor: 'white',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              Export PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="ai-docs-container">
      <div className="ai-docs-header">
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: 0 }}>
          AI-Assisted Documentation
        </h2>
        <button 
          className="ai-assistant-btn"
          onClick={() => setShowAIAssistant(!showAIAssistant)}
        >
          <Brain size={20} />
          Launch AI Assistant
        </button>
      </div>

      {activeModule === 'dashboard' && renderDashboard()}
      {activeModule === 'oasis' && renderOasisForm()}
      {activeModule === 'notes' && renderClinicalNotes()}
      {activeModule === 'careplan' && renderCarePlanGenerator()}

      {/* Back to Dashboard button when in modules */}
      {activeModule !== 'dashboard' && (
        <button
          onClick={() => setActiveModule('dashboard')}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            padding: '12px 24px',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}
        >
          ← Back to Documentation Hub
        </button>
      )}
    </div>
  );
};

export default AIDocumentation;