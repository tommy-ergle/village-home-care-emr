import React, { useState } from 'react';
import { 
  Calendar, Plus, ChevronLeft, ChevronRight, Clock, 
  User, MapPin, Phone, Filter, Search, Edit, Trash2,
  AlertCircle, Check, X
} from 'lucide-react';
import '../../styles/Scheduling.css';

const SchedulingSystem = () => {
  const [viewMode, setViewMode] = useState('month'); // month, week, day
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedClinician, setSelectedClinician] = useState('all');
  
  // Sample appointments data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: 'Sarah Johnson',
      patientId: 1,
      clinician: 'Linda Martinez, RN',
      type: 'Skilled Nursing',
      date: '2025-07-30',
      time: '09:00',
      duration: 60,
      status: 'scheduled',
      address: '123 Oak Street, Springfield, IL',
      phone: '(555) 123-4567',
      notes: 'Post-surgical wound care'
    },
    {
      id: 2,
      patientName: 'Robert Chen',
      patientId: 2,
      clinician: 'Mike Johnson, PT',
      type: 'Physical Therapy',
      date: '2025-07-30',
      time: '14:00',
      duration: 45,
      status: 'scheduled',
      address: '456 Elm Avenue, Springfield, IL',
      phone: '(555) 234-5678',
      notes: 'Mobility assessment and exercises'
    },
    {
      id: 3,
      patientName: 'Maria Rodriguez',
      patientId: 3,
      clinician: 'Linda Martinez, RN',
      type: 'Skilled Nursing',
      date: '2025-07-31',
      time: '10:00',
      duration: 60,
      status: 'scheduled',
      address: '789 Pine Road, Springfield, IL',
      phone: '(555) 345-6789',
      notes: 'Medication management, vitals check'
    },
    {
      id: 4,
      patientName: 'Sarah Johnson',
      patientId: 1,
      clinician: 'Emma Davis, OT',
      type: 'Occupational Therapy',
      date: '2025-08-02',
      time: '11:00',
      duration: 45,
      status: 'scheduled',
      address: '123 Oak Street, Springfield, IL',
      phone: '(555) 123-4567',
      notes: 'ADL training'
    }
  ]);

  const clinicians = [
    'Linda Martinez, RN',
    'Mike Johnson, PT',
    'Emma Davis, OT',
    'John Smith, SLP',
    'Amy Wilson, RN',
    'David Brown, PT'
  ];

  const appointmentTypes = [
    { value: 'Skilled Nursing', color: 'nursing' },
    { value: 'Physical Therapy', color: 'therapy' },
    { value: 'Occupational Therapy', color: 'therapy' },
    { value: 'Speech Therapy', color: 'therapy' },
    { value: 'Home Health Aide', color: 'aide' }
  ];

  // New appointment form state
  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    clinician: '',
    type: 'Skilled Nursing',
    date: '',
    time: '',
    duration: 60,
    address: '',
    phone: '',
    notes: ''
  });

  // Date navigation functions
  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      newDate.setMonth(currentDate.getMonth() + direction);
    } else if (viewMode === 'week') {
      newDate.setDate(currentDate.getDate() + (direction * 7));
    } else {
      newDate.setDate(currentDate.getDate() + direction);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Get calendar display data
  const getMonthData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    const days = [];
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: daysInPrevMonth - i,
        month: month - 1,
        year: month === 0 ? year - 1 : year,
        otherMonth: true
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        month: month,
        year: year,
        otherMonth: false
      });
    }
    
    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        month: month + 1,
        year: month === 11 ? year + 1 : year,
        otherMonth: true
      });
    }
    
    return days;
  };

  const getAppointmentsForDate = (date) => {
    const dateStr = `${date.year}-${String(date.month + 1).padStart(2, '0')}-${String(date.date).padStart(2, '0')}`;
    return appointments.filter(apt => {
      if (selectedClinician !== 'all' && apt.clinician !== selectedClinician) {
        return false;
      }
      return apt.date === dateStr;
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.date === today.getDate() && 
           date.month === today.getMonth() && 
           date.year === today.getFullYear();
  };

  const formatDateHeader = () => {
    if (viewMode === 'month') {
      return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } else if (viewMode === 'week') {
      const weekStart = new Date(currentDate);
      weekStart.setDate(currentDate.getDate() - currentDate.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      return `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    } else {
      return currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    }
  };

  const handleNewAppointment = () => {
    const appointment = {
      ...newAppointment,
      id: Date.now(),
      status: 'scheduled'
    };
    setAppointments([...appointments, appointment]);
    setShowNewAppointment(false);
    setNewAppointment({
      patientName: '',
      clinician: '',
      type: 'Skilled Nursing',
      date: selectedDate || '',
      time: '',
      duration: 60,
      address: '',
      phone: '',
      notes: ''
    });
  };

  const getAppointmentTypeColor = (type) => {
    const typeConfig = appointmentTypes.find(t => t.value === type);
    return typeConfig ? typeConfig.color : 'nursing';
  };

  // Render different views
  const renderMonthView = () => {
    const monthData = getMonthData();
    
    return (
      <div className="calendar-grid">
        <div className="calendar-header">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="calendar-day-header">{day}</div>
          ))}
        </div>
        <div className="calendar-body">
          {monthData.map((day, index) => {
            const dayAppointments = getAppointmentsForDate(day);
            const dateStr = `${day.year}-${String(day.month + 1).padStart(2, '0')}-${String(day.date).padStart(2, '0')}`;
            
            return (
              <div
                key={index}
                className={`calendar-cell ${day.otherMonth ? 'other-month' : ''} ${isToday(day) ? 'today' : ''}`}
                onClick={() => {
                  setSelectedDate(dateStr);
                  if (dayAppointments.length === 0) {
                    setNewAppointment(prev => ({ ...prev, date: dateStr }));
                    setShowNewAppointment(true);
                  }
                }}
              >
                <div className="calendar-date">{day.date}</div>
                <div>
                  {dayAppointments.slice(0, 3).map(apt => (
                    <div
                      key={apt.id}
                      className={`appointment-slot ${getAppointmentTypeColor(apt.type)}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle appointment click
                      }}
                    >
                      {apt.time} - {apt.patientName.split(' ')[1]}
                    </div>
                  ))}
                  {dayAppointments.length > 3 && (
                    <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>
                      +{dayAppointments.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const todayAppointments = appointments.filter(apt => {
    const today = new Date().toISOString().split('T')[0];
    return apt.date === today && (selectedClinician === 'all' || apt.clinician === selectedClinician);
  });

  return (
    <div className="scheduling-container">
      <div className="scheduling-header">
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: 0 }}>
          Scheduling System
        </h2>
        <button 
          className="add-patient-btn"
          onClick={() => setShowNewAppointment(true)}
        >
          <Plus size={20} />
          New Appointment
        </button>
      </div>

      {/* Clinician Filter */}
      <div className="clinician-filter">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '16px' }}>
          <Filter size={16} color="#6b7280" />
          <span style={{ fontSize: '14px', color: '#6b7280' }}>Filter by clinician:</span>
        </div>
        <button
          className={`clinician-chip ${selectedClinician === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedClinician('all')}
        >
          All Clinicians
        </button>
        {clinicians.slice(0, 4).map(clinician => (
          <button
            key={clinician}
            className={`clinician-chip ${selectedClinician === clinician ? 'active' : ''}`}
            onClick={() => setSelectedClinician(clinician)}
          >
            {clinician.split(',')[0]}
          </button>
        ))}
      </div>

      {/* Calendar Controls */}
      <div className="calendar-controls">
        <div className="view-selector">
          <button
            className={`view-btn ${viewMode === 'month' ? 'active' : ''}`}
            onClick={() => setViewMode('month')}
          >
            Month
          </button>
          <button
            className={`view-btn ${viewMode === 'week' ? 'active' : ''}`}
            onClick={() => setViewMode('week')}
          >
            Week
          </button>
          <button
            className={`view-btn ${viewMode === 'day' ? 'active' : ''}`}
            onClick={() => setViewMode('day')}
          >
            Day
          </button>
        </div>

        <div className="calendar-nav">
          <button className="nav-btn" onClick={() => navigateDate(-1)}>
            <ChevronLeft size={20} />
          </button>
          <h3 style={{ margin: '0 16px', fontSize: '16px', fontWeight: '500', minWidth: '200px', textAlign: 'center' }}>
            {formatDateHeader()}
          </h3>
          <button className="nav-btn" onClick={() => navigateDate(1)}>
            <ChevronRight size={20} />
          </button>
          <button className="today-btn" onClick={goToToday}>
            Today
          </button>
        </div>
      </div>

      {/* Calendar View */}
      {viewMode === 'month' && renderMonthView()}

      {/* Today's Appointments Sidebar */}
      <div className="appointments-sidebar">
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#111827' }}>
          Today's Appointments ({todayAppointments.length})
        </h3>
        
        {todayAppointments.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: '#6b7280',
            background: '#f9fafb',
            borderRadius: '8px'
          }}>
            <Calendar size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
            <p>No appointments scheduled for today</p>
          </div>
        ) : (
          todayAppointments.map(appointment => (
            <div key={appointment.id} className="appointment-card">
              <div className="appointment-header">
                <div>
                  <div className="appointment-time">
                    {appointment.time} - {appointment.patientName}
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
                    {appointment.type} • {appointment.duration} min
                  </div>
                </div>
                <span className={`appointment-status status-${appointment.status}`}>
                  {appointment.status}
                </span>
              </div>
              
              <div style={{ fontSize: '14px', color: '#4b5563' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <User size={14} />
                  <span>{appointment.clinician}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <MapPin size={14} />
                  <span>{appointment.address}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={14} />
                  <span>{appointment.phone}</span>
                </div>
                {appointment.notes && (
                  <div style={{ marginTop: '8px', padding: '8px', background: '#f9fafb', borderRadius: '6px' }}>
                    <strong>Notes:</strong> {appointment.notes}
                  </div>
                )}
              </div>
              
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <button style={{
                  padding: '6px 12px',
                  border: '1px solid #10b981',
                  color: '#10b981',
                  background: 'white',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Check size={14} />
                  Complete
                </button>
                <button style={{
                  padding: '6px 12px',
                  border: '1px solid #e5e7eb',
                  color: '#6b7280',
                  background: 'white',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}>
                  Reschedule
                </button>
                <button style={{
                  padding: '6px 12px',
                  border: '1px solid #e5e7eb',
                  color: '#ef4444',
                  background: 'white',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}>
                  Cancel
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* New Appointment Modal */}
      {showNewAppointment && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>
                Schedule New Appointment
              </h3>
              <button
                onClick={() => setShowNewAppointment(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <X size={24} color="#6b7280" />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Patient Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={newAppointment.patientName}
                  onChange={(e) => setNewAppointment({...newAppointment, patientName: e.target.value})}
                  placeholder="Select or type patient name"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Clinician *</label>
                <select
                  className="form-select"
                  value={newAppointment.clinician}
                  onChange={(e) => setNewAppointment({...newAppointment, clinician: e.target.value})}
                >
                  <option value="">Select Clinician</option>
                  {clinicians.map(clinician => (
                    <option key={clinician} value={clinician}>{clinician}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Visit Type *</label>
                <select
                  className="form-select"
                  value={newAppointment.type}
                  onChange={(e) => setNewAppointment({...newAppointment, type: e.target.value})}
                >
                  {appointmentTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.value}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Date *</label>
                  <input
                    type="date"
                    className="form-input"
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Time *</label>
                  <input
                    type="time"
                    className="form-input"
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Duration *</label>
                  <select
                    className="form-select"
                    value={newAppointment.duration}
                    onChange={(e) => setNewAppointment({...newAppointment, duration: parseInt(e.target.value)})}
                  >
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-input"
                  value={newAppointment.address}
                  onChange={(e) => setNewAppointment({...newAppointment, address: e.target.value})}
                  placeholder="Patient's address"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-input"
                  value={newAppointment.phone}
                  onChange={(e) => setNewAppointment({...newAppointment, phone: e.target.value})}
                  placeholder="Contact phone number"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Visit Notes</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={newAppointment.notes}
                  onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                  placeholder="Special instructions or notes for this visit..."
                />
              </div>

              <div style={{
                padding: '16px',
                background: '#eff6ff',
                borderRadius: '8px',
                border: '1px solid #bfdbfe'
              }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#1e40af', fontSize: '14px' }}>
                  Scheduling Guidelines
                </h4>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#1e40af' }}>
                  <li>Allow 15 minutes travel time between appointments</li>
                  <li>Verify insurance authorization before scheduling</li>
                  <li>Confirm patient availability</li>
                </ul>
              </div>
            </div>

            <div className="modal-footer">
              <button
                onClick={() => setShowNewAppointment(false)}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #e5e7eb',
                  backgroundColor: 'white',
                  color: '#6b7280',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleNewAppointment}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Schedule Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulingSystem;