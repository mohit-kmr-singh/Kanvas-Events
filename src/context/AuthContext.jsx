import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('kanvas_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const { addToast } = useToast();

  useEffect(() => {
    if (user) {
      localStorage.setItem('kanvas_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('kanvas_user');
    }
  }, [user]);

  const login = (email, _password, name) => {
    const newUser = {
      name: name || email.split('@')[0],
      email: email.trim().toLowerCase(),
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name || email)}`,
      joinedAt: new Date().toLocaleDateString()
    };
    setUser(newUser);
    addToast(`Welcome back, ${newUser.name}!`, 'success');
    return true;
  };

  const signup = (name, email, _password) => {
    const newUser = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
      joinedAt: new Date().toLocaleDateString()
    };
    setUser(newUser);
    addToast(`Account created successfully! Welcome, ${newUser.name}.`, 'success');
    return true;
  };

  const logout = () => {
    setUser(null);
    addToast('You have been logged out.', 'info');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
