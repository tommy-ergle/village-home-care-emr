import React, { useState } from 'react';
import { 
  DollarSign, FileText, Shield, TrendingUp, Clock, 
  CheckCircle, AlertCircle, Download, Plus, Search,
  RefreshCw, CreditCard, Receipt, BarChart3, 
  ChevronLeft, ChevronRight, Filter, Send
} from 'lucide-react';
import '../../styles/components/RevenueCycle.css';

const RevenueCycle = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showNewClaim, setShowNewClaim] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Sample claims data
  const [claims, setClaims] = useState([
    {
      id: 'CLM-2025-001',
      patient: 'Sarah Johnson',
      patientId: 1,
      serviceDate: '2025-07-28',
      submittedDate: '2025-07-29',
      amount: 2847.50,
      insurance: 'Medicare A',
      status: 'paid',
      paidAmount: 2847.50,
      paymentDate: '2025-08-15',
      provider: 'Linda Martinez, RN',
      serviceType: 'Skilled Nursing',
      visits: 3
    },
    {
      id: 'CLM-2025-002',
      patient: 'Robert Chen',
      patientId: 2,
      serviceDate: '2025-07-25',
      submittedDate: '2025-07-26',
      amount: 3256.00,
      insurance: 'Medicare A + Supplemental',
      status: 'pending',
      paidAmount: 0,
      paymentDate: null,
      provider: 'Mike Johnson, PT',
      serviceType: 'Physical Therapy',
      visits: 4
    },
    {
      id: 'CLM-2025-003',
      patient: 'Maria Rodriguez',
      patientId: 3,
      serviceDate: '2025-07-20',
      submittedDate: '2025-07-21',
      amount: 1925.75,
      insurance: 'Medicaid',
      status: 'denied',
      paidAmount: 0,
      paymentDate: null,
      provider: 'Linda Martinez, RN',
      serviceType: 'Skilled Nursing',
      visits: 2,
      denialReason: 'Missing prior authorization'
    },
    {
      id: 'CLM-2025-004',
      patient: 'John Williams',
      patientId: 4,
      serviceDate: '2025-07-22',
      submittedDate: '2025-07-23',
      amount: 4120.00,
      insurance: 'Blue Cross Blue Shield',
      status: 'processing',
      paidAmount: 0,
      paymentDate: null,
      provider: 'Emma Davis, OT',
      serviceType: 'Occupational Therapy',
      visits: 5
    }
  ]);

  // New claim form data
  const [newClaimData, setNewClaimData] = useState({
    patient: '',
    insurance: '',
    serviceDate: '',
    serviceType: '',
    provider: '',
    visits: 1,
    amount: 0,
    diagnosis: '',
    authNumber: ''
  });

  // Insurance verification form
  const [insuranceData, setInsuranceData] = useState({
    patientName: '',
    memberId: '',
    groupNumber: '',
    insuranceCompany: '',
    dob: ''
  });

  // Revenue metrics
  const revenueMetrics = {
    totalBilled: 287654.50,
    totalCollected: 245890.75,
    outstanding: 41763.75,
    avgDaysToPayment: 18,
    collectionRate: 85.5,
    denialRate: 8.2,
    monthlyData: [
      { month: 'Jan', billed: 42000, collected: 38500 },
      { month: 'Feb', billed: 45000, collected: 41000 },
      { month: 'Mar', billed: 48000, collected: 43500 },
      { month: 'Apr', billed: 51000, collected: 46000 },
      { month: 'May', billed: 49000, collected: 44500 },
      { month: 'Jun', billed: 52654.50, collected: 32390.75 }
    ]
  };

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || claim.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleVerifyInsurance = () => {
    setIsVerifying(true);
    // Simulate API call
    setTimeout(() => {
      setVerificationResult({
        status: 'active',
        eligibility: 'Eligible',
        copay: '$20',
        deductible: '$500 (Met: $350)',
        coverage: 'Home Health Services Covered',
        authRequired: true
      });
      setIsVerifying(false);
    }, 2000);
  };

  const handleNewClaim = () => {
    const claim = {
      ...newClaimData,
      id: `CLM-2025-${String(claims.length + 1).padStart(3, '0')}`,
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'processing',
      paidAmount: 0,
      paymentDate: null
    };
    setClaims([...claims, claim]);
    setShowNewClaim(false);
    setNewClaimData({
      patient: '',
      insurance: '',
      serviceDate: '',
      serviceType: '',
      provider: '',
      visits: 1,
      amount: 0,
      diagnosis: '',
      authNumber: ''
    });
  };

  const renderOverview = () => (
    <div>
      {/* Revenue Metrics */}
      <div className="revenue-metrics-grid">
        <div className="metric-card green">
          <div className="metric-icon" style={{ background: '#d1fae5' }}>
            <DollarSign size={24} color="#10b981" />
          </div>
          <div className="metric-value">${(revenueMetrics.totalBilled / 1000).toFixed(1)}K</div>
          <div className="metric-label">Total Billed</div>
          <div className="metric-trend trend-up">
            <TrendingUp size={14} />
            <span>8% from last month</span>
          </div>
        </div>

        <div className="metric-card blue">
          <div className="metric-icon" style={{ background: '#dbeafe' }}>
            <CheckCircle size={24} color="#2563eb" />
          </div>
          <div className="metric-value">${(revenueMetrics.totalCollected / 1000).toFixed(1)}K</div>
          <div className="metric-label">Collected</div>
          <div className="metric-trend trend-up">
            <TrendingUp size={14} />
            <span>{revenueMetrics.collectionRate}% rate</span>
          </div>
        </div>

        <div className="metric-card yellow">
          <div className="metric-icon" style={{ background: '#fef3c7' }}>
            <Clock size={24} color="#f59e0b" />
          </div>
          <div className="metric-value">${(revenueMetrics.outstanding / 1000).toFixed(1)}K</div>
          <div className="metric-label">Outstanding</div>
          <div className="metric-trend">
            <span style={{ color: '#6b7280' }}>{claims.filter(c => c.status === 'pending').length} pending claims</span>
          </div>
        </div>

        <div className="metric-card purple">
          <div className="metric-icon" style={{ background: '#e9d5ff' }}>
            <Receipt size={24} color="#7c3aed" />
          </div>
          <div className="metric-value">{revenueMetrics.avgDaysToPayment}</div>
          <div className="metric-label">Avg Days to Payment</div>
          <div className="metric-trend trend-up">
            <TrendingUp size={14} />
            <span>3 days improved</span>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="revenue-chart">
        <div className="chart-header">
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Revenue Trend</h3>
          <select className="filter-select">
            <option>Last 6 Months</option>
            <option>Last Year</option>
            <option>This Year</option>
          </select>
        </div>
        <div className="chart-container">
          {revenueMetrics.monthlyData.map((data, index) => {
            const maxValue = Math.max(...revenueMetrics.monthlyData.map(d => d.billed));
            const height = (data.billed / maxValue) * 100;
            return (
              <div 
                key={index} 
                className="chart-bar" 
                style={{ height: `${height}%` }}
              >
                <span className="chart-value">${(data.billed / 1000).toFixed(0)}K</span>
                <span className="chart-label">{data.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="claims-container">
        <div className="claims-header">
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Recent Claims Activity</h3>
          <button 
            className="action-btn"
            onClick={() => setActiveTab('claims')}
          >
            View All →
          </button>
        </div>
        <table className="claims-table">
          <thead>
            <tr>
              <th>Claim ID</th>
              <th>Patient</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {claims.slice(0, 5).map(claim => (
              <tr key={claim.id}>
                <td style={{ fontWeight: '500' }}>{claim.id}</td>
                <td>{claim.patient}</td>
                <td>${claim.amount.toFixed(2)}</td>
                <td>
                  <span className={`claim-status status-${claim.status}`}>
                    {claim.status}
                  </span>
                </td>
                <td>{claim.submittedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderClaims = () => (
    <div>
      <div className="claims-container">
        <div className="claims-header">
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Claims Management</h3>
          <div className="action-buttons">
            <button className="export-btn">
              <Download size={16} />
              Export
            </button>
            <button 
              className="new-claim-btn"
              onClick={() => setShowNewClaim(true)}
            >
              <Plus size={16} />
              New Claim
            </button>
          </div>
        </div>

        <div className="claims-filters">
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search claims..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="denied">Denied</option>
          </select>
          <select className="filter-select">
            <option>All Dates</option>
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 90 Days</option>
          </select>
        </div>

        <table className="claims-table">
          <thead>
            <tr>
              <th>Claim ID</th>
              <th>Patient</th>
              <th>Service</th>
              <th>Insurance</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Submitted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClaims.map(claim => (
              <tr key={claim.id}>
                <td style={{ fontWeight: '500' }}>{claim.id}</td>
                <td>{claim.patient}</td>
                <td>
                  <div>{claim.serviceType}</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>{claim.visits} visits</div>
                </td>
                <td>{claim.insurance}</td>
                <td>${claim.amount.toFixed(2)}</td>
                <td>
                  <span className={`claim-status status-${claim.status}`}>
                    {claim.status}
                  </span>
                  {claim.denialReason && (
                    <div style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px' }}>
                      {claim.denialReason}
                    </div>
                  )}
                </td>
                <td>{claim.submittedDate}</td>
                <td>
                  <div className="claim-actions">
                    <button className="action-btn" title="View Details">
                      <FileText size={16} />
                    </button>
                    {claim.status === 'denied' && (
                      <button className="action-btn" title="Appeal">
                        <RefreshCw size={16} />
                      </button>
                    )}
                    {claim.status === 'pending' && (
                      <button className="action-btn" title="Follow Up">
                        <Send size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <div className="page-info">
            Showing 1-{filteredClaims.length} of {filteredClaims.length} claims
          </div>
          <div className="page-controls">
            <button className="page-btn" disabled>
              <ChevronLeft size={16} />
            </button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <button className="page-btn">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInsurance = () => (
    <div>
      <div className="insurance-card">
        <div className="insurance-header">
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Insurance Verification</h3>
          <span style={{ fontSize: '14px', color: '#6b7280' }}>
            Verify patient insurance eligibility and benefits
          </span>
        </div>

        <div className="verification-form">
          <div className="form-group">
            <label className="form-label">Patient Name</label>
            <input
              type="text"
              className="form-input"
              value={insuranceData.patientName}
              onChange={(e) => setInsuranceData({...insuranceData, patientName: e.target.value})}
              placeholder="Enter patient name"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Member ID</label>
            <input
              type="text"
              className="form-input"
              value={insuranceData.memberId}
              onChange={(e) => setInsuranceData({...insuranceData, memberId: e.target.value})}
              placeholder="Member ID"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Group Number</label>
            <input
              type="text"
              className="form-input"
              value={insuranceData.groupNumber}
              onChange={(e) => setInsuranceData({...insuranceData, groupNumber: e.target.value})}
              placeholder="Group number (optional)"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Insurance Company</label>
            <select 
              className="form-input"
              value={insuranceData.insuranceCompany}
              onChange={(e) => setInsuranceData({...insuranceData, insuranceCompany: e.target.value})}
            >
              <option value="">Select Insurance</option>
              <option value="medicare">Medicare</option>
              <option value="medicaid">Medicaid</option>
              <option value="bcbs">Blue Cross Blue Shield</option>
              <option value="aetna">Aetna</option>
              <option value="uhc">United Healthcare</option>
              <option value="humana">Humana</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              className="form-input"
              value={insuranceData.dob}
              onChange={(e) => setInsuranceData({...insuranceData, dob: e.target.value})}
            />
          </div>
          <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button 
              className="verify-btn"
              onClick={handleVerifyInsurance}
              disabled={isVerifying}
            >
              {isVerifying ? (
                <>
                  <div className="loading-spinner" style={{ width: '16px', height: '16px' }}></div>
                  Verifying...
                </>
              ) : (
                <>
                  <Shield size={16} />
                  Verify Insurance
                </>
              )}
            </button>
          </div>
        </div>

        {verificationResult && (
          <div className={`verification-result ${verificationResult.status === 'active' ? 'result-success' : 'result-error'}`}>
            <CheckCircle size={20} />
            <div>
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                Insurance Verified - {verificationResult.status.toUpperCase()}
              </div>
              <div style={{ fontSize: '14px' }}>
                <div>Eligibility: {verificationResult.eligibility}</div>
                <div>Copay: {verificationResult.copay} | Deductible: {verificationResult.deductible}</div>
                <div>Coverage: {verificationResult.coverage}</div>
                {verificationResult.authRequired && (
                  <div style={{ marginTop: '4px', color: '#dc2626' }}>
                    ⚠ Prior Authorization Required
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Insurance Summary */}
      <div className="claims-container" style={{ marginTop: '24px' }}>
        <div className="claims-header">
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Insurance Payer Mix</h3>
        </div>
        <div className="payment-summary">
          <div className="summary-card">
            <div className="summary-value">45%</div>
            <div className="summary-label">Medicare</div>
          </div>
          <div className="summary-card">
            <div className="summary-value">25%</div>
            <div className="summary-label">Medicaid</div>
          </div>
          <div className="summary-card">
            <div className="summary-value">20%</div>
            <div className="summary-label">Private Insurance</div>
          </div>
          <div className="summary-card">
            <div className="summary-value">10%</div>
            <div className="summary-label">Self-Pay</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPayments = () => (
    <div>
      <div className="payment-summary">
        <div className="summary-card">
          <div className="summary-value">$42.8K</div>
          <div className="summary-label">Received This Week</div>
        </div>
        <div className="summary-card">
          <div className="summary-value">$156.3K</div>
          <div className="summary-label">Received This Month</div>
        </div>
        <div className="summary-card">
          <div className="summary-value">23</div>
          <div className="summary-label">Payments Pending</div>
        </div>
        <div className="summary-card">
          <div className="summary-value">$41.8K</div>
          <div className="summary-label">Expected Next Week</div>
        </div>
      </div>

      <div className="claims-container">
        <div className="claims-header">
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Recent Payments</h3>
          <button className="export-btn">
            <Download size={16} />
            Export
          </button>
        </div>
        <table className="claims-table">
          <thead>
            <tr>
              <th>Payment Date</th>
              <th>Payer</th>
              <th>Patient</th>
              <th>Claim ID</th>
              <th>Billed</th>
              <th>Paid</th>
              <th>Adjustment</th>
              <th>Method</th>
            </tr>
          </thead>
          <tbody>
            {claims.filter(c => c.status === 'paid').map(claim => (
              <tr key={claim.id}>
                <td>{claim.paymentDate}</td>
                <td>{claim.insurance}</td>
                <td>{claim.patient}</td>
                <td style={{ fontWeight: '500' }}>{claim.id}</td>
                <td>${claim.amount.toFixed(2)}</td>
                <td style={{ color: '#10b981', fontWeight: '600' }}>
                  ${claim.paidAmount.toFixed(2)}
                </td>
                <td style={{ color: '#ef4444' }}>
                  ${(claim.amount - claim.paidAmount).toFixed(2)}
                </td>
                <td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CreditCard size={14} />
                    EFT
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="revenue-container">
      <div className="revenue-header">
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: 0 }}>
          Revenue Cycle Management
        </h2>
        <div className="action-buttons">
          <button className="export-btn">
            <BarChart3 size={16} />
            Reports
          </button>
          <button className="verify-btn">
            <RefreshCw size={16} />
            Sync Claims
          </button>
        </div>
      </div>

      <div className="revenue-nav-tabs">
        {[
          { id: 'overview', label: 'Overview', icon: TrendingUp },
          { id: 'claims', label: 'Claims', icon: FileText },
          { id: 'insurance', label: 'Insurance', icon: Shield },
          { id: 'payments', label: 'Payments', icon: DollarSign }
        ].map(tab => (
          <button
            key={tab.id}
            className={`revenue-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'claims' && renderClaims()}
      {activeTab === 'insurance' && renderInsurance()}
      {activeTab === 'payments' && renderPayments()}

      {/* New Claim Modal */}
      {showNewClaim && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <div style={{
              padding: '24px',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>Submit New Claim</h3>
              <button
                onClick={() => setShowNewClaim(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: '24px' }}>
              <div className="verification-form">
                <div className="form-group">
                  <label className="form-label">Patient</label>
                  <select 
                    className="form-input"
                    value={newClaimData.patient}
                    onChange={(e) => setNewClaimData({...newClaimData, patient: e.target.value})}
                  >
                    <option value="">Select Patient</option>
                    <option value="Sarah Johnson">Sarah Johnson</option>
                    <option value="Robert Chen">Robert Chen</option>
                    <option value="Maria Rodriguez">Maria Rodriguez</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Insurance</label>
                  <select 
                    className="form-input"
                    value={newClaimData.insurance}
                    onChange={(e) => setNewClaimData({...newClaimData, insurance: e.target.value})}
                  >
                    <option value="">Select Insurance</option>
                    <option value="Medicare A">Medicare A</option>
                    <option value="Medicaid">Medicaid</option>
                    <option value="Blue Cross Blue Shield">Blue Cross Blue Shield</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Service Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={newClaimData.serviceDate}
                    onChange={(e) => setNewClaimData({...newClaimData, serviceDate: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Service Type</label>
                  <select 
                    className="form-input"
                    value={newClaimData.serviceType}
                    onChange={(e) => setNewClaimData({...newClaimData, serviceType: e.target.value})}
                  >
                    <option value="">Select Service</option>
                    <option value="Skilled Nursing">Skilled Nursing</option>
                    <option value="Physical Therapy">Physical Therapy</option>
                    <option value="Occupational Therapy">Occupational Therapy</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Provider</label>
                  <select 
                    className="form-input"
                    value={newClaimData.provider}
                    onChange={(e) => setNewClaimData({...newClaimData, provider: e.target.value})}
                  >
                    <option value="">Select Provider</option>
                    <option value="Linda Martinez, RN">Linda Martinez, RN</option>
                    <option value="Mike Johnson, PT">Mike Johnson, PT</option>
                    <option value="Emma Davis, OT">Emma Davis, OT</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Number of Visits</label>
                  <input
                    type="number"
                    className="form-input"
                    value={newClaimData.visits}
                    onChange={(e) => setNewClaimData({...newClaimData, visits: parseInt(e.target.value)})}
                    min="1"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Total Amount</label>
                  <input
                    type="number"
                    className="form-input"
                    value={newClaimData.amount}
                    onChange={(e) => setNewClaimData({...newClaimData, amount: parseFloat(e.target.value)})}
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label">Primary Diagnosis</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newClaimData.diagnosis}
                    onChange={(e) => setNewClaimData({...newClaimData, diagnosis: e.target.value})}
                    placeholder="ICD-10 code or description"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Authorization Number</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newClaimData.authNumber}
                    onChange={(e) => setNewClaimData({...newClaimData, authNumber: e.target.value})}
                    placeholder="If required"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button
                  onClick={() => setShowNewClaim(false)}
                  style={{
                    padding: '10px 20px',
                    border: '1px solid #e5e7eb',
                    background: 'white',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleNewClaim}
                  style={{
                    padding: '10px 20px',
                    background: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  Submit Claim
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RevenueCycle;