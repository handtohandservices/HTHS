"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteApplication = exports.updateStatus = exports.getStats = exports.listApplications = exports.createApplication = exports.uploadResume = void 0;
const zod_1 = require("zod");
const multer_1 = __importDefault(require("multer"));
const employeeService_1 = require("../services/employeeService");
const cloudinary_1 = require("../config/cloudinary");
const error_1 = require("../middlewares/error");
const ApiError_1 = require("../utils/ApiError");
const response_1 = require("../utils/response");
function getTokenFromHeader(req) {
    const header = req.headers['authorization'] || '';
    return header.startsWith('Bearer ') ? header.slice(7).trim() : '';
}
const MAX_PDF_SIZE = 5 * 1024 * 1024; // 5 MB
// In-memory file storage — we upload the buffer to Cloudinary, no disk persistence.
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: { fileSize: MAX_PDF_SIZE },
    fileFilter: (_req, file, cb) => {
        if (file.mimetype !== 'application/pdf') {
            cb(new ApiError_1.ApiError(400, 'invalid_file', 'Resume must be a PDF file.'));
            return;
        }
        cb(null, true);
    },
});
exports.uploadResume = upload.single('resume');
const bodyShape = (value) => {
    const schema = zod_1.z.object({
        full_name: zod_1.z.string().min(1, 'Full name is required.').max(200),
        email: zod_1.z.string().email('A valid email is required.').max(200),
        phone: zod_1.z.string().min(1, 'Phone is required.').max(50),
        position_applied_for: zod_1.z.string().min(1, 'Position is required.').max(200),
        experience_years: zod_1.z
            .union([zod_1.z.string(), zod_1.z.number()])
            .optional()
            .transform((v) => {
            if (v === undefined || v === '')
                return null;
            const n = typeof v === 'number' ? v : parseInt(v, 10);
            return Number.isFinite(n) && n >= 0 ? n : null;
        }),
        message: zod_1.z.string().max(5000).optional().transform((v) => v ?? null),
    });
    return schema.safeParse(value);
};
exports.createApplication = (0, error_1.asyncHandler)(async (req, res, _next) => {
    if (!req.file) {
        throw ApiError_1.ApiError.badRequest('Please attach your resume as a PDF.');
    }
    const parsed = bodyShape(req.body);
    if (!parsed.success) {
        throw ApiError_1.ApiError.badRequest(parsed.error.issues[0]?.message || 'Invalid input.');
    }
    // Upload PDF to Cloudinary
    const originalName = req.file.originalname || 'resume.pdf';
    const uploaded = await cloudinary_1.cloudinaryUploader.uploadPdf(req.file.buffer, originalName);
    try {
        const id = await employeeService_1.employeeService.create({
            ...parsed.data,
            resume_url: uploaded.url,
            resume_public_id: uploaded.public_id,
        });
        (0, response_1.created)(res, { id, resume_url: uploaded.url });
    }
    catch (err) {
        // Roll back the upload if DB insert fails
        await cloudinary_1.cloudinaryUploader.remove(uploaded.public_id);
        throw err;
    }
});
exports.listApplications = (0, error_1.asyncHandler)(async (_req, res, _next) => {
    const items = await employeeService_1.employeeService.list();
    (0, response_1.ok)(res, items);
});
exports.getStats = (0, error_1.asyncHandler)(async (_req, res, _next) => {
    const stats = await employeeService_1.employeeService.getStats();
    (0, response_1.ok)(res, stats);
});
const statusSchema = zod_1.z.object({
    status: zod_1.z.enum(['new', 'reviewed', 'archived']),
});
exports.updateStatus = (0, error_1.asyncHandler)(async (req, res, _next) => {
    const { id } = req.params;
    const parsed = statusSchema.safeParse(req.body);
    if (!parsed.success) {
        throw ApiError_1.ApiError.badRequest(parsed.error.issues[0]?.message || 'Invalid status.');
    }
    const token = getTokenFromHeader(req);
    const updated = await employeeService_1.employeeService.updateStatus(id, parsed.data.status, token);
    if (!updated)
        throw ApiError_1.ApiError.notFound('Application not found or session invalid.');
    (0, response_1.ok)(res, { id, status: parsed.data.status });
});
exports.deleteApplication = (0, error_1.asyncHandler)(async (req, res, _next) => {
    const { id } = req.params;
    const token = getTokenFromHeader(req);
    // Best-effort: fetch the record first so we can delete the Cloudinary asset
    const items = await employeeService_1.employeeService.list();
    const target = items.find((it) => it.id === id);
    if (target?.resume_public_id) {
        await cloudinary_1.cloudinaryUploader.remove(target.resume_public_id);
    }
    const removed = await employeeService_1.employeeService.remove(id, token);
    if (!removed)
        throw ApiError_1.ApiError.notFound('Application not found or session invalid.');
    (0, response_1.ok)(res, { id, deleted: true });
});
//# sourceMappingURL=employeeController.js.map