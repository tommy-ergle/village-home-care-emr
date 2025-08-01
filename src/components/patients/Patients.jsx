import React, { useState, useEffect } from 'react';
import { 
  Users, Search, Plus, Filter, Download, Upload,
  Edit, Trash2, Eye, Phone, MapPin, Calendar,
  AlertCircle, CheckCircle, Clock, ChevronRight,
  Mail, User, FileText, Activity, Shield, MoreVertical
} from 'lucide-react';
import PatientForm from './PatientForm';
import PatientDetail from './PatientDetail';
import '../../styles/Patients.css';

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
    <div className="patients-container">
      {/* Header */}
      <div className="patients-header">
        <div>
          <h1 className="page-title">Patients</h1>
          <p className="page-subtitle">Manage patient records and information</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">
            <Upload size={16} />
            Import
          </button>
          <button className="btn-secondary">
            <Download size={16} />
            Export
          </button>
          <button className="btn-primary" onClick={handleAddPatient}>
            <Plus size={16} />
            Add Patient
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="filters-section">
        <div className="search-box">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search patients by name, phone, or diagnosis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-controls">
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="discharged">Discharged</option>
            <option value="pending">Pending</option>
          </select>
          
          <select 
            value={filterRisk} 
            onChange={(e) => setFilterRisk(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Risk Levels</option>
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
          </select>
          
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="name">Sort by Name</option>
            <option value="recent">Recent Visits</option>
            <option value="risk">Risk Level</option>
          </select>
        </div>
      </div>

      {/* Results Summary */}
      <div className="results-summary">
        <span>Showing {filteredPatients.length} of {patients.length} patients</span>
      </div>

      {/* Patient Cards Grid */}
      <div className="patients-grid">
        {filteredPatients.map(patient => (
          <div key={patient.id} className="patient-card">
            <div className="patient-card-header">
              <div className="patient-info">
                <h3 className="patient-name">
                  {patient.firstName} {patient.lastName}
                </h3>
                <p className="patient-meta">
                  {patient.age} years • {patient.gender}
                </p>
              </div>
              <div className="patient-badges">
                <span className={`status-badge ${getStatusColor(patient.status)}`}>
                  {patient.status}
                </span>
                <span className={`risk-badge ${getRiskColor(patient.riskLevel)}`}>
                  {patient.riskLevel} risk
                </span>
              </div>
            </div>

            <div className="patient-card-body">
              <div className="info-row">
                <Phone size={14} />
                <span>{patient.phone}</span>
              </div>
              <div className="info-row">
                <MapPin size={14} />
                <span>{patient.address}</span>
              </div>
              <div className="info-row">
                <Activity size={14} />
                <span>{patient.primaryDiagnosis}</span>
              </div>
              <div className="info-row">
                <Calendar size={14} />
                <span>Next visit: {new Date(patient.nextVisit).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="patient-card-footer">
              <div className="quick-stats">
                <div className="stat">
                  <span className="stat-value">{patient.episodeCount}</span>
                  <span className="stat-label">Episodes</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{patient.medications.length}</span>
                  <span className="stat-label">Medications</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{patient.conditions.length}</span>
                  <span className="stat-label">Conditions</span>
                </div>
              </div>

              <div className="card-actions">
                <button 
                  className="action-btn"
                  onClick={() => handleViewPatient(patient)}
                  title="View Details"
                >
                  <Eye size={16} />
                </button>
                <button 
                  className="action-btn"
                  onClick={() => handleEditPatient(patient)}
                  title="Edit"
                >
                  <Edit size={16} />
                </button>
                <button 
                  className="action-btn danger"
                  onClick={() => setShowDeleteConfirm(patient)}
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPatients.length === 0 && (
        <div className="empty-state">
          <Users size={48} />
          <h3>No patients found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Delete Patient</h3>
            <p>Are you sure you want to delete {showDeleteConfirm.firstName} {showDeleteConfirm.lastName}?</p>
            <p className="warning-text">This action cannot be undone.</p>
            <div className="modal-actions">
              <button 
                className="btn-secondary"
                onClick={() => setShowDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button 
                className="btn-danger"
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