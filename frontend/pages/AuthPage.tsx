
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Activity, ArrowLeft } from 'lucide-react';
import GlassCard from '../components/GlassCard';

interface AuthPageProps {
  onLogin: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6">
      {/* Background blobs */}
      <div className="fixed inset-0 -z-10 bg-slate-50 dark:bg-slate-950">
        <div className="absolute top-[20%] left-[30%] w-[30%] h-[30%] bg-primary-500/20 blur-[100px] animate-float"></div>
        <div className="absolute bottom-[20%] right-[30%] w-[30%] h-[30%] bg-accent-500/20 blur-[100px] animate-float" style={{animationDelay: '1s'}}></div>
      </div>

      <Link to="/" className="absolute top-10 left-10 flex items-center gap-2 text-slate-500 hover:text-primary-600 transition-colors">
        <ArrowLeft size={20} />
        <span className="font-medium">Back to Home</span>
      </Link>

      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-tr from-primary-600 to-accent-500 rounded-2xl flex items-center justify-center shadow-xl shadow-primary-500/20 mx-auto mb-6">
            <Activity className="text-white w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold font-display mb-2">Welcome Back</h2>
          <p className="text-slate-500">Join the health revolution today</p>
        </div>

        <GlassCard className="neumorph border-white/40 overflow-hidden !p-0">
          <div className="flex border-b border-slate-200 dark:border-slate-800">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-4 font-semibold transition-all ${isLogin ? 'text-primary-600 border-b-2 border-primary-600' : 'text-slate-400'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-4 font-semibold transition-all ${!isLogin ? 'text-primary-600 border-b-2 border-primary-600' : 'text-slate-400'}`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleAuth} className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-100 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all outline-none" 
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-100 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all outline-none" 
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div className="flex items-center gap-2">
                <input type="checkbox" id="terms" className="w-4 h-4 rounded text-primary-600" required />
                <label htmlFor="terms" className="text-sm text-slate-500">I agree to the Terms & Conditions</label>
              </div>
            )}

            <button 
              type="submit"
              className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold text-lg hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/20 active:scale-[0.98]"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-slate-800"></div></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="px-2 bg-transparent text-slate-500">Or continue with</span></div>
            </div>

            <button type="button" className="w-full py-3 glass border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center gap-3 hover:bg-white/5 transition-all">
              <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="google" />
              <span className="font-semibold">Google</span>
            </button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};

export default AuthPage;
