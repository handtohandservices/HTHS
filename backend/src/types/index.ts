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
