import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import Logo from '../components/Logo';
import { useApp } from '../context/AppContext';

export default function Login() {
  const navigate = useNavigate();
  const { login, addToast } = useApp();

  const [email, setEmail] = useState('alex.rivera@example.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      addToast({
        title: 'Missing Fields',
        message: 'Please enter both your email and password.',
        type: 'warning',
      });
      return;
    }
    login(email);
    navigate('/profile');
  };

  const handleGoogleMock = () => {
    login('alex.rivera@gmail.com', 'Alex Rivera (Google)');
    navigate('/profile');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-mauve/25 shadow-card relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-peach/20 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <h2 className="font-display font-bold text-2xl text-navy">Welcome Back</h2>
          <p className="text-xs text-navy/70 mt-1">
            Sign in to access your registered tickets and saved events.
          </p>
        </div>

        {/* Demo Credentials Pill */}
        <div className="mb-6 p-3 rounded-2xl bg-cream-surface/70 border border-mauve/20 text-[11px] text-navy/80 flex items-center justify-between">
          <div>
            <span className="font-bold text-navy">Demo Mode Active:</span> Pre-filled with test credentials
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
            Ready
          </span>
        </div>

        {/* Social Mock Login */}
        <button
          type="button"
          onClick={handleGoogleMock}
          className="w-full py-3 px-4 rounded-xl border border-mauve/30 hover:border-navy bg-white hover:bg-cream-surface text-navy font-semibold text-xs flex items-center justify-center gap-2.5 transition shadow-soft mb-6"
        >
          {/* Google Icon */}
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="relative flex items-center justify-center mb-6">
          <div className="border-t border-mauve/20 w-full" />
          <span className="bg-white px-3 text-[11px] font-bold uppercase tracking-wider text-mauve-dark absolute">
            or with email
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="spark-input pl-10 text-xs"
              />
              <Mail className="w-4 h-4 text-navy/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="spark-input pl-10 text-xs"
              />
              <Lock className="w-4 h-4 text-navy/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-navy/80">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-berry rounded"
              />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              onClick={() =>
                addToast({
                  title: 'Password Reset',
                  message: 'A reset link has been sent to your email in this demo simulation.',
                  type: 'info',
                })
              }
              className="text-berry font-semibold hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="spark-btn-primary w-full text-xs py-3.5 shadow-berry-glow mt-2"
          >
            <span>Sign In to Spark Gather</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-navy/70 mt-6">
          Don’t have an account?{' '}
          <Link to="/signup" className="font-bold text-berry hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
