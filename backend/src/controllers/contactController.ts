import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { contactService } from '../services/contactService';
import { asyncHandler } from '../middlewares/error';
import { ApiError } from '../utils/ApiError';
import { ok, created } from '../utils/response';
import { SubmissionStatus } from '../types';

const createSchema = z.object({
  name: z.string().min(1, 'Name is required.').max(200),
  email: z.string().email('A valid email is required.').max(200),
  phone: z.string().min(1, 'Phone is required.').max(50),
  message: z.string().min(1, 'Message is required.').max(5000),
});

const statusSchema = z.object({
  status: z.enum(['new', 'read', 'archived']),
});

function getTokenFromHeader(req: Request): string {
  const header = req.headers['authorization'] || '';
  return header.startsWith('Bearer ') ? header.slice(7).trim() : '';
}

export const createSubmission = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const parsed = createSchema.safeParse(req.body);
    if (!parsed.success) {
      throw ApiError.badRequest(parsed.error.issues[0]?.message || 'Invalid input.');
    }

    const id = await contactService.create(parsed.data);
    created(res, { id });
  }
);

export const listSubmissions = asyncHandler(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const submissions = await contactService.list();
    ok(res, submissions);
  }
);

export const getStats = asyncHandler(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const stats = await contactService.getStats();
    ok(res, stats);
  }
);

export const updateStatus = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    const parsed = statusSchema.safeParse(req.body);
    if (!parsed.success) {
      throw ApiError.badRequest(parsed.error.issues[0]?.message || 'Invalid status.');
    }

    const token = getTokenFromHeader(req);
    const updated = await contactService.updateStatus(id, parsed.data.status as SubmissionStatus, token);
    if (!updated) throw ApiError.notFound('Submission not found or session invalid.');
    ok(res, { id, status: parsed.data.status });
  }
);

export const deleteSubmission = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    const token = getTokenFromHeader(req);
    const removed = await contactService.remove(id, token);
    if (!removed) throw ApiError.notFound('Submission not found or session invalid.');
    ok(res, { id, deleted: true });
  }
);
