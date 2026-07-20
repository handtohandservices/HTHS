import { supabase } from '../config/supabase';
import { ContactSubmission, SubmissionStats, SubmissionStatus } from '../types';

export const contactService = {
  async create(input: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }): Promise<string> {
    const { data, error } = await supabase.rpc('create_contact_submission', {
      p_name: input.name,
      p_email: input.email,
      p_phone: input.phone,
      p_message: input.message,
    });
    if (error) throw error;
    return data as string;
  },

  async list(): Promise<ContactSubmission[]> {
    const { data, error } = await supabase.rpc('list_contact_submissions');
    if (error) throw error;
    return (data as ContactSubmission[]) || [];
  },

  async getStats(): Promise<SubmissionStats> {
    const { data, error } = await supabase.rpc('get_contact_submission_stats');
    if (error) throw error;
    return data as SubmissionStats;
  },

  async updateStatus(
    id: string,
    status: SubmissionStatus,
    adminToken: string
  ): Promise<boolean> {
    const { data, error } = await supabase.rpc('update_contact_submission_status', {
      p_id: id,
      p_status: status,
      p_token: adminToken,
    });
    if (error) throw error;
    return Boolean(data);
  },

  async remove(id: string, adminToken: string): Promise<boolean> {
    const { data, error } = await supabase.rpc('delete_contact_submission', {
      p_id: id,
      p_token: adminToken,
    });
    if (error) throw error;
    return Boolean(data);
  },
};
