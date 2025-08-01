import React, { useState } from 'react';
import { 
  ArrowLeft, Edit2, Save, X, User, Phone, MapPin, Calendar, 
  Heart, Shield, Stethoscope, AlertCircle, FileText, Clock,
  Mail, Users, Pill, UserCheck
} from 'lucide-react';

const PatientDetail = ({ patient, onBack, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...patient });
  const [activeTab, setActiveTab] = useState('overview');

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData({ ...patient });
  };

  const handleSave = () => {
    onUpdate(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({ ...patient });
  };

  const handleChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'medical', label: 'Medical Info', icon: Heart },
    { id: 'contacts', label: 'Contacts', icon: Phone },
    { id: 'insurance', label: 'Insurance', icon: Shield },
    { id: 'notes', label: 'Clinical Notes', icon: FileText }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div style={{ display: 'grid', gap: '24px' }}>
            {/* Basic Information */}
            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{ marginBottom: '16px', color: '#111827' }}>Basic Information</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '14px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px'
                      }}
                    />
                  ) : (
                    <p style={{ margin: 0, fontSize: '16px', color: '#111827' }}>{patient.name}</p>
                  )}
                </div>

                <div>
                  <label style={{ fontSize: '14px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editedData.dateOfBirth || ''}
                      onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px'
                      }}
                    />
                  ) : (
                    <p style={{ margin: 0, fontSize: '16px', color: '#111827' }}>
                      {patient.dateOfBirth || `Age: ${patient.age}`}
                    </p>
                  )}
                </div>

                <div>
                  <label style={{ fontSize: '14px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                    Gender
                  </label>
                  {isEditing ? (
                    <select
                      value={editedData.gender || ''}
                      onChange={(e) => handleChange('gender', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px'
                      }}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <p style={{ margin: 0, fontSize: '16px', color: '#111827' }}>
                      {patient.gender || 'Not specified'}
                    </p>
                  )}
                </div>

                <div>
                  <label style={{ fontSize: '14px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                    SSN
                  </label>
                  <p style={{ margin: 0, fontSize: '16px', color: '#111827' }}>
                    {patient.ssn ? `***-**-${patient.ssn.slice(-4)}` : 'Not provided'}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{ marginBottom: '16px', color: '#111827' }}>Contact Information</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '14px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px'
                      }}
                    />
                  ) : (
                    <p style={{ margin: 0, fontSize: '16px', color: '#111827' }}>{patient.phone}</p>
                  )}
                </div>

                <div>
                  <label style={{ fontSize: '14px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedData.email || ''}
                      onChange={(e) => handleChange('email', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px'
                      }}
                    />
                  ) : (
                    <p style={{ margin: 0, fontSize: '16px', color: '#111827' }}>
                      {patient.email || 'Not provided'}
                    </p>
                  )}
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ fontSize: '14px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                    Address
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.address || ''}
                      onChange={(e) => handleChange('address', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px'
                      }}
                    />
                  ) : (
                    <p style={{ margin: 0, fontSize: '16px', color: '#111827' }}>
                      {patient.address || 'Address not provided'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Status Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div style={{
                background: patient.status === 'active' ? '#d1fae5' : '#fee2e2',
                padding: '16px',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 8px 0' }}>Status</p>
                <p style={{ 
                  fontSize: '18px', 
                  fontWeight: 'bold', 
                  color: patient.status === 'active' ? '#065f46' : '#991b1b',
                  margin: 0 
                }}>
                  {patient.status.replace('-', ' ').toUpperCase()}
                </p>
              </div>

              <div style={{
                background: 
                  patient.riskLevel === 'low' ? '#d1fae5' : 
                  patient.riskLevel === 'medium' ? '#fef3c7' : '#fee2e2',
                padding: '16px',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 8px 0' }}>Risk Level</p>
                <p style={{ 
                  fontSize: '18px', 
                  fontWeight: 'bold', 
                  color: 
                    patient.riskLevel === 'low' ? '#065f46' : 
                    patient.riskLevel === 'medium' ? '#92400e' : '#991b1b',
                  margin: 0 
                }}>
                  {patient.riskLevel.toUpperCase()}
                </p>
              </div>

              <div style={{
                background: '#e0e7ff',
                padding: '16px',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 8px 0' }}>Next Visit</p>
                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#3730a3', margin: 0 }}>
                  {patient.nextVisit}
                </p>
              </div>
            </div>
          </div>
        );

      case 'medical':
        return (
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ marginBottom: '16px', color: '#111827' }}>Medical Information</h3>
            <div style={{ display: 'grid', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '14px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                  Primary Diagnosis
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.condition}
                    onChange={(e) => handleChange('condition', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px'
                    }}
                  />
                ) : (
                  <p style={{ margin: 0, fontSize: '16px', color: '#111827' }}>{patient.condition}</p>
                )}
              </div>

              <div>
                <label style={{ fontSize: '14px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                  Current Medications
                </label>
                {isEditing ? (
                  <textarea
                    value={editedData.medications || ''}
                    onChange={(e) => handleChange('medications', e.target.value)}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px'
                    }}
                  />
                ) : (
                  <p style={{ margin: 0, fontSize: '16px', color: '#111827' }}>
                    {patient.medications || 'No medications listed'}
                  </p>
                )}
              </div>

              <div>
                <label style={{ fontSize: '14px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                  Allergies
                </label>
                {isEditing ? (
                  <textarea
                    value={editedData.allergies || ''}
                    onChange={(e) => handleChange('allergies', e.target.value)}
                    rows={2}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px'
                    }}
                  />
                ) : (
                  <p style={{ margin: 0, fontSize: '16px', color: '#111827' }}>
                    {patient.allergies || 'No known allergies'}
                  </p>
                )}
              </div>

              <div>
                <label style={{ fontSize: '14px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                  Primary Physician
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.physician || ''}
                    onChange={(e) => handleChange('physician', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px'
                    }}
                  />
                ) : (
                  <p style={{ margin: 0, fontSize: '16px', color: '#111827' }}>
                    {patient.physician || 'Not specified'}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 'contacts':
        return (
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ marginBottom: '16px', color: '#111827' }}>Emergency Contact</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '14px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                  Contact Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.emergencyName || ''}
                    onChange={(e) => handleChange('emergencyName', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px'
                    }}
                  />
                ) : (
                  <p style={{ margin: 0, fontSize: '16px', color: '#111827' }}>
                    {patient.emergencyName || 'Not provided'}
                  </p>
                )}
              </div>

              <div>
                <label style={{ fontSize: '14px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                  Contact Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedData.emergencyPhone || ''}
                    onChange={(e) => handleChange('emergencyPhone', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px'
                    }}
                  />
                ) : (
                  <p style={{ margin: 0, fontSize: '16px', color: '#111827' }}>
                    {patient.emergencyPhone || 'Not provided'}
                  </p>
                )}
              </div>

              <div>
                <label style={{ fontSize: '14px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                  Relationship
                </label>
                {isEditing ? (
                  <select
                    value={editedData.emergencyRelation || ''}
                    onChange={(e) => handleChange('emergencyRelation', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px'
                    }}
                  >
                    <option value="">Select Relationship</option>
                    <option value="spouse">Spouse</option>
                    <option value="child">Child</option>
                    <option value="parent">Parent</option>
                    <option value="sibling">Sibling</option>
                    <option value="friend">Friend</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <p style={{ margin: 0, fontSize: '16px', color: '#111827' }}>
                    {patient.emergencyRelation || 'Not specified'}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 'insurance':
        return (
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ marginBottom: '16px', color: '#111827' }}>Insurance Information</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '14px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                  Insurance Provider
                </label>
                {isEditing ? (
                  <select
                    value={editedData.insurance || ''}
                    onChange={(e) => handleChange('insurance', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px'
                    }}
                  >
                    <option value="">Select Insurance</option>
                    <option value="Medicare A">Medicare A</option>
                    <option value="Medicare B">Medicare B</option>
                    <option value="Medicare A + B">Medicare A + B</option>
                    <option value="Medicaid">Medicaid</option>
                    <option value="Blue Cross Blue Shield">Blue Cross Blue Shield</option>
                    <option value="Aetna">Aetna</option>
                    <option value="Humana">Humana</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p style={{ margin: 0, fontSize: '16px', color: '#111827' }}>{patient.insurance}</p>
                )}
              </div>

              <div>
                <label style={{ fontSize: '14px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                  Policy Number
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.policyNumber || ''}
                    onChange={(e) => handleChange('policyNumber', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px'
                    }}
                  />
                ) : (
                  <p style={{ margin: 0, fontSize: '16px', color: '#111827' }}>
                    {patient.policyNumber || 'Not provided'}
                  </p>
                )}
              </div>

              <div>
                <label style={{ fontSize: '14px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                  Group Number
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.groupNumber || ''}
                    onChange={(e) => handleChange('groupNumber', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px'
                    }}
                  />
                ) : (
                  <p style={{ margin: 0, fontSize: '16px', color: '#111827' }}>
                    {patient.groupNumber || 'Not provided'}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 'notes':
        return (
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, color: '#111827' }}>Clinical Notes</h3>
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                Add Note
              </button>
            </div>
            
            <div style={{ 
              padding: '20px', 
              backgroundColor: '#f9fafb', 
              borderRadius: '8px',
              textAlign: 'center',
              color: '#6b7280'
            }}>
              <FileText size={48} style={{ marginBottom: '8px', opacity: 0.3 }} />
              <p>No clinical notes yet</p>
              <p style={{ fontSize: '14px' }}>Clinical notes will appear here once added</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={onBack}
            style={{
              padding: '8px',
              background: 'none',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>
              {patient.name}
            </h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#6b7280' }}>
              Patient ID: #{patient.id}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <X size={18} />
                Cancel
              </button>
              <button
                onClick={handleSave}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Save size={18} />
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={handleEdit}
              style={{
                padding: '8px 16px',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Edit2 size={18} />
              Edit Patient
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ 
        borderBottom: '1px solid #e5e7eb',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', gap: '24px' }}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '12px 0',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '2px solid #2563eb' : '2px solid transparent',
                  color: activeTab === tab.id ? '#2563eb' : '#6b7280',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  fontWeight: activeTab === tab.id ? '500' : 'normal'
                }}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default PatientDetail;