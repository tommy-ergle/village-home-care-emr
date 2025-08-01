import React, { useState } from 'react';
import './TemplateSelector.css';

const TemplateSelector = ({ documentType, onSelect, onBack }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Template definitions for different document types
  const templates = {
    'poc': [
      {
        id: 'cms485-standard',
        name: 'CMS 485 Standard',
        description: 'Standard Medicare Plan of Care form',
        tags: ['Medicare', 'CMS Compliant', 'Standard'],
        popularity: 95,
        lastUpdated: '2024-01-10'
      },
      {
        id: 'poc-comprehensive',
        name: 'Comprehensive POC',
        description: 'Detailed plan of care with enhanced documentation',
        tags: ['Detailed', 'Comprehensive', 'Multi-disciplinary'],
        popularity: 82,
        lastUpdated: '2024-01-08'
      },
      {
        id: 'poc-therapy-focused',
        name: 'Therapy-Focused POC',
        description: 'Optimized for PT/OT/ST services',
        tags: ['Therapy', 'Rehabilitation', 'Functional Goals'],
        popularity: 78,
        lastUpdated: '2024-01-05'
      }
    ],
    'pt-eval': [
      {
        id: 'pt-eval-standard',
        name: 'Standard PT Evaluation',
        description: 'Comprehensive physical therapy initial evaluation',
        tags: ['APTA Guidelines', 'Medicare Compliant'],
        popularity: 90,
        lastUpdated: '2024-01-12'
      },
      {
        id: 'pt-eval-ortho',
        name: 'Orthopedic PT Evaluation',
        description: 'Specialized for orthopedic conditions',
        tags: ['Orthopedic', 'Post-surgical', 'Joint Replacement'],
        popularity: 85,
        lastUpdated: '2024-01-11'
      },
      {
        id: 'pt-eval-neuro',
        name: 'Neurological PT Evaluation',
        description: 'Optimized for neurological conditions',
        tags: ['Neurological', 'CVA', 'Parkinson\'s'],
        popularity: 75,
        lastUpdated: '2024-01-09'
      }
    ],
    'ot-eval': [
      {
        id: 'ot-eval-standard',
        name: 'Standard OT Evaluation',
        description: 'Comprehensive occupational therapy evaluation',
        tags: ['AOTA Guidelines', 'ADL Focused'],
        popularity: 88,
        lastUpdated: '2024-01-10'
      },
      {
        id: 'ot-eval-cognitive',
        name: 'Cognitive-Focused OT Eval',
        description: 'Emphasis on cognitive and perceptual assessment',
        tags: ['Cognitive', 'Dementia', 'Safety'],
        popularity: 80,
        lastUpdated: '2024-01-07'
      }
    ],
    'st-eval': [
      {
        id: 'st-eval-standard',
        name: 'Standard ST Evaluation',
        description: 'Comprehensive speech therapy evaluation',
        tags: ['ASHA Guidelines', 'Communication'],
        popularity: 85,
        lastUpdated: '2024-01-09'
      },
      {
        id: 'st-eval-dysphagia',
        name: 'Dysphagia-Focused Eval',
        description: 'Specialized for swallowing disorders',
        tags: ['Dysphagia', 'Swallowing', 'Safety'],
        popularity: 82,
        lastUpdated: '2024-01-08'
      }
    ],
    'progress': [
      {
        id: 'progress-standard',
        name: 'Standard Progress Note',
        description: 'General therapy progress note template',
        tags: ['Progress', 'Update', 'All Disciplines'],
        popularity: 92,
        lastUpdated: '2024-01-12'
      },
      {
        id: 'progress-skilled',
        name: 'Skilled Intervention Note',
        description: 'Emphasizes skilled care documentation',
        tags: ['Skilled Care', 'Medical Necessity'],
        popularity: 88,
        lastUpdated: '2024-01-11'
      }
    ],
    'discharge': [
      {
        id: 'discharge-standard',
        name: 'Standard Discharge Summary',
        description: 'Comprehensive discharge documentation',
        tags: ['Discharge', 'Summary', 'Outcomes'],
        popularity: 85,
        lastUpdated: '2024-01-10'
      }
    ]
  };

  const currentTemplates = templates[documentType] || templates['progress'];

  const filteredTemplates = currentTemplates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template.id);
  };

  const handleConfirm = () => {
    if (selectedTemplate) {
      onSelect(selectedTemplate);
    }
  };

  return (
    <div className="template-selector">
      <div className="selector-header">
        <h2>Select a Template</h2>
        <p>Choose a template that best fits your documentation needs</p>
        
        <div className="template-search">
          <input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <div className="templates-grid">
        {filteredTemplates.map(template => (
          <div
            key={template.id}
            className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
            onClick={() => handleTemplateSelect(template)}
          >
            <div className="template-header">
              <h3>{template.name}</h3>
              <div className="popularity-badge">
                <span className="popularity-icon">⭐</span>
                <span>{template.popularity}%</span>
              </div>
            </div>
            
            <p className="template-description">{template.description}</p>
            
            <div className="template-tags">
              {template.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            
            <div className="template-footer">
              <span className="last-updated">Updated: {template.lastUpdated}</span>
              {selectedTemplate === template.id && (
                <span className="selected-indicator">✓ Selected</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="no-templates">
          <p>No templates found matching your search.</p>
        </div>
      )}

      <div className="selector-actions">
        <button className="btn-secondary" onClick={onBack}>
          Back
        </button>
        <button 
          className="btn-primary" 
          onClick={handleConfirm}
          disabled={!selectedTemplate}
        >
          Continue with Selected Template
        </button>
      </div>

      <div className="template-info">
        <h4>Template Features</h4>
        <ul>
          <li>✓ CMS compliant documentation structure</li>
          <li>✓ Auto-populated fields from patient data</li>
          <li>✓ Medical necessity language included</li>
          <li>✓ Customizable sections and content</li>
          <li>✓ Regulatory guidelines integrated</li>
        </ul>
      </div>
    </div>
  );
};

export default TemplateSelector;