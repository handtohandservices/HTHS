import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { authService } from '../services/authService';
import { asyncHandler } from '../middlewares/error';
import { ApiError } from '../utils/ApiError';
import { ok } from '../utils/response';

const credentialsSchema = z.object({
  email: z.string().email('A valid email is required.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});

function getTokenFromHeader(req: Request): string {
  const header = req.headers['authorization'] || '';
  return header.startsWith('Bearer ') ? header.slice(7).trim() : '';
}

export const signUp = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const parsed = credentialsSchema.safeParse(req.body);
  if (!parsed.success) {
    throw ApiError.badRequest(parsed.error.issues[0]?.message || 'Invalid input.');
  }

  const session = await authService.signUp(parsed.data.email, parsed.data.password);
  ok(res, { admin_id: session.admin_id, email: session.email, token: session.token, expires_at: session.expires_at }, 201);
});

export const signIn = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const parsed = credentialsSchema.safeParse(req.body);
  if (!parsed.success) {
    throw ApiError.badRequest(parsed.error.issues[0]?.message || 'Invalid input.');
  }

  const session = await authService.signIn(parsed.data.email, parsed.data.password);
  ok(res, { admin_id: session.admin_id, email: session.email, token: session.token, expires_at: session.expires_at });
});

export const signOut = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const token = getTokenFromHeader(req);
  if (token) await authService.signOut(token);
  ok(res, { signed_out: true });
});

export const me = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  if (!req.admin) throw ApiError.unauthorized();
  ok(res, { admin_id: req.admin.admin_id, email: req.admin.email });
});
