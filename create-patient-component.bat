@echo off
(
echo import React, { useState } from 'react';
echo import { Plus, Search, Users, Calendar, Phone, AlertTriangle, CheckCircle, Stethoscope } from 'lucide-react';
echo import '../../styles/Patients.css';
echo.
echo const PatientList = (^) =^> {
echo   const [searchTerm, setSearchTerm] = useState(''^);
echo   const [showAddForm, setShowAddForm] = useState(false^);
echo   
echo   // Sample patient data
echo   const [patients] = useState([
echo     {
echo       id: 1,
echo       name: 'Sarah Johnson',
echo       age: 67,
echo       condition: 'Post-surgical recovery',
echo       status: 'active',
echo       riskLevel: 'low',
echo       nextVisit: '2025-07-30',
echo       phone: '(555^) 123-4567',
echo       insurance: 'Medicare A'
echo     },
echo     {
echo       id: 2,
echo       name: 'Robert Chen',
echo       age: 73,
echo       condition: 'Diabetes management',
echo       status: 'needs-attention',
echo       riskLevel: 'medium',
echo       nextVisit: '2025-07-29',
echo       phone: '(555^) 234-5678',
echo       insurance: 'Medicare A + Supplemental'
echo     },
echo     {
echo       id: 3,
echo       name: 'Maria Rodriguez',
echo       age: 58,
echo       condition: 'Cardiac rehabilitation',
echo       status: 'active',
echo       riskLevel: 'high',
echo       nextVisit: '2025-07-31',
echo       phone: '(555^) 345-6789',
echo       insurance: 'Medicaid'
echo     }
echo   ]^);
echo.
echo   const filteredPatients = patients.filter(patient =^>
echo     patient.name.toLowerCase(^).includes(searchTerm.toLowerCase(^)^) ^|^|
echo     patient.condition.toLowerCase(^).includes(searchTerm.toLowerCase(^)^)
echo   ^);
echo.
echo   return (
echo     ^<div className="patients-container"^>
echo       ^<div className="patients-header"^>
echo         ^<h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: 0 }}^>
echo           Patient Management
echo         ^</h2^>
echo         ^<button className="add-patient-btn" onClick={(^) =^> setShowAddForm(true^)}^>
echo           ^<Plus size={20} /^>
echo           Add Patient
echo         ^</button^>
echo       ^</div^>
echo.
echo       ^<div className="search-section"^>
echo         ^<div style={{ position: 'relative' }}^>
echo           ^<Search 
echo             size={20} 
echo             style={{ 
echo               position: 'absolute', 
echo               left: '12px', 
echo               top: '50%%', 
echo               transform: 'translateY(-50%%^)',
echo               color: '#9ca3af'
echo             }} 
echo           /^>
echo           ^<input
echo             type="text"
echo             placeholder="Search patients by name or condition..."
echo             className="search-input"
echo             value={searchTerm}
echo             onChange={(e^) =^> setSearchTerm(e.target.value^)}
echo           /^>
echo         ^</div^>
echo       ^</div^>
echo.
echo       ^<div className="patients-grid"^>
echo         {filteredPatients.map((patient^) =^> (
echo           ^<div key={patient.id} className="patient-card"^>
echo             ^<div className="patient-header"^>
echo               ^<div^>
echo                 ^<h3 className="patient-name"^>{patient.name}^</h3^>
echo                 ^<p className="patient-age"^>Age: {patient.age}^</p^>
echo               ^</div^>
echo               ^<span className={`risk-badge risk-${patient.riskLevel}`}^>
echo                 {patient.riskLevel} risk
echo               ^</span^>
echo             ^</div^>
echo.
echo             ^<div className="patient-info"^>
echo               ^<div className="info-row"^>
echo                 ^<Stethoscope size={16} /^>
echo                 ^<span^>{patient.condition}^</span^>
echo               ^</div^>
echo               ^<div className="info-row"^>
echo                 ^<Calendar size={16} /^>
echo                 ^<span^>Next visit: {patient.nextVisit}^</span^>
echo               ^</div^>
echo               ^<div className="info-row"^>
echo                 ^<Phone size={16} /^>
echo                 ^<span^>{patient.phone}^</span^>
echo               ^</div^>
echo             ^</div^>
echo.
echo             ^<div className="patient-footer"^>
echo               ^<span className={`status-badge status-${patient.status}`}^>
echo                 {patient.status === 'active' ? 
echo                   ^<CheckCircle size={14} /^> : 
echo                   ^<AlertTriangle size={14} /^>
echo                 }
echo                 {patient.status.replace('-', ' '^)}
echo               ^</span^>
echo               ^<div className="action-buttons"^>
echo                 ^<button className="action-btn"^>View^</button^>
echo                 ^<button className="action-btn"^>Edit^</button^>
echo               ^</div^>
echo             ^</div^>
echo           ^</div^>
echo         ^)^)}
echo       ^</div^>
echo.
echo       {showAddForm ^&^& (
echo         ^<div style={{
echo           position: 'fixed',
echo           top: 0,
echo           left: 0,
echo           right: 0,
echo           bottom: 0,
echo           background: 'rgba(0, 0, 0, 0.5^)',
echo           display: 'flex',
echo           alignItems: 'center',
echo           justifyContent: 'center',
echo           zIndex: 1000
echo         }}^>
echo           ^<div style={{
echo             background: 'white',
echo             padding: '24px',
echo             borderRadius: '8px',
echo             width: '90%%',
echo             maxWidth: '500px'
echo           }}^>
echo             ^<h3 style={{ marginBottom: '16px' }}^>Add New Patient^</h3^>
echo             ^<p^>Patient form will be implemented here!^</p^>
echo             ^<button 
echo               onClick={(^) =^> setShowAddForm(false^)}
echo               style={{
echo                 marginTop: '16px',
echo                 padding: '8px 16px',
echo                 background: '#6b7280',
echo                 color: 'white',
echo                 border: 'none',
echo                 borderRadius: '6px',
echo                 cursor: 'pointer'
echo               }}
echo             ^>
echo               Close
echo             ^</button^>
echo           ^</div^>
echo         ^</div^>
echo       ^)}
echo     ^</div^>
echo   ^);
echo };
echo.
echo export default PatientList;
) > src\components\patients\PatientList.js
echo PatientList component created successfully!