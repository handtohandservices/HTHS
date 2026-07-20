"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.availableServices = exports.deleteRequest = exports.updateStatus = exports.getStats = exports.listRequests = exports.createRequest = void 0;
const zod_1 = require("zod");
const employerService_1 = require("../services/employerService");
const error_1 = require("../middlewares/error");
const ApiError_1 = require("../utils/ApiError");
const response_1 = require("../utils/response");
function getTokenFromHeader(req) {
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
];
const createSchema = zod_1.z.object({
    company_name: zod_1.z.string().min(1, 'Company name is required.').max(200),
    contact_person: zod_1.z.string().min(1, 'Contact person is required.').max(200),
    email: zod_1.z.string().email('A valid email is required.').max(200),
    phone: zod_1.z.string().min(1, 'Phone is required.').max(50),
    services_requested: zod_1.z
        .array(zod_1.z.string())
        .min(1, 'Select at least one service.'),
    number_of_personnel: zod_1.z.string().max(100).optional().transform((v) => v ?? null),
    duration: zod_1.z.string().max(200).optional().transform((v) => v ?? null),
    location: zod_1.z.string().max(300).optional().transform((v) => v ?? null),
    message: zod_1.z.string().max(5000).optional().transform((v) => v ?? null),
});
exports.createRequest = (0, error_1.asyncHandler)(async (req, res, _next) => {
    const parsed = createSchema.safeParse(req.body);
    if (!parsed.success) {
        throw ApiError_1.ApiError.badRequest(parsed.error.issues[0]?.message || 'Invalid input.');
    }
    const id = await employerService_1.employerService.create(parsed.data);
    (0, response_1.created)(res, { id });
});
exports.listRequests = (0, error_1.asyncHandler)(async (_req, res, _next) => {
    const items = await employerService_1.employerService.list();
    (0, response_1.ok)(res, items);
});
exports.getStats = (0, error_1.asyncHandler)(async (_req, res, _next) => {
    const stats = await employerService_1.employerService.getStats();
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
    const updated = await employerService_1.employerService.updateStatus(id, parsed.data.status, token);
    if (!updated)
        throw ApiError_1.ApiError.notFound('Request not found or session invalid.');
    (0, response_1.ok)(res, { id, status: parsed.data.status });
});
exports.deleteRequest = (0, error_1.asyncHandler)(async (req, res, _next) => {
    const { id } = req.params;
    const token = getTokenFromHeader(req);
    const removed = await employerService_1.employerService.remove(id, token);
    if (!removed)
        throw ApiError_1.ApiError.notFound('Request not found or session invalid.');
    (0, response_1.ok)(res, { id, deleted: true });
});
exports.availableServices = services;
//# sourceMappingURL=employerController.js.map