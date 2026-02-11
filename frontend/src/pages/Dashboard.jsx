import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';

export default function Dashboard({ onOpenAuth }) {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar onOpenAuth={onOpenAuth} />

      <div className="pt-32 px-4 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-slate-400">Let's continue your focus journey</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
            <h3 className="text-slate-400 text-sm font-semibold mb-2">Focus Time Today</h3>
            <p className="text-3xl font-bold text-white">0h 0m</p>
          </div>
          <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
            <h3 className="text-slate-400 text-sm font-semibold mb-2">Total Points</h3>
            <p className="text-3xl font-bold text-blue-400">{user?.points || 0}</p>
          </div>
          <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
            <h3 className="text-slate-400 text-sm font-semibold mb-2">Current Streak</h3>
            <p className="text-3xl font-bold text-green-400">0 days</p>
          </div>
        </div>

        {/* Placeholder Content */}
        <div className="bg-slate-900/50 border border-white/10 rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Dashboard Coming Soon</h2>
          <p className="text-slate-400">
            More features like study rooms, focus timer, and analytics are being built!
          </p>
        </div>
      </div>
    </div>
  );
}
