// src/components/clinical/ClinicalNotes.js
import React, { useState, useEffect, useRef } from 'react';
import {
  FileText,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  Mic,
  MicOff,
  Save,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Heart,
  Thermometer,
  Activity,
  Droplet,
  Wind,
  Download,
  Upload,
  Lock,
  Unlock,
  ChevronDown,
  ChevronRight,
  X,
  Bold,
  Italic,
  List,
  Image,
  Paperclip
} from 'lucide-react';
import './ClinicalNotes.css';

const ClinicalNotes = ({ patient, onBack }) => {
  // State management
  const [notes, setNotes] = useState([
    {
      id: 1,
      patientName: 'Sarah Johnson',
      patientId: 'P001',
      visitDate: '2025-07-28',
      visitTime: '10:30 AM',
      visitType: 'Skilled Nursing',
      clinician: 'Linda Martinez, RN',
      status: 'signed',
      content: 'Patient appears to be recovering well from knee replacement surgery. Ambulating with walker, steady gait observed. No signs of infection at surgical site. Pain level reported as 3/10.',
      vitalSigns: {
        bloodPressure: '120/80',
        heartRate: '72',
        temperature: '98.6',
        respiratoryRate: '16',
        oxygenSaturation: '98',
        painLevel: '3'
      },
      medications: ['Tylenol 500mg - administered', 'Lisinopril 10mg - administered'],
      assessments: ['Surgical site clean and dry', 'No signs of DVT', 'ROM improving'],
      plan: 'Continue current exercise regimen. Monitor for signs of infection. Follow up in 2 days.',
      signedBy: 'Linda Martinez, RN',
      signedAt: '2025-07-28 11:15 AM'
    },
    {
      id: 2,
      patientName: 'Robert Chen',
      patientId: 'P002',
      visitDate: '2025-07-27',
      visitTime: '2:00 PM',
      visitType: 'Physical Therapy',
      clinician: 'Mike Johnson, PT',
      status: 'draft',
      content: 'Patient participated in 45-minute PT session focused on lower extremity strengthening.',
      vitalSigns: {
        bloodPressure: '130/85',
        heartRate: '78',
        temperature: '98.4',
        respiratoryRate: '18',
        oxygenSaturation: '97',
        painLevel: '4'
      }
    }
  ]);

  const [showNewNote, setShowNewNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  
  // Rich text editor state
  const [noteContent, setNoteContent] = useState('');
  const [vitalSigns, setVitalSigns] = useState({
    bloodPressure: '',
    heartRate: '',
    temperature: '',
    respiratoryRate: '',
    oxygenSaturation: '',
    painLevel: ''
  });

  const editorRef = useRef(null);
  const recognitionRef = useRef(null);

  // Note templates
  const templates = {
    'skilled-nursing': {
      name: 'Skilled Nursing Visit',
      content: `SUBJECTIVE:
Patient reports...

OBJECTIVE:
Vital Signs: See attached
Physical Assessment:
- General appearance: 
- Cardiovascular: 
- Respiratory: 
- Skin integrity: 
- Pain assessment: 

ASSESSMENT:
Patient is...

PLAN:
1. 
2. 
3. 

EDUCATION PROVIDED:
- 

FOLLOW-UP:
Next visit scheduled for...`
    },
    'physical-therapy': {
      name: 'Physical Therapy',
      content: `SUBJECTIVE:
Patient reports...

OBJECTIVE:
ROM Assessment:
- 
Strength Testing:
- 
Functional Mobility:
- 
Gait Assessment:
- 

TREATMENT PROVIDED:
1. 
2. 
3. 

PATIENT RESPONSE:


PLAN:
Continue with...

HOME EXERCISE PROGRAM:
- `
    },
    'wound-care': {
      name: 'Wound Care',
      content: `WOUND ASSESSMENT:
Location: 
Size: L___ x W___ x D___ cm
Wound bed: 
Drainage: 
Periwound skin: 
Pain level: 

TREATMENT PROVIDED:
1. Cleansed with...
2. Applied...
3. Dressed with...

PATIENT RESPONSE:


PLAN:
Next dressing change...`
    }
  };

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        
        setNoteContent(prev => prev + ' ' + transcript);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };
    }
  }, []);

  // Voice recording functions
  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };

  // Filter notes
  const filteredNotes = notes.filter(note => {
    const matchesSearch = 
      note.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.clinician.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || note.visitType.toLowerCase().includes(filterType);
    
    return matchesSearch && matchesFilter;
  });

  // Handle template selection
  const handleTemplateSelect = (templateKey) => {
    setSelectedTemplate(templateKey);
    setNoteContent(templates[templateKey].content);
  };

  // Create new note
  const handleCreateNote = () => {
    const newNote = {
      id: notes.length + 1,
      patientName: patient?.name || 'New Patient',
      patientId: patient?.id || 'P000',
      visitDate: new Date().toISOString().split('T')[0],
      visitTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      visitType: 'Skilled Nursing',
      clinician: 'Current User',
      status: 'draft',
      content: noteContent,
      vitalSigns: vitalSigns,
      medications: [],
      assessments: [],
      plan: '',
      signedBy: null,
      signedAt: null
    };
    
    setNotes([newNote, ...notes]);
    setShowNewNote(false);
    resetForm();
  };

  // Sign note
  const handleSignNote = (noteId) => {
    setNotes(notes.map(note => 
      note.id === noteId 
        ? {
            ...note,
            status: 'signed',
            signedBy: 'Current User',
            signedAt: new Date().toLocaleString()
          }
        : note
    ));
  };

  // Delete note
  const handleDeleteNote = (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter(note => note.id !== noteId));
      setSelectedNote(null);
    }
  };

  // Reset form
  const resetForm = () => {
    setNoteContent('');
    setVitalSigns({
      bloodPressure: '',
      heartRate: '',
      temperature: '',
      respiratoryRate: '',
      oxygenSaturation: '',
      painLevel: ''
    });
    setSelectedTemplate('');
  };

  // Format toolbar actions
  const formatText = (command) => {
    document.execCommand(command, false, null);
    editorRef.current?.focus();
  };

  return (
    <div className="clinical-notes">
      <div className="notes-header">
        <div className="header-left">
          {onBack && (
            <button onClick={onBack} className="back-btn">
              <ChevronRight size={20} className="rotate-180" />
              <span>Back</span>
            </button>
          )}
          <div className="header-info">
            <h1>Clinical Notes</h1>
            <p>{patient ? `Patient: ${patient.name}` : 'All Patients'}</p>
          </div>
        </div>
        
        <div className="header-actions">
          <button className="btn-primary" onClick={() => setShowNewNote(true)}>
            <Plus size={18} />
            <span>New Note</span>
          </button>
        </div>
      </div>

      <div className="notes-controls">
        <div className="search-filter">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-buttons">
            <button
              className={filterType === 'all' ? 'active' : ''}
              onClick={() => setFilterType('all')}
            >
              All Types
            </button>
            <button
              className={filterType === 'nursing' ? 'active' : ''}
              onClick={() => setFilterType('nursing')}
            >
              Nursing
            </button>
            <button
              className={filterType === 'therapy' ? 'active' : ''}
              onClick={() => setFilterType('therapy')}
            >
              Therapy
            </button>
            <button
              className={filterType === 'wound' ? 'active' : ''}
              onClick={() => setFilterType('wound')}
            >
              Wound Care
            </button>
          </div>
        </div>
      </div>

      <div className="notes-content">
        <div className="notes-list">
          {filteredNotes.map(note => (
            <div
              key={note.id}
              className={`note-card ${selectedNote?.id === note.id ? 'selected' : ''}`}
              onClick={() => setSelectedNote(note)}
            >
              <div className="note-header">
                <div className="note-info">
                  <h3>{note.patientName}</h3>
                  <div className="note-meta">
                    <span className="visit-type">{note.visitType}</span>
                    <span className="dot">•</span>
                    <span>{note.visitDate}</span>
                    <span className="dot">•</span>
                    <span>{note.visitTime}</span>
                  </div>
                </div>
                <div className={`note-status ${note.status}`}>
                  {note.status === 'signed' ? (
                    <>
                      <Lock size={14} />
                      <span>Signed</span>
                    </>
                  ) : (
                    <>
                      <Edit size={14} />
                      <span>Draft</span>
                    </>
                  )}
                </div>
              </div>
              
              <div className="note-preview">
                {note.content.substring(0, 150)}...
              </div>
              
              <div className="note-footer">
                <span className="clinician">
                  <User size={14} />
                  {note.clinician}
                </span>
              </div>
            </div>
          ))}
        </div>

        {selectedNote && (
          <div className="note-detail">
            <div className="detail-header">
              <h2>Visit Note Details</h2>
              <div className="detail-actions">
                {selectedNote.status === 'draft' && (
                  <>
                    <button className="btn-secondary">
                      <Edit size={16} />
                      <span>Edit</span>
                    </button>
                    <button 
                      className="btn-primary"
                      onClick={() => handleSignNote(selectedNote.id)}
                    >
                      <CheckCircle size={16} />
                      <span>Sign Note</span>
                    </button>
                  </>
                )}
                <button className="btn-secondary">
                  <Download size={16} />
                  <span>Export</span>
                </button>
                {selectedNote.status === 'draft' && (
                  <button 
                    className="btn-danger"
                    onClick={() => handleDeleteNote(selectedNote.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>

            <div className="detail-content">
              <div className="detail-section">
                <h3>Visit Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Patient:</label>
                    <span>{selectedNote.patientName}</span>
                  </div>
                  <div className="info-item">
                    <label>Date:</label>
                    <span>{selectedNote.visitDate}</span>
                  </div>
                  <div className="info-item">
                    <label>Time:</label>
                    <span>{selectedNote.visitTime}</span>
                  </div>
                  <div className="info-item">
                    <label>Type:</label>
                    <span>{selectedNote.visitType}</span>
                  </div>
                  <div className="info-item">
                    <label>Clinician:</label>
                    <span>{selectedNote.clinician}</span>
                  </div>
                  <div className="info-item">
                    <label>Status:</label>
                    <span className={`status-badge ${selectedNote.status}`}>
                      {selectedNote.status === 'signed' ? 'Signed' : 'Draft'}
                    </span>
                  </div>
                </div>
              </div>

              {selectedNote.vitalSigns && (
                <div className="detail-section">
                  <h3>Vital Signs</h3>
                  <div className="vitals-grid">
                    <div className="vital-item">
                      <div className="vital-icon bp">
                        <Heart size={20} />
                      </div>
                      <div className="vital-info">
                        <label>Blood Pressure</label>
                        <span>{selectedNote.vitalSigns.bloodPressure} mmHg</span>
                      </div>
                    </div>
                    <div className="vital-item">
                      <div className="vital-icon hr">
                        <Activity size={20} />
                      </div>
                      <div className="vital-info">
                        <label>Heart Rate</label>
                        <span>{selectedNote.vitalSigns.heartRate} bpm</span>
                      </div>
                    </div>
                    <div className="vital-item">
                      <div className="vital-icon temp">
                        <Thermometer size={20} />
                      </div>
                      <div className="vital-info">
                        <label>Temperature</label>
                        <span>{selectedNote.vitalSigns.temperature}°F</span>
                      </div>
                    </div>
                    <div className="vital-item">
                      <div className="vital-icon o2">
                        <Wind size={20} />
                      </div>
                      <div className="vital-info">
                        <label>O2 Saturation</label>
                        <span>{selectedNote.vitalSigns.oxygenSaturation}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="detail-section">
                <h3>Clinical Note</h3>
                <div className="note-content">
                  {selectedNote.content}
                </div>
              </div>

              {selectedNote.status === 'signed' && (
                <div className="signature-section">
                  <Lock size={16} />
                  <span>Electronically signed by {selectedNote.signedBy} on {selectedNote.signedAt}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* New Note Modal */}
      {showNewNote && (
        <div className="modal-overlay" onClick={() => setShowNewNote(false)}>
          <div className="modal-content new-note-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Clinical Note</h2>
              <button className="close-btn" onClick={() => setShowNewNote(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-section">
                <div className="form-row">
                  <div className="form-group">
                    <label>Visit Type</label>
                    <select>
                      <option value="skilled-nursing">Skilled Nursing</option>
                      <option value="physical-therapy">Physical Therapy</option>
                      <option value="occupational-therapy">Occupational Therapy</option>
                      <option value="speech-therapy">Speech Therapy</option>
                      <option value="wound-care">Wound Care</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Template</label>
                    <select 
                      value={selectedTemplate}
                      onChange={(e) => handleTemplateSelect(e.target.value)}
                    >
                      <option value="">Select template...</option>
                      {Object.entries(templates).map(([key, template]) => (
                        <option key={key} value={key}>{template.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Vital Signs</label>
                  <div className="vitals-input-grid">
                    <div className="vital-input">
                      <label>BP</label>
                      <input
                        type="text"
                        placeholder="120/80"
                        value={vitalSigns.bloodPressure}
                        onChange={(e) => setVitalSigns({...vitalSigns, bloodPressure: e.target.value})}
                      />
                    </div>
                    <div className="vital-input">
                      <label>HR</label>
                      <input
                        type="text"
                        placeholder="72"
                        value={vitalSigns.heartRate}
                        onChange={(e) => setVitalSigns({...vitalSigns, heartRate: e.target.value})}
                      />
                    </div>
                    <div className="vital-input">
                      <label>Temp</label>
                      <input
                        type="text"
                        placeholder="98.6"
                        value={vitalSigns.temperature}
                        onChange={(e) => setVitalSigns({...vitalSigns, temperature: e.target.value})}
                      />
                    </div>
                    <div className="vital-input">
                      <label>RR</label>
                      <input
                        type="text"
                        placeholder="16"
                        value={vitalSigns.respiratoryRate}
                        onChange={(e) => setVitalSigns({...vitalSigns, respiratoryRate: e.target.value})}
                      />
                    </div>
                    <div className="vital-input">
                      <label>O2</label>
                      <input
                        type="text"
                        placeholder="98"
                        value={vitalSigns.oxygenSaturation}
                        onChange={(e) => setVitalSigns({...vitalSigns, oxygenSaturation: e.target.value})}
                      />
                    </div>
                    <div className="vital-input">
                      <label>Pain</label>
                      <input
                        type="text"
                        placeholder="0-10"
                        value={vitalSigns.painLevel}
                        onChange={(e) => setVitalSigns({...vitalSigns, painLevel: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Clinical Note</label>
                  <div className="editor-toolbar">
                    <button 
                      type="button" 
                      onClick={() => formatText('bold')}
                      className="toolbar-btn"
                    >
                      <Bold size={16} />
                    </button>
                    <button 
                      type="button" 
                      onClick={() => formatText('italic')}
                      className="toolbar-btn"
                    >
                      <Italic size={16} />
                    </button>
                    <button 
                      type="button" 
                      onClick={() => formatText('insertUnorderedList')}
                      className="toolbar-btn"
                    >
                      <List size={16} />
                    </button>
                    <div className="toolbar-separator"></div>
                    <button 
                      type="button"
                      onClick={toggleRecording}
                      className={`toolbar-btn ${isRecording ? 'recording' : ''}`}
                    >
                      {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
                    </button>
                    <button type="button" className="toolbar-btn">
                      <Paperclip size={16} />
                    </button>
                  </div>
                  <div
                    ref={editorRef}
                    contentEditable
                    className="note-editor"
                    onInput={(e) => setNoteContent(e.target.innerHTML)}
                    dangerouslySetInnerHTML={{ __html: noteContent }}
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowNewNote(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleCreateNote}>
                <Save size={16} />
                <span>Save as Draft</span>
              </button>
              <button className="btn-primary">
                <CheckCircle size={16} />
                <span>Save & Sign</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClinicalNotes;