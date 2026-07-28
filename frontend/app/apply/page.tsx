'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
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
  Building2,
  Users,
  MapPin,
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
  ChevronDown,
  UserCheck,
  Layers,
} from 'lucide-react';
import { api, ApiRequestError } from '@/lib/api';
import { SERVICE_CATEGORIES } from '@/lib/servicesData';

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

function ApplyPortal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') === 'employer' ? 'employer' : 'employee';

  const [portalType, setPortalType] = useState<'employee' | 'employer'>(initialType);

  // Sync state if query parameter changes
  useEffect(() => {
    const typeParam = searchParams.get('type');
    if (typeParam === 'employer' || typeParam === 'employee') {
      setPortalType(typeParam);
    }
  }, [searchParams]);

  // Employee Form State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [empSubmitting, setEmpSubmitting] = useState(false);
  const [empSubmitted, setEmpSubmitted] = useState(false);
  const [empError, setEmpError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [positionApplied, setPositionApplied] = useState('');
  const [isCustomPosition, setIsCustomPosition] = useState(false);

  // Employer Form State
  const [emprSubmitting, setEmprSubmitting] = useState(false);
  const [emprSubmitted, setEmprSubmitted] = useState(false);
  const [emprError, setEmprError] = useState<string | null>(null);
  const [serviceCategory, setServiceCategory] = useState<string>('');
  const [serviceType, setServiceType] = useState<string>('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Employee Handlers
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

  const handleEmployeeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmpError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const fullName = String(fd.get('full_name') || '').trim();
    const email = String(fd.get('email') || '').trim();
    const phone = String(fd.get('phone') || '').trim();
    const positionSelect = String(fd.get('position_applied_for') || '').trim();
    const customPosition = String(fd.get('custom_position_applied_for') || '').trim();
    const position = positionSelect === 'Other' ? customPosition : positionSelect;
    const experience = String(fd.get('experience_years') || '').trim();
    const preferredLocation = String(fd.get('preferred_location') || '').trim();
    const message = String(fd.get('message') || '').trim();

    if (!fullName || !phone || !position || !experience || !preferredLocation || !message) {
      setEmpError('Please fill in all required fields.');
      return;
    }

    if (Number(experience) < 0) {
      setEmpError('Experience (years) cannot be negative.');
      return;
    }

    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setFileError('Please attach your resume (PDF).');
      return;
    }

    setEmpSubmitting(true);
    try {
      await api.createEmployeeApplication(
        { full_name: fullName, email, phone, position_applied_for: position, experience_years: experience, preferred_location: preferredLocation, message },
        file
      );
      setEmpSubmitted(true);
      setPositionApplied('');
      setIsCustomPosition(false);
      form.reset();
      clearFile();
    } catch (err) {
      setEmpError(
        err instanceof ApiRequestError && err.code !== 'network'
          ? err.message
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setEmpSubmitting(false);
    }
  };

  // Employer Handlers
  const toggleService = (label: string) => {
    setSelectedServices((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  };

  const handleEmployerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmprError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const companyName = String(fd.get('company_name') || '').trim();
    const contactPerson = String(fd.get('contact_person') || '').trim();
    const email = String(fd.get('email') || '').trim();
    const phone = String(fd.get('phone') || '').trim();
    const cat = serviceCategory || String(fd.get('service_category') || '').trim();
    const stype = serviceType || String(fd.get('service_type') || '').trim();
    const personnel = String(fd.get('number_of_personnel') || '').trim();
    const duration = String(fd.get('duration') || '').trim();
    const location = String(fd.get('location') || '').trim();
    const message = String(fd.get('message') || '').trim();

    if (!companyName || !contactPerson || !phone || !cat || !stype || !personnel || !duration || !location || !message) {
      setEmprError('Please fill in all required fields including Service Category and Service Type.');
      return;
    }

    // Ensure selected services contains the chosen category and type if no quick checkbox was toggled
    const combinedService = `${cat} - ${stype}`;
    const servicesToSubmit = selectedServices.length > 0
      ? Array.from(new Set([combinedService, ...selectedServices]))
      : [combinedService];

    setEmprSubmitting(true);
    try {
      await api.createEmployerRequest({
        company_name: companyName,
        contact_person: contactPerson,
        email,
        phone,
        services_requested: servicesToSubmit,
        service_category: cat,
        service_type: stype,
        number_of_personnel: personnel,
        duration,
        location,
        message,
      });
      setEmprSubmitted(true);
      form.reset();
      setSelectedServices([]);
      setServiceCategory('');
      setServiceType('');
    } catch (err) {
      setEmprError(
        err instanceof ApiRequestError && err.code !== 'network'
          ? err.message
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setEmprSubmitting(false);
    }
  };

  const isSubmitted = portalType === 'employee' ? empSubmitted : emprSubmitted;

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#fdf8f0] flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-100">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="text-green-600" size={32} />
          </div>
          <h1 className="text-2xl font-extrabold text-[#0d1b3e] mb-2">
            {portalType === 'employee' ? 'Application Submitted!' : 'Request Submitted!'}
          </h1>
          <p className="text-gray-600 text-sm mb-6">
            {portalType === 'employee'
              ? 'Thank you for applying. Our team will review your resume and get in touch with you soon regarding the next steps.'
              : "Thank you for your interest. Our team will review your requirements and contact you shortly with a tailored proposal."}
          </p>
          <div className="space-y-3">
            <button
              onClick={() => {
                if (portalType === 'employee') setEmpSubmitted(false);
                else setEmprSubmitted(false);
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-amber-500 text-amber-600 font-semibold hover:bg-amber-50 text-sm transition-colors"
            >
              Submit Another Response
            </button>
            <button
              onClick={() => router.push('/')}
              className="btn-gold w-full justify-center"
            >
              Back to Home
            </button>
          </div>
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

        {/* Portal Selector Header */}
        <div className="text-center mb-10">
          <span className="section-label justify-center">
            <span className="w-8 h-px bg-amber-500"></span> Application Portal
            <span className="w-8 h-px bg-amber-500"></span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0d1b3e] mb-4">
            {portalType === 'employee' ? 'Job Application Form' : 'Employer Service Request'}
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            {portalType === 'employee'
              ? 'Apply for security, housekeeping, or skilled job opportunities with Hand to Hand Services Pvt. Ltd.'
              : 'Hire qualified manpower or request specialized services tailored for your organization.'}
          </p>

          {/* Type Selection Dropdown */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-white p-2.5 rounded-2xl shadow-md border border-gray-200/80">
            <label htmlFor="portal-select" className="text-xs font-bold uppercase tracking-wider text-gray-500 px-3">
              Select Requirement:
            </label>
            <div className="relative w-full sm:w-72">
              <select
                id="portal-select"
                value={portalType}
                onChange={(e) => setPortalType(e.target.value as 'employee' | 'employer')}
                className="w-full appearance-none bg-amber-500/10 text-amber-900 font-bold py-2.5 pl-4 pr-10 rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer text-sm transition-all"
              >
                <option value="employee">Apply for Job (Employee)</option>
                <option value="employer">Request Services (Employer)</option>
              </select>
              <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-700 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Dynamic Form Content */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-10">
          {portalType === 'employee' ? (
            /* EMPLOYEE / JOB SEEKER FORM */
            <form onSubmit={handleEmployeeSubmit} className="space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100 text-[#0d1b3e] font-bold text-lg">
                <UserCheck className="text-amber-500" size={22} />
                <span>Job Application Details</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field icon={<User size={18} />} label="Full Name *" name="full_name" placeholder="Your full name" required={true} />
                <Field icon={<Mail size={18} />} label="Email" name="email" type="email" placeholder="you@example.com" required={false} />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field icon={<Phone size={18} />} label="Phone *" name="phone" type="tel" placeholder="Your phone number" required={true} />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Position Applied For *</label>
                  <div className="relative">
                    <Briefcase size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <select
                      name="position_applied_for"
                      required
                      value={positionApplied}
                      onChange={(e) => {
                        setPositionApplied(e.target.value);
                        setIsCustomPosition(e.target.value === 'Other');
                      }}
                      className="w-full pl-10 pr-8 py-3 rounded-xl border border-gray-200 bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition text-sm appearance-none cursor-pointer"
                    >
                      <option value="">Select Position</option>
                      <option value="Security Guard (Male/Female)">Security Guard (Male/Female)</option>
                      <option value="Security Supervisor">Security Supervisor</option>
                      <option value="Bouncer / VIP Escort">Bouncer / VIP Escort</option>
                      <option value="Gunman">Gunman</option>
                      <option value="Housekeeper / Cleaning Staff">Housekeeper / Cleaning Staff</option>
                      <option value="Pantry Boy / Office Peon">Pantry Boy / Office Peon</option>
                      <option value="Gardener">Gardener</option>
                      <option value="Skilled Trades (Plumber/Carpenter/Electrician/Painter/AC)">Skilled Trades (Plumber/Carpenter/Electrician/Painter/AC)</option>
                      <option value="Nurse / Wardboy / Caretaker">Nurse / Wardboy / Caretaker</option>
                      <option value="Teacher / AI & Technical Trainer">Teacher / AI & Technical Trainer</option>
                      <option value="Driver (Cab/Bus/Logistics)">Driver (Cab/Bus/Logistics)</option>
                      <option value="Logistics Staff / Delivery Executive">Logistics Staff / Delivery Executive</option>
                      <option value="Office / Back Office Staff">Office / Back Office Staff</option>
                      <option value="Mason / Construction Labour">Mason / Construction Labour</option>
                      <option value="Event & Cultural Staff">Event & Cultural Staff</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>

                  {isCustomPosition && (
                    <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-200">
                      <Field 
                        icon={<Briefcase size={18} />} 
                        label="Specify Custom Position *" 
                        name="custom_position_applied_for" 
                        placeholder="e.g. Accountant" 
                        required={true} 
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field
                  icon={<Clock size={18} />}
                  label="Experience (years) *"
                  name="experience_years"
                  type="number"
                  min="0"
                  onInput={(e: React.FormEvent<HTMLInputElement>) => {
                    if (Number(e.currentTarget.value) < 0) e.currentTarget.value = '0';
                  }}
                  placeholder="e.g. 3"
                  required={true}
                />
                <Field
                  icon={<MapPin size={18} />}
                  label="Preferred Location *"
                  name="preferred_location"
                  placeholder="e.g. New Delhi, NCR"
                  required={true}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                <div className="relative">
                  <MessageSquare size={18} className="absolute left-3 top-3 text-gray-400" />
                  <textarea
                    name="message"
                    required={true}
                    rows={3}
                    placeholder="Tell us about yourself"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition text-sm resize-none"
                  />
                </div>
              </div>

              {/* Resume upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Resume (PDF only, max 5 MB) *</label>
                <div
                  className={`relative border-2 border-dashed rounded-xl transition-colors cursor-pointer ${fileError ? 'border-red-300 bg-red-50/30' : fileName ? 'border-amber-300 bg-amber-50/30' : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/20'
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
                      <p className="text-sm text-gray-600 font-medium">Click to upload your resume *</p>
                      <p className="text-xs text-gray-400 mt-1">PDF files only, up to 5 MB</p>
                    </div>
                  )}
                </div>
                {fileError && <p className="text-red-600 text-xs mt-1.5">{fileError}</p>}
              </div>

              {empError && (
                <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                  {empError}
                </div>
              )}

              <button
                type="submit"
                disabled={empSubmitting}
                className="btn-gold w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {empSubmitting ? (
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
          ) : (
            /* EMPLOYER / CLIENT FORM */
            <form onSubmit={handleEmployerSubmit} className="space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100 text-[#0d1b3e] font-bold text-lg">
                <Building2 className="text-amber-500" size={22} />
                <span>Employer Service Request</span>
              </div>

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
                        className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${checked
                          ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-200'
                          : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/30'
                          }`}
                      >
                        <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${checked ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-500'
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
                <Field icon={<Building2 size={18} />} label="Company Name *" name="company_name" placeholder="Your company name" required={true} />
                <Field icon={<User size={18} />} label="Contact Person *" name="contact_person" placeholder="Your name" required={true} />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field icon={<Mail size={18} />} label="Email" name="email" type="email" placeholder="contact@company.com" required={false} />
                <Field icon={<Phone size={18} />} label="Phone *" name="phone" type="tel" placeholder="Your phone number" required={true} />
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* 1st Dropdown: Service Category */}
                <div>
                  <label className="block text-sm font-semibold text-[#0d1b3e] mb-1.5">
                    Service Category *
                  </label>
                  <div className="relative">
                    <Briefcase size={18} className="absolute left-3 top-3.5 text-gray-400 pointer-events-none" />
                    <select
                      name="service_category"
                      value={serviceCategory}
                      onChange={(e) => {
                        setServiceCategory(e.target.value);
                        setServiceType('');
                      }}
                      required
                      className="w-full pl-10 pr-8 py-3 rounded-xl border border-gray-200 bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition text-sm appearance-none cursor-pointer"
                    >
                      <option value="">Select Category</option>
                      {Object.keys(SERVICE_CATEGORIES).map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={18} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* 2nd Dropdown: Service Type */}
                <div>
                  <label className="block text-sm font-semibold text-[#0d1b3e] mb-1.5">
                    Service Type *
                  </label>
                  <div className="relative">
                    <Layers size={18} className="absolute left-3 top-3.5 text-gray-400 pointer-events-none" />
                    <select
                      name="service_type"
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      disabled={!serviceCategory}
                      required
                      className="w-full pl-10 pr-8 py-3 rounded-xl border border-gray-200 bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition text-sm appearance-none cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">
                        {serviceCategory ? 'Select Service Type' : 'Select Category First'}
                      </option>
                      {serviceCategory &&
                        SERVICE_CATEGORIES[serviceCategory]?.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                    </select>
                    <ChevronDown size={18} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Personnel Needed */}
                <Field icon={<Users size={18} />} label="No. of Personnel Required *" name="number_of_personnel" placeholder="e.g. 10 guards" required={true} />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field icon={<Clock size={18} />} label="Working Duration *" name="duration" placeholder="e.g. 6 months" required={true} />
                <Field icon={<MapPin size={18} />} label="Location *" name="location" placeholder="e.g. New Delhi" required={true} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional Details *</label>
                <div className="relative">
                  <MessageSquare size={18} className="absolute left-3 top-3 text-gray-400" />
                  <textarea
                    name="message"
                    required={true}
                    rows={4}
                    placeholder="Describe your requirements, specific needs, timing, etc."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition text-sm resize-none"
                  />
                </div>
              </div>

              {emprError && (
                <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                  {emprError}
                </div>
              )}

              <button
                type="submit"
                disabled={emprSubmitting}
                className="btn-gold w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {emprSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Submitting...
                  </>
                ) : (
                  <>Submit Request</>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ApplyPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen bg-[#fdf8f0] pt-24 pb-20 text-center">Loading portal...</div>}>
        <ApplyPortal />
      </Suspense>
      <Footer />
    </>
  );
}

function Field({
  icon,
  label,
  name,
  type = 'text',
  placeholder,
  required = true,
  min,
  onInput,
}: {
  icon: React.ReactNode;
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  min?: string | number;
  onInput?: React.FormEventHandler<HTMLInputElement>;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
        <input
          name={name}
          type={type}
          min={min}
          onInput={onInput}
          required={required}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition text-sm"
        />
      </div>
    </div>
  );
}
