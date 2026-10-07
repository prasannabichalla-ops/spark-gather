import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import Logo from '../components/Logo';
import { useApp } from '../context/AppContext';

export default function Signup() {
  const navigate = useNavigate();
  const { signup, addToast } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: true,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Valid email is required';
    }
    if (!formData.password || formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }
    if (!formData.agreeTerms) {
      errs.agreeTerms = 'You must agree to the Terms & Conditions';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      addToast({
        title: 'Validation Failed',
        message: 'Please review and fix the highlighted inputs.',
        type: 'warning',
      });
      return;
    }

    signup(formData.name, formData.email);
    navigate('/profile');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-mauve/25 shadow-card relative overflow-hidden">
        {/* Decorative Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-peach/20 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <h2 className="font-display font-bold text-2xl text-navy">Join Spark Gather</h2>
          <p className="text-xs text-navy/70 mt-1">
            Discover community events, book passes, and host gatherings.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1">
              Full Name *
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Jordan Lee"
                className={`spark-input pl-10 text-xs ${errors.name ? 'border-rose-400' : ''}`}
              />
              <User className="w-4 h-4 text-navy/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1">
              Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className={`spark-input pl-10 text-xs ${errors.email ? 'border-rose-400' : ''}`}
              />
              <Mail className="w-4 h-4 text-navy/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1">
              Password *
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className={`spark-input pl-10 text-xs ${errors.password ? 'border-rose-400' : ''}`}
              />
              <Lock className="w-4 h-4 text-navy/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            {errors.password && <p className="text-xs text-rose-500 mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-mauve-dark mb-1">
              Confirm Password *
            </label>
            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat your password"
                className={`spark-input pl-10 text-xs ${errors.confirmPassword ? 'border-rose-400' : ''}`}
              />
              <Lock className="w-4 h-4 text-navy/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-rose-500 mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-navy/80">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="mt-0.5 accent-berry rounded"
              />
              <span>
                I agree to the{' '}
                <span className="text-berry font-semibold underline">Terms & Conditions</span> and{' '}
                <span className="text-berry font-semibold underline">Community Code of Conduct</span>.
              </span>
            </label>
            {errors.agreeTerms && (
              <p className="text-xs text-rose-500 mt-1">{errors.agreeTerms}</p>
            )}
          </div>

          <button
            type="submit"
            className="spark-btn-primary w-full text-xs py-3.5 shadow-berry-glow mt-4"
          >
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-navy/70 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-berry hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
