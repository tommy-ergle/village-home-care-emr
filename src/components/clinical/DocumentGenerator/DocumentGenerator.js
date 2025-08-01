import React, { useState, useEffect } from 'react';
import './DocumentGenerator.css';
import GenerationWizard from './GenerationWizard';
import TemplateSelector from './TemplateSelector';
import DocumentPreview from './DocumentPreview';
import ComplianceChecker from './ComplianceChecker';
import GeneratedDocument from './GeneratedDocument';
import { 
  FileSignature, Brain, Sparkles, CheckCircle, 
  ArrowLeft, Zap, Shield, Target, Clock,
  FileText, Activity, Award, TrendingUp
} from 'lucide-react';

const DocumentGenerator = ({ patientId, onClose }) => {
  const [currentStep, setCurrentStep] = useState('select-type');
  const [documentRequest, setDocumentRequest] = useState({
    patientId: patientId,
    documentType: '',
    templateId: '',
    sourceData: {
      visitNotes: [],
      assessmentData: {},
      priorDocuments: [],
      physicianOrders: []
    },
    generationRules: {}
  });
  const [generatedDocument, setGeneratedDocument] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [complianceStatus, setComplianceStatus] = useState(null);
  const [error, setError] = useState(null);

  // Document type options with Apple-inspired design
  const documentTypes = [
    { 
      id: 'poc', 
      name: 'Plan of Care (CMS 485)', 
      icon: FileSignature,
      description: 'Comprehensive care plan for Medicare certification',
      badge: 'Popular',
      featured: true
    },
    { 
      id: 'pt-eval', 
      name: 'Physical Therapy Evaluation', 
      icon: Activity,
      description: 'Initial PT assessment and treatment plan',
      badge: 'Common'
    },
    { 
      id: 'ot-eval', 
      name: 'Occupational Therapy Evaluation', 
      icon: Target,
      description: 'OT evaluation for functional independence',
      badge: 'Common'
    },
    { 
      id: 'st-eval', 
      name: 'Speech Therapy Evaluation', 
      icon: Brain,
      description: 'Speech-language pathology assessment',
      badge: null
    },
    { 
      id: 'progress', 
      name: 'Progress Note', 
      icon: TrendingUp,
      description: 'Visit documentation and progress tracking',
      badge: 'Frequent',
      featured: true
    },
    { 
      id: 're-eval', 
      name: 'Re-evaluation', 
      icon: CheckCircle,
      description: 'Periodic reassessment of patient status',
      badge: null
    },
    { 
      id: 'discharge', 
      name: 'Discharge Summary', 
      icon: Award,
      description: 'Comprehensive discharge documentation',
      badge: null
    },
    { 
      id: 'nursing', 
      name: 'Skilled Nursing Assessment', 
      icon: Shield,
      description: 'RN assessment and care documentation',
      badge: 'New',
      isNew: true
    },
    { 
      id: 'care-update', 
      name: 'Care Plan Update', 
      icon: FileText,
      description: 'Modifications to existing care plans',
      badge: null
    },
    { 
      id: 'goals', 
      name: 'Goal Setting Documentation', 
      icon: Target,
      description: 'SMART goals and outcome measures',
      badge: null
    }
  ];

  // Load patient data and related clinical information
  useEffect(() => {
    if (patientId) {
      loadPatientData();
    }
  }, [patientId]);

  const loadPatientData = async () => {
    try {
      // Simulate loading patient data
      const mockData = {
        visitNotes: [
          {
            id: 1,
            date: '2024-01-15',
            type: 'Initial Assessment',
            content: 'Patient presents with decreased mobility following hip replacement...'
          },
          {
            id: 2,
            date: '2024-01-18',
            type: 'PT Visit',
            content: 'Patient demonstrated improved weight bearing tolerance...'
          }
        ],
        assessmentData: {
          oasisData: {
            m1800: 'Requires assistance with ambulation',
            m1810: 'Unable to climb stairs',
            m1820: 'Requires supervision for transfers'
          },
          functionalStatus: {
            ambulation: 'Modified independence with walker',
            transfers: 'Supervision required',
            adls: 'Minimal assistance'
          }
        },
        physicianOrders: [
          {
            id: 1,
            date: '2024-01-10',
            order: 'PT eval and treat 3x/week x 4 weeks',
            physician: 'Dr. Smith'
          }
        ]
      };

      setDocumentRequest(prev => ({
        ...prev,
        sourceData: mockData
      }));
    } catch (error) {
      setError('Failed to load patient data');
      console.error('Error loading patient data:', error);
    }
  };

  const handleDocumentTypeSelect = (typeId) => {
    setDocumentRequest(prev => ({
      ...prev,
      documentType: typeId
    }));
    setCurrentStep('template-select');
  };

  const handleTemplateSelect = (templateId) => {
    setDocumentRequest(prev => ({
      ...prev,
      templateId: templateId
    }));
    setCurrentStep('wizard');
  };

  const handleWizardComplete = async (wizardData) => {
    setDocumentRequest(prev => ({
      ...prev,
      ...wizardData
    }));
    setCurrentStep('generating');
    await generateDocument();
  };

  const generateDocument = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      // Simulate AI document generation
      await new Promise(resolve => setTimeout(resolve, 3000));

      const generated = {
        id: `doc-${Date.now()}`,
        patientId: documentRequest.patientId,
        documentType: documentRequest.documentType,
        content: {
          header: {
            patientName: 'John Doe',
            mrn: '123456',
            dob: '1950-05-15',
            documentDate: new Date().toISOString().split('T')[0],
            documentType: documentTypes.find(t => t.id === documentRequest.documentType)?.name
          },
          sections: generateDocumentSections(documentRequest.documentType),
          signature: {
            preparedBy: 'Current User',
            preparedDate: new Date().toISOString(),
            requiresPhysicianSignature: true
          }
        },
        complianceStatus: {
          isCompliant: true,
          score: 95,
          issues: [
            'Consider adding specific measurable goals for ambulation distance'
          ],
          recommendations: [
            'Include patient/caregiver education documentation',
            'Specify equipment needs more clearly'
          ]
        },
        metadata: {
          generatedBy: 'AI Documentation Assistant',
          generatedAt: new Date().toISOString(),
          version: '1.0',
          approvalStatus: 'draft'
        }
      };

      setGeneratedDocument(generated);
      setComplianceStatus(generated.complianceStatus);
      setCurrentStep('preview');
    } catch (error) {
      setError('Failed to generate document');
      console.error('Document generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateDocumentSections = (type) => {
    // Generate appropriate sections based on document type
    const sectionTemplates = {
      'poc': [
        { title: 'Patient Information', content: 'Demographics and insurance details...' },
        { title: 'Medical History', content: 'Relevant diagnoses and conditions...' },
        { title: 'Functional Limitations', content: 'Current functional status...' },
        { title: 'Treatment Goals', content: 'Short and long-term goals...' },
        { title: 'Treatment Plan', content: 'Services, frequency, and duration...' },
        { title: 'Safety Measures', content: 'Fall prevention and precautions...' }
      ],
      'pt-eval': [
        { title: 'Referral Information', content: 'Physician orders and referral reason...' },
        { title: 'Medical History', content: 'Past medical history relevant to PT...' },
        { title: 'Current Functional Status', content: 'Baseline functional abilities...' },
        { title: 'Physical Examination', content: 'ROM, strength, balance assessment...' },
        { title: 'Treatment Goals', content: 'SMART goals for therapy...' },
        { title: 'Treatment Plan', content: 'Interventions and frequency...' },
        { title: 'Medical Necessity', content: 'Skilled care justification...' }
      ],
      'progress': [
        { title: 'Visit Information', content: 'Date, duration, and type of visit...' },
        { title: 'Patient Response', content: 'Response to interventions...' },
        { title: 'Progress Toward Goals', content: 'Goal achievement status...' },
        { title: 'Interventions Provided', content: 'Skilled services delivered...' },
        { title: 'Plan for Next Visit', content: 'Upcoming treatment focus...' }
      ]
    };

    return sectionTemplates[type] || sectionTemplates['progress'];
  };

  const handlePreviewEdit = (editedDocument) => {
    setGeneratedDocument(editedDocument);
  };

  const handleApprove = async () => {
    try {
      // Save the approved document
      console.log('Saving approved document:', generatedDocument);
      setCurrentStep('completed');
    } catch (error) {
      setError('Failed to save document');
      console.error('Error saving document:', error);
    }
  };

  const handleStartOver = () => {
    setCurrentStep('select-type');
    setGeneratedDocument(null);
    setComplianceStatus(null);
    setError(null);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'select-type':
        return (
          <div className="document-type-selector">
            <h2>Select Document Type</h2>
            <p className="document-type-subtitle">
              Choose the type of clinical document you'd like to generate with AI assistance
            </p>
            <div className="document-type-grid">
              {documentTypes.map(type => {
                const Icon = type.icon;
                return (
                  <div
                    key={type.id}
                    className={`document-type-card ${type.featured ? 'featured' : ''}`}
                    onClick={() => handleDocumentTypeSelect(type.id)}
                  >
                    <div className="type-icon">
                      <Icon size={24} />
                    </div>
                    <div className="type-name">{type.name}</div>
                    <div className="type-description">{type.description}</div>
                    {type.badge && (
                      <div className={`type-badge ${type.isNew ? 'new' : ''}`}>
                        {type.isNew && <Sparkles size={12} />}
                        {type.badge}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'template-select':
        return (
          <TemplateSelector
            documentType={documentRequest.documentType}
            onSelect={handleTemplateSelect}
            onBack={() => setCurrentStep('select-type')}
          />
        );

      case 'wizard':
        return (
          <GenerationWizard
            documentRequest={documentRequest}
            onComplete={handleWizardComplete}
            onBack={() => setCurrentStep('template-select')}
          />
        );

      case 'generating':
        return (
          <div className="generating-container">
            <div className="generating-spinner"></div>
            <h2>Generating Document...</h2>
            <p>AI is analyzing clinical data and creating your document</p>
            <div className="generation-steps">
              <div className="step active">
                <Brain size={16} style={{ marginRight: '8px' }} />
                Parsing clinical notes
              </div>
              <div className="step">
                <Zap size={16} style={{ marginRight: '8px' }} />
                Extracting relevant data
              </div>
              <div className="step">
                <Shield size={16} style={{ marginRight: '8px' }} />
                Applying compliance rules
              </div>
              <div className="step">
                <FileSignature size={16} style={{ marginRight: '8px' }} />
                Generating content
              </div>
            </div>
          </div>
        );

      case 'preview':
        return (
          <div className="preview-container">
            <DocumentPreview
              document={generatedDocument}
              onEdit={handlePreviewEdit}
              onApprove={handleApprove}
              onBack={() => setCurrentStep('wizard')}
            />
            {complianceStatus && (
              <ComplianceChecker
                status={complianceStatus}
                documentType={documentRequest.documentType}
              />
            )}
          </div>
        );

      case 'completed':
        return (
          <GeneratedDocument
            document={generatedDocument}
            onStartOver={handleStartOver}
            onClose={onClose}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="document-generator">
      <div className="generator-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          {currentStep !== 'select-type' && (
            <button 
              onClick={() => {
                if (currentStep === 'template-select') setCurrentStep('select-type');
                else if (currentStep === 'wizard') setCurrentStep('template-select');
                else if (currentStep === 'preview') setCurrentStep('wizard');
              }}
              style={{
                background: 'none',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
                padding: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(3, 53, 182, 0.05)';
                e.target.style.borderColor = 'rgba(3, 53, 182, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'none';
                e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)';
              }}
            >
              <ArrowLeft size={20} color="#0335b6" />
            </button>
          )}
          <div>
            <h1>AI Clinical Documentation Generator</h1>
            <p className="generator-subtitle">
              Generate CMS-compliant clinical documents in seconds with AI assistance
            </p>
          </div>
        </div>
        {currentStep !== 'select-type' && (
          <div className="progress-indicator">
            <div className={`step ${['select-type'].includes(currentStep) ? 'active' : 'completed'}`}>
              <FileText size={16} style={{ marginBottom: '4px' }} />
              Select Type
            </div>
            <div className={`step ${currentStep === 'template-select' ? 'active' : currentStep === 'select-type' ? '' : 'completed'}`}>
              <Target size={16} style={{ marginBottom: '4px' }} />
              Choose Template
            </div>
            <div className={`step ${currentStep === 'wizard' ? 'active' : ['generating', 'preview', 'completed'].includes(currentStep) ? 'completed' : ''}`}>
              <Brain size={16} style={{ marginBottom: '4px' }} />
              Configure
            </div>
            <div className={`step ${currentStep === 'generating' ? 'active' : ['preview', 'completed'].includes(currentStep) ? 'completed' : ''}`}>
              <Zap size={16} style={{ marginBottom: '4px' }} />
              Generate
            </div>
            <div className={`step ${currentStep === 'preview' ? 'active' : currentStep === 'completed' ? 'completed' : ''}`}>
              <CheckCircle size={16} style={{ marginBottom: '4px' }} />
              Review
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="error-message">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Shield size={20} color="#dc2626" />
            <span>{error}</span>
          </div>
          <button 
            onClick={() => setError(null)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              color: '#dc2626',
              padding: '4px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ×
          </button>
        </div>
      )}

      <div className="generator-content">
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default DocumentGenerator;