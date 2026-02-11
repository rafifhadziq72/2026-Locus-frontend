import React, { useState } from 'react';
import apiClient from '../api/client';

interface LoginProps {
  onLoginSuccess: (token: string) => void;
}

const Login = ({ onLoginSuccess }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between Login and Register

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const endpoint = isRegistering ? '/auth/register' : '/auth/login';
    
    try {
      const response = await apiClient.post(endpoint, { email, password });
      
      if (isRegistering) {
        alert("Registration successful! Now please login.");
        setIsRegistering(false);
      } else {
        const token = response.data.token;
        localStorage.setItem('locus_token', token);
        onLoginSuccess(token);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '80vh' 
    }}>
      <div style={{ 
        padding: '30px', 
        border: '1px solid #ddd', 
        borderRadius: '12px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        width: '350px'
      }}>
        <h2 style={{ textAlign: 'center', color: '#2c3e50' }}>
          {isRegistering ? 'Create Locus Account' : 'Locus Login'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
              placeholder="name@university.com"
              required 
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
              placeholder="Min. 8 characters"
              required 
            />
          </div>
          
          {error && <p style={{ color: '#e74c3c', fontSize: '0.9rem', marginBottom: '15px' }}>{error}</p>}
          
          <button type="submit" style={{ 
            width: '100%', 
            padding: '12px', 
            backgroundColor: '#3498db', 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            {isRegistering ? 'Register' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem' }}>
          {isRegistering ? 'Already have an account?' : "Don't have an account?"} {' '}
          <span 
            onClick={() => setIsRegistering(!isRegistering)} 
            style={{ color: '#3498db', cursor: 'pointer', textDecoration: 'underline' }}
          >
            {isRegistering ? 'Login here' : 'Register here'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;