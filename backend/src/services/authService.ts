import { supabase } from '../config/supabase';
import { AdminUser, AuthSession } from '../types';

type RpcRow = AdminUser & { token?: string; expires_at?: string };

function pickSession(row: RpcRow | null): AuthSession | null {
  if (!row || !row.admin_id || !row.email || !row.token) return null;
  return {
    admin_id: row.admin_id,
    email: row.email,
    token: row.token,
    expires_at: row.expires_at || '',
  };
}

export const authService = {
  async signUp(email: string, password: string): Promise<AuthSession> {
    const { data, error } = await supabase.rpc('admin_create', {
      p_email: email,
      p_password: password,
    });
    if (error) throw error;

    const row = Array.isArray(data) ? (data[0] as RpcRow) : (data as RpcRow);
    const session = pickSession(row);
    if (!session) {
      throw new Error('An admin account with this email already exists.');
    }
    return session;
  },

  async signIn(email: string, password: string): Promise<AuthSession> {
    const { data, error } = await supabase.rpc('admin_sign_in', {
      p_email: email,
      p_password: password,
    });
    if (error) throw error;

    const row = Array.isArray(data) ? (data[0] as RpcRow) : (data as RpcRow);
    const session = pickSession(row);
    if (!session) {
      throw new Error('Invalid email or password.');
    }
    return session;
  },

  async signOut(token: string): Promise<void> {
    await supabase.rpc('admin_sign_out', { p_token: token });
  },

  async verifySession(token: string): Promise<AdminUser | null> {
    const { data, error } = await supabase.rpc('admin_verify_session', {
      p_token: token,
    });
    if (error || !data) return null;
    const row = Array.isArray(data) ? (data[0] as AdminUser) : (data as AdminUser);
    if (!row?.admin_id) return null;
    return { admin_id: row.admin_id, email: row.email };
  },
};
