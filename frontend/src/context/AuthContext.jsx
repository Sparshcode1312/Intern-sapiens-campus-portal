import React, {
  createContext,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const getApiBaseUrl = () => {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5001';
  }
  return 'https://intern-sapiens-campus-portal.onrender.com';
};

const API_BASE_URL = getApiBaseUrl();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setLoading(false);
        return;
      }

      if (token === 'demo_hq_token') {
        setUser({
          _id: 'hq_admin_id',
          name: 'HQ Admin',
          email: 'hq@sapiens.edu',
          role: 'HQ',
          centreName: 'HQ',
          designationLabel: 'HQ Administrator',
          token,
        });
        setLoading(false);
        return;
      }

      if (token === 'demo_console_token') {
        setUser({
          _id: 'console_admin_id',
          name: 'Director Console Admin',
          email: 'console@sapiens.edu',
          role: 'DirectorConsole',
          centreName: 'HQ',
          designationLabel: 'Director Console Admin',
          token,
        });
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser({
          ...response.data,
          token,
        });
      } catch (error) {
        console.error('Authentication check failed:', error);
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const cleanEmail = email.trim().toLowerCase();

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        {
          email: cleanEmail,
          password,
        }
      );

      localStorage.setItem('token', response.data.token);
      setUser(response.data);

      return response.data;
    } catch (error) {
      // Demo fallback for HQ and Director Console credentials
      if (cleanEmail === 'hq@sapiens.edu' && (password === 'hq@admin123' || password === 'password123')) {
        const demoUser = {
          _id: 'hq_admin_id',
          name: 'HQ Admin',
          email: 'hq@sapiens.edu',
          role: 'HQ',
          centreName: 'HQ',
          designationLabel: 'HQ Administrator',
          token: 'demo_hq_token',
        };
        localStorage.setItem('token', demoUser.token);
        setUser(demoUser);
        return demoUser;
      }

      if (cleanEmail === 'console@sapiens.edu' && (password === 'console@admin123' || password === 'password123')) {
        const demoUser = {
          _id: 'console_admin_id',
          name: 'Director Console Admin',
          email: 'console@sapiens.edu',
          role: 'DirectorConsole',
          centreName: 'HQ',
          designationLabel: 'Director Console Admin',
          token: 'demo_console_token',
        };
        localStorage.setItem('token', demoUser.token);
        setUser(demoUser);
        return demoUser;
      }

      throw error;
    }
  };

  const register = async ({
  name,
  email,
  password,
  campus,
}) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/auth/register`,
    {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      centreName: campus,
      role: 'Centre Head',
    }
  );

  localStorage.setItem('token', response.data.token);
  setUser(response.data);

  return response.data;
};

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

    
  
  
   
