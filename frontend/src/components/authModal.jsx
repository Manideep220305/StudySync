import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function AuthModal({ isOpen, onClose, initialView = 'login' }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Sync internal state with prop
  useEffect(() => {
    if (isOpen) setIsLogin(initialView === 'login');
  }, [initialView, isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => (document.body.style.overflow = 'unset');
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Form submitted:', { isLogin, formData });

    try {
      let result;
      if (isLogin) {
        console.log('Attempting login...');
        result = await login(formData.email, formData.password);
      } else {
        console.log('Attempting registration...');
        result = await register(formData.username, formData.email, formData.password);
      }

      console.log('Auth result:', result);

      if (result.success) {
        console.log('Success! User:', result.data);
        toast({
          title: "Success!",
          description: isLogin ? 'Logged in successfully' : 'Account created successfully',
        });
        setFormData({ username: '', email: '', password: '' });
        setTimeout(() => {
          onClose();
          navigate('/dashboard');
        }, 500);
      } else {
        console.log('Auth failed:', result.error);
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Auth exception:', error);
      toast({
        title: "Error",
        description: 'Something went wrong',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">

        {/* 1. Backdrop (Darker for focus) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm cursor-pointer"
        />

        {/* 2. Modal Wrapper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-[420px] z-[1000]"
        >
          {/* --- THE GLOW ANIMATION (Fixed) --- */}
          {/* This div sits behind the modal and creates the glowing edge */}
          <div className="absolute -inset-[3px] rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 opacity-75 blur-lg animate-pulse"></div>

          {/* --- GLASS CONTENT --- */}
          <div className="relative bg-[#0f172a] border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden">

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full z-10"
              >
                <X size={20} />
              </button>

              <div className="mt-2">
                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white tracking-tight">
                    {isLogin ? 'Welcome Back' : 'Join the Squad'}
                  </h2>
                  <p className="text-slate-400 text-sm mt-2">
                    {isLogin ? 'Resume your focus streak.' : 'Start syncing your study sessions.'}
                  </p>
                </div>

                {/* Tab Switcher */}
                <div className="grid grid-cols-2 gap-1 p-1 bg-slate-900 rounded-xl mb-6 border border-white/5">
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${isLogin ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${!isLogin ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    Sign Up
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div className="relative group">
                           <User className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                           <input
                             type="text"
                             name="username"
                             placeholder="Username"
                             value={formData.username}
                             onChange={handleInputChange}
                             required
                             className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                           />
                        </div>
                    )}

                    <div className="relative group">
                       <Mail className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                       <input
                         type="email"
                         name="email"
                         placeholder="Email address"
                         value={formData.email}
                         onChange={handleInputChange}
                         required
                         className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                       />
                    </div>

                    <div className="relative group">
                       <Lock className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                       <input
                         type="password"
                         name="password"
                         placeholder="Password"
                         value={formData.password}
                         onChange={handleInputChange}
                         required
                         className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                       />
                    </div>

                    {/* Primary Button */}
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full mt-8 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98] border-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Loading...' : (isLogin ? 'Enter Room' : 'Create Account')}
                        {!loading && <ArrowRight className="ml-2 w-5 h-5" />}
                    </Button>
                </form>

                {/* Google Button */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
                    {/* <div className="relative flex justify-center text-xs uppercase font-medium"><span className="bg-[#0f172a] px-3 text-slate-500">Or continue with</span></div> */}
                </div>
{/* 
                <button type="button" className="w-full h-12 bg-white text-slate-900 hover:bg-slate-200 rounded-xl text-sm font-bold flex items-center justify-center gap-3 transition-all">
                     <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                     </svg>
                     Google
                </button> */}
              </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}