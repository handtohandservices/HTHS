'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Building2,
  User,
  Mail,
  Phone,
  Users,
  Clock,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Camera,
  GraduationCap,
  HeartHandshake,
  BriefcaseBusiness,
  Drama,
  Plane,
  PackageCheck,
  Truck,
} from 'lucide-react';
import { api, ApiRequestError } from '@/lib/api';

const serviceOptions = [
  { icon: ShieldCheck, label: 'Private Security Services' },
  { icon: Sparkles, label: 'Housekeeping, Cleaning & Hospitality' },
  { icon: Camera, label: 'Event Organization & Photography' },
  { icon: GraduationCap, label: 'Health, Education & AI Training' },
  { icon: HeartHandshake, label: 'Women Empowerment Programs' },
  { icon: BriefcaseBusiness, label: 'Job Consultancy' },
  { icon: Drama, label: 'Cultural Programs (Drama & Dance)' },
  { icon: Plane, label: 'Tour & Travel Services' },
  { icon: PackageCheck, label: 'Government & Private Tender Supplies' },
  { icon: Truck, label: 'Courier & Cargo Services' },
  { icon: Users, label: 'Manpower Supply' },
  { icon: BriefcaseBusiness, label: 'Other' },
];

export default function EmployerPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (label: string) => {
    setSelectedServices((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const companyName = String(fd.get('company_name') || '').trim();
    const contactPerson = String(fd.get('contact_person') || '').trim();
    const email = String(fd.get('email') || '').trim();
    const phone = String(fd.get('phone') || '').trim();
    const personnel = String(fd.get('number_of_personnel') || '').trim();
    const duration = String(fd.get('duration') || '').trim();
    const location = String(fd.get('location') || '').trim();
    const message = String(fd.get('message') || '').trim();

    if (!companyName || !contactPerson || !email || !phone) {
      setError('Please fill in all required fields.');
      return;
    }
    if (selectedServices.length === 0) {
      setError('Please select at least one service.');
      return;
    }

    setSubmitting(true);
    try {
      await api.createEmployerRequest({
        company_name: companyName,
        contact_person: contactPerson,
        email,
        phone,
        services_requested: selectedServices,
        number_of_personnel: personnel,
        duration,
        location,
        message,
      });
      setSubmitted(true);
      form.reset();
      setSelectedServices([]);
    } catch (err) {
      setError(
        err instanceof ApiRequestError && err.code !== 'network'
          ? err.message
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#fdf8f0] flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="text-green-600" size={32} />
          </div>
          <h1 className="text-2xl font-extrabold text-[#0d1b3e] mb-2">Request Submitted!</h1>
          <p className="text-gray-600 text-sm mb-6">
            Thank you for your interest. Our team will review your requirements and contact you
            shortly with a tailored proposal.
          </p>
          <button onClick={() => router.push('/')} className="btn-gold w-full justify-center">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdf8f0] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-amber-600 transition-colors mb-6">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="text-center mb-10">
          <span className="section-label justify-center">
            <span className="w-8 h-px bg-amber-500"></span> For Employers
            <span className="w-8 h-px bg-amber-500"></span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0d1b3e] mb-3">
            Request a Service
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Tell us what your organization needs — security, manpower, housekeeping, or any of our
            services. We'll prepare a customized proposal for you.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service selection */}
            <div>
              <label className="block text-sm font-semibold text-[#0d1b3e] mb-3">
                Select Services Required *
              </label>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {serviceOptions.map((s) => {
                  const checked = selectedServices.includes(s.label);
                  return (
                    <button
                      key={s.label}
                      type="button"
                      onClick={() => toggleService(s.label)}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${
                        checked
                          ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-200'
                          : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/30'
                      }`}
                    >
                      <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                        checked ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-500'
                      }`}>
                        <s.icon size={18} />
                      </div>
                      <span className={`text-xs font-medium leading-tight ${checked ? 'text-amber-900' : 'text-gray-700'}`}>
                        {s.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Company details */}
            <div className="grid sm:grid-cols-2 gap-5">
              <Field icon={<Building2 size={18} />} label="Company Name *" name="company_name" placeholder="Your company name" />
              <Field icon={<User size={18} />} label="Contact Person *" name="contact_person" placeholder="Your name" />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field icon={<Mail size={18} />} label="Email *" name="email" type="email" placeholder="contact@company.com" />
              <Field icon={<Phone size={18} />} label="Phone *" name="phone" type="tel" placeholder="Your phone number" />
            </div>

            <div className="grid sm:grid-cols-3 gap-5">
              <Field icon={<Users size={18} />} label="Personnel Needed" name="number_of_personnel" placeholder="e.g. 10 guards" required={false} />
              <Field icon={<Clock size={18} />} label="Duration" name="duration" placeholder="e.g. 6 months" required={false} />
              <Field icon={<MapPin size={18} />} label="Location" name="location" placeholder="e.g. New Delhi" required={false} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional Details</label>
              <div className="relative">
                <MessageSquare size={18} className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Describe your requirements, specific needs, timing, etc."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition text-sm resize-none"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn-gold w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Submitting...
                </>
              ) : (
                <>Submit Request</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Field({
  icon,
  label,
  name,
  type = 'text',
  placeholder,
  required = true,
}: {
  icon: React.ReactNode;
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition text-sm"
        />
      </div>
    </div>
  );
}
