import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import { ApiError } from '../utils/ApiError';
import { AdminUser } from '../types';

declare module 'express-serve-static-core' {
  interface Request {
    admin?: AdminUser;
  }
}

export interface AuthedRequest extends Request {
  admin?: AdminUser;
}

export async function requireAuth(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const header = req.headers['authorization'] || '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';

  if (!token) {
    return next(ApiError.unauthorized('Missing or invalid Authorization header.'));
  }

  const { data, error } = await supabase.rpc('admin_verify_session', {
    p_token: token,
  });

  if (error || !data || (Array.isArray(data) && data.length === 0)) {
    return next(ApiError.unauthorized('Session is invalid or expired.'));
  }

  const admin = Array.isArray(data) ? data[0] : data;
  if (!admin?.admin_id || !admin?.email) {
    return next(ApiError.unauthorized('Session is invalid or expired.'));
  }

  req.admin = { admin_id: admin.admin_id, email: admin.email };
  next();
}
