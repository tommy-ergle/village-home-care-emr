import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Calendar, Users, FileText, Activity, DollarSign, Bell, 
  Menu, Home, User, LogOut, Search, Plus, Edit, Trash2, 
  Check, X, Clock, AlertCircle, ChevronRight, Filter,
  Brain, Heart, Stethoscope, Pill, Clipboard, TrendingUp,
  Shield, Phone, Mail, MapPin, Save, Download, Upload,
  BarChart3, PieChart, Settings, HelpCircle, MessageSquare,
  Printer, Share2, Archive, RefreshCw, Eye, EyeOff, Cpu
} from 'lucide-react';
import AppleSidebar from './components/AppleSidebar';
import SchedulingSystemExternal from './components/scheduling/SchedulingSystem';
import PatientsExternal from './components/patients/Patients';
import OasisAssessmentExternal from './components/clinical/OasisAssessment';
import './styles/AIHealthcareEMR.css';
import './styles/AppleSidebar.css';

// TypeScript Interfaces
interface User {
  id: string;
  email: string;
  name: string;
  role: 'Admin' | 'Nurse' | 'Therapist' | 'Aide' | 'Billing' | 'Scheduler';
  permissions: string[];
  avatar?: string;
}

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  mrn: string;
  status: 'Active' | 'Discharged' | 'Pending' | 'On Hold';
  primaryDiagnosis: string;
  secondaryDiagnoses: string[];
  insurance: {
    primary: InsuranceInfo;
    secondary?: InsuranceInfo;
  };
  contacts: Contact[];
  address: Address;
  phone: string;
  email?: string;
  emergencyContact: Contact;
  physician: {
    name: string;
    phone: string;
    fax?: string;
  };
  admissionDate: string;
  dischargeDate?: string;
  careTeam: CareTeamMember[];
  medications: Medication[];
  allergies: string[];
  alerts: Alert[];
  lastVisit?: Visit;
  nextVisit?: Visit;
  oasisScore?: number;
  fallRisk: 'Low' | 'Medium' | 'High';
  carePlan?: CarePlan;
}

interface InsuranceInfo {
  company: string;
  policyNumber: string;
  groupNumber?: string;
  effectiveDate: string;
  authorizationNumber?: string;
  authorizedVisits?: number;
  usedVisits?: number;
}

interface Contact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  isPrimary?: boolean;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface CareTeamMember {
  id: string;
  name: string;
  role: string;
  discipline: 'RN' | 'PT' | 'OT' | 'ST' | 'MSW' | 'HHA';
  phone: string;
  isPrimary?: boolean;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  route: string;
  startDate: string;
  endDate?: string;
  prescriber: string;
  active: boolean;
}

interface Alert {
  id: string;
  type: 'Clinical' | 'Administrative' | 'Safety';
  severity: 'Low' | 'Medium' | 'High';
  message: string;
  date: string;
  resolvedDate?: string;
  resolvedBy?: string;
}

interface Visit {
  id: string;
  patientId: string;
  clinicianId: string;
  clinicianName: string;
  type: 'SN' | 'PT' | 'OT' | 'ST' | 'MSW' | 'HHA';
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Missed' | 'Cancelled';
  scheduledDate: string;
  scheduledTime: string;
  actualDate?: string;
  actualTime?: string;
  duration?: number;
  notes?: string;
  vitals?: VitalSigns;
  tasks?: VisitTask[];
  mileage?: number;
  signature?: string;
}

interface VitalSigns {
  bloodPressure?: { systolic: number; diastolic: number };
  pulse?: number;
  temperature?: number;
  respirations?: number;
  oxygenSaturation?: number;
  weight?: number;
  bloodGlucose?: number;
  painLevel?: number;
}

interface VisitTask {
  id: string;
  description: string;
  completed: boolean;
  completedTime?: string;
}

interface ClinicalNote {
  id: string;
  patientId: string;
  visitId?: string;
  authorId: string;
  authorName: string;
  date: string;
  type: 'Progress Note' | 'OASIS' | 'Discharge Summary' | 'Incident Report' | 'Care Plan Update';
  content: string;
  attachments?: Attachment[];
  signed: boolean;
  signedDate?: string;
  addendum?: string[];
}

interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedDate: string;
}

interface OASISAssessment {
  id: string;
  patientId: string;
  type: 'SOC' | 'ROC' | 'FU' | 'DC' | 'RFA' | 'Transfer';
  assessmentDate: string;
  clinicianId: string;
  clinicianName: string;
  status: 'In Progress' | 'Completed' | 'Submitted' | 'Accepted' | 'Rejected';
  m0100_reasonForAssessment: string;
  functionalStatus: {
    m1800_grooming: number;
    m1810_dressing_upper: number;
    m1820_dressing_lower: number;
    m1830_bathing: number;
    m1840_toilet_transferring: number;
    m1850_transferring: number;
    m1860_ambulation: number;
  };
  clinicalFindings: {
    primaryDiagnosis: string;
    otherDiagnoses: string[];
    m1033_hospitalRisk: number;
    m1242_painFrequency: number;
    m1400_dyspnea: number;
  };
  medications: {
    m2001_drugRegimen: number;
    m2003_medicationFollowUp: number;
    m2005_medicationIntervention: number;
  };
  careManagement: {
    m2102_careManagement: string[];
    m2200_therapy_need: number;
  };
  score?: number;
  submittedDate?: string;
  responseDate?: string;
  responseMessage?: string;
}

