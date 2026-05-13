import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { BookOpen, User as UserIcon, LogOut, Menu, X, Library } from 'lucide-react';
import { auth, loginWithGoogle, logout } from '../../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Header() {
  const [user] = useAuthState(auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleLogin = async () => {
    if (isAuthenticating) return;
    setIsAuthenticating(true);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') {
        console.log('Authentication popup closed or cancelled.');
      } else {
        console.error('Authentication Error:', err);
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <header className="bg-white text-slate-900 border-b border-slate-200 sticky top-0 z-50 px-4 md:px-8 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-red-600 p-2 rounded-lg text-white">
              <Library className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight">KLE Academy</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/user">Library</NavLink>
            <NavLink to="/employee">Add Books</NavLink>
            <NavLink to="/admin">Admin</NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 overflow-hidden max-w-[300px]">
             <span className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
             <div className="whitespace-nowrap italic text-[10px] font-bold text-slate-500 overflow-hidden">
               <motion.div
                 animate={{ x: [0, -400] }}
                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                 className="flex gap-8"
               >
                 <span>[NEW] Introduction to Algorithms (2022)</span>
                 <span>[NEW] A Brief History of Time (1988)</span>
                 <span>[NEW] Sapiens (2011)</span>
                 <span>[NEW] Clean Code (2008)</span>
               </motion.div>
             </div>
          </div>
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-semibold">{user.displayName}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Authorized</p>
              </div>
              <button 
                onClick={() => logout()}
                className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLogin}
              disabled={isAuthenticating}
              className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold text-sm shadow-sm hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
            >
              {isAuthenticating ? 'Authorizing...' : 'Institutional Login'}
            </button>
          )}

          <button 
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-slate-600" /> : <Menu className="w-6 h-6 text-slate-600" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-white border-t border-slate-100 mt-4"
          >
            <nav className="flex flex-col py-4 gap-2">
              <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</MobileNavLink>
              <MobileNavLink to="/user" onClick={() => setIsMobileMenuOpen(false)}>Library</MobileNavLink>
              <MobileNavLink to="/employee" onClick={() => setIsMobileMenuOpen(false)}>Add Books</MobileNavLink>
              <MobileNavLink to="/admin" onClick={() => setIsMobileMenuOpen(false)}>Admin</MobileNavLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ to, children }: { to: string, children: React.ReactNode }) {
  return (
    <Link 
      to={to} 
      className="text-sm font-medium text-slate-600 hover:text-red-600 transition-colors py-2 relative group"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full opacity-0 group-hover:opacity-100" />
    </Link>
  );
}

function MobileNavLink({ to, children, onClick }: { to: string, children: React.ReactNode, onClick: () => void }) {
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className="text-base font-semibold text-slate-700 hover:text-red-600 px-4 py-3 hover:bg-slate-50 flex items-center justify-between group transition-colors"
    >
      {children}
      <Library className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
    </Link>
  );
}
