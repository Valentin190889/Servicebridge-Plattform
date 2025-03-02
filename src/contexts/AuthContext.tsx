import React, { createContext, useContext, useState, useCallback } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email?: string, password?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email?: string, password?: string) => {
    console.log('Login attempt:', { email });
    
    // Create appropriate user based on email
    let userData: User;
    
    if (email === 'test@demo.com') {
      userData = {
        id: 'test-user',
        name: 'Test User',
        email: 'test@demo.com',
      };
    } else {
      userData = {
        id: '1',
        name: 'Demo User',
        email: email || 'demo@example.com',
      };
    }

    setIsAuthenticated(true);
    setUser(userData);
    console.log('Authentication successful');
  }, []);

  const logout = useCallback(() => {
    console.log('Logging out');
    // Clear all user-related data
    localStorage.removeItem('userProfile');
    localStorage.removeItem('onboardingComplete');
    localStorage.removeItem('recentChats');
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  console.log('Current auth state:', { isAuthenticated, user });

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
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