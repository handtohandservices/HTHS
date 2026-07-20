import { supabase } from '../config/supabase';
import {
  EmployeeApplication,
  EmployeeApplicationStats,
  EmployeeApplicationStatus,
} from '../types';

export const employeeService = {
  async create(input: {
    full_name: string;
    email: string;
    phone: string;
    position_applied_for: string;
    experience_years: number | null;
    message: string | null;
    resume_url: string;
    resume_public_id: string;
  }): Promise<string> {
    const { data, error } = await supabase.rpc('create_employee_application', {
      p_full_name: input.full_name,
      p_email: input.email,
      p_phone: input.phone,
      p_position: input.position_applied_for,
      p_experience_years: input.experience_years,
      p_message: input.message,
      p_resume_url: input.resume_url,
      p_resume_public_id: input.resume_public_id,
    });
    if (error) throw error;
    return data as string;
  },

  async list(): Promise<EmployeeApplication[]> {
    const { data, error } = await supabase.rpc('list_employee_applications');
    if (error) throw error;
    return (data as EmployeeApplication[]) || [];
  },

  async getStats(): Promise<EmployeeApplicationStats> {
    const { data, error } = await supabase.rpc('get_employee_application_stats');
    if (error) throw error;
    return data as EmployeeApplicationStats;
  },

  async updateStatus(
    id: string,
    status: EmployeeApplicationStatus,
    adminToken: string
  ): Promise<boolean> {
    const { data, error } = await supabase.rpc('update_employee_application_status', {
      p_id: id,
      p_status: status,
      p_token: adminToken,
    });
    if (error) throw error;
    return Boolean(data);
  },

  async remove(id: string, adminToken: string): Promise<boolean> {
    const { data, error } = await supabase.rpc('delete_employee_application', {
      p_id: id,
      p_token: adminToken,
    });
    if (error) throw error;
    return Boolean(data);
  },
};
