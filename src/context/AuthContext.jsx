import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('socialboost_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simple mock authentication - you can replace with real auth later
    if (email && password) {
      const user = {
        uid: Date.now().toString(),
        email: email,
        displayName: email.split('@')[0],
        emailVerified: true
      };
      setCurrentUser(user);
      localStorage.setItem('socialboost_user', JSON.stringify(user));
      return Promise.resolve({ user });
    } else {
      throw new Error('Please enter email and password');
    }
  };

  const signup = async (email, password) => {
    // Simple mock signup - you can replace with real auth later
    if (email && password) {
      const user = {
        uid: Date.now().toString(),
        email: email,
        displayName: email.split('@')[0],
        emailVerified: true
      };
      setCurrentUser(user);
      localStorage.setItem('socialboost_user', JSON.stringify(user));
      return Promise.resolve({ user });
    } else {
      throw new Error('Please enter email and password');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('socialboost_user');
    return Promise.resolve();
  };

  const resetPassword = async (email) => {
    // Mock password reset
    return Promise.resolve();
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};