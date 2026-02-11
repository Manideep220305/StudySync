import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// API base URL
const API_URL = 'http://localhost:5000/api/users';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in (when app first loads)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // You can add a verify endpoint in backend later
        // For now, just set loading to false
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Register user
  const register = async (username, email, password) => {
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/register`, {
        username,
        email,
        password,
      }, {
        withCredentials: true, // Important: send cookies
      });
      console.log('Register response:', response);
      setUser(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      console.error('Register error:', err);
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Login user
  const login = async (email, password) => {
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      }, {
        withCredentials: true, // Important: send cookies
      });
      console.log('Login response:', response);
      setUser(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Logout user
  const logout = async () => {
    setError(null);
    try {
      await axios.post(`${API_URL}/logout`, {}, {
        withCredentials: true,
      });
      setUser(null);
      return { success: true };
    } catch (err) {
      const errorMessage = 'Logout failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      register,
      login,
      logout,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
