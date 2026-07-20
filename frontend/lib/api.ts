/**
 * API client for the Express backend.
 * This is the ONLY way the frontend talks to the server — no direct DB/Supabase access.
 */

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

const TOKEN_KEY = 'hth_admin_token';
const EMAIL_KEY = 'hth_admin_email';

export const tokenStorage = {
  get(): string | null {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(TOKEN_KEY);
  },
  set(token: string, email: string) {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(EMAIL_KEY, email);
  },
  getEmail(): string | null {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(EMAIL_KEY);
  },
  clear() {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(EMAIL_KEY);
  },
};

export class ApiRequestError extends Error {
  public readonly status: number;
  public readonly code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.status = status;
    this.code = code;
    Object.setPrototypeOf(this, ApiRequestError.prototype);
  }
}

interface ApiEnvelope<T> {
  success: boolean;
  data?: T;
  error?: { code: string; message: string };
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = tokenStorage.get();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, { ...options, headers });
  } catch {
    throw new ApiRequestError(0, 'network', 'Cannot reach the server. Please try again.');
  }

  let body: ApiEnvelope<T> | null = null;
  try {
    body = (await res.json()) as ApiEnvelope<T>;
  } catch {
    throw new ApiRequestError(res.status, 'parse', 'Unexpected response from server.');
  }

  if (!res.ok || !body?.success) {
    const msg = body?.error?.message || 'Request failed.';
    const code = body?.error?.code || 'error';
    throw new ApiRequestError(res.status, code, msg);
  }

  return body.data as T;
}

/**
 * Multipart form-data request — used for file uploads.
 * The browser sets the Content-Type + boundary automatically, so we must NOT
 * set it ourselves.
 */
async function requestForm<T>(path: string, formData: FormData): Promise<T> {
  const token = tokenStorage.get();
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, { method: 'POST', body: formData, headers });
  } catch {
    throw new ApiRequestError(0, 'network', 'Cannot reach the server. Please try again.');
  }

  let body: ApiEnvelope<T> | null = null;
  try {
    body = (await res.json()) as ApiEnvelope<T>;
  } catch {
    throw new ApiRequestError(res.status, 'parse', 'Unexpected response from server.');
  }

  if (!res.ok || !body?.success) {
    const msg = body?.error?.message || 'Request failed.';
    const code = body?.error?.code || 'error';
    throw new ApiRequestError(res.status, code, msg);
  }

  return body.data as T;
}

export const api = {
  // ---- Auth ----
  signUp(email: string, password: string) {
    return request<{ admin_id: string; email: string; token: string; expires_at: string }>(
      '/auth/signup',
      { method: 'POST', body: JSON.stringify({ email, password }) }
    );
  },
  signIn(email: string, password: string) {
    return request<{ admin_id: string; email: string; token: string; expires_at: string }>(
      '/auth/signin',
      { method: 'POST', body: JSON.stringify({ email, password }) }
    );
  },
  signOut() {
    return request<{ signed_out: boolean }>('/auth/signout', { method: 'POST' });
  },
  me() {
    return request<{ admin_id: string; email: string }>('/auth/me');
  },

  // ---- Contact submissions ----
  createSubmission(input: { name: string; email: string; phone: string; message: string }) {
    return request<{ id: string }>('/contacts', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  },
  listSubmissions() {
    return request<ContactSubmission[]>('/contacts');
  },
  getStats() {
    return request<SubmissionStats>('/contacts/stats');
  },
  updateSubmissionStatus(id: string, status: SubmissionStatus) {
    return request<{ id: string; status: SubmissionStatus }>(`/contacts/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },
  deleteSubmission(id: string) {
    return request<{ id: string; deleted: boolean }>(`/contacts/${id}`, { method: 'DELETE' });
  },

  // ---- Employee applications ----
  createEmployeeApplication(input: {
    full_name: string;
    email: string;
    phone: string;
    position_applied_for: string;
    experience_years?: string;
    message?: string;
  }, resumeFile: File) {
    const fd = new FormData();
    fd.append('resume', resumeFile);
    fd.append('full_name', input.full_name);
    fd.append('email', input.email);
    fd.append('phone', input.phone);
    fd.append('position_applied_for', input.position_applied_for);
    if (input.experience_years) fd.append('experience_years', input.experience_years);
    if (input.message) fd.append('message', input.message);
    return requestForm<{ id: string; resume_url: string }>('/employees', fd);
  },
  listEmployeeApplications() {
    return request<EmployeeApplication[]>('/employees');
  },
  getEmployeeApplicationStats() {
    return request<EmployeeApplicationStats>('/employees/stats');
  },
  updateEmployeeApplicationStatus(id: string, status: EmployeeApplicationStatus) {
    return request<{ id: string; status: EmployeeApplicationStatus }>(`/employees/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },
  deleteEmployeeApplication(id: string) {
    return request<{ id: string; deleted: boolean }>(`/employees/${id}`, { method: 'DELETE' });
  },

  // ---- Employer requests ----
  createEmployerRequest(input: {
    company_name: string;
    contact_person: string;
    email: string;
    phone: string;
    services_requested: string[];
    number_of_personnel?: string;
    duration?: string;
    location?: string;
    message?: string;
  }) {
    return request<{ id: string }>('/employers', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  },
  listEmployerRequests() {
    return request<EmployerRequest[]>('/employers');
  },
  getEmployerRequestStats() {
    return request<EmployerRequestStats>('/employers/stats');
  },
  updateEmployerRequestStatus(id: string, status: EmployerRequestStatus) {
    return request<{ id: string; status: EmployerRequestStatus }>(`/employers/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },
  deleteEmployerRequest(id: string) {
    return request<{ id: string; deleted: boolean }>(`/employers/${id}`, { method: 'DELETE' });
  },
};

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
