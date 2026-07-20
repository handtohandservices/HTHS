import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { employerService } from '../services/employerService';
import { asyncHandler } from '../middlewares/error';
import { ApiError } from '../utils/ApiError';
import { ok, created } from '../utils/response';
import { EmployerRequestStatus } from '../types';

function getTokenFromHeader(req: Request): string {
  const header = req.headers['authorization'] || '';
  return header.startsWith('Bearer ') ? header.slice(7).trim() : '';
}

const services = [
  'Private Security Services',
  'Housekeeping, Cleaning & Hospitality',
  'Event Organization & Photography',
  'Health, Education & AI Training',
  'Women Empowerment Programs',
  'Job Consultancy',
  'Cultural Programs (Drama & Dance)',
  'Tour & Travel Services',
  'Government & Private Tender Supplies',
  'Courier & Cargo Services',
  'Manpower Supply',
  'Other',
] as const;

const createSchema = z.object({
  company_name: z.string().min(1, 'Company name is required.').max(200),
  contact_person: z.string().min(1, 'Contact person is required.').max(200),
  email: z.string().email('A valid email is required.').max(200),
  phone: z.string().min(1, 'Phone is required.').max(50),
  services_requested: z
    .array(z.string())
    .min(1, 'Select at least one service.'),
  number_of_personnel: z.string().max(100).optional().transform((v) => v ?? null),
  duration: z.string().max(200).optional().transform((v) => v ?? null),
  location: z.string().max(300).optional().transform((v) => v ?? null),
  message: z.string().max(5000).optional().transform((v) => v ?? null),
});

export const createRequest = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const parsed = createSchema.safeParse(req.body);
    if (!parsed.success) {
      throw ApiError.badRequest(parsed.error.issues[0]?.message || 'Invalid input.');
    }

    const id = await employerService.create(parsed.data);
    created(res, { id });
  }
);

export const listRequests = asyncHandler(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const items = await employerService.list();
    ok(res, items);
  }
);

export const getStats = asyncHandler(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const stats = await employerService.getStats();
    ok(res, stats);
  }
);

const statusSchema = z.object({
  status: z.enum(['new', 'reviewed', 'archived']),
});

export const updateStatus = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    const parsed = statusSchema.safeParse(req.body);
    if (!parsed.success) {
      throw ApiError.badRequest(parsed.error.issues[0]?.message || 'Invalid status.');
    }

    const token = getTokenFromHeader(req);
    const updated = await employerService.updateStatus(
      id,
      parsed.data.status as EmployerRequestStatus,
      token
    );
    if (!updated) throw ApiError.notFound('Request not found or session invalid.');
    ok(res, { id, status: parsed.data.status });
  }
);

export const deleteRequest = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    const token = getTokenFromHeader(req);
    const removed = await employerService.remove(id, token);
    if (!removed) throw ApiError.notFound('Request not found or session invalid.');
    ok(res, { id, deleted: true });
  }
);

export const availableServices = services;
