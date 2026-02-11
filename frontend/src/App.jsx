import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AuthModal from './components/AuthModal';
import Preloader from './components/ui/Preloader';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [loading, setLoading] = useState(true);
  
  // FIXED: Explicitly ensuring isOpen is FALSE by default
  const [authModal, setAuthModal] = useState({ 
    isOpen: false, 
    view: 'login' 
  });

  const handlePreloaderComplete = () => {
    setLoading(false);
  };

  const openAuth = (view = 'login') => {
    setAuthModal({ isOpen: true, view });
  };

  const closeAuth = () => {
    setAuthModal(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <AuthProvider>
      <Router>
        <div className="antialiased text-slate-950 bg-slate-950 min-h-screen font-sans selection:bg-blue-500/30">

          <AnimatePresence mode="wait">
            {loading && <Preloader onComplete={handlePreloaderComplete} />}
          </AnimatePresence>

          {!loading && (
            <>
               <Routes>
                  <Route path="/" element={<LandingPage onOpenAuth={openAuth} />} />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard onOpenAuth={openAuth} />
                      </ProtectedRoute>
                    }
                  />
               </Routes>

               <AuthModal
                 isOpen={authModal.isOpen}
                 initialView={authModal.view}
                 onClose={closeAuth}
               />
            </>
          )}

        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;