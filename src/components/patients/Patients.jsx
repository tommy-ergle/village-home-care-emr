import React, { useState, useEffect } from 'react';
import { 
  Users, Search, Plus, Filter, Download, Upload,
  Edit, Trash2, Eye, Phone, MapPin, Calendar,
  AlertCircle, CheckCircle, Clock, ChevronRight,
  Mail, User, FileText, Activity, Shield, MoreVertical,
  Cpu, TrendingUp, Heart, UserPlus
} from 'lucide-react';
import PatientForm from './PatientForm';
import PatientDetail from './PatientDetail';
import '../../styles/components/PatientsApple.css';

const Patients = () => {
  const [patients, setPatients] = useState([
    {
      id: 1,
      firstName: 'Sarah',
      lastName: 'Johnson',
      dateOfBirth: '1958-03-15',
      age: 67,
      gender: 'Female',
      phone: '(555) 123-4567',
      email: 'sarah.johnson@email.com',
      address: '123 Oak Street, Springfield, IL 62701',
      emergencyContact: {
        name: 'John Johnson',
        relationship: 'Spouse',
        phone: '(555) 123-4568'
      },
      insurance: {
        primary: 'Medicare Part A',
        policyNumber: 'M123456789',
        group: 'N/A'
      },
      primaryDiagnosis: 'Post-surgical recovery - Knee replacement',
      conditions: ['Hypertension', 'Type 2 Diabetes'],
      medications: ['Metformin 500mg', 'Lisinopril 10mg', 'Acetaminophen 500mg'],
      allergies: ['Penicillin'],
      physician: 'Dr. Robert Smith',
      status: 'active',
      riskLevel: 'low',
      lastVisit: '2025-07-28',
      nextVisit: '2025-07-30',
      admissionDate: '2025-07-01',
      episodeCount: 3,
      notes: 'Patient is progressing well with physical therapy.'
    },
    {
      id: 2,
      firstName: 'Robert',
      lastName: 'Chen',
      dateOfBirth: '1952-08-22',
      age: 73,
      gender: 'Male',
      phone: '(555) 234-5678',
      email: 'robert.chen@email.com',
      address: '456 Elm Avenue, Springfield, IL 62702',
      emergencyContact: {
        name: 'Lisa Chen',
        relationship: 'Daughter',
        phone: '(555) 234-5679'
      },
      insurance: {
        primary: 'Medicare Part A + Supplemental',
        policyNumber: 'M234567890',
        group: 'SUPP123'
      },
      primaryDiagnosis: 'Type 2 Diabetes Mellitus with peripheral neuropathy',
      conditions: ['Diabetes', 'Peripheral Neuropathy', 'Hyperlipidemia'],
      medications: ['Metformin 1000mg', 'Insulin Glargine', 'Atorvastatin 20mg'],
      allergies: ['Sulfa drugs'],
      physician: 'Dr. Emily Williams',
      status: 'active',
      riskLevel: 'medium',
      lastVisit: '2025-07-27',
      nextVisit: '2025-07-29',
      admissionDate: '2025-06-15',
      episodeCount: 5,
      notes: 'Requires blood glucose monitoring. Diet education ongoing.'
    },
    {
      id: 3,
      firstName: 'Maria',
      lastName: 'Rodriguez',
      dateOfBirth: '1967-11-10',
      age: 58,
      gender: 'Female',
      phone: '(555) 345-6789',
      email: 'maria.rodriguez@email.com',
      address: '789 Pine Road, Springfield, IL 62703',
      emergencyContact: {
        name: 'Carlos Rodriguez',
        relationship: 'Son',
        phone: '(555) 345-6790'
      },
      insurance: {
        primary: 'Medicaid',
        policyNumber: 'MCD345678',
        group: 'N/A'
      },
      primaryDiagnosis: 'Congestive Heart Failure, NYHA Class II',
      conditions: ['CHF', 'Hypertension', 'Atrial Fibrillation'],
      medications: ['Lisinopril 10mg', 'Carvedilol 6.25mg', 'Furosemide 40mg', 'Warfarin 5mg'],
      allergies: ['None known'],
      physician: 'Dr. Michael Garcia',
      status: 'active',
      riskLevel: 'high',
      lastVisit: '2025-07-26',
      nextVisit: '2025-07-31',
      admissionDate: '2025-06-01',
      episodeCount: 7,
      notes: 'Monitor weight daily. Fluid restriction advised.'
    }
  ]);

  const [view, setView] = useState('list'); // list, detail, form
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editingPatient, setEditingPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Filter and sort patients
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm) ||
      patient.primaryDiagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;
    const matchesRisk = filterRisk === 'all' || patient.riskLevel === filterRisk;
    
    return matchesSearch && matchesStatus && matchesRisk;
  }).sort((a, b) => {
    switch(sortBy) {
      case 'name':
        return `${a.lastName} ${a.firstName}`.localeCompare(`${b.lastName} ${b.firstName}`);
      case 'recent':
        return new Date(b.lastVisit) - new Date(a.lastVisit);
      case 'risk':
        const riskOrder = { high: 0, medium: 1, low: 2 };
        return riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
      default:
        return 0;
    }
  });

  const handleAddPatient = () => {
    setEditingPatient(null);
    setView('form');
  };

  const handleEditPatient = (patient) => {
    setEditingPatient(patient);
    setView('form');
  };

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setView('detail');
  };

  const handleDeletePatient = (patientId) => {
    setPatients(patients.filter(p => p.id !== patientId));
    setShowDeleteConfirm(null);
    if (selectedPatient?.id === patientId) {
      setView('list');
      setSelectedPatient(null);
    }
  };

  const handleSavePatient = (patientData) => {
    if (editingPatient) {
      // Update existing patient
      setPatients(patients.map(p => 
        p.id === editingPatient.id ? { ...patientData, id: editingPatient.id } : p
      ));
    } else {
      // Add new patient
      const newPatient = {
        ...patientData,
        id: Math.max(...patients.map(p => p.id), 0) + 1,
        admissionDate: new Date().toISOString().split('T')[0],
        episodeCount: 1,
        lastVisit: new Date().toISOString().split('T')[0],
        status: 'active'
      };
      setPatients([...patients, newPatient]);
    }
    setView('list');
    setEditingPatient(null);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'status-active';
      case 'discharged': return 'status-discharged';
      case 'pending': return 'status-pending';
      default: return '';
    }
  };

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'low': return 'risk-low';
      case 'medium': return 'risk-medium';
      case 'high': return 'risk-high';
      default: return '';
    }
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Render different views
  if (view === 'form') {
    return (
      <PatientForm
        patient={editingPatient}
        onSave={handleSavePatient}
        onCancel={() => {
          setView('list');
          setEditingPatient(null);
        }}
      />
    );
  }

  if (view === 'detail' && selectedPatient) {
    return (
      <PatientDetail
        patient={selectedPatient}
        onBack={() => {
          setView('list');
          setSelectedPatient(null);
        }}
        onEdit={() => handleEditPatient(selectedPatient)}
      />
    );
  }

  // List view
  return (
    <div className="patients-container apple-design">
      {/* Header */}
      <div className="patients-header-apple">
        <div>
          <h1 className="page-title-apple">Patients</h1>
          <p className="page-subtitle-apple">Manage patient records with AI assistance</p>
        </div>
      </div>

      {/* AI Assistant Bar */}
      <div className="ai-assistant-bar-apple">
        <div className="ai-status-apple">
          <div className="ai-icon-apple">
            <Cpu size={18} />
          </div>
          <span className="ai-text-apple">AI is analyzing patient trends and risk factors</span>
        </div>
        <div className="ai-actions-apple">
          <button className="apple-button apple-button-small apple-button-secondary">
            <Upload size={16} />
            Import
          </button>
          <button className="apple-button apple-button-small apple-button-secondary">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="stats-row-apple">
        <div className="stat-card-apple">
          <div className="stat-header-apple">
            <span className="stat-label-apple">Total Patients</span>
            <div className="stat-icon-apple">
              <Users size={20} />
            </div>
          </div>
          <h2 className="stat-value-apple">{patients.length}</h2>
          <div className="stat-trend-apple trend-positive">
            <TrendingUp size={14} />
            <span>3 new this week</span>
          </div>
        </div>
        
        <div className="stat-card-apple">
          <div className="stat-header-apple">
            <span className="stat-label-apple">Active Patients</span>
            <div className="stat-icon-apple">
              <Activity size={20} />
            </div>
          </div>
          <h2 className="stat-value-apple">{patients.filter(p => p.status === 'active').length}</h2>
          <div className="stat-trend-apple trend-positive">
            <CheckCircle size={14} />
            <span>All on track</span>
          </div>
        </div>
        
        <div className="stat-card-apple">
          <div className="stat-header-apple">
            <span className="stat-label-apple">High Risk</span>
            <div className="stat-icon-apple">
              <Heart size={20} />
            </div>
          </div>
          <h2 className="stat-value-apple">{patients.filter(p => p.riskLevel === 'high').length}</h2>
          <div className="stat-trend-apple trend-negative">
            <AlertCircle size={14} />
            <span>Needs attention</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="search-filters-apple">
        <div className="search-box-apple">
          <Search size={18} className="search-icon-apple" />
          <input
            type="text"
            placeholder="Search patients by name, phone, or diagnosis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input-apple"
          />
        </div>
        
        <div className="filter-group-apple">
          <button 
            className={`filter-btn-apple ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            All Patients
          </button>
          <button 
            className={`filter-btn-apple ${filterStatus === 'active' ? 'active' : ''}`}
            onClick={() => setFilterStatus('active')}
          >
            Active
          </button>
          <button 
            className={`filter-btn-apple ${filterStatus === 'discharged' ? 'active' : ''}`}
            onClick={() => setFilterStatus('discharged')}
          >
            Discharged
          </button>
        </div>
        
        <div className="filter-group-apple">
          <button 
            className={`filter-btn-apple ${filterRisk === 'all' ? 'active' : ''}`}
            onClick={() => setFilterRisk('all')}
          >
            <Shield size={14} />
            All Risk
          </button>
          <button 
            className={`filter-btn-apple ${filterRisk === 'high' ? 'active' : ''}`}
            onClick={() => setFilterRisk('high')}
          >
            High Risk
          </button>
          <button 
            className={`filter-btn-apple ${filterRisk === 'medium' ? 'active' : ''}`}
            onClick={() => setFilterRisk('medium')}
          >
            Medium
          </button>
          <button 
            className={`filter-btn-apple ${filterRisk === 'low' ? 'active' : ''}`}
            onClick={() => setFilterRisk('low')}
          >
            Low
          </button>
        </div>
      </div>

      {/* Patient Cards Grid */}
      {filteredPatients.length === 0 ? (
        <div className="empty-state-apple">
          <Users size={64} className="empty-icon-apple" />
          <h3 className="empty-title-apple">No patients found</h3>
          <p className="empty-description-apple">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="patients-grid-apple">
          {filteredPatients.map(patient => (
            <div key={patient.id} className="patient-card-apple" onClick={() => handleViewPatient(patient)}>
              <div className="patient-card-header-apple">
                <div className="patient-avatar-apple">
                  {patient.firstName.charAt(0)}{patient.lastName.charAt(0)}
                </div>
                <div>
                  <h3 className="patient-name-apple">
                    {patient.firstName} {patient.lastName}
                  </h3>
                  <p className="patient-meta-apple">
                    {calculateAge(patient.dateOfBirth)} years • {patient.gender} • MRN: {patient.id.toString().padStart(6, '0')}
                  </p>
                  <div className="patient-badges-apple">
                    <span className={`status-badge-apple ${getStatusColor(patient.status)}`}>
                      {patient.status}
                    </span>
                    <span className={`risk-badge-apple ${getRiskColor(patient.riskLevel)}`}>
                      {patient.riskLevel} risk
                    </span>
                  </div>
                </div>
              </div>

              <div className="patient-card-body-apple">
                <div className="info-row-apple">
                  <Phone size={16} className="info-icon-apple" />
                  <span>{patient.phone}</span>
                </div>
                <div className="info-row-apple">
                  <MapPin size={16} className="info-icon-apple" />
                  <span>{patient.address}</span>
                </div>
                <div className="info-row-apple">
                  <Activity size={16} className="info-icon-apple" />
                  <span>{patient.primaryDiagnosis}</span>
                </div>
                <div className="info-row-apple">
                  <Calendar size={16} className="info-icon-apple" />
                  <span>Next visit: {new Date(patient.nextVisit).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="patient-card-footer-apple">
                <div className="quick-stats-apple">
                  <div className="stat-item-apple">
                    <span className="stat-number-apple">{patient.episodeCount}</span>
                    <span className="stat-text-apple">Episodes</span>
                  </div>
                  <div className="stat-item-apple">
                    <span className="stat-number-apple">{patient.medications.length}</span>
                    <span className="stat-text-apple">Meds</span>
                  </div>
                  <div className="stat-item-apple">
                    <span className="stat-number-apple">{patient.conditions.length}</span>
                    <span className="stat-text-apple">Conditions</span>
                  </div>
                </div>

                <div className="card-actions-apple">
                  <button 
                    className="action-btn-apple"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditPatient(patient);
                    }}
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    className="action-btn-apple"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDeleteConfirm(patient);
                    }}
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Patient Button */}
      <button 
        className="add-patient-btn-apple"
        onClick={handleAddPatient}
      >
        <Plus size={20} />
        Add Patient
      </button>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay-apple" onClick={() => setShowDeleteConfirm(null)}>
          <div className="modal-content-apple" onClick={e => e.stopPropagation()}>
            <div className="modal-header-apple">
              <h3 className="modal-title-apple">Delete Patient</h3>
            </div>
            <div className="modal-body-apple">
              <p>Are you sure you want to delete <strong>{showDeleteConfirm.firstName} {showDeleteConfirm.lastName}</strong>?</p>
              <p style={{ color: '#ff3b30', fontSize: '0.875rem', marginTop: '0.5rem' }}>This action cannot be undone.</p>
            </div>
            <div className="modal-footer-apple" style={{ background: '#f5f5f7', padding: '1.5rem', marginTop: '1.5rem' }}>
              <button 
                className="apple-button apple-button-secondary"
                onClick={() => setShowDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button 
                className="apple-button apple-button-danger"
                onClick={() => handleDeletePatient(showDeleteConfirm.id)}
              >
                Delete Patient
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patients;