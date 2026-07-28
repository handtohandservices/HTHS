'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api, ApiRequestError } from '@/lib/api';
import { useAuth } from '@/components/AuthProvider';
import {
  LayoutDashboard,
  Inbox,
  LogOut,
  Loader2,
  ArrowLeft,
  ExternalLink,
  Mail,
  Users,
  BriefcaseBusiness,
  Image as ImageIcon,
  KeyRound,
  Eye,
  EyeOff,
  X,
} from 'lucide-react';
import ContactsPanel from './ContactsPanel';
import EmployeesPanel from './EmployeesPanel';
import EmployersPanel from './EmployersPanel';
import GalleryPanel from './GalleryPanel';

type Tab = 'contacts' | 'employees' | 'employers' | 'gallery';

const tabs: { id: Tab; label: string; icon: typeof Mail; subtitle: string }[] = [
  { id: 'contacts', label: 'Contact Inquiries', icon: Mail, subtitle: 'Messages from the website contact form' },
  { id: 'employees', label: 'Job Applications', icon: Users, subtitle: 'Resumes submitted by job seekers' },
  { id: 'employers', label: 'Service Requests', icon: BriefcaseBusiness, subtitle: 'Service requests from employers' },
  { id: 'gallery', label: 'Gallery Management', icon: ImageIcon, subtitle: 'Add or remove dynamic images from the gallery page' },
];

export default function AdminDashboard() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('contacts');

  const [isResetOpen, setIsResetOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setResetError('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setResetError('Passwords do not match.');
      return;
    }
    setResetLoading(true);
    setResetError(null);
    try {
      await api.resetPassword(newPassword);
      setResetSuccess(true);
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setIsResetOpen(false);
        setResetSuccess(false);
      }, 2000);
    } catch (err) {
      setResetError(err instanceof ApiRequestError ? err.message : 'Failed to reset password.');
    } finally {
      setResetLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/admin/login');
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    await signOut();
    router.replace('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="text-amber-500 animate-spin" size={32} />
      </div>
    );
  }

  if (!user) return null;

  const current = tabs.find((t) => t.id === activeTab)!;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-[#0d1b3e] text-white fixed h-screen">
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center font-black text-white text-lg shadow-lg">H</div>
            <div>
              <div className="font-bold text-sm leading-tight">Hand to Hand Services Pvt. Ltd.</div>
              <div className="text-amber-400 text-[10px] font-semibold tracking-wider">ADMIN PANEL</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-amber-500/15 text-amber-400 text-sm font-semibold">
            <LayoutDashboard size={18} /> Dashboard
          </div>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${activeTab === t.id ? 'bg-amber-500/15 text-amber-400 font-semibold' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
              <t.icon size={18} /> {t.label}
            </button>
          ))}
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 text-sm transition-colors">
            <ExternalLink size={18} /> View Website
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="px-3 py-2 mb-2">
            <div className="text-xs text-gray-400">Signed in as</div>
            <div className="text-sm text-white truncate">{user.email}</div>
          </div>
          <button onClick={() => setIsResetOpen(true)} className="w-full flex items-center gap-3 px-3 py-2.5 mb-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 text-sm transition-colors">
            <KeyRound size={18} /> Reset Password
          </button>
          <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-red-500/20 text-sm transition-colors">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 md:ml-60 overflow-hidden">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-lg font-bold text-[#0d1b3e]">{current.label}</h1>
              <p className="text-xs text-gray-500">{current.subtitle}</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Link href="/" className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gray-600 hover:text-amber-600 transition-colors mr-2">
                <ArrowLeft size={14} /> Website
              </Link>
              <button
                onClick={() => setIsResetOpen(true)}
                className="md:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-xs font-semibold text-amber-700 transition-colors border border-amber-100"
              >
                <KeyRound size={14} /> Reset Password
              </button>
              <button
                onClick={handleSignOut}
                className="md:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-xs font-semibold text-red-600 transition-colors border border-red-100"
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          </div>

          {/* Mobile tab switcher */}
          <div className="px-4 sm:px-6 pb-3 flex gap-1.5 md:hidden overflow-x-auto no-scrollbar">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${activeTab === t.id ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
              >
                <t.icon size={14} /> {t.label}
              </button>
            ))}
          </div>
        </header>

        <div className="p-4 sm:p-6">
          {/* Desktop tab switcher */}
          <div className="hidden md:flex gap-1.5 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === t.id ? 'bg-white text-[#0d1b3e] shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                <t.icon size={16} /> {t.label}
              </button>
            ))}
          </div>

          {activeTab === 'contacts' && <ContactsPanel />}
          {activeTab === 'employees' && <EmployeesPanel />}
          {activeTab === 'employers' && <EmployersPanel />}
          {activeTab === 'gallery' && <GalleryPanel />}
        </div>
      </main>

      {/* Password Reset Modal */}
      {isResetOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0d1b3e]/60 backdrop-blur-sm" onClick={() => setIsResetOpen(false)} />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 bg-[#0d1b3e] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <KeyRound size={20} className="text-amber-400" />
                <h2 className="font-bold text-base">Reset Admin Password</h2>
              </div>
              <button
                onClick={() => setIsResetOpen(false)}
                className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            
            <form onSubmit={handleResetPassword} className="p-6 space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl">
                <div className="text-[10px] font-semibold text-amber-800 uppercase tracking-wider">Account Email</div>
                <div className="text-xs font-bold text-[#0d1b3e] truncate">{user.email}</div>
              </div>

              {resetError && (
                <div className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                  {resetError}
                </div>
              )}

              {resetSuccess && (
                <div className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 font-semibold">
                  Password updated successfully! Closing...
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">New Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    disabled={resetLoading || resetSuccess}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    disabled={resetLoading || resetSuccess}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Verify new password"
                    className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsResetOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={resetLoading || resetSuccess}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-1.5"
                >
                  {resetLoading ? <Loader2 size={16} className="animate-spin" /> : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
