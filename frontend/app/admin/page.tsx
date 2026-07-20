'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
} from 'lucide-react';
import ContactsPanel from './ContactsPanel';
import EmployeesPanel from './EmployeesPanel';
import EmployersPanel from './EmployersPanel';

type Tab = 'contacts' | 'employees' | 'employers';

const tabs: { id: Tab; label: string; icon: typeof Mail; subtitle: string }[] = [
  { id: 'contacts', label: 'Contact Inquiries', icon: Mail, subtitle: 'Messages from the website contact form' },
  { id: 'employees', label: 'Job Applications', icon: Users, subtitle: 'Resumes submitted by job seekers' },
  { id: 'employers', label: 'Service Requests', icon: BriefcaseBusiness, subtitle: 'Service requests from employers' },
];

export default function AdminDashboard() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('contacts');

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
              <div className="font-bold text-sm leading-tight">HAND TO HAND</div>
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
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                activeTab === t.id ? 'bg-amber-500/15 text-amber-400 font-semibold' : 'text-gray-400 hover:text-white hover:bg-white/5'
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
          <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-red-500/20 text-sm transition-colors">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 md:ml-60">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-[#0d1b3e]">{current.label}</h1>
              <p className="text-xs text-gray-500">{current.subtitle}</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/" className="hidden sm:inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-amber-600 transition-colors">
                <ArrowLeft size={14} /> Website
              </Link>
              <button onClick={handleSignOut} className="md:hidden inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-600 transition-colors">
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          </div>

          {/* Mobile tab switcher */}
          <div className="px-4 sm:px-6 pb-3 flex gap-1.5 md:hidden overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === t.id ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600'
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
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === t.id ? 'bg-white text-[#0d1b3e] shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <t.icon size={16} /> {t.label}
              </button>
            ))}
          </div>

          {activeTab === 'contacts' && <ContactsPanel />}
          {activeTab === 'employees' && <EmployeesPanel />}
          {activeTab === 'employers' && <EmployersPanel />}
        </div>
      </main>
    </div>
  );
}
