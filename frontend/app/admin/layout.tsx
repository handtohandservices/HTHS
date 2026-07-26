import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Hand to Hand Services Pvt. Ltd.',
  robots: { index: false, follow: false },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#f6f7fb]">{children}</div>;
}
