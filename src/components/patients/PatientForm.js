import React, { useState } from 'react';
import { 
  X, Save, User, Phone, Mail, MapPin, Calendar,
  Heart, Shield, Stethoscope, FileText, AlertCircle
} from 'lucide-react';

const PatientForm = ({ patient, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: patient?.firstName || '',
    lastName: patient?.lastName || '',
    dateOfBirth: patient?.dateOfBirth || '',
    gender: patient?.gender || '',
    phone: patient?.phone || '',
    email: patient?.email || '',
    address: patient?.address || '',
    
    emergencyContact: {
      name: patient?.emergencyContact?.name || '',
      relationship: patient?.emergencyContact?.relationship || '',
      phone: patient?.emergencyContact?.phone || ''
    },
    
    insurance: {
      primary: patient?.insurance?.primary || '',
      policyNumber: patient?.insurance?.policyNumber || '',
      group: patient?.insurance?.group || ''
    },
    
    primaryDiagnosis: patient?.primaryDiagnosis || '',
    conditions: patient?.conditions || [],
    medications: patient?.medications || [],
    allergies: patient?.allergies || [],
    physician: patient?.physician || '',
    status: patient?.status || 'active',
    riskLevel: patient?.riskLevel || 'low',
    nextVisit: patient?.nextVisit || '',
    notes: patient?.notes || ''
  });

  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState('personal');

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (field, value, action = 'add') => {
    if (action === 'add' && value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
    } else if (action === 'remove') {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, index) => index !== value)
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.emergencyContact.name.trim()) newErrors.emergencyContactName = 'Emergency contact name is required';
    if (!formData.emergencyContact.phone.trim()) newErrors.emergencyContactPhone = 'Emergency contact phone is required';
    if (!formData.insurance.primary.trim()) newErrors.insurancePrimary = 'Primary insurance is required';
    if (!formData.insurance.policyNumber.trim()) newErrors.insurancePolicyNumber = 'Policy number is required';
    if (!formData.primaryDiagnosis.trim()) newErrors.primaryDiagnosis = 'Primary diagnosis is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const age = calculateAge(formData.dateOfBirth);
      onSave({ ...formData, age });
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

  const sections = [
    { id: 'personal', label: 'Personal Information', icon: User },
    { id: 'contact', label: 'Contact & Emergency', icon: Phone },
    { id: 'insurance', label: 'Insurance', icon: Shield },
    { id: 'medical', label: 'Medical Information', icon: Stethoscope }
  ];

  return (
    <div className="patient-form-container">
      <div className="form-header">
        <h2>{patient ? 'Edit Patient' : 'Add New Patient'}</h2>
        <button className="close-btn" onClick={onCancel}>
          <X size={20} />
        </button>
      </div>

      <div className="form-navigation">
        {sections.map(section => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              <Icon size={16} />
              {section.label}
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="patient-form">
        {/* Personal Information */}
        {activeSection === 'personal' && (
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>First Name *</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <label>Last Name *</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>

              <div className="form-group">
                <label>Date of Birth *</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                  className={errors.dateOfBirth ? 'error' : ''}
                />
                {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
              </div>

              <div className="form-group">
                <label>Gender *</label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleChange('gender', e.target.value)}
                  className={errors.gender ? 'error' : ''}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <span className="error-message">{errors.gender}</span>}
              </div>
            </div>
          </div>
        )}

        {/* Contact & Emergency */}
        {activeSection === 'contact' && (
          <div className="form-section">
            <h3>Contact Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Phone *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="(555) 123-4567"
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="patient@email.com"
                />
              </div>

              <div className="form-group full-width">
                <label>Address *</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="123 Main St, City, State ZIP"
                  className={errors.address ? 'error' : ''}
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>
            </div>

            <h3>Emergency Contact</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Contact Name *</label>
                <input
                  type="text"
                  value={formData.emergencyContact.name}
                  onChange={(e) => handleNestedChange('emergencyContact', 'name', e.target.value)}
                  className={errors.emergencyContactName ? 'error' : ''}
                />
                {errors.emergencyContactName && <span className="error-message">{errors.emergencyContactName}</span>}
              </div>

              <div className="form-group">
                <label>Relationship</label>
                <select
                  value={formData.emergencyContact.relationship}
                  onChange={(e) => handleNestedChange('emergencyContact', 'relationship', e.target.value)}
                >
                  <option value="">Select Relationship</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Child">Child</option>
                  <option value="Parent">Parent</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Friend">Friend</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Phone *</label>
                <input
                  type="tel"
                  value={formData.emergencyContact.phone}
                  onChange={(e) => handleNestedChange('emergencyContact', 'phone', e.target.value)}
                  placeholder="(555) 123-4567"
                  className={errors.emergencyContactPhone ? 'error' : ''}
                />
                {errors.emergencyContactPhone && <span className="error-message">{errors.emergencyContactPhone}</span>}
              </div>
            </div>
          </div>
        )}

        {/* Insurance */}
        {activeSection === 'insurance' && (
          <div className="form-section">
            <h3>Insurance Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Primary Insurance *</label>
                <select
                  value={formData.insurance.primary}
                  onChange={(e) => handleNestedChange('insurance', 'primary', e.target.value)}
                  className={errors.insurancePrimary ? 'error' : ''}
                >
                  <option value="">Select Insurance</option>
                  <option value="Medicare Part A">Medicare Part A</option>
                  <option value="Medicare Part B">Medicare Part B</option>
                  <option value="Medicare Part A + B">Medicare Part A + B</option>
                  <option value="Medicare Part A + Supplemental">Medicare Part A + Supplemental</option>
                  <option value="Medicaid">Medicaid</option>
                  <option value="Blue Cross Blue Shield">Blue Cross Blue Shield</option>
                  <option value="Aetna">Aetna</option>
                  <option value="Humana">Humana</option>
                  <option value="Other">Other</option>
                </select>
                {errors.insurancePrimary && <span className="error-message">{errors.insurancePrimary}</span>}
              </div>

              <div className="form-group">
                <label>Policy Number *</label>
                <input
                  type="text"
                  value={formData.insurance.policyNumber}
                  onChange={(e) => handleNestedChange('insurance', 'policyNumber', e.target.value)}
                  className={errors.insurancePolicyNumber ? 'error' : ''}
                />
                {errors.insurancePolicyNumber && <span className="error-message">{errors.insurancePolicyNumber}</span>}
              </div>

              <div className="form-group">
                <label>Group Number</label>
                <input
                  type="text"
                  value={formData.insurance.group}
                  onChange={(e) => handleNestedChange('insurance', 'group', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Medical Information */}
        {activeSection === 'medical' && (
          <div className="form-section">
            <h3>Medical Information</h3>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Primary Diagnosis *</label>
                <input
                  type="text"
                  value={formData.primaryDiagnosis}
                  onChange={(e) => handleChange('primaryDiagnosis', e.target.value)}
                  placeholder="e.g., Post-surgical recovery - Knee replacement"
                  className={errors.primaryDiagnosis ? 'error' : ''}
                />
                {errors.primaryDiagnosis && <span className="error-message">{errors.primaryDiagnosis}</span>}
              </div>

              <div className="form-group">
                <label>Primary Physician</label>
                <input
                  type="text"
                  value={formData.physician}
                  onChange={(e) => handleChange('physician', e.target.value)}
                  placeholder="Dr. John Smith"
                />
              </div>

              <div className="form-group">
                <label>Risk Level</label>
                <select
                  value={formData.riskLevel}
                  onChange={(e) => handleChange('riskLevel', e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="form-group">
                <label>Next Visit Date</label>
                <input
                  type="date"
                  value={formData.nextVisit}
                  onChange={(e) => handleChange('nextVisit', e.target.value)}
                />
              </div>
            </div>

            {/* Conditions */}
            <div className="form-group">
              <label>Medical Conditions</label>
              <div className="array-input">
                <input
                  type="text"
                  placeholder="Add a condition"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleArrayChange('conditions', e.target.value, 'add');
                      e.target.value = '';
                    }
                  }}
                />
                <div className="tag-list">
                  {formData.conditions.map((condition, index) => (
                    <span key={index} className="tag">
                      {condition}
                      <button
                        type="button"
                        onClick={() => handleArrayChange('conditions', index, 'remove')}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Medications */}
            <div className="form-group">
              <label>Current Medications</label>
              <div className="array-input">
                <input
                  type="text"
                  placeholder="Add a medication"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleArrayChange('medications', e.target.value, 'add');
                      e.target.value = '';
                    }
                  }}
                />
                <div className="tag-list">
                  {formData.medications.map((medication, index) => (
                    <span key={index} className="tag">
                      {medication}
                      <button
                        type="button"
                        onClick={() => handleArrayChange('medications', index, 'remove')}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Allergies */}
            <div className="form-group">
              <label>Allergies</label>
              <div className="array-input">
                <input
                  type="text"
                  placeholder="Add an allergy"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleArrayChange('allergies', e.target.value, 'add');
                      e.target.value = '';
                    }
                  }}
                />
                <div className="tag-list">
                  {formData.allergies.map((allergy, index) => (
                    <span key={index} className="tag allergy">
                      {allergy}
                      <button
                        type="button"
                        onClick={() => handleArrayChange('allergies', index, 'remove')}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="form-group full-width">
              <label>Clinical Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                rows={4}
                placeholder="Additional notes about the patient..."
              />
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            <Save size={16} />
            {patient ? 'Update Patient' : 'Add Patient'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;