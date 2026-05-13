import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Library, User as UserIcon, ChevronRight, GraduationCap } from 'lucide-react';
import { auth, loginWithGoogle } from '../../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

type Role = 'STUDENT' | 'EMPLOYEE' | 'ADMIN';

export default function AuthGate({ children, requiredRole }: { children: React.ReactNode, requiredRole?: Role }) {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [loginStep, setLoginStep] = useState<'ROLE_SELECT' | 'CREDENTIALS'>('ROLE_SELECT');
  const [pendingRole, setPendingRole] = useState<Role | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const handleAuthorize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== '1245') {
      alert('Verification Failed. Please check your credentials. (Hint: 1245)');
      return;
    }
    
    if (isAuthenticating) return;
    setIsAuthenticating(true);

    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') {
        console.log('Authentication popup closed or cancelled.');
      } else {
        console.error('Authentication Error:', err);
        alert('An error occurred during authentication. Please try again.');
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-semibold italic">Establishing Connection...</p>
      </div>
    </div>
  );

  if (user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl p-10 overflow-hidden relative"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-red-600"></div>

        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center bg-red-600 p-4 rounded-2xl text-white mb-6 shadow-xl shadow-red-200">
            <Library className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Institutional Portal</h2>
          <p className="text-slate-500 text-sm italic">Please provide your credentials to continue</p>
        </div>

        <AnimatePresence mode="wait">
          {loginStep === "ROLE_SELECT" ? (
            <motion.div 
              key="roles"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-3"
            >
              {(["STUDENT", "EMPLOYEE", "ADMIN"] as Role[]).map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    setPendingRole(role);
                    setLoginStep("CREDENTIALS");
                  }}
                  className="w-full group p-5 border border-slate-100 bg-slate-50 rounded-2xl flex items-center justify-between hover:border-red-600/30 hover:bg-white transition-all shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-xl bg-white shadow-sm italic ${role === 'ADMIN' ? 'text-slate-900 border border-slate-200' : role === 'EMPLOYEE' ? 'text-blue-600' : 'text-red-600'}`}>
                      {role === "ADMIN" ? <ShieldCheck className="w-6 h-6" /> : 
                       role === "EMPLOYEE" ? <UserIcon className="w-6 h-6" /> : 
                       <GraduationCap className="w-6 h-6" />}
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-slate-900 uppercase tracking-tight">{role} Clearance</p>
                      <p className="text-xs text-slate-400 italic">Level: {role === 'ADMIN' ? 'Full Control' : 'Authorized Access'}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </motion.div>
          ) : (
            <motion.form 
              key="credentials"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleAuthorize}
              className="space-y-6"
            >
              <div className="bg-red-50 p-3 rounded-xl border border-red-100 mb-6">
                <p className="text-[10px] text-red-600 text-center font-bold uppercase tracking-[0.2em]">
                  Authorizing: {pendingRole} Request
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Username / ID</label>
                  <input 
                    type="text" 
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g., student_01"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium outline-none focus:border-red-600 focus:bg-white transition-all shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Security Passcode</label>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium outline-none focus:border-red-600 focus:bg-white transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={() => setLoginStep("ROLE_SELECT")}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-4 rounded-xl font-bold text-sm tracking-wide transition-all italic"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isAuthenticating}
                  className="flex-1 bg-red-600 hover:brightness-110 text-white py-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-xl shadow-red-200 italic disabled:opacity-50"
                >
                  {isAuthenticating ? 'Authorizing...' : 'Authorize'}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-[10px] italic text-slate-400 uppercase font-medium">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
          Institutional Mainframe: Secured & Monitored
        </div>
      </motion.div>
    </div>
  );
}
