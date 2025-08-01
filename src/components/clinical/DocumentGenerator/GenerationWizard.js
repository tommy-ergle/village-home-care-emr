import React, { useState } from 'react';
import './GenerationWizard.css';

const GenerationWizard = ({ documentRequest, onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [wizardData, setWizardData] = useState({
    selectedNotes: [],
    includeOASIS: true,
    includeOrders: true,
    includePriorDocs: false,
    generationOptions: {
      tone: 'professional',
      detail: 'comprehensive',
      emphasis: 'medical-necessity'
    },
    customInstructions: ''
  });

  const wizardSteps = [
    {
      title: 'Select Source Data',
      description: 'Choose which clinical data to include in the document'
    },
    {
      title: 'Generation Options',
      description: 'Configure how the AI should generate the document'
    },
    {
      title: 'Review & Confirm',
      description: 'Review your selections before generating'
    }
  ];

  const handleNext = () => {
    if (currentStep < wizardSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(wizardData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const toggleNoteSelection = (noteId) => {
    setWizardData(prev => ({
      ...prev,
      selectedNotes: prev.selectedNotes.includes(noteId)
        ? prev.selectedNotes.filter(id => id !== noteId)
        : [...prev.selectedNotes, noteId]
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="wizard-step-content">
            <h3>Available Clinical Data</h3>
            
            <div className="data-section">
              <h4>Visit Notes</h4>
              <div className="notes-list">
                {documentRequest.sourceData.visitNotes.map(note => (
                  <div key={note.id} className="note-item">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={wizardData.selectedNotes.includes(note.id)}
                        onChange={() => toggleNoteSelection(note.id)}
                      />
                      <div className="note-details">
                        <div className="note-header">
                          <span className="note-type">{note.type}</span>
                          <span className="note-date">{note.date}</span>
                        </div>
                        <div className="note-preview">{note.content.substring(0, 100)}...</div>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="data-options">
              <label className="toggle-option">
                <input
                  type="checkbox"
                  checked={wizardData.includeOASIS}
                  onChange={(e) => setWizardData(prev => ({ ...prev, includeOASIS: e.target.checked }))}
                />
                <span>Include OASIS Assessment Data</span>
              </label>
              
              <label className="toggle-option">
                <input
                  type="checkbox"
                  checked={wizardData.includeOrders}
                  onChange={(e) => setWizardData(prev => ({ ...prev, includeOrders: e.target.checked }))}
                />
                <span>Include Physician Orders</span>
              </label>
              
              <label className="toggle-option">
                <input
                  type="checkbox"
                  checked={wizardData.includePriorDocs}
                  onChange={(e) => setWizardData(prev => ({ ...prev, includePriorDocs: e.target.checked }))}
                />
                <span>Reference Prior Documents</span>
              </label>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="wizard-step-content">
            <h3>Generation Options</h3>
            
            <div className="option-group">
              <label className="option-label">Document Tone</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="tone"
                    value="professional"
                    checked={wizardData.generationOptions.tone === 'professional'}
                    onChange={(e) => setWizardData(prev => ({
                      ...prev,
                      generationOptions: { ...prev.generationOptions, tone: e.target.value }
                    }))}
                  />
                  <span>Professional</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="tone"
                    value="clinical"
                    checked={wizardData.generationOptions.tone === 'clinical'}
                    onChange={(e) => setWizardData(prev => ({
                      ...prev,
                      generationOptions: { ...prev.generationOptions, tone: e.target.value }
                    }))}
                  />
                  <span>Clinical</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="tone"
                    value="detailed"
                    checked={wizardData.generationOptions.tone === 'detailed'}
                    onChange={(e) => setWizardData(prev => ({
                      ...prev,
                      generationOptions: { ...prev.generationOptions, tone: e.target.value }
                    }))}
                  />
                  <span>Detailed Medical</span>
                </label>
              </div>
            </div>

            <div className="option-group">
              <label className="option-label">Level of Detail</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="detail"
                    value="concise"
                    checked={wizardData.generationOptions.detail === 'concise'}
                    onChange={(e) => setWizardData(prev => ({
                      ...prev,
                      generationOptions: { ...prev.generationOptions, detail: e.target.value }
                    }))}
                  />
                  <span>Concise</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="detail"
                    value="standard"
                    checked={wizardData.generationOptions.detail === 'standard'}
                    onChange={(e) => setWizardData(prev => ({
                      ...prev,
                      generationOptions: { ...prev.generationOptions, detail: e.target.value }
                    }))}
                  />
                  <span>Standard</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="detail"
                    value="comprehensive"
                    checked={wizardData.generationOptions.detail === 'comprehensive'}
                    onChange={(e) => setWizardData(prev => ({
                      ...prev,
                      generationOptions: { ...prev.generationOptions, detail: e.target.value }
                    }))}
                  />
                  <span>Comprehensive</span>
                </label>
              </div>
            </div>

            <div className="option-group">
              <label className="option-label">Documentation Emphasis</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="emphasis"
                    value="medical-necessity"
                    checked={wizardData.generationOptions.emphasis === 'medical-necessity'}
                    onChange={(e) => setWizardData(prev => ({
                      ...prev,
                      generationOptions: { ...prev.generationOptions, emphasis: e.target.value }
                    }))}
                  />
                  <span>Medical Necessity</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="emphasis"
                    value="functional-progress"
                    checked={wizardData.generationOptions.emphasis === 'functional-progress'}
                    onChange={(e) => setWizardData(prev => ({
                      ...prev,
                      generationOptions: { ...prev.generationOptions, emphasis: e.target.value }
                    }))}
                  />
                  <span>Functional Progress</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="emphasis"
                    value="patient-centered"
                    checked={wizardData.generationOptions.emphasis === 'patient-centered'}
                    onChange={(e) => setWizardData(prev => ({
                      ...prev,
                      generationOptions: { ...prev.generationOptions, emphasis: e.target.value }
                    }))}
                  />
                  <span>Patient-Centered</span>
                </label>
              </div>
            </div>

            <div className="option-group">
              <label className="option-label">Custom Instructions (Optional)</label>
              <textarea
                className="custom-instructions"
                placeholder="Add any specific instructions for document generation..."
                value={wizardData.customInstructions}
                onChange={(e) => setWizardData(prev => ({ ...prev, customInstructions: e.target.value }))}
                rows={4}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="wizard-step-content">
            <h3>Review Your Selections</h3>
            
            <div className="review-section">
              <h4>Selected Data Sources</h4>
              <ul className="review-list">
                <li>{wizardData.selectedNotes.length} visit notes selected</li>
                {wizardData.includeOASIS && <li>OASIS assessment data included</li>}
                {wizardData.includeOrders && <li>Physician orders included</li>}
                {wizardData.includePriorDocs && <li>Prior documents referenced</li>}
              </ul>
            </div>

            <div className="review-section">
              <h4>Generation Settings</h4>
              <ul className="review-list">
                <li>Tone: {wizardData.generationOptions.tone}</li>
                <li>Detail Level: {wizardData.generationOptions.detail}</li>
                <li>Emphasis: {wizardData.generationOptions.emphasis.replace('-', ' ')}</li>
                {wizardData.customInstructions && (
                  <li>Custom Instructions: {wizardData.customInstructions.substring(0, 50)}...</li>
                )}
              </ul>
            </div>

            <div className="ai-preview">
              <h4>AI Generation Preview</h4>
              <p>
                The AI will analyze the selected clinical data and generate a 
                {' ' + wizardData.generationOptions.tone} document with 
                {' ' + wizardData.generationOptions.detail} detail, emphasizing 
                {' ' + wizardData.generationOptions.emphasis.replace('-', ' ')}.
              </p>
              <p className="generation-note">
                <strong>Note:</strong> The generated document will be fully compliant with CMS requirements 
                and include all necessary medical necessity language.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="generation-wizard">
      <div className="wizard-header">
        <h2>{wizardSteps[currentStep].title}</h2>
        <p>{wizardSteps[currentStep].description}</p>
        
        <div className="wizard-progress">
          {wizardSteps.map((step, index) => (
            <div
              key={index}
              className={`progress-step ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
            >
              <div className="step-number">{index + 1}</div>
              <div className="step-title">{step.title}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="wizard-body">
        {renderStepContent()}
      </div>

      <div className="wizard-footer">
        <button className="btn-secondary" onClick={handlePrevious}>
          {currentStep === 0 ? 'Back to Templates' : 'Previous'}
        </button>
        <button className="btn-primary" onClick={handleNext}>
          {currentStep === wizardSteps.length - 1 ? 'Generate Document' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default GenerationWizard;