import React, { useState, useEffect } from 'react';
import { 
  Calendar, Plus, ChevronLeft, ChevronRight, Clock, 
  User, MapPin, Phone, Filter, Search, Edit, Trash2,
  AlertCircle, Check, X, Sparkles, Trophy, Heart,
  Star, Users, Activity, Award, Target, Zap,
  Sun, Moon, CloudRain, CloudSnow, Coffee,
  Cpu, TrendingUp, CheckCircle
} from 'lucide-react';
import '../../styles/components/SchedulingApple.css';

const SchedulingSystem = () => {
  const [viewMode, setViewMode] = useState('month'); // month, week, day
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedClinician, setSelectedClinician] = useState('all');
  const [showConfetti, setShowConfetti] = useState(false);
  const [completedToday, setCompletedToday] = useState(0);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  
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
    { value: 'Skilled Nursing', color: 'nursing', emoji: '💊', gradient: 'gradient-blue' },
    { value: 'Physical Therapy', color: 'therapy', emoji: '🏃', gradient: 'gradient-green' },
    { value: 'Occupational Therapy', color: 'therapy', emoji: '✋', gradient: 'gradient-purple' },
    { value: 'Speech Therapy', color: 'therapy', emoji: '💬', gradient: 'gradient-orange' },
    { value: 'Home Health Aide', color: 'aide', emoji: '🏠', gradient: 'gradient-pink' }
  ];

  const motivationalMessages = [
    { count: 1, message: "Great start! 🌟", emoji: "🎯" },
    { count: 3, message: "On fire! 🔥", emoji: "🚀" },
    { count: 5, message: "Productivity champion! 🏆", emoji: "👑" },
    { count: 7, message: "Unstoppable! 💪", emoji: "⭐" },
    { count: 10, message: "Legendary performance! 🌟", emoji: "🎊" }
  ];

  // Add confetti effect
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

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

  const getAppointmentTypeConfig = (type) => {
    return appointmentTypes.find(t => t.value === type) || appointmentTypes[0];
  };

  const getWeatherEmoji = () => {
    const hour = new Date().getHours();
    if (hour < 6) return '🌙';
    if (hour < 12) return '☀️';
    if (hour < 17) return '🌤️';
    if (hour < 20) return '🌅';
    return '🌙';
  };

  const completeAppointment = (appointmentId) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId ? { ...apt, status: 'completed' } : apt
    ));
    setCompletedToday(prev => prev + 1);
    
    const message = motivationalMessages.find(m => m.count === completedToday + 1);
    if (message) {
      setShowConfetti(true);
    }
  };

  // Render different views
  const renderMonthView = () => {
    const monthData = getMonthData();
    
    return (
      <div className="calendar-grid-apple">
        <div className="calendar-header-apple">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="calendar-day-header-apple">{day}</div>
          ))}
        </div>
        <div className="calendar-body-apple">
          {monthData.map((day, index) => {
            const dayAppointments = getAppointmentsForDate(day);
            const dateStr = `${day.year}-${String(day.month + 1).padStart(2, '0')}-${String(day.date).padStart(2, '0')}`;
            
            return (
              <div
                key={index}
                className={`calendar-cell-apple ${day.otherMonth ? 'other-month' : ''} ${isToday(day) ? 'today' : ''}`}
                onClick={() => {
                  setSelectedDate(dateStr);
                  if (dayAppointments.length === 0) {
                    setNewAppointment(prev => ({ ...prev, date: dateStr }));
                    setShowNewAppointment(true);
                  } else {
                    setSelectedAppointment(dayAppointments[0]);
                  }
                }}
              >
                <div className="date-number-apple">
                  {day.date}
                  {isToday(day) && <span className="today-indicator-apple">Today</span>}
                </div>
                <div className="appointments-preview-apple">
                  {dayAppointments.slice(0, 3).map(apt => {
                    const typeColor = apt.type === 'Skilled Nursing' ? 'nursing' : 
                                     apt.type.includes('Therapy') ? 'therapy' : 'aide';
                    return (
                      <div
                        key={apt.id}
                        className={`appointment-chip-apple ${typeColor}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAppointment(apt);
                        }}
                      >
                        <Clock size={10} />
                        <span>{apt.time}</span>
                      </div>
                    );
                  })}
                  {dayAppointments.length > 3 && (
                    <div className="appointment-chip-apple" style={{ background: '#f5f5f7', color: '#86868b' }}>
                      +{dayAppointments.length - 3}
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
    <div className="scheduling-container apple-design">
      <div className="scheduling-header-apple">
        <div>
          <h1 className="page-title-apple">Scheduling</h1>
          <p className="page-subtitle-apple">Manage appointments with AI assistance</p>
        </div>
      </div>

      {/* AI Assistant Header */}
      <div className="ai-assistant-header">
        <div className="ai-icon-container">
          <Cpu size={18} />
        </div>
        <span className="ai-status-text">AI Assistant is optimizing your schedule</span>
        <div className="ai-active-indicator" />
      </div>

      {/* Stats Row */}
      <div className="stats-row-apple">
        <div className="stat-card-apple">
          <div className="stat-header-apple">
            <span className="stat-label-apple">Today's Appointments</span>
            <div className="stat-icon-apple">
              <Calendar size={20} />
            </div>
          </div>
          <h2 className="stat-value-apple">{todayAppointments.length}</h2>
          <div className="stat-trend-apple trend-positive">
            <TrendingUp size={14} />
            <span>12% from yesterday</span>
          </div>
        </div>
        
        <div className="stat-card-apple">
          <div className="stat-header-apple">
            <span className="stat-label-apple">Completed</span>
            <div className="stat-icon-apple">
              <CheckCircle size={20} />
            </div>
          </div>
          <h2 className="stat-value-apple">{completedToday}</h2>
          <div className="stat-trend-apple trend-positive">
            <TrendingUp size={14} />
            <span>On track</span>
          </div>
        </div>
        
        <div className="stat-card-apple">
          <div className="stat-header-apple">
            <span className="stat-label-apple">Total Patients</span>
            <div className="stat-icon-apple">
              <Users size={20} />
            </div>
          </div>
          <h2 className="stat-value-apple">156</h2>
          <div className="stat-trend-apple trend-positive">
            <TrendingUp size={14} />
            <span>8 new this week</span>
          </div>
        </div>
      </div>


      {/* Calendar Controls */}
      <div className="calendar-controls-apple">
        <div className="view-selector-apple">
          <button
            className={`view-btn-apple ${viewMode === 'month' ? 'active' : ''}`}
            onClick={() => setViewMode('month')}
          >
            Month
          </button>
          <button
            className={`view-btn-apple ${viewMode === 'week' ? 'active' : ''}`}
            onClick={() => setViewMode('week')}
          >
            Week
          </button>
          <button
            className={`view-btn-apple ${viewMode === 'day' ? 'active' : ''}`}
            onClick={() => setViewMode('day')}
          >
            Day
          </button>
        </div>

        <div className="calendar-nav-apple">
          <button className="nav-btn-apple" onClick={() => navigateDate(-1)}>
            <ChevronLeft size={18} />
          </button>
          <h3 className="current-date-apple">
            {formatDateHeader()}
          </h3>
          <button className="nav-btn-apple" onClick={() => navigateDate(1)}>
            <ChevronRight size={18} />
          </button>
          <button className="today-btn-apple" onClick={goToToday}>
            Today
          </button>
        </div>
      </div>

      {/* Calendar View */}
      <div className="calendar-container-apple">
        {viewMode === 'month' && renderMonthView()}
      </div>

      {/* Add Appointment Button */}
      <button 
        className="add-appointment-btn-apple"
        onClick={() => setShowNewAppointment(true)}
      >
        <Plus size={20} />
        New Appointment
      </button>

      {/* Appointments Sidebar */}
      <div className={`appointments-sidebar-apple ${selectedAppointment ? 'active' : ''}`}>
        <div className="sidebar-header-apple">
          <h3 className="sidebar-title-apple">Appointment Details</h3>
          <button className="close-btn-apple" onClick={() => setSelectedAppointment(null)}>
            <X size={18} />
          </button>
        </div>
        
        {selectedAppointment && (
          <div className="sidebar-content-apple">
            <div className="appointment-card-apple">
              <div className="appointment-header-apple">
                <div>
                  <div className="appointment-time-apple">{selectedAppointment.time}</div>
                  <div className={`appointment-type-badge-apple badge-${selectedAppointment.type === 'Skilled Nursing' ? 'nursing' : selectedAppointment.type.includes('Therapy') ? 'therapy' : 'aide'}`}>
                    {selectedAppointment.type}
                  </div>
                </div>
              </div>
              
              <div className="patient-info-apple">
                <h4 className="patient-name-apple">{selectedAppointment.patientName}</h4>
                <div className="patient-details-apple">
                  <div className="detail-row-apple">
                    <User size={16} />
                    <span>{selectedAppointment.clinician}</span>
                  </div>
                  <div className="detail-row-apple">
                    <MapPin size={16} />
                    <span>{selectedAppointment.address}</span>
                  </div>
                  <div className="detail-row-apple">
                    <Phone size={16} />
                    <span>{selectedAppointment.phone}</span>
                  </div>
                  <div className="detail-row-apple">
                    <Clock size={16} />
                    <span>{selectedAppointment.duration} minutes</span>
                  </div>
                </div>
              </div>
              
              {selectedAppointment.notes && (
                <div style={{ padding: '1rem', background: '#f5f5f7', borderRadius: '0.5rem', marginTop: '1rem' }}>
                  <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Visit Notes</strong>
                  <p style={{ margin: 0, color: '#86868b', fontSize: '0.875rem' }}>{selectedAppointment.notes}</p>
                </div>
              )}
              
              <div className="appointment-actions-apple">
                {selectedAppointment.status !== 'completed' ? (
                  <>
                    <button 
                      className="action-btn-apple primary"
                      onClick={() => completeAppointment(selectedAppointment.id)}
                    >
                      Complete Visit
                    </button>
                    <button className="action-btn-apple">
                      Reschedule
                    </button>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: '1rem', color: '#34c759' }}>
                    <CheckCircle size={48} style={{ marginBottom: '0.5rem' }} />
                    <p style={{ margin: 0, fontWeight: 600 }}>Visit Completed</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* New Appointment Modal */}
      {showNewAppointment && (
        <div className="modal-overlay-apple">
          <div className="modal-content-apple">
            <div className="modal-header-apple">
              <h3 className="modal-title-apple">New Appointment</h3>
              <button
                className="close-btn-apple"
                onClick={() => setShowNewAppointment(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body-apple">
              <div className="form-group-apple">
                <label className="form-label-apple">Patient Name *</label>
                <input
                  type="text"
                  className="form-input-apple"
                  value={newAppointment.patientName}
                  onChange={(e) => setNewAppointment({...newAppointment, patientName: e.target.value})}
                  placeholder="Search for patient..."
                />
              </div>

              <div className="form-group-apple">
                <label className="form-label-apple">Clinician *</label>
                <select
                  className="form-select-apple"
                  value={newAppointment.clinician}
                  onChange={(e) => setNewAppointment({...newAppointment, clinician: e.target.value})}
                >
                  <option value="">Select Clinician</option>
                  {clinicians.map(clinician => (
                    <option key={clinician} value={clinician}>{clinician}</option>
                  ))}
                </select>
              </div>

              <div className="form-group-apple">
                <label className="form-label-apple">Visit Type *</label>
                <select
                  className="form-select-apple"
                  value={newAppointment.type}
                  onChange={(e) => setNewAppointment({...newAppointment, type: e.target.value})}
                >
                  {appointmentTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.value}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div className="form-group-apple">
                  <label className="form-label-apple">Date *</label>
                  <input
                    type="date"
                    className="form-input-apple"
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                  />
                </div>

                <div className="form-group-apple">
                  <label className="form-label-apple">Time *</label>
                  <input
                    type="time"
                    className="form-input-apple"
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                  />
                </div>

                <div className="form-group-apple">
                  <label className="form-label-apple">Duration *</label>
                  <select
                    className="form-select-apple"
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

              <div className="form-group-apple">
                <label className="form-label-apple">Address</label>
                <input
                  type="text"
                  className="form-input-apple"
                  value={newAppointment.address}
                  onChange={(e) => setNewAppointment({...newAppointment, address: e.target.value})}
                  placeholder="Patient's address"
                />
              </div>

              <div className="form-group-apple">
                <label className="form-label-apple">Phone</label>
                <input
                  type="tel"
                  className="form-input-apple"
                  value={newAppointment.phone}
                  onChange={(e) => setNewAppointment({...newAppointment, phone: e.target.value})}
                  placeholder="Contact phone number"
                />
              </div>

              <div className="form-group-apple">
                <label className="form-label-apple">Visit Notes</label>
                <textarea
                  className="form-textarea-apple"
                  rows={3}
                  value={newAppointment.notes}
                  onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                  placeholder="Special instructions or notes for this visit..."
                />
              </div>

            </div>

            <div className="modal-footer-apple">
              <button
                className="apple-button apple-button-secondary"
                onClick={() => setShowNewAppointment(false)}
              >
                Cancel
              </button>
              <button
                className="apple-button apple-button-primary"
                onClick={handleNewAppointment}
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