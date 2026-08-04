import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

const roleToPath = {
  'Centre Head': '/dashboard/centre-head',
  'Cluster Manager': '/dashboard/cluster-manager',
  'Department Head': '/dashboard/department-head',
  'Regional Head': '/dashboard/regional-head',
  'Director': '/dashboard/director',
  'Chairperson': '/dashboard/chairperson',
  'Purchase Manager': '/dashboard/purchase-manager',
  'Accounts': '/dashboard/accounts'
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      const dashboardPath = roleToPath[user.role] || '/';
      navigate(dashboardPath);
    } catch (error) {
  console.error('Login failed:', error);

  setError(
    error.response?.data?.message ||
    error.message ||
    'Unable to connect to the server'
  );
}
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">SAPIENS GROUP</h1>
        <h2 className="login-subtitle">Campus Portal</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="form-input"
            />
          </div>
          <button type="submit" className="login-button">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
