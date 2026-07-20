'use client';

import { useState, useCallback, useEffect } from 'react';
import { api, ApiRequestError, ContactSubmission, SubmissionStatus } from '@/lib/api';
import {
  Inbox,
  Loader2,
  Mail,
  Phone,
  Trash2,
  Search,
  Eye,
  X,
  Calendar,
} from 'lucide-react';
import { StatCard, StatusBadge, formatDate, formatTime } from './_shared';

type Filter = 'all' | 'new' | 'read' | 'archived';

export default function ContactsPanel() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [selected, setSelected] = useState<ContactSubmission | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const load = useCallback(async () => {
    setFetching(true);
    setError(null);
    try {
      const data = await api.listSubmissions();
      setSubmissions(data || []);
    } catch (err) {
      setError(err instanceof ApiRequestError && err.code !== 'network' ? err.message : 'Failed to load submissions.');
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id: string, status: SubmissionStatus) => {
    setActionLoading(`status-${id}`);
    try {
      await api.updateSubmissionStatus(id, status);
      setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
      setSelected((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
    } catch (err) {
      setError(err instanceof ApiRequestError && err.code !== 'network' ? err.message : 'Failed to update status.');
    } finally {
      setActionLoading(null);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this submission permanently? This cannot be undone.')) return;
    setActionLoading(`delete-${id}`);
    try {
      await api.deleteSubmission(id);
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      setSelected(null);
    } catch (err) {
      setError(err instanceof ApiRequestError && err.code !== 'network' ? err.message : 'Failed to delete submission.');
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = submissions.filter((s) => {
    const matchesFilter = filter === 'all' || s.status === filter;
    const q = search.trim().toLowerCase();
    const matchesSearch = !q || s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || s.phone.toLowerCase().includes(q) || s.message.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const counts = {
    all: submissions.length,
    new: submissions.filter((s) => s.status === 'new').length,
    read: submissions.filter((s) => s.status === 'read').length,
    archived: submissions.filter((s) => s.status === 'archived').length,
  };

  return (
    <>
      {error && <div className="mb-5 text-red-700 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</div>}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total" value={counts.all} color="navy" />
        <StatCard label="New" value={counts.new} color="amber" />
        <StatCard label="Read" value={counts.read} color="blue" />
        <StatCard label="Archived" value={counts.archived} color="gray" />
      </div>

      <Toolbar search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} filters={['all', 'new', 'read', 'archived']} />

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {fetching ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="text-amber-500 animate-spin" size={28} /></div>
        ) : filtered.length === 0 ? (
          <EmptyState message={submissions.length === 0 ? 'When visitors submit the contact form, inquiries will appear here.' : 'No submissions match your filters.'} />
        ) : (
          <>
            <table className="hidden lg:table w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Contact</th>
                  <th className="px-5 py-3">Message</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-amber-50/30 transition-colors">
                    <td className="px-5 py-4"><div className="font-semibold text-[#0d1b3e] text-sm">{s.name}</div></td>
                    <td className="px-5 py-4">
                      <div className="text-sm text-gray-700 flex items-center gap-1.5"><Mail size={13} className="text-gray-400" /><a href={`mailto:${s.email}`} className="hover:text-amber-600">{s.email}</a></div>
                      <div className="text-sm text-gray-700 flex items-center gap-1.5 mt-1"><Phone size={13} className="text-gray-400" /><a href={`tel:${s.phone}`} className="hover:text-amber-600">{s.phone}</a></div>
                    </td>
                    <td className="px-5 py-4 max-w-xs"><p className="text-sm text-gray-600 line-clamp-2">{s.message}</p></td>
                    <td className="px-5 py-4"><StatusBadge status={s.status} /></td>
                    <td className="px-5 py-4"><div className="text-sm text-gray-500">{formatDate(s.created_at)}</div><div className="text-xs text-gray-400">{formatTime(s.created_at)}</div></td>
                    <td className="px-5 py-4"><RowActions onView={() => { setSelected(s); if (s.status === 'new') updateStatus(s.id, 'read'); }} onDelete={() => remove(s.id)} deleting={actionLoading === `delete-${s.id}`} /></td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="lg:hidden divide-y divide-gray-100">
              {filtered.map((s) => (
                <div key={s.id} className="p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div><div className="font-semibold text-[#0d1b3e]">{s.name}</div><div className="text-xs text-gray-400 mt-0.5">{formatDate(s.created_at)}</div></div>
                    <StatusBadge status={s.status} />
                  </div>
                  <div className="text-sm text-gray-700 flex items-center gap-1.5 mb-1"><Mail size={13} className="text-gray-400" /><a href={`mailto:${s.email}`} className="hover:text-amber-600">{s.email}</a></div>
                  <div className="text-sm text-gray-700 flex items-center gap-1.5 mb-2"><Phone size={13} className="text-gray-400" /><a href={`tel:${s.phone}`} className="hover:text-amber-600">{s.phone}</a></div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{s.message}</p>
                  <div className="flex gap-2">
                    <button onClick={() => { setSelected(s); if (s.status === 'new') updateStatus(s.id, 'read'); }} className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg py-2 transition-colors"><Eye size={14} /> View</button>
                    <button onClick={() => remove(s.id)} className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg px-3 py-2 transition-colors"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {selected && (
        <DetailDrawer item={selected} onClose={() => setSelected(null)} onStatus={updateStatus} onDelete={remove} actionLoading={actionLoading} />
      )}
    </>
  );
}

export function Toolbar({ search, setSearch, filter, setFilter, filters }: { search: string; setSearch: (v: string) => void; filter: string; setFilter: (f: any) => void; filters: string[] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-4 flex flex-col sm:flex-row gap-3 sm:items-center">
      <div className="relative flex-1">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition text-sm" />
      </div>
      <div className="flex gap-1.5 bg-gray-100 rounded-lg p-1">
        {filters.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-colors ${filter === f ? 'bg-white text-[#0d1b3e] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>{f}</button>
        ))}
      </div>
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4"><Inbox className="text-gray-400" size={28} /></div>
      <h3 className="font-bold text-[#0d1b3e] mb-1">Nothing here yet</h3>
      <p className="text-sm text-gray-500 max-w-sm">{message}</p>
    </div>
  );
}

export function RowActions({ onView, onDelete, deleting }: { onView: () => void; onDelete: () => void; deleting: boolean }) {
  return (
    <div className="flex items-center justify-end gap-1">
      <button onClick={onView} className="w-8 h-8 rounded-lg hover:bg-amber-100 text-gray-500 hover:text-amber-700 flex items-center justify-center transition-colors" title="View"><Eye size={16} /></button>
      <button onClick={onDelete} disabled={deleting} className="w-8 h-8 rounded-lg hover:bg-red-100 text-gray-500 hover:text-red-600 flex items-center justify-center transition-colors disabled:opacity-50" title="Delete">{deleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}</button>
    </div>
  );
}

function DetailDrawer({ item, onClose, onStatus, onDelete, actionLoading }: {
  item: ContactSubmission;
  onClose: () => void;
  onStatus: (id: string, status: SubmissionStatus) => void;
  onDelete: (id: string) => void;
  actionLoading: string | null;
}) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl animate-slide-in-left">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="font-bold text-[#0d1b3e]">Submission Details</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500"><X size={18} /></button>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Name</div>
            <div className="text-lg font-bold text-[#0d1b3e]">{item.name}</div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <a href={`mailto:${item.email}`} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-amber-50 transition-colors"><Mail size={18} className="text-amber-600" /><div><div className="text-xs text-gray-400">Email</div><div className="text-sm text-[#0d1b3e] font-medium break-all">{item.email}</div></div></a>
            <a href={`tel:${item.phone}`} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-amber-50 transition-colors"><Phone size={18} className="text-amber-600" /><div><div className="text-xs text-gray-400">Phone</div><div className="text-sm text-[#0d1b3e] font-medium">{item.phone}</div></div></a>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50"><Calendar size={18} className="text-amber-600" /><div><div className="text-xs text-gray-400">Submitted</div><div className="text-sm text-[#0d1b3e] font-medium">{formatDate(item.created_at)} at {formatTime(item.created_at)}</div></div></div>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Message</div>
            <div className="p-4 rounded-xl bg-[#fdf8f0] border border-amber-100 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{item.message}</div>
          </div>
          <StatusControls current={item.status} onStatus={(s) => onStatus(item.id, s)} loading={actionLoading === `status-${item.id}`} statuses={['new', 'read', 'archived']} />
          <div className="pt-4 border-t border-gray-100 flex gap-2">
            <a href={`mailto:${item.email}?subject=Re: Your inquiry to Hand to Hand Services&body=Dear ${item.name},%0D%0A%0D%0AThank you for contacting us.`} className="flex-1 inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors"><Mail size={16} /> Reply via Email</a>
            <button onClick={() => onDelete(item.id)} disabled={actionLoading === `delete-${item.id}`} className="inline-flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors border border-red-200 disabled:opacity-50">{actionLoading === `delete-${item.id}` ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatusControls({ current, onStatus, loading, statuses }: { current: string; onStatus: (s: any) => void; loading: boolean; statuses: string[] }) {
  return (
    <div>
      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Status</div>
      <div className="flex flex-wrap gap-2">
        {statuses.map((s) => (
          <button key={s} onClick={() => onStatus(s)} disabled={loading} className={`px-3 py-1.5 rounded-lg text-xs font-semibold border capitalize transition-colors ${current === s ? (s === 'new' ? 'bg-amber-500 text-white border-amber-500' : s === 'read' || s === 'reviewed' ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-600 text-white border-gray-600') : 'bg-white text-gray-600 border-gray-200 hover:border-amber-300'}`}>{s}</button>
        ))}
      </div>
    </div>
  );
}
