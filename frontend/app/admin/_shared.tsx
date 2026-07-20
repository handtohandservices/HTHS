import { Inbox, CheckCircle2, Archive, Eye } from 'lucide-react';

export type ContactStatus = 'new' | 'read' | 'archived';
export type ReviewStatus = 'new' | 'reviewed' | 'archived';
export type AnyStatus = ContactStatus | ReviewStatus;

export function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  const colorMap: Record<string, string> = {
    navy: 'from-[#0d1b3e] to-[#1a2f5e] text-white',
    amber: 'from-amber-500 to-amber-600 text-white',
    blue: 'from-blue-500 to-blue-600 text-white',
    gray: 'from-gray-500 to-gray-600 text-white',
    green: 'from-green-500 to-green-600 text-white',
  };
  return (
    <div className={`rounded-2xl p-5 bg-gradient-to-br ${colorMap[color]} shadow-md`}>
      <div className="text-3xl font-extrabold">{value}</div>
      <div className="text-xs uppercase tracking-wider opacity-80 mt-1">{label}</div>
    </div>
  );
}

const contactMap = {
  new: { label: 'New', cls: 'bg-amber-100 text-amber-700', icon: Inbox },
  read: { label: 'Read', cls: 'bg-blue-100 text-blue-700', icon: Eye },
  archived: { label: 'Archived', cls: 'bg-gray-100 text-gray-600', icon: Archive },
};

const reviewMap = {
  new: { label: 'New', cls: 'bg-amber-100 text-amber-700', icon: Inbox },
  reviewed: { label: 'Reviewed', cls: 'bg-blue-100 text-blue-700', icon: CheckCircle2 },
  archived: { label: 'Archived', cls: 'bg-gray-100 text-gray-600', icon: Archive },
};

export function StatusBadge({ status }: { status: AnyStatus }) {
  const cfg = status === 'reviewed' ? reviewMap.reviewed : status === 'read' ? contactMap.read : status === 'archived' ? contactMap.archived : contactMap.new;
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.cls}`}>
      <cfg.icon size={12} /> {cfg.label}
    </span>
  );
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
