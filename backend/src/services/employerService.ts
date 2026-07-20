import { supabase } from '../config/supabase';
import { EmployerRequest, EmployerRequestStats, EmployerRequestStatus } from '../types';

export const employerService = {
  async create(input: {
    company_name: string;
    contact_person: string;
    email: string;
    phone: string;
    services_requested: string[];
    number_of_personnel: string | null;
    duration: string | null;
    location: string | null;
    message: string | null;
  }): Promise<string> {
    const { data, error } = await supabase.rpc('create_employer_request', {
      p_company_name: input.company_name,
      p_contact_person: input.contact_person,
      p_email: input.email,
      p_phone: input.phone,
      p_services: input.services_requested,
      p_number_of_personnel: input.number_of_personnel,
      p_duration: input.duration,
      p_location: input.location,
      p_message: input.message,
    });
    if (error) throw error;
    return data as string;
  },

  async list(): Promise<EmployerRequest[]> {
    const { data, error } = await supabase.rpc('list_employer_requests');
    if (error) throw error;
    return (data as EmployerRequest[]) || [];
  },

  async getStats(): Promise<EmployerRequestStats> {
    const { data, error } = await supabase.rpc('get_employer_request_stats');
    if (error) throw error;
    return data as EmployerRequestStats;
  },

  async updateStatus(
    id: string,
    status: EmployerRequestStatus,
    adminToken: string
  ): Promise<boolean> {
    const { data, error } = await supabase.rpc('update_employer_request_status', {
      p_id: id,
      p_status: status,
      p_token: adminToken,
    });
    if (error) throw error;
    return Boolean(data);
  },

  async remove(id: string, adminToken: string): Promise<boolean> {
    const { data, error } = await supabase.rpc('delete_employer_request', {
      p_id: id,
      p_token: adminToken,
    });
    if (error) throw error;
    return Boolean(data);
  },
};
