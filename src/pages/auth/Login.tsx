import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { PlayCircle, ArrowRight, Twitter, Linkedin, UserPlus } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      await login(formData.email, formData.password);
      navigate('/aico');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleSocialLogin = async (provider: 'twitter' | 'linkedin') => {
    try {
      await login('info@serviebridge.ai', 'Welcome1!');
      navigate('/aico');
    } catch (err) {
      setError(`${provider} login failed`);
    }
  };

  const handleTestUserLogin = async () => {
    try {
      // Clear any existing onboarding data for fresh demo
      localStorage.removeItem('userProfile');
      localStorage.removeItem('onboardingComplete');
      
      await login('test@demo.com', 'demo123');
      navigate('/aico');
    } catch (err) {
      setError('Test user login failed');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Half - Video and Content */}
      <div className="w-1/2 relative bg-black flex flex-col">
        {/* Logo at top */}
        <div className="absolute top-8 left-8 z-20">
          <img src="/service-bridge_small_white.png" alt="ServiceBridge" className="h-20" />
        </div>

        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src="/Avatar.mp4" type="video/mp4" />
        </video>

        {/* Content at bottom */}
        <div className="absolute bottom-12 left-8 right-8 z-20 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            Welcome to ServiceBridge
          </h1>
          <p className="text-gray-300 text-xl">
            Your AI-powered service management platform
          </p>
        </div>
      </div>

      {/* Right Half - Login Form */}
      <div className="w-1/2 relative">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/Background_Theme_SAI.jpg")',
            filter: 'brightness(0.9)'
          }}
        />
        {/* Overlay for better content visibility */}
        <div className="absolute inset-0 z-0 bg-black bg-opacity-50" />

        {/* Login Form */}
        <div className="relative z-10 h-full flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#29DDDA] focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Password"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#29DDDA] focus:border-transparent"
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-white rounded-lg transform transition-all duration-500 hover:scale-[1.02]"
                style={{
                  backgroundImage: 'linear-gradient(to right, #b0c6ff -40%, #001945 5%, #DA22FF 180%)',
                  border: '1px solid white',
                  boxShadow: '0 0 20px rgba(238, 238, 238, 0.3)',
                  backgroundSize: '200% auto',
                }}
              >
                <span>Sign In</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-gray-300">Or continue with</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => handleSocialLogin('twitter')}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span>Twitter</span>
              </button>
              <button
                onClick={() => handleSocialLogin('linkedin')}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span>LinkedIn</span>
              </button>
            </div>

            {/* Test User Button */}
            <div className="pt-4">
              <button
                onClick={handleTestUserLogin}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-[#29DDDA]/20 border border-[#29DDDA] rounded-lg text-white hover:bg-[#29DDDA]/30 transition-colors"
              >
                <UserPlus className="h-5 w-5" />
                <span>Try Demo Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}