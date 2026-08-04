import React, {
  createContext,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const API_BASE_URL =
   'https://intern-sapiens-campus-portal.onrender.com';

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
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/login`,
      {
        email: email.trim().toLowerCase(),
        password,
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
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

    
  
  
   