interface CarePlan {
  id: string;
  patientId: string;
  startDate: string;
  endDate?: string;
  status: 'Active' | 'On Hold' | 'Completed';
  goals: CareGoal[];
  interventions: Intervention[];
  disciplines: DisciplineFrequency[];
  lastUpdated: string;
  updatedBy: string;
}

interface CareGoal {
  id: string;
  category: 'Physical' | 'Cognitive' | 'Psychosocial' | 'Safety' | 'Education';
  description: string;
  targetDate: string;
  status: 'Not Started' | 'In Progress' | 'Met' | 'Revised' | 'Discontinued';
  outcome?: string;
}

interface Intervention {
  id: string;
  discipline: string;
  description: string;
  frequency: string;
  duration: string;
  active: boolean;
}

interface DisciplineFrequency {
  discipline: 'SN' | 'PT' | 'OT' | 'ST' | 'MSW' | 'HHA';
  frequency: string;
  duration: string;
  visits: {
    ordered: number;
    completed: number;
    remaining: number;
  };
}

interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  clinicianId: string;
  clinicianName: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  status: 'Scheduled' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';
  notes?: string;
  recurrence?: {
    pattern: 'Daily' | 'Weekly' | 'Biweekly' | 'Monthly';
    endDate?: string;
  };
}

interface Claim {
  id: string;
  patientId: string;
  patientName: string;
  claimNumber: string;
  dateOfService: string;
  submittedDate?: string;
  status: 'Draft' | 'Pending' | 'Submitted' | 'Accepted' | 'Rejected' | 'Paid' | 'Denied';
  billingCodes: BillingCode[];
  totalAmount: number;
  paidAmount?: number;
  adjustmentAmount?: number;
  patientResponsibility?: number;
  insurance: {
    primary: string;
    secondary?: string;
  };
  denialReason?: string;
  notes?: string;
}

interface BillingCode {
  code: string;
  description: string;
  units: number;
  amount: number;
  modifier?: string;
}

interface Analytics {
  census: {
    total: number;
    byStatus: { [key: string]: number };
    trend: { date: string; count: number }[];
  };
  visits: {
    scheduled: number;
    completed: number;
    missed: number;
    byDiscipline: { [key: string]: number };
  };
  financial: {
    revenue: number;
    outstanding: number;
    collections: number;
    byPayer: { [key: string]: number };
  };
  clinical: {
    readmissionRate: number;
    averageLOS: number;
    patientSatisfaction: number;
    oasisScores: { category: string; average: number }[];
  };
  compliance: {
    documentationRate: number;
    timelyClaims: number;
    oasisTimeliness: number;
  };
}

