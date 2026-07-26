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
    preferred_location?: string | null;
    message: string | null;
    resume_url: string;
    resume_public_id: string;
  }): Promise<string> {
    const prefLoc = input.preferred_location?.trim() || null;

    let { data, error } = await supabase.rpc('create_employee_application', {
      p_full_name: input.full_name,
      p_email: input.email,
      p_phone: input.phone,
      p_position: input.position_applied_for,
      p_experience_years: input.experience_years,
      p_message: input.message,
      p_resume_url: input.resume_url,
      p_resume_public_id: input.resume_public_id,
      p_preferred_location: prefLoc,
    });

    if (error && (error.message?.includes('function') || error.code === 'PGRST202')) {
      const formattedMessage = prefLoc
        ? `[Preferred Location: ${prefLoc}]\n${input.message || ''}`.trim()
        : input.message;

      const fallbackRes = await supabase.rpc('create_employee_application', {
        p_full_name: input.full_name,
        p_email: input.email,
        p_phone: input.phone,
        p_position: input.position_applied_for,
        p_experience_years: input.experience_years,
        p_message: formattedMessage,
        p_resume_url: input.resume_url,
        p_resume_public_id: input.resume_public_id,
      });
      if (fallbackRes.error) throw fallbackRes.error;
      return fallbackRes.data as string;
    }

    if (error) throw error;
    return data as string;
  },

  async list(): Promise<EmployeeApplication[]> {
    const { data, error } = await supabase.rpc('list_employee_applications');
    if (error) throw error;
    const items = (data as EmployeeApplication[]) || [];

    return items.map((item) => {
      let prefLoc = item.preferred_location || null;
      let msg = item.message || '';

      if (!prefLoc && msg.includes('[Preferred Location:')) {
        const match = msg.match(/\[Preferred Location:\s*([^\]]+)\]/);
        if (match && match[1]) {
          prefLoc = match[1].trim();
          msg = msg.replace(/\[Preferred Location:\s*([^\]]+)\]\n?/, '').trim();
        }
      }

      return {
        ...item,
        preferred_location: prefLoc,
        message: msg,
      };
    });
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
