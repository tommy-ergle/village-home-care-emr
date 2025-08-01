import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Users, DollarSign, Activity, Clock, 
  Award, AlertCircle, Target, Brain, Download,
  Calendar, BarChart3, PieChart, Zap, Heart,
  CheckCircle, XCircle, Filter, ChevronUp, ChevronDown
} from 'lucide-react';
import '../../styles/Analytics.css';

const Analytics = () => {
  const [timeframe, setTimeframe] = useState('month');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('outcomes');
  const [isLoading, setIsLoading] = useState(false);

  // KPI Data
  const kpiData = {
    patientSatisfaction: { 
      value: 4.8, 
      max: 5.0, 
      change: 0.3, 
      trend: 'up',
      sparkline: [4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8]
    },
    avgLengthOfStay: { 
      value: 28.4, 
      unit: 'days', 
      change: -2.1, 
      trend: 'down',
      sparkline: [32, 31, 30, 29.5, 29, 28.8, 28.4]
    },
    readmissionRate: { 
      value: 4.3, 
      unit: '%', 
      change: -1.2, 
      trend: 'down',
      sparkline: [6.5, 6.0, 5.5, 5.2, 4.8, 4.5, 4.3]
    },
    costPerEpisode: { 
      value: 2847, 
      change: -156, 
      trend: 'down',
      sparkline: [3200, 3100, 3000, 2950, 2900, 2870, 2847]
    },
    clinicalCompliance: { 
      value: 98.4, 
      unit: '%', 
      change: 2.1, 
      trend: 'up',
      sparkline: [94, 95, 96, 96.5, 97, 97.8, 98.4]
    },
    staffProductivity: { 
      value: 87, 
      unit: '%', 
      change: 5, 
      trend: 'up',
      sparkline: [78, 80, 82, 83, 85, 86, 87]
    }
  };

  // Outcomes data for line chart
  const outcomesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Functional Improvement',
        data: [82, 84, 86, 88, 91, 93],
        color: '#2563eb'
      },
      {
        label: 'Patient Satisfaction',
        data: [84, 86, 88, 90, 92, 96],
        color: '#10b981'
      },
      {
        label: 'Care Plan Adherence',
        data: [78, 81, 83, 85, 87, 89],
        color: '#7c3aed'
      }
    ]
  };

  // Service distribution for pie chart
  const serviceDistribution = [
    { name: 'Skilled Nursing', value: 45, color: '#2563eb' },
    { name: 'Physical Therapy', value: 30, color: '#10b981' },
    { name: 'Occupational Therapy', value: 15, color: '#7c3aed' },
    { name: 'Speech Therapy', value: 7, color: '#f59e0b' },
    { name: 'Home Health Aide', value: 3, color: '#ef4444' }
  ];

  // Staff performance data
  const staffPerformance = [
    { 
      name: 'Linda Martinez, RN', 
      visits: 156, 
      satisfaction: 4.9, 
      compliance: 99.2,
      performance: 'excellent'
    },
    { 
      name: 'Mike Johnson, PT', 
      visits: 132, 
      satisfaction: 4.8, 
      compliance: 98.5,
      performance: 'excellent'
    },
    { 
      name: 'Emma Davis, OT', 
      visits: 98, 
      satisfaction: 4.7, 
      compliance: 97.8,
      performance: 'good'
    },
    { 
      name: 'John Smith, SLP', 
      visits: 67, 
      satisfaction: 4.6, 
      compliance: 96.5,
      performance: 'good'
    }
  ];

  // Predictive analytics data
  const predictions = {
    demandForecast: { 
      value: '+18%', 
      confidence: 92, 
      description: 'Expected increase in patient volume next month'
    },
    revenueProjection: { 
      value: '$387K', 
      confidence: 88, 
      description: 'Projected revenue for next month'
    },
    staffingNeeds: { 
      value: '+3 FTEs', 
      confidence: 85, 
      description: 'Additional staff needed to meet demand'
    },
    riskPatients: { 
      value: '7 patients', 
      confidence: 94, 
      description: 'High risk for readmission in next 30 days'
    }
  };

  // Insights data
  const insights = [
    {
      type: 'opportunity',
      title: 'Therapy Optimization Opportunity',
      description: 'Patients receiving PT show 23% better outcomes. Consider increasing PT frequency for post-surgical patients.',
      icon: Target,
      color: '#10b981'
    },
    {
      type: 'risk',
      title: 'Readmission Risk Alert',
      description: '3 patients showing early indicators of potential readmission. Proactive intervention recommended.',
      icon: AlertCircle,
      color: '#ef4444'
    },
    {
      type: 'efficiency',
      title: 'Route Optimization Available',
      description: 'AI analysis suggests route changes could save 2.5 hours daily across all clinicians.',
      icon: Clock,
      color: '#2563eb'
    }
  ];

  const renderKPICard = (title, data, icon, color) => {
    const Icon = icon;
    
    return (
      <div className="kpi-card">
        <div className="kpi-header">
          <h3 className="kpi-title">{title}</h3>
          <div className="kpi-icon" style={{ background: `${color}20` }}>
            <Icon size={20} color={color} />
          </div>
        </div>
        
        <div className="kpi-value">
          {typeof data.value === 'number' && data.value > 100 
            ? `$${data.value.toLocaleString()}`
            : data.value}
          {data.max && `/${data.max}`}
          {data.unit && <span style={{ fontSize: '18px', fontWeight: '400' }}> {data.unit}</span>}
        </div>
        
        <div className="kpi-comparison">
          <div className={`kpi-trend trend-${data.trend === 'up' ? 'positive' : 'negative'}`}>
            {data.trend === 'up' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            <span>{Math.abs(data.change)}{data.unit === '%' ? '%' : ''}</span>
          </div>
          <span style={{ color: '#6b7280', fontSize: '12px' }}>vs last {timeframe}</span>
        </div>

        {/* Sparkline */}
        <svg className="kpi-sparkline" viewBox="0 0 100 40">
          <polyline
            fill="none"
            stroke={color}
            strokeWidth="2"
            points={data.sparkline.map((val, i) => {
              const x = (i / (data.sparkline.length - 1)) * 100;
              const y = 40 - ((val - Math.min(...data.sparkline)) / (Math.max(...data.sparkline) - Math.min(...data.sparkline))) * 40;
              return `${x},${y}`;
            }).join(' ')}
          />
        </svg>
      </div>
    );
  };

  const renderLineChart = () => {
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const maxValue = Math.max(...outcomesData.datasets.flatMap(d => d.data));
    const yScale = (value) => height - (value / maxValue) * height;
    const xScale = (index) => (index / (outcomesData.labels.length - 1)) * width;

    return (
      <svg className="chart-svg" viewBox={`0 0 600 300`}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(value => (
            <g key={value}>
              <line
                x1="0"
                y1={yScale(value)}
                x2={width}
                y2={yScale(value)}
                stroke="#e5e7eb"
                strokeDasharray="2,2"
              />
              <text
                x="-10"
                y={yScale(value)}
                textAnchor="end"
                alignmentBaseline="middle"
                fontSize="12"
                fill="#6b7280"
              >
                {value}%
              </text>
            </g>
          ))}

          {/* Lines */}
          {outcomesData.datasets.map((dataset, datasetIndex) => (
            <g key={datasetIndex}>
              {/* Area */}
              <path
                d={`
                  M ${xScale(0)},${yScale(dataset.data[0])}
                  ${dataset.data.map((value, i) => `L ${xScale(i)},${yScale(value)}`).join(' ')}
                  L ${xScale(dataset.data.length - 1)},${height}
                  L ${xScale(0)},${height}
                  Z
                `}
                fill={dataset.color}
                className="chart-area"
              />

              {/* Line */}
              <path
                d={`M ${dataset.data.map((value, i) => `${xScale(i)},${yScale(value)}`).join(' L ')}`}
                fill="none"
                stroke={dataset.color}
                className="chart-line"
              />

              {/* Dots */}
              {dataset.data.map((value, i) => (
                <circle
                  key={i}
                  cx={xScale(i)}
                  cy={yScale(value)}
                  r="4"
                  className="chart-dot"
                  fill={dataset.color}
                  stroke={dataset.color}
                />
              ))}
            </g>
          ))}

          {/* X-axis labels */}
          {outcomesData.labels.map((label, i) => (
            <text
              key={i}
              x={xScale(i)}
              y={height + 20}
              textAnchor="middle"
              fontSize="12"
              fill="#6b7280"
            >
              {label}
            </text>
          ))}
        </g>

        {/* Legend */}
        <g transform={`translate(${width - 150}, 20)`}>
          {outcomesData.datasets.map((dataset, i) => (
            <g key={i} transform={`translate(0, ${i * 20})`}>
              <rect
                x="0"
                y="0"
                width="12"
                height="12"
                fill={dataset.color}
                rx="2"
              />
              <text
                x="18"
                y="9"
                fontSize="12"
                fill="#374151"
              >
                {dataset.label}
              </text>
            </g>
          ))}
        </g>
      </svg>
    );
  };

  const renderPieChart = () => {
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2 - 20;
    const centerX = width / 2;
    const centerY = height / 2;

    let startAngle = -Math.PI / 2;
    const total = serviceDistribution.reduce((sum, item) => sum + item.value, 0);

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <svg width={width} height={height}>
          {serviceDistribution.map((item, index) => {
            const angle = (item.value / total) * 2 * Math.PI;
            const endAngle = startAngle + angle;
            
            const x1 = centerX + radius * Math.cos(startAngle);
            const y1 = centerY + radius * Math.sin(startAngle);
            const x2 = centerX + radius * Math.cos(endAngle);
            const y2 = centerY + radius * Math.sin(endAngle);
            
            const largeArcFlag = angle > Math.PI ? 1 : 0;
            
            const pathData = [
              `M ${centerX} ${centerY}`,
              `L ${x1} ${y1}`,
              `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              'Z'
            ].join(' ');

            const labelAngle = startAngle + angle / 2;
            const labelX = centerX + (radius * 0.7) * Math.cos(labelAngle);
            const labelY = centerY + (radius * 0.7) * Math.sin(labelAngle);

            startAngle = endAngle;

            return (
              <g key={index}>
                <path
                  d={pathData}
                  fill={item.color}
                  className="pie-slice"
                />
                {item.value > 5 && (
                  <text
                    x={labelX}
                    y={labelY}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    className="pie-label"
                  >
                    {item.value}%
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div>
          {serviceDistribution.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: item.color,
                  borderRadius: '2px',
                  marginRight: '8px'
                }}
              />
              <span style={{ fontSize: '14px', color: '#374151' }}>{item.name}</span>
              <span style={{ marginLeft: 'auto', fontSize: '14px', color: '#6b7280' }}>
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: 0 }}>
          Analytics Dashboard
        </h2>
        <div className="analytics-controls">
          <select 
            className="time-selector"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
          <button className="export-analytics-btn">
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="kpi-grid">
        {renderKPICard('Patient Satisfaction', kpiData.patientSatisfaction, Heart, '#10b981')}
        {renderKPICard('Avg Length of Stay', kpiData.avgLengthOfStay, Clock, '#2563eb')}
        {renderKPICard('Readmission Rate', kpiData.readmissionRate, Activity, '#ef4444')}
        {renderKPICard('Cost per Episode', kpiData.costPerEpisode, DollarSign, '#7c3aed')}
        {renderKPICard('Clinical Compliance', kpiData.clinicalCompliance, CheckCircle, '#10b981')}
        {renderKPICard('Staff Productivity', kpiData.staffProductivity, TrendingUp, '#f59e0b')}
      </div>

      {/* AI Insights Panel */}
      <div className="insights-panel">
        <div className="insights-header">
          <Zap size={20} color="#7c3aed" />
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>AI-Powered Insights</h3>
        </div>
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <div key={index} className="insight-item">
              <div className="insight-icon" style={{ background: `${insight.color}20` }}>
                <Icon size={20} color={insight.color} />
              </div>
              <div className="insight-content">
                <div className="insight-title">{insight.title}</div>
                <div className="insight-description">{insight.description}</div>
                <div className="insight-action">
                  <a href="#" className="insight-btn">View Details →</a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* Clinical Outcomes Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Clinical Outcomes Trend</h3>
            <div className="chart-options">
              <button className="chart-option-btn active">6M</button>
              <button className="chart-option-btn">1Y</button>
              <button className="chart-option-btn">ALL</button>
            </div>
          </div>
          <div className="line-chart-container">
            {renderLineChart()}
          </div>
        </div>

        {/* Service Distribution Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Service Distribution</h3>
          </div>
          <div className="pie-chart-container">
            {renderPieChart()}
          </div>
        </div>
      </div>

      {/* Predictive Analytics Section */}
      <div className="predictive-section">
        <div className="predictive-header">
          <h3 className="predictive-title">Predictive Analytics</h3>
          <div className="ai-badge">
            <Brain size={16} />
            AI Powered
          </div>
        </div>
        <div className="predictions-grid">
          {Object.entries(predictions).map(([key, data]) => (
            <div key={key} className="prediction-card">
              <div className="prediction-metric">{data.description}</div>
              <div className="prediction-value">{data.value}</div>
              <div className="confidence-bar">
                <div 
                  className="confidence-fill" 
                  style={{ width: `${data.confidence}%` }}
                />
              </div>
              <div className="confidence-label">
                {data.confidence}% confidence
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Staff Performance Table */}
      <div className="performance-table">
        <div className="table-header">
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
            Staff Performance Metrics
          </h3>
          <div className="filter-pills">
            <button 
              className={`filter-pill ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Staff
            </button>
            <button 
              className={`filter-pill ${activeFilter === 'nurses' ? 'active' : ''}`}
              onClick={() => setActiveFilter('nurses')}
            >
              Nurses
            </button>
            <button 
              className={`filter-pill ${activeFilter === 'therapists' ? 'active' : ''}`}
              onClick={() => setActiveFilter('therapists')}
            >
              Therapists
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Staff Member</th>
              <th>Visits Completed</th>
              <th>Patient Satisfaction</th>
              <th>Compliance Rate</th>
              <th>Performance</th>
            </tr>
          </thead>
          <tbody>
            {staffPerformance.map((staff, index) => (
              <tr key={index}>
                <td style={{ fontWeight: '500' }}>{staff.name}</td>
                <td>{staff.visits}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Heart size={16} color="#ef4444" />
                    {staff.satisfaction}/5.0
                  </div>
                </td>
                <td>{staff.compliance}%</td>
                <td>
                  <span className={`performance-badge badge-${staff.performance}`}>
                    {staff.performance === 'excellent' && <Award size={14} />}
                    {staff.performance.charAt(0).toUpperCase() + staff.performance.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics;