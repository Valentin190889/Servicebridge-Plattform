import React from 'react';
import { LogIn } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function LoginButton() {
  const { login } = useAuth();

  return (
    <button
      onClick={login}
      className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700"
    >
      <LogIn className="h-4 w-4" />
      <span>Sign In</span>
    </button>
  );
}