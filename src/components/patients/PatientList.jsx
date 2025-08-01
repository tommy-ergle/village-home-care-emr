import React, { useState } from 'react';
import { Plus, Search, Users, Calendar, Phone, AlertTriangle, CheckCircle, Stethoscope } from 'lucide-react';
import AddPatientForm from './AddPatientForm';
import PatientDetail from './PatientDetail';
import '../../styles/components/Patients.css';

const PatientList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  
  // Sample patient data - now with ability to add more
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      age: 67,
      condition: 'Post-surgical recovery',
      status: 'active',
      riskLevel: 'low',
      nextVisit: '2025-07-30',
      phone: '(555) 123-4567',
      insurance: 'Medicare A',
      address: '123 Oak Street, Springfield, IL 62701',
      email: 'sarah.johnson@email.com',
      emergencyName: 'John Johnson',
      emergencyPhone: '(555) 123-4568',
      emergencyRelation: 'spouse',
      medications: 'Lisinopril 10mg daily, Metformin 500mg twice daily',
      allergies: 'Penicillin',
      physician: 'Dr. Emily Carter'
    },
    {
      id: 2,
      name: 'Robert Chen',
      age: 73,
      condition: 'Diabetes management',
      status: 'needs-attention',
      riskLevel: 'medium',
      nextVisit: '2025-07-29',
      phone: '(555) 234-5678',
      insurance: 'Medicare A + Supplemental',
      address: '456 Elm Avenue, Springfield, IL 62702',
      email: 'robert.chen@email.com',
      emergencyName: 'Lisa Chen',
      emergencyPhone: '(555) 234-5679',
      emergencyRelation: 'child',
      medications: 'Insulin glargine 20 units daily, Aspirin 81mg daily',
      allergies: 'None',
      physician: 'Dr. Michael Wang'
    },
    {
      id: 3,
      name: 'Maria Rodriguez',
      age: 58,
      condition: 'Cardiac rehabilitation',
      status: 'active',
      riskLevel: 'high',
      nextVisit: '2025-07-31',
      phone: '(555) 345-6789',
      insurance: 'Medicaid',
      address: '789 Pine Road, Springfield, IL 62703',
      email: 'maria.rodriguez@email.com',
      emergencyName: 'Carlos Rodriguez',
      emergencyPhone: '(555) 345-6790',
      emergencyRelation: 'spouse',
      medications: 'Carvedilol 6.25mg twice daily, Furosemide 40mg daily, Potassium 20mEq daily',
      allergies: 'Sulfa drugs',
      physician: 'Dr. James Mitchell'
    }
  ]);

  const handleAddPatient = (newPatient) => {
    setPatients([...patients, newPatient]);
  };

  const handleUpdatePatient = (updatedPatient) => {
    setPatients(patients.map(p => p.id === updatedPatient.id ? updatedPatient : p));
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // If a patient is selected, show the detail view
  if (selectedPatient) {
    return (
      <PatientDetail 
        patient={selectedPatient}
        onBack={() => setSelectedPatient(null)}
        onUpdate={(updatedPatient) => {
          handleUpdatePatient(updatedPatient);
          setSelectedPatient(updatedPatient);
        }}
      />
    );
  }

  // Otherwise show the patient list
  return (
    <div className="patients-container">
      <div className="patients-header">
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: 0 }}>
          Patient Management
        </h2>
        <button className="add-patient-btn" onClick={() => setShowAddForm(true)}>
          <Plus size={20} />
          Add Patient
        </button>
      </div>

      <div className="search-section">
        <div style={{ position: 'relative' }}>
          <Search 
            size={20} 
            style={{ 
              position: 'absolute', 
              left: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: '#9ca3af'
            }} 
          />
          <input
            type="text"
            placeholder="Search patients by name or condition..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div style={{ marginBottom: '16px', fontSize: '14px', color: '#6b7280' }}>
        Showing {filteredPatients.length} of {patients.length} patients
      </div>

      <div className="patients-grid">
        {filteredPatients.map((patient) => (
          <div key={patient.id} className="patient-card">
            <div className="patient-header">
              <div>
                <h3 className="patient-name">{patient.name}</h3>
                <p className="patient-age">Age: {patient.age}</p>
              </div>
              <span className={`risk-badge risk-${patient.riskLevel}`}>
                {patient.riskLevel} risk
              </span>
            </div>

            <div className="patient-info">
              <div className="info-row">
                <Stethoscope size={16} />
                <span>{patient.condition}</span>
              </div>
              <div className="info-row">
                <Calendar size={16} />
                <span>Next visit: {patient.nextVisit}</span>
              </div>
              <div className="info-row">
                <Phone size={16} />
                <span>{patient.phone}</span>
              </div>
            </div>

            <div className="patient-footer">
              <span className={`status-badge status-${patient.status}`}>
                {patient.status === 'active' ? 
                  <CheckCircle size={14} /> : 
                  <AlertTriangle size={14} />
                }
                {patient.status.replace('-', ' ')}
              </span>
              <div className="action-buttons">
                <button 
                  className="action-btn"
                  onClick={() => setSelectedPatient(patient)}
                >
                  View
                </button>
                <button 
                  className="action-btn"
                  onClick={() => {
                    setSelectedPatient(patient);
                    // Could also trigger edit mode directly here
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddForm && (
        <AddPatientForm 
          onClose={() => setShowAddForm(false)}
          onSave={handleAddPatient}
        />
      )}
    </div>
  );
};

export default PatientList;