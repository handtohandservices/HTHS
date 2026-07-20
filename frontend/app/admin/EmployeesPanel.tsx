'use client';

import { useState, useCallback, useEffect } from 'react';
import { api, ApiRequestError, EmployeeApplication, EmployeeApplicationStatus } from '@/lib/api';
import {
  Inbox,
  Loader2,
  Mail,
  Phone,
  Trash2,
  Eye,
  X,
  Calendar,
  FileText,
  Briefcase,
  Clock,
  Download,
} from 'lucide-react';
import { StatCard, StatusBadge, formatDate, formatTime } from './_shared';
import { Toolbar, EmptyState, RowActions, StatusControls } from './ContactsPanel';

type Filter = 'all' | 'new' | 'reviewed' | 'archived';

export default function EmployeesPanel() {
  const [items, setItems] = useState<EmployeeApplication[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [selected, setSelected] = useState<EmployeeApplication | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const load = useCallback(async () => {
    setFetching(true);
    setError(null);
    try {
      const data = await api.listEmployeeApplications();
      setItems(data || []);
    } catch (err) {
      setError(err instanceof ApiRequestError && err.code !== 'network' ? err.message : 'Failed to load applications.');
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id: string, status: EmployeeApplicationStatus) => {
    setActionLoading(`status-${id}`);
    try {
      await api.updateEmployeeApplicationStatus(id, status);
      setItems((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
      setSelected((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
    } catch (err) {
      setError(err instanceof ApiRequestError && err.code !== 'network' ? err.message : 'Failed to update status.');
    } finally {
      setActionLoading(null);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this application permanently? This will also remove the resume from Cloudinary.')) return;
    setActionLoading(`delete-${id}`);
    try {
      await api.deleteEmployeeApplication(id);
      setItems((prev) => prev.filter((s) => s.id !== id));
      setSelected(null);
    } catch (err) {
      setError(err instanceof ApiRequestError && err.code !== 'network' ? err.message : 'Failed to delete application.');
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = items.filter((s) => {
    const matchesFilter = filter === 'all' || s.status === filter;
    const q = search.trim().toLowerCase();
    const matchesSearch = !q || s.full_name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || s.phone.toLowerCase().includes(q) || s.position_applied_for.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const counts = {
    all: items.length,
    new: items.filter((s) => s.status === 'new').length,
    reviewed: items.filter((s) => s.status === 'reviewed').length,
    archived: items.filter((s) => s.status === 'archived').length,
  };

  return (
    <>
      {error && <div className="mb-5 text-red-700 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</div>}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total" value={counts.all} color="navy" />
        <StatCard label="New" value={counts.new} color="amber" />
        <StatCard label="Reviewed" value={counts.reviewed} color="blue" />
        <StatCard label="Archived" value={counts.archived} color="gray" />
      </div>

      <Toolbar search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} filters={['all', 'new', 'reviewed', 'archived']} />

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {fetching ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="text-amber-500 animate-spin" size={28} /></div>
        ) : filtered.length === 0 ? (
          <EmptyState message={items.length === 0 ? 'When job seekers submit applications with their resume, they will appear here.' : 'No applications match your filters.'} />
        ) : (
          <>
            <table className="hidden lg:table w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="px-5 py-3">Applicant</th>
                  <th className="px-5 py-3">Position</th>
                  <th className="px-5 py-3">Resume</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-amber-50/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-semibold text-[#0d1b3e] text-sm">{s.full_name}</div>
                      <div className="text-sm text-gray-700 flex items-center gap-1.5 mt-1"><Mail size={13} className="text-gray-400" /><a href={`mailto:${s.email}`} className="hover:text-amber-600">{s.email}</a></div>
                      <div className="text-sm text-gray-700 flex items-center gap-1.5 mt-0.5"><Phone size={13} className="text-gray-400" /><a href={`tel:${s.phone}`} className="hover:text-amber-600">{s.phone}</a></div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-gray-700"><Briefcase size={13} className="text-gray-400" />{s.position_applied_for}</div>
                      {s.experience_years !== null && <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1"><Clock size={12} />{s.experience_years} yrs experience</div>}
                    </td>
                    <td className="px-5 py-4">
                      <a href={s.resume_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg px-2.5 py-1.5 transition-colors">
                        <FileText size={14} /> View PDF
                      </a>
                    </td>
                    <td className="px-5 py-4"><StatusBadge status={s.status} /></td>
                    <td className="px-5 py-4"><div className="text-sm text-gray-500">{formatDate(s.created_at)}</div><div className="text-xs text-gray-400">{formatTime(s.created_at)}</div></td>
                    <td className="px-5 py-4"><RowActions onView={() => { setSelected(s); if (s.status === 'new') updateStatus(s.id, 'reviewed'); }} onDelete={() => remove(s.id)} deleting={actionLoading === `delete-${s.id}`} /></td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="lg:hidden divide-y divide-gray-100">
              {filtered.map((s) => (
                <div key={s.id} className="p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div><div className="font-semibold text-[#0d1b3e]">{s.full_name}</div><div className="text-xs text-gray-400 mt-0.5">{formatDate(s.created_at)}</div></div>
                    <StatusBadge status={s.status} />
                  </div>
                  <div className="text-sm text-gray-700 flex items-center gap-1.5 mb-1"><Briefcase size={13} className="text-gray-400" />{s.position_applied_for}</div>
                  <div className="text-sm text-gray-700 flex items-center gap-1.5 mb-1"><Mail size={13} className="text-gray-400" /><a href={`mailto:${s.email}`} className="hover:text-amber-600">{s.email}</a></div>
                  <div className="text-sm text-gray-700 flex items-center gap-1.5 mb-2"><Phone size={13} className="text-gray-400" /><a href={`tel:${s.phone}`} className="hover:text-amber-600">{s.phone}</a></div>
                  <a href={s.resume_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg px-2.5 py-1.5 mb-3 transition-colors"><FileText size={14} /> View Resume</a>
                  <div className="flex gap-2">
                    <button onClick={() => { setSelected(s); if (s.status === 'new') updateStatus(s.id, 'reviewed'); }} className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg py-2 transition-colors"><Eye size={14} /> View</button>
                    <button onClick={() => remove(s.id)} className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg px-3 py-2 transition-colors"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl animate-slide-in-left">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="font-bold text-[#0d1b3e]">Application Details</h2>
              <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Applicant</div>
                <div className="text-lg font-bold text-[#0d1b3e]">{selected.full_name}</div>
                <div className="flex items-center gap-1.5 text-sm text-gray-600 mt-1"><Briefcase size={14} className="text-gray-400" />{selected.position_applied_for}</div>
                {selected.experience_years !== null && <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1"><Clock size={12} />{selected.experience_years} years experience</div>}
              </div>
              <div className="grid grid-cols-1 gap-3">
                <a href={`mailto:${selected.email}`} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-amber-50 transition-colors"><Mail size={18} className="text-amber-600" /><div><div className="text-xs text-gray-400">Email</div><div className="text-sm text-[#0d1b3e] font-medium break-all">{selected.email}</div></div></a>
                <a href={`tel:${selected.phone}`} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-amber-50 transition-colors"><Phone size={18} className="text-amber-600" /><div><div className="text-xs text-gray-400">Phone</div><div className="text-sm text-[#0d1b3e] font-medium">{selected.phone}</div></div></a>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50"><Calendar size={18} className="text-amber-600" /><div><div className="text-xs text-gray-400">Submitted</div><div className="text-sm text-[#0d1b3e] font-medium">{formatDate(selected.created_at)} at {formatTime(selected.created_at)}</div></div></div>
              </div>
              {selected.message && (
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Message</div>
                  <div className="p-4 rounded-xl bg-[#fdf8f0] border border-amber-100 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{selected.message}</div>
                </div>
              )}
              <a href={selected.resume_url} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors">
                <Download size={16} /> Download Resume (PDF)
              </a>
              <StatusControls current={selected.status} onStatus={(s) => updateStatus(selected.id, s)} loading={actionLoading === `status-${selected.id}`} statuses={['new', 'reviewed', 'archived']} />
              <div className="pt-4 border-t border-gray-100 flex gap-2">
                <a href={`mailto:${selected.email}?subject=Re: Your application to Hand to Hand Services&body=Dear ${selected.full_name},%0D%0A%0D%0AThank you for your application.`} className="flex-1 inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors"><Mail size={16} /> Reply</a>
                <button onClick={() => remove(selected.id)} disabled={actionLoading === `delete-${selected.id}`} className="inline-flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors border border-red-200 disabled:opacity-50">{actionLoading === `delete-${selected.id}` ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
