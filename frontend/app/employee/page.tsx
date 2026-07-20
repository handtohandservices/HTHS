'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  FileText,
  Upload,
  CheckCircle2,
  Loader2,
  User,
  Mail,
  Phone,
  Briefcase,
  Clock,
  MessageSquare,
  X,
} from 'lucide-react';
import { api, ApiRequestError } from '@/lib/api';

export default function EmployeePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) {
      setFileName(null);
      return;
    }
    if (file.type !== 'application/pdf') {
      setFileError('Please upload a PDF file only.');
      setFileName(null);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFileError('File size must be under 5 MB.');
      setFileName(null);
      return;
    }
    setFileName(file.name);
  };

  const clearFile = () => {
    setFileName(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const fullName = String(fd.get('full_name') || '').trim();
    const email = String(fd.get('email') || '').trim();
    const phone = String(fd.get('phone') || '').trim();
    const position = String(fd.get('position_applied_for') || '').trim();
    const experience = String(fd.get('experience_years') || '').trim();
    const message = String(fd.get('message') || '').trim();

    if (!fullName || !email || !phone || !position) {
      setError('Please fill in all required fields.');
      return;
    }

    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setFileError('Please attach your resume (PDF).');
      return;
    }

    setSubmitting(true);
    try {
      await api.createEmployeeApplication(
        { full_name: fullName, email, phone, position_applied_for: position, experience_years: experience, message },
        file
      );
      setSubmitted(true);
      form.reset();
      clearFile();
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
          <h1 className="text-2xl font-extrabold text-[#0d1b3e] mb-2">Application Submitted!</h1>
          <p className="text-gray-600 text-sm mb-6">
            Thank you for applying. Our team will review your resume and get in touch with you soon
            regarding the next steps.
          </p>
          <button
            onClick={() => router.push('/')}
            className="btn-gold w-full justify-center"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdf8f0] pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-amber-600 transition-colors mb-6">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="text-center mb-10">
          <span className="section-label justify-center">
            <span className="w-8 h-px bg-amber-500"></span> Careers
            <span className="w-8 h-px bg-amber-500"></span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0d1b3e] mb-3">
            Apply for a Position
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Submit your details and resume below. We review every application and will reach out to
            suitable candidates.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field icon={<User size={18} />} label="Full Name *" name="full_name" placeholder="Your full name" />
              <Field icon={<Mail size={18} />} label="Email *" name="email" type="email" placeholder="you@example.com" />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field icon={<Phone size={18} />} label="Phone *" name="phone" type="tel" placeholder="Your phone number" />
              <Field icon={<Briefcase size={18} />} label="Position Applied For *" name="position_applied_for" placeholder="e.g. Security Guard" />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field icon={<Clock size={18} />} label="Experience (years)" name="experience_years" type="number" placeholder="e.g. 3" required={false} />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Message (optional)</label>
                <div className="relative">
                  <MessageSquare size={18} className="absolute left-3 top-3 text-gray-400" />
                  <textarea
                    name="message"
                    rows={1}
                    placeholder="Tell us about yourself"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition text-sm resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Resume upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Resume (PDF only, max 5 MB) *</label>
              <div
                className={`relative border-2 border-dashed rounded-xl transition-colors cursor-pointer ${
                  fileError ? 'border-red-300 bg-red-50/30' : fileName ? 'border-amber-300 bg-amber-50/30' : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/20'
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {fileName ? (
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex-shrink-0 w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                        <FileText className="text-white" size={20} />
                      </div>
                      <span className="text-sm text-[#0d1b3e] font-medium truncate">{fileName}</span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); clearFile(); }}
                      className="flex-shrink-0 w-8 h-8 rounded-lg hover:bg-red-100 text-gray-400 hover:text-red-600 flex items-center justify-center transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                    <Upload className="text-gray-400 mb-2" size={28} />
                    <p className="text-sm text-gray-600 font-medium">Click to upload your resume</p>
                    <p className="text-xs text-gray-400 mt-1">PDF files only, up to 5 MB</p>
                  </div>
                )}
              </div>
              {fileError && <p className="text-red-600 text-xs mt-1.5">{fileError}</p>}
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
                <>
                  Submit Application <Upload size={16} />
                </>
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
