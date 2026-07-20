import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import multer from 'multer';
import { employeeService } from '../services/employeeService';
import { cloudinaryUploader } from '../config/cloudinary';
import { asyncHandler } from '../middlewares/error';
import { ApiError } from '../utils/ApiError';
import { ok, created } from '../utils/response';
import { EmployeeApplicationStatus } from '../types';

function getTokenFromHeader(req: Request): string {
  const header = req.headers['authorization'] || '';
  return header.startsWith('Bearer ') ? header.slice(7).trim() : '';
}

const MAX_PDF_SIZE = 5 * 1024 * 1024; // 5 MB

// In-memory file storage — we upload the buffer to Cloudinary, no disk persistence.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_PDF_SIZE },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      cb(new ApiError(400, 'invalid_file', 'Resume must be a PDF file.'));
      return;
    }
    cb(null, true);
  },
});

export const uploadResume = upload.single('resume');

const bodyShape = (value: unknown) => {
  const schema = z.object({
    full_name: z.string().min(1, 'Full name is required.').max(200),
    email: z.string().email('A valid email is required.').max(200),
    phone: z.string().min(1, 'Phone is required.').max(50),
    position_applied_for: z.string().min(1, 'Position is required.').max(200),
    experience_years: z
      .union([z.string(), z.number()])
      .optional()
      .transform((v) => {
        if (v === undefined || v === '') return null;
        const n = typeof v === 'number' ? v : parseInt(v, 10);
        return Number.isFinite(n) && n >= 0 ? n : null;
      }),
    message: z.string().max(5000).optional().transform((v) => v ?? null),
  });
  return schema.safeParse(value);
};

export const createApplication = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    if (!req.file) {
      throw ApiError.badRequest('Please attach your resume as a PDF.');
    }

    const parsed = bodyShape(req.body);
    if (!parsed.success) {
      throw ApiError.badRequest(parsed.error.issues[0]?.message || 'Invalid input.');
    }

    // Upload PDF to Cloudinary
    const originalName = req.file.originalname || 'resume.pdf';
    const uploaded = await cloudinaryUploader.uploadPdf(req.file.buffer, originalName);

    try {
      const id = await employeeService.create({
        ...parsed.data,
        resume_url: uploaded.url,
        resume_public_id: uploaded.public_id,
      });
      created(res, { id, resume_url: uploaded.url });
    } catch (err) {
      // Roll back the upload if DB insert fails
      await cloudinaryUploader.remove(uploaded.public_id);
      throw err;
    }
  }
);

export const listApplications = asyncHandler(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const items = await employeeService.list();
    ok(res, items);
  }
);

export const getStats = asyncHandler(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const stats = await employeeService.getStats();
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
    const updated = await employeeService.updateStatus(
      id,
      parsed.data.status as EmployeeApplicationStatus,
      token
    );
    if (!updated) throw ApiError.notFound('Application not found or session invalid.');
    ok(res, { id, status: parsed.data.status });
  }
);

export const deleteApplication = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    const token = getTokenFromHeader(req);

    // Best-effort: fetch the record first so we can delete the Cloudinary asset
    const items = await employeeService.list();
    const target = items.find((it) => it.id === id);
    if (target?.resume_public_id) {
      await cloudinaryUploader.remove(target.resume_public_id);
    }

    const removed = await employeeService.remove(id, token);
    if (!removed) throw ApiError.notFound('Application not found or session invalid.');
    ok(res, { id, deleted: true });
  }
);