// Main EMR Component
const AIHealthcareEMR: React.FC = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // Navigation State
  const [activeModule, setActiveModule] = useState<string>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Patient Management State
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patientSearchTerm, setPatientSearchTerm] = useState('');
  const [patientFilter, setPatientFilter] = useState<'All' | 'Active' | 'Discharged'>('Active');
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

  // Clinical State
  const [clinicalNotes, setClinicalNotes] = useState<ClinicalNote[]>([]);
  const [oasisAssessments, setOasisAssessments] = useState<OASISAssessment[]>([]);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [showOasisForm, setShowOasisForm] = useState(false);
  const [selectedNote, setSelectedNote] = useState<ClinicalNote | null>(null);
  const [selectedOasis, setSelectedOasis] = useState<OASISAssessment | null>(null);

  // Scheduling State
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  // Revenue Cycle State
  const [claims, setClaims] = useState<Claim[]>([]);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [showClaimForm, setShowClaimForm] = useState(false);
  const [billingDashboard, setBillingDashboard] = useState({
    totalBilled: 0,
    totalCollected: 0,
    outstanding: 0,
    denialRate: 0
  });

  // Analytics State
  const [analyticsData, setAnalyticsData] = useState<Analytics | null>(null);
  const [analyticsDateRange, setAnalyticsDateRange] = useState({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    end: new Date()
  });

  // Demo users for authentication
  const demoUsers: User[] = [
    {
      id: '1',
      email: 'admin@healthcare.com',
      name: 'Sarah Johnson',
      role: 'Admin',
      permissions: ['all']
    },
    {
      id: '2',
      email: 'nurse@healthcare.com',
      name: 'Emily Davis, RN',
      role: 'Nurse',
      permissions: ['patients', 'clinical', 'scheduling']
    },
    {
      id: '3',
      email: 'billing@healthcare.com',
      name: 'Michael Chen',
      role: 'Billing',
      permissions: ['billing', 'reports']
    }
  ];

  // Initialize demo data
  useEffect(() => {
    if (isAuthenticated) {
      initializeDemoData();
    }
  }, [isAuthenticated]);

  const initializeDemoData = () => {
    // Demo patients
    const demoPatients: Patient[] = [
      {
        id: '1',
        firstName: 'Robert',
        lastName: 'Williams',
        dateOfBirth: '1945-03-15',
        mrn: 'MRN001',
        status: 'Active',
        primaryDiagnosis: 'Type 2 Diabetes Mellitus',
        secondaryDiagnoses: ['Hypertension', 'Osteoarthritis'],
        insurance: {
          primary: {
            company: 'Medicare',
            policyNumber: 'ABC123456',
            effectiveDate: '2020-01-01',
            authorizationNumber: 'AUTH001',
            authorizedVisits: 60,
            usedVisits: 12
          }
        },
        contacts: [{
          name: 'Mary Williams',
          relationship: 'Spouse',
          phone: '(555) 123-4567',
          isPrimary: true
        }],
        address: {
          street: '123 Oak Street',
          city: 'Anytown',
          state: 'CA',
          zip: '12345'
        },
        phone: '(555) 987-6543',
        email: 'robert.williams@email.com',
        emergencyContact: {
          name: 'Mary Williams',
          relationship: 'Spouse',
          phone: '(555) 123-4567'
        },
        physician: {
          name: 'Dr. James Smith',
          phone: '(555) 111-2222'
        },
        admissionDate: '2024-01-15',
        careTeam: [
          {
            id: '1',
            name: 'Emily Davis, RN',
            role: 'Primary Nurse',
            discipline: 'RN',
            phone: '(555) 333-4444',
            isPrimary: true
          },
          {
            id: '2',
            name: 'John Anderson, PT',
            role: 'Physical Therapist',
            discipline: 'PT',
            phone: '(555) 555-6666'
          }
        ],
        medications: [
          {
            id: '1',
            name: 'Metformin',
            dosage: '500mg',
            frequency: 'Twice daily',
            route: 'Oral',
            startDate: '2024-01-15',
            prescriber: 'Dr. James Smith',
            active: true
          },
          {
            id: '2',
            name: 'Lisinopril',
            dosage: '10mg',
            frequency: 'Once daily',
            route: 'Oral',
            startDate: '2024-01-15',
            prescriber: 'Dr. James Smith',
            active: true
          }
        ],
        allergies: ['Penicillin', 'Sulfa drugs'],
        alerts: [
          {
            id: '1',
            type: 'Clinical',
            severity: 'Medium',
            message: 'Fall risk - requires assistance with ambulation',
            date: '2024-01-20'
          }
        ],
        fallRisk: 'Medium',
        oasisScore: 85
      },
      {
        id: '2',
        firstName: 'Margaret',
        lastName: 'Thompson',
        dateOfBirth: '1938-07-22',
        mrn: 'MRN002',
        status: 'Active',
        primaryDiagnosis: 'Congestive Heart Failure',
        secondaryDiagnoses: ['COPD', 'Atrial Fibrillation'],
        insurance: {
          primary: {
            company: 'Medicare',
            policyNumber: 'DEF789012',
            effectiveDate: '2019-01-01',
            authorizationNumber: 'AUTH002',
            authorizedVisits: 90,
            usedVisits: 35
          },
          secondary: {
            company: 'Blue Cross Blue Shield',
            policyNumber: 'XYZ456789',
            effectiveDate: '2019-01-01'
          }
        },
        contacts: [{
          name: 'Susan Thompson',
          relationship: 'Daughter',
          phone: '(555) 234-5678',
          email: 'susan.t@email.com',
          isPrimary: true
        }],
        address: {
          street: '456 Elm Avenue',
          city: 'Riverside',
          state: 'CA',
          zip: '12346'
        },
        phone: '(555) 876-5432',
        emergencyContact: {
          name: 'Susan Thompson',
          relationship: 'Daughter',
          phone: '(555) 234-5678'
        },
        physician: {
          name: 'Dr. Patricia Lee',
          phone: '(555) 222-3333',
          fax: '(555) 222-3334'
        },
        admissionDate: '2023-11-01',
        careTeam: [
          {
            id: '1',
            name: 'Emily Davis, RN',
            role: 'Primary Nurse',
            discipline: 'RN',
            phone: '(555) 333-4444',
            isPrimary: true
          }
        ],
        medications: [
          {
            id: '1',
            name: 'Furosemide',
            dosage: '40mg',
            frequency: 'Once daily',
            route: 'Oral',
            startDate: '2023-11-01',
            prescriber: 'Dr. Patricia Lee',
            active: true
          },
          {
            id: '2',
            name: 'Carvedilol',
            dosage: '12.5mg',
            frequency: 'Twice daily',
            route: 'Oral',
            startDate: '2023-11-01',
            prescriber: 'Dr. Patricia Lee',
            active: true
          }
        ],
        allergies: ['NSAIDs'],
        alerts: [
          {
            id: '1',
            type: 'Clinical',
            severity: 'High',
            message: 'Daily weight monitoring required',
            date: '2023-11-01'
          },
          {
            id: '2',
            type: 'Safety',
            severity: 'High',
            message: 'High fall risk - recent hospitalization',
            date: '2023-11-15'
          }
        ],
        fallRisk: 'High',
        oasisScore: 72
      }
    ];

    setPatients(demoPatients);

    // Demo clinical notes
    const demoNotes: ClinicalNote[] = [
      {
        id: '1',
        patientId: '1',
        authorId: '2',
        authorName: 'Emily Davis, RN',
        date: '2024-01-20',
        type: 'Progress Note',
        content: 'Patient visited for routine diabetic management. Blood glucose levels stable at 120 mg/dL. No signs of infection at insulin injection sites. Patient demonstrates good understanding of dietary restrictions. Medication compliance excellent.',
        signed: true,
        signedDate: '2024-01-20'
      }
    ];

    setClinicalNotes(demoNotes);

    // Demo appointments
    const demoAppointments: Appointment[] = [
      {
        id: '1',
        patientId: '1',
        patientName: 'Robert Williams',
        clinicianId: '2',
        clinicianName: 'Emily Davis, RN',
        date: new Date().toISOString().split('T')[0],
        time: '10:00',
        duration: 60,
        type: 'SN',
        status: 'Scheduled',
        notes: 'Routine diabetic management visit'
      },
      {
        id: '2',
        patientId: '2',
        patientName: 'Margaret Thompson',
        clinicianId: '2',
        clinicianName: 'Emily Davis, RN',
        date: new Date().toISOString().split('T')[0],
        time: '14:00',
        duration: 60,
        type: 'SN',
        status: 'Scheduled',
        notes: 'CHF monitoring, daily weights'
      }
    ];

    setAppointments(demoAppointments);

    // Demo analytics
    const demoAnalytics: Analytics = {
      census: {
        total: 156,
        byStatus: {
          'Active': 142,
          'Pending': 8,
          'Discharged': 6
        },
        trend: [
          { date: '2024-01-01', count: 145 },
          { date: '2024-01-08', count: 148 },
          { date: '2024-01-15', count: 152 },
          { date: '2024-01-22', count: 156 }
        ]
      },
      visits: {
        scheduled: 45,
        completed: 38,
        missed: 2,
        byDiscipline: {
          'SN': 20,
          'PT': 10,
          'OT': 8,
          'HHA': 5,
          'ST': 2
        }
      },
      financial: {
        revenue: 125000,
        outstanding: 45000,
        collections: 80000,
        byPayer: {
          'Medicare': 75000,
          'Medicaid': 15000,
          'Private': 25000,
          'Other': 10000
        }
      },
      clinical: {
        readmissionRate: 12.5,
        averageLOS: 62,
        patientSatisfaction: 4.6,
        oasisScores: [
          { category: 'Functional', average: 78 },
          { category: 'Clinical', average: 82 },
          { category: 'Service', average: 85 }
        ]
      },
      compliance: {
        documentationRate: 96,
        timelyClaims: 92,
        oasisTimeliness: 94
      }
    };

    setAnalyticsData(demoAnalytics);
  };

  // Authentication handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = demoUsers.find(u => 
      u.email === loginForm.email && 
      loginForm.password === loginForm.email.split('@')[0] // Simple demo password
    );

    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid email or password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActiveModule('dashboard');
  };

  // Patient management functions
  const filteredPatients = useMemo(() => {
    return patients.filter(patient => {
      const matchesSearch = 
        patient.firstName.toLowerCase().includes(patientSearchTerm.toLowerCase()) ||
        patient.lastName.toLowerCase().includes(patientSearchTerm.toLowerCase()) ||
        patient.mrn.toLowerCase().includes(patientSearchTerm.toLowerCase());
      
      const matchesFilter = patientFilter === 'All' || patient.status === patientFilter;
      
      return matchesSearch && matchesFilter;
    });
  }, [patients, patientSearchTerm, patientFilter]);

  const handleSavePatient = (patientData: Partial<Patient>) => {
    if (editingPatient) {
      setPatients(prev => prev.map(p => 
        p.id === editingPatient.id ? { ...p, ...patientData } : p
      ));
    } else {
      const newPatient: Patient = {
        ...{
          id: Date.now().toString(),
          status: 'Active' as const,
          alerts: [],
          medications: [],
          allergies: [],
          careTeam: [],
          secondaryDiagnoses: [],
          fallRisk: 'Low' as const,
        },
        ...patientData
      } as Patient;
      setPatients(prev => [...prev, newPatient]);
    }
    setShowPatientForm(false);
    setEditingPatient(null);
  };

  // Clinical documentation functions
  const handleSaveNote = (noteData: Partial<ClinicalNote>) => {
    const newNote: ClinicalNote = {
      ...{
        id: Date.now().toString(),
        authorId: currentUser?.id || '',
        authorName: currentUser?.name || '',
        date: new Date().toISOString().split('T')[0],
        signed: false,
      },
      ...noteData
    } as ClinicalNote;
    setClinicalNotes(prev => [...prev, newNote]);
    setShowNoteForm(false);
  };

  const handleSignNote = (noteId: string) => {
    setClinicalNotes(prev => prev.map(note =>
      note.id === noteId
        ? { ...note, signed: true, signedDate: new Date().toISOString().split('T')[0] }
        : note
    ));
  };

  // Scheduling functions
  const handleSaveAppointment = (appointmentData: Partial<Appointment>) => {
    if (selectedAppointment) {
      setAppointments(prev => prev.map(apt =>
        apt.id === selectedAppointment.id ? { ...apt, ...appointmentData } : apt
      ));
    } else {
      const newAppointment: Appointment = {
        ...{
          id: Date.now().toString(),
          status: 'Scheduled' as const,
          duration: 60,
        },
        ...appointmentData
      } as Appointment;
      setAppointments(prev => [...prev, newAppointment]);
    }
    setShowAppointmentForm(false);
    setSelectedAppointment(null);
  };

  // Revenue cycle functions
  const handleSaveClaim = (claimData: Partial<Claim>) => {
    const newClaim: Claim = {
      ...{
        id: Date.now().toString(),
        claimNumber: `CLM${Date.now()}`,
        status: 'Draft' as const,
        totalAmount: 0,
        billingCodes: [],
      },
      ...claimData
    } as Claim;
    setClaims(prev => [...prev, newClaim]);
    setShowClaimForm(false);
  };

  const handleSubmitClaim = (claimId: string) => {
    setClaims(prev => prev.map(claim =>
      claim.id === claimId
        ? { ...claim, status: 'Submitted', submittedDate: new Date().toISOString().split('T')[0] }
        : claim
    ));
  };

  // Login Screen Component
  const LoginScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Brain className="h-12 w-12 text-indigo-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Healthcare EMR</h1>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>
          
          {loginError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {loginError}
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Sign In
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          <p className="font-medium mb-2">Demo Credentials:</p>
          <p>Admin: admin@healthcare.com / admin</p>
          <p>Nurse: nurse@healthcare.com / nurse</p>
          <p>Billing: billing@healthcare.com / billing</p>
        </div>
      </div>
    </div>
  );

  // Main Dashboard Component
  const Dashboard = ({ setActiveView }: { setActiveView: (view: string) => void }) => (
    <div className="dashboard-apple">
      <div className="dashboard-header-apple">
        <h1 className="welcome-message">Welcome back, {currentUser?.name}</h1>
        <p className="dashboard-date">Here's your overview for {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
      </div>
      
      <div className="stats-grid-apple">
        <div className="stat-card-apple">
          <div className="stat-header-apple">
            <h4 className="stat-title-apple">Total Patients</h4>
            <div className="stat-icon-apple">
              <Users size={24} />
            </div>
          </div>
          <div className="stat-value-apple">{analyticsData?.census.total || 0}</div>
          <div className="stat-change-apple positive">
            <TrendingUp size={16} />
            <span>+{analyticsData?.census.byStatus['Pending'] || 0} pending</span>
          </div>
        </div>
        
        <div className="stat-card-apple">
          <div className="stat-header-apple">
            <h4 className="stat-title-apple">Today's Visits</h4>
            <div className="stat-icon-apple">
              <Calendar size={24} />
            </div>
          </div>
          <div className="stat-value-apple">{analyticsData?.visits.scheduled || 0}</div>
          <div className="stat-change-apple positive">
            <Check size={16} />
            <span>{analyticsData?.visits.completed || 0} completed</span>
          </div>
        </div>
        
        <div className="stat-card-apple">
          <div className="stat-header-apple">
            <h4 className="stat-title-apple">Monthly Revenue</h4>
            <div className="stat-icon-apple">
              <DollarSign size={24} />
            </div>
          </div>
          <div className="stat-value-apple">${((analyticsData?.financial.revenue || 0) / 1000).toFixed(0)}k</div>
          <div className="stat-change-apple">
            <Clock size={16} />
            <span>${((analyticsData?.financial.outstanding || 0) / 1000).toFixed(0)}k outstanding</span>
          </div>
        </div>
        
        <div className="stat-card-apple">
          <div className="stat-header-apple">
            <h4 className="stat-title-apple">Readmission Rate</h4>
            <div className="stat-icon-apple">
              <Activity size={24} />
            </div>
          </div>
          <div className="stat-value-apple">{analyticsData?.clinical.readmissionRate || 0}%</div>
          <div className="stat-change-apple negative">
            <AlertCircle size={16} />
            <span>30-day average</span>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="quick-actions-apple">
        <div className="section-header-apple">
          <h2 className="section-title-apple">Quick Actions</h2>
        </div>
        <div className="actions-grid-apple">
          <div className="action-card-apple" onClick={() => setActiveView('patients')}>
            <div className="action-icon-apple">
              <Users size={24} />
            </div>
            <span className="action-label-apple">New Patient</span>
          </div>
          <div className="action-card-apple" onClick={() => setActiveView('scheduling')}>
            <div className="action-icon-apple">
              <Calendar size={24} />
            </div>
            <span className="action-label-apple">Schedule Visit</span>
          </div>
          <div className="action-card-apple" onClick={() => setActiveView('clinical')}>
            <div className="action-icon-apple">
              <FileText size={24} />
            </div>
            <span className="action-label-apple">Create Note</span>
          </div>
          <div className="action-card-apple" onClick={() => setActiveView('assessments')}>
            <div className="action-icon-apple">
              <Clipboard size={24} />
            </div>
            <span className="action-label-apple">Start OASIS</span>
          </div>
        </div>
      </div>
      
      {/* Recent Activities */}
      <div className="recent-activities-apple">
        <div className="section-header-apple">
          <h2 className="section-title-apple">Recent Activities</h2>
        </div>
        <div className="activities-list-apple">
          <div className="activity-item-apple">
            <div className="activity-icon-apple">
              <Users size={18} style={{ color: '#0071e3' }} />
            </div>
            <div className="activity-content-apple">
              <h4 className="activity-title-apple">New patient admitted</h4>
              <p className="activity-description-apple">Sarah Johnson was admitted for post-surgical care</p>
            </div>
            <span className="activity-time-apple">2 hours ago</span>
          </div>
          <div className="activity-item-apple">
            <div className="activity-icon-apple">
              <FileText size={18} style={{ color: '#34c759' }} />
            </div>
            <div className="activity-content-apple">
              <h4 className="activity-title-apple">OASIS assessment completed</h4>
              <p className="activity-description-apple">Robert Chen's 60-day recert completed</p>
            </div>
            <span className="activity-time-apple">5 hours ago</span>
          </div>
          <div className="activity-item-apple">
            <div className="activity-icon-apple">
              <Calendar size={18} style={{ color: '#ff9500' }} />
            </div>
            <div className="activity-content-apple">
              <h4 className="activity-title-apple">Visit rescheduled</h4>
              <p className="activity-description-apple">Maria Rodriguez's PT visit moved to tomorrow</p>
            </div>
            <span className="activity-time-apple">Yesterday</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Patient Management Component
  const PatientManagement = () => (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Patient Management</h1>
        <button
          onClick={() => setShowPatientForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Patient
        </button>
      </div>
      
      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients..."
                value={patientSearchTerm}
                onChange={(e) => setPatientSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            {(['All', 'Active', 'Discharged'] as const).map(filter => (
              <button
                key={filter}
                onClick={() => setPatientFilter(filter)}
                className={`px-4 py-2 rounded-lg ${
                  patientFilter === filter
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Patient List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                MRN
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Primary Diagnosis
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPatients.map(patient => (
              <tr key={patient.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {patient.firstName} {patient.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{patient.phone}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {patient.mrn}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {patient.primaryDiagnosis}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    patient.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : patient.status === 'Discharged'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {patient.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedPatient(patient);
                      setActiveModule('patientDetail');
                    }}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      setEditingPatient(patient);
                      setShowPatientForm(true);
                    }}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Clinical Notes Component
  const ClinicalNotes = () => (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Clinical Documentation</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowNoteForm(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
          >
            <FileText className="h-4 w-4 mr-2" />
            New Note
          </button>
          <button
            onClick={() => setShowOasisForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
          >
            <Clipboard className="h-4 w-4 mr-2" />
            New OASIS
          </button>
        </div>
      </div>
      
      {/* Recent Notes */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Recent Notes</h2>
        </div>
        <div className="divide-y">
          {clinicalNotes.map(note => {
            const patient = patients.find(p => p.id === note.patientId);
            return (
              <div key={note.id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <p className="font-medium text-gray-900 mr-3">
                        {patient?.firstName} {patient?.lastName}
                      </p>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                        {note.type}
                      </span>
                      {note.signed && (
                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded text-sm flex items-center">
                          <Check className="h-3 w-3 mr-1" />
                          Signed
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{note.content}</p>
                    <p className="text-xs text-gray-500">
                      {note.authorName} - {note.date}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {!note.signed && (
                      <button
                        onClick={() => handleSignNote(note.id)}
                        className="text-green-600 hover:text-green-700"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    )}
                    <button className="text-gray-600 hover:text-gray-700">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Scheduling Component
  const SchedulingSystem = () => {
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    
    return (
      <div className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Scheduling</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAppointmentForm(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Appointment
            </button>
          </div>
        </div>
        
        {/* Calendar View */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex gap-2">
              {(['day', 'week', 'month'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1 rounded ${
                    viewMode === mode
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded">
                <ChevronRight className="h-4 w-4 rotate-180" />
              </button>
              <span className="font-medium">
                {selectedDate.toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </span>
              <button className="p-2 hover:bg-gray-100 rounded">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Week View */}
          {viewMode === 'week' && (
            <div className="p-4">
              <div className="grid grid-cols-8 gap-px bg-gray-200">
                <div className="bg-gray-50 p-2 text-center text-sm font-medium">
                  Time
                </div>
                {weekDays.map(day => (
                  <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium">
                    {day}
                  </div>
                ))}
                
                {/* Time slots */}
                {Array.from({ length: 10 }, (_, i) => i + 8).map(hour => (
                  <React.Fragment key={hour}>
                    <div className="bg-white p-2 text-sm text-gray-500 text-right">
                      {hour}:00
                    </div>
                    {weekDays.map((day, dayIndex) => {
                      const dayAppointments = appointments.filter(apt => {
                        const aptDate = new Date(apt.date);
                        const aptHour = parseInt(apt.time.split(':')[0]);
                        return aptDate.getDay() === dayIndex && aptHour === hour;
                      });
                      
                      return (
                        <div key={`${hour}-${day}`} className="bg-white p-1 min-h-[60px]">
                          {dayAppointments.map(apt => (
                            <div
                              key={apt.id}
                              className="bg-blue-100 text-blue-800 text-xs p-1 rounded mb-1 cursor-pointer hover:bg-blue-200"
                              onClick={() => setSelectedAppointment(apt)}
                            >
                              <p className="font-medium truncate">{apt.patientName}</p>
                              <p className="truncate">{apt.type} - {apt.clinicianName}</p>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Revenue Cycle Component
  const RevenueCycleManagement = () => (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Revenue Cycle Management</h1>
        <button
          onClick={() => setShowClaimForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Claim
        </button>
      </div>
      
      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Total Billed</p>
            <DollarSign className="h-5 w-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-800">
            ${(analyticsData?.financial.revenue || 0).toLocaleString()}
          </p>
          <p className="text-sm text-green-600 mt-1">+12% from last month</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Collected</p>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-800">
            ${(analyticsData?.financial.collections || 0).toLocaleString()}
          </p>
          <p className="text-sm text-green-600 mt-1">64% collection rate</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Outstanding</p>
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-800">
            ${(analyticsData?.financial.outstanding || 0).toLocaleString()}
          </p>
          <p className="text-sm text-yellow-600 mt-1">45 days average</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Denial Rate</p>
            <AlertCircle className="h-5 w-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-800">8.5%</p>
          <p className="text-sm text-red-600 mt-1">+2% from last month</p>
        </div>
      </div>
      
      {/* Claims Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Recent Claims</h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Claim #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Service Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {claims.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No claims found
                </td>
              </tr>
            ) : (
              claims.map(claim => (
                <tr key={claim.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {claim.claimNumber}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {claim.patientName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {claim.dateOfService}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    ${claim.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      claim.status === 'Paid'
                        ? 'bg-green-100 text-green-800'
                        : claim.status === 'Denied'
                        ? 'bg-red-100 text-red-800'
                        : claim.status === 'Submitted'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {claim.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {claim.status === 'Draft' && (
                      <button
                        onClick={() => handleSubmitClaim(claim.id)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Submit
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Analytics Component
  const AnalyticsDashboard = () => (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Analytics & Reporting</h1>
        <p className="text-gray-600">Performance metrics and insights</p>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Clinical Outcomes</h3>
            <Heart className="h-6 w-6 text-red-500" />
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Readmission Rate</p>
              <p className="text-xl font-bold text-gray-800">
                {analyticsData?.clinical.readmissionRate}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Length of Stay</p>
              <p className="text-xl font-bold text-gray-800">
                {analyticsData?.clinical.averageLOS} days
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Patient Satisfaction</p>
              <p className="text-xl font-bold text-gray-800">
                {analyticsData?.clinical.patientSatisfaction}/5.0
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Operational Efficiency</h3>
            <Activity className="h-6 w-6 text-blue-500" />
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Visit Completion Rate</p>
              <p className="text-xl font-bold text-gray-800">
                {analyticsData?.visits.completed && analyticsData?.visits.scheduled
                  ? ((analyticsData.visits.completed / analyticsData.visits.scheduled) * 100).toFixed(1)
                  : 0}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Documentation Compliance</p>
              <p className="text-xl font-bold text-gray-800">
                {analyticsData?.compliance.documentationRate}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">OASIS Timeliness</p>
              <p className="text-xl font-bold text-gray-800">
                {analyticsData?.compliance.oasisTimeliness}%
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Financial Performance</h3>
            <DollarSign className="h-6 w-6 text-green-500" />
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Collection Rate</p>
              <p className="text-xl font-bold text-gray-800">
                {analyticsData?.financial.revenue && analyticsData?.financial.collections
                  ? ((analyticsData.financial.collections / analyticsData.financial.revenue) * 100).toFixed(1)
                  : 0}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Days in AR</p>
              <p className="text-xl font-bold text-gray-800">45 days</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Timely Claims</p>
              <p className="text-xl font-bold text-gray-800">
                {analyticsData?.compliance.timelyClaims}%
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Census Trend</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <BarChart3 className="h-32 w-32 text-gray-300" />
            <p className="ml-4">Chart visualization would go here</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue by Payer</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <PieChart className="h-32 w-32 text-gray-300" />
            <p className="ml-4">Chart visualization would go here</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Sidebar Navigation
  const Sidebar = () => {
    const menuItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'patients', label: 'Patients', icon: Users },
      { id: 'clinical', label: 'Clinical', icon: Stethoscope },
      { id: 'scheduling', label: 'Scheduling', icon: Calendar },
      { id: 'revenue', label: 'Revenue Cycle', icon: DollarSign },
      { id: 'analytics', label: 'Analytics', icon: BarChart3 },
      { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
      <div className={`bg-gray-900 text-white transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      }`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : ''}`}>
              <Brain className="h-8 w-8 text-indigo-400" />
              {!sidebarCollapsed && (
                <span className="ml-2 text-xl font-bold">EMR System</span>
              )}
            </div>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-gray-400 hover:text-white"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveModule(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeModule === item.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {!sidebarCollapsed && (
                    <span className="ml-3">{item.label}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
        
        <div className="absolute bottom-0 w-full p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <LogOut className="h-5 w-5" />
            {!sidebarCollapsed && (
              <span className="ml-3">Logout</span>
            )}
          </button>
        </div>
      </div>
    );
  };

  // Main Layout
  const MainLayout = () => {
    const [activeView, setActiveView] = useState('dashboard');
    
    const renderContent = () => {
      switch (activeView) {
        case 'dashboard':
          return <Dashboard setActiveView={setActiveView} />;
        case 'patients':
          return <PatientsExternal />;
        case 'scheduling':
          return <SchedulingSystemExternal />;
        case 'clinical':
          return <ClinicalNotes />;
        case 'assessments':
          return <OasisAssessmentExternal patient={selectedPatient} onBack={() => setActiveView('patients')} />;
        case 'careplans':
          return (
            <div className="content-wrapper-apple">
              <h1 className="apple-h2">Care Plans</h1>
              <p className="apple-body">Care plans management coming soon...</p>
            </div>
          );
        case 'revenue':
          return <RevenueCycleManagement />;
        case 'analytics':
          return <AnalyticsDashboard />;
        case 'settings':
          return (
            <div className="content-wrapper-apple">
              <h1 className="apple-h2">Settings</h1>
              <p className="apple-body">Settings panel coming soon...</p>
            </div>
          );
        default:
          return <Dashboard setActiveView={setActiveView} />;
      }
    };
    
    return (
      <div className="ai-healthcare-emr apple-design">
        <div className="emr-layout-apple">
          {/* Apple-style Sidebar */}
          <AppleSidebar 
            activeView={activeView} 
            setActiveView={setActiveView}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
          
          {/* Main Content */}
          <main className="main-content-apple">
            {/* Apple-style Header */}
            <header className="emr-header-apple with-sidebar">
              <div className="header-content-apple">
                <div className="header-left-apple">
                  <h1 className="brand-name">{activeView.charAt(0).toUpperCase() + activeView.slice(1)}</h1>
                </div>
                
                <div className="header-center-apple">
                  <div className="search-bar-apple">
                    <Search size={18} className="search-icon" />
                    <input 
                      type="text" 
                      placeholder="Search patients, records, or commands..." 
                      className="search-input-apple"
                    />
                  </div>
                </div>
                
                <div className="header-right-apple">
                  <button className="header-icon-btn">
                    <Bell size={20} />
                    <span className="notification-badge">3</span>
                  </button>
                  <button className="header-icon-btn">
                    <HelpCircle size={20} />
                  </button>
                  <button className="header-icon-btn">
                    <Settings size={20} />
                  </button>
                </div>
              </div>
            </header>
            
            {/* Clean Tab Navigation (for sub-sections) */}
            {activeView === 'clinical' && (
              <nav className="emr-nav-apple">
                <div className="nav-container-apple">
                  <button className="nav-item-apple active">
                    <FileText size={16} />
                    <span>Notes</span>
                  </button>
                  <button className="nav-item-apple">
                    <Clipboard size={16} />
                    <span>Assessments</span>
                  </button>
                  <button className="nav-item-apple">
                    <Activity size={16} />
                    <span>Vitals</span>
                  </button>
                  <button className="nav-item-apple">
                    <Pill size={16} />
                    <span>Medications</span>
                  </button>
                </div>
              </nav>
            )}
            
            {/* Content Area */}
            <div className="emr-main-apple">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    );
  };

  // Main render
  return (
    <div className="min-h-screen">
      {!isAuthenticated ? <LoginScreen /> : <MainLayout />}
      
      <style>{`
        /* Custom styles for the EMR system */
        * {
          box-sizing: border-box;
        }
        
        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        
        /* Animation classes */
        .fade-in {
          animation: fadeIn 0.3s ease-in;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Print styles */
        @media print {
          .no-print {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default AIHealthcareEMR;