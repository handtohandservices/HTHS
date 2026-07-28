export type SubmissionStatus = 'new' | 'read' | 'archived';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: SubmissionStatus;
  created_at: string;
}

export interface SubmissionStats {
  total: number;
  new: number;
  read: number;
  archived: number;
}

export interface AdminUser {
  admin_id: string;
  email: string;
}

export interface AuthSession {
  admin_id: string;
  email: string;
  token: string;
  expires_at: string;
}

// ===== Employee & Employer =====

export type EmployeeApplicationStatus = 'new' | 'reviewed' | 'archived';

export interface EmployeeApplication {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  position_applied_for: string;
  experience_years: number | null;
  preferred_location?: string | null;
  message: string | null;
  resume_url: string;
  resume_public_id: string | null;
  status: EmployeeApplicationStatus;
  created_at: string;
}

export interface EmployeeApplicationStats {
  total: number;
  new: number;
  reviewed: number;
  archived: number;
}

export type EmployerRequestStatus = 'new' | 'reviewed' | 'archived';

export interface EmployerRequest {
  id: string;
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  services_requested: string[];
  service_category?: string | null;
  service_type?: string | null;
  number_of_personnel: string | null;
  duration: string | null;
  location: string | null;
  message: string | null;
  status: EmployerRequestStatus;
  created_at: string;
}

export interface EmployerRequestStats {
  total: number;
  new: number;
  reviewed: number;
  archived: number;
}

// ===== Gallery =====

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  category_slug: string;
  src: string;
  alt: string;
  location: string;
  image_public_id: string | null;
  created_at: string;
}

