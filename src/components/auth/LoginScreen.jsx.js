import React, { useState } from 'react';
import { Brain } from 'lucide-react';

const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Demo users - in production, this would come from your backend
  const users = [
    {
      id: 1,
      email: 'admin@villagehomecare.com',
      password: 'admin123',
      name: 'Dr. Sarah Wilson',
      role: 'Administrator',
      permissions: ['all']
    },
    {
      id: 2,
      email: 'nurse@villagehomecare.com',
      password: 'nurse123',
      name: 'Linda Martinez, RN',
      role: 'Nurse',
      permissions: ['patients', 'documentation']
    },
    {
      id: 3,
      email: 'clinician@villagehomecare.com',
      password: 'clinician123',
      name: 'Mike Johnson, PT',
      role: 'Clinician',
      permissions: ['patients', 'documentation']
    },
    {
      id: 4,
      email: 'billing@villagehomecare.com',
      password: 'billing123',
      name: 'Jennifer Clark',
      role: 'Billing Specialist',
      permissions: ['revenue', 'analytics']
    }
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = users.find(u => 
      u.email === email && u.password === password
    );

    if (user) {
      onLogin(user);
      setEmail('');
      setPassword('');
    } else {
      setLoginError('Invalid email or password. Please try again.');
    }
    
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };

  const fillCredentials = (userType) => {
    const user = users.find(u => u.role.toLowerCase().includes(userType.toLowerCase()));
    if (user) {
      setEmail(user.email);
      setPassword(user.password);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center">
          <div className="p-3 bg-white/20 rounded-full inline-block mb-4">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Village Home Care</h1>
          <p className="text-blue-100">AI-Powered Healthcare Management</p>
        </div>

        {/* Login Form */}
        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Please sign in to your account</p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{loginError}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">Demo Credentials:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Administrator:</span>
                <button
                  onClick={() => fillCredentials('admin')}
                  className="text-blue-600 hover:text-blue-800 font-mono text-xs hover:underline"
                >
                  admin@villagehomecare.com / admin123
                </button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Nurse:</span>
                <button
                  onClick={() => fillCredentials('nurse')}
                  className="text-blue-600 hover:text-blue-800 font-mono text-xs hover:underline"
                >
                  nurse@villagehomecare.com / nurse123
                </button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Clinician:</span>
                <button
                  onClick={() => fillCredentials('clinician')}
                  className="text-blue-600 hover:text-blue-800 font-mono text-xs hover:underline"
                >
                  clinician@villagehomecare.com / clinician123
                </button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Billing:</span>
                <button
                  onClick={() => fillCredentials('billing')}
                  className="text-blue-600 hover:text-blue-800 font-mono text-xs hover:underline"
                >
                  billing@villagehomecare.com / billing123
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>Secure healthcare management system</p>
            <p>Built with AI-powered assistance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;