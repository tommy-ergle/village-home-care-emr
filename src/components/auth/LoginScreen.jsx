import React, { useState } from 'react';
import { User, Lock, AlertCircle, Shield, Stethoscope, Activity } from 'lucide-react';

const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const users = [
    {
      id: 1,
      email: 'admin@villagehomecare.com',
      password: 'admin123',
      name: 'Dr. Sarah Wilson',
      role: 'Administrator'
    },
    {
      id: 2,
      email: 'nurse@villagehomecare.com',
      password: 'nurse123',
      name: 'Linda Martinez, RN',
      role: 'Nurse'
    },
    {
      id: 3,
      email: 'billing@villagehomecare.com',
      password: 'billing123',
      name: 'Jennifer Chen',
      role: 'Billing Specialist'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        onLogin(user);
      } else {
        setError('Invalid email or password');
      }
      setIsLoading(false);
    }, 500);
  };

  const handleLogoError = () => {
    setLogoError(true);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8fbff 0%, #e8f2fc 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '-10%',
        width: '40%',
        height: '120%',
        background: 'linear-gradient(135deg, #0335b6 0%, #70b3e1 100%)',
        opacity: 0.1,
        transform: 'rotate(25deg)',
        borderRadius: '100px'
      }}></div>
      
      <div style={{
        position: 'absolute',
        bottom: '-30%',
        left: '-15%',
        width: '50%',
        height: '100%',
        background: 'linear-gradient(135deg, #70b3e1 0%, #4c7dae 100%)',
        opacity: 0.08,
        transform: 'rotate(-20deg)',
        borderRadius: '150px'
      }}></div>

      {/* Login Card */}
      <div style={{
        width: '100%',
        maxWidth: '440px',
        margin: '0 20px',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Logo Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          {!logoError ? (
            <img 
              src="/images/vhc-logo-full.png" 
              alt="Village Home Care"
              onError={handleLogoError}
              style={{
                maxWidth: '320px',
                width: '100%',
                height: 'auto',
                marginBottom: '8px'
              }}
            />
          ) : (
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #0335b6 0%, #70b3e1 100%)',
                borderRadius: '20px',
                marginBottom: '16px',
                boxShadow: '0 10px 30px rgba(3, 53, 182, 0.3)'
              }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="white"/>
                </svg>
              </div>
              <h1 style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#0335b6',
                margin: '0 0 4px 0'
              }}>Village Home Care, LLC.</h1>
              <p style={{
                fontSize: '14px',
                color: '#70b3e1',
                margin: 0,
                fontStyle: 'italic'
              }}>Setting the Standard for Quality Health Care</p>
            </div>
          )}
        </div>

        {/* Login Form Card */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 20px 40px rgba(3, 53, 182, 0.08)',
          border: '1px solid rgba(112, 179, 225, 0.1)'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#1a202c',
            marginBottom: '8px',
            textAlign: 'center'
          }}>Welcome Back</h2>
          <p style={{
            fontSize: '14px',
            color: '#718096',
            marginBottom: '32px',
            textAlign: 'center'
          }}>Sign in to access your dashboard</p>

          {error && (
            <div style={{
              background: '#fee2e2',
              border: '1px solid #feb2b2',
              color: '#c53030',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#4a5568',
                marginBottom: '8px'
              }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#70b3e1'
                }}>
                  <User size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 48px',
                    border: '1px solid #e8f2fc',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    backgroundColor: '#f8fbff',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#70b3e1';
                    e.target.style.backgroundColor = 'white';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e8f2fc';
                    e.target.style.backgroundColor = '#f8fbff';
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#4a5568',
                marginBottom: '8px'
              }}>Password</label>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#70b3e1'
                }}>
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 48px',
                    border: '1px solid #e8f2fc',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    backgroundColor: '#f8fbff',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#70b3e1';
                    e.target.style.backgroundColor = 'white';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e8f2fc';
                    e.target.style.backgroundColor = '#f8fbff';
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '14px',
                background: isLoading ? '#5785b4' : 'linear-gradient(135deg, #0335b6 0%, #4c7dae 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 4px 15px rgba(3, 53, 182, 0.3)',
                boxSizing: 'border-box'
              }}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Features */}
          <div style={{
            marginTop: '32px',
            paddingTop: '32px',
            borderTop: '1px solid #e8f2fc'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  background: 'rgba(112, 179, 225, 0.1)',
                  borderRadius: '12px',
                  marginBottom: '8px'
                }}>
                  <Shield size={20} color="#0335b6" />
                </div>
                <p style={{ fontSize: '12px', color: '#4a5568' }}>HIPAA Compliant</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  background: 'rgba(112, 179, 225, 0.1)',
                  borderRadius: '12px',
                  marginBottom: '8px'
                }}>
                  <Stethoscope size={20} color="#0335b6" />
                </div>
                <p style={{ fontSize: '12px', color: '#4a5568' }}>AI-Powered</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  background: 'rgba(112, 179, 225, 0.1)',
                  borderRadius: '12px',
                  marginBottom: '8px'
                }}>
                  <Activity size={20} color="#0335b6" />
                </div>
                <p style={{ fontSize: '12px', color: '#4a5568' }}>Real-time Sync</p>
              </div>
            </div>

            {/* Demo Credentials */}
            <div style={{
              background: 'rgba(112, 179, 225, 0.08)',
              border: '1px solid rgba(112, 179, 225, 0.2)',
              borderRadius: '10px',
              padding: '16px'
            }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#0335b6',
                marginBottom: '12px'
              }}>Demo Credentials</h3>
              <div style={{ fontSize: '13px', color: '#4a5568', lineHeight: '1.8' }}>
                <div><strong>Admin:</strong> admin@villagehomecare.com / admin123</div>
                <div><strong>Nurse:</strong> nurse@villagehomecare.com / nurse123</div>
                <div><strong>Billing:</strong> billing@villagehomecare.com / billing123</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p style={{
          textAlign: 'center',
          marginTop: '24px',
          fontSize: '12px',
          color: '#718096'
        }}>
          © 2025 Village Home Care. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;