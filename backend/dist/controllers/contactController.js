"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubmission = exports.updateStatus = exports.getStats = exports.listSubmissions = exports.createSubmission = void 0;
const zod_1 = require("zod");
const contactService_1 = require("../services/contactService");
const error_1 = require("../middlewares/error");
const ApiError_1 = require("../utils/ApiError");
const response_1 = require("../utils/response");
const createSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required.').max(200),
    email: zod_1.z.string().email('A valid email is required.').max(200),
    phone: zod_1.z.string().min(1, 'Phone is required.').max(50),
    message: zod_1.z.string().min(1, 'Message is required.').max(5000),
});
const statusSchema = zod_1.z.object({
    status: zod_1.z.enum(['new', 'read', 'archived']),
});
function getTokenFromHeader(req) {
    const header = req.headers['authorization'] || '';
    return header.startsWith('Bearer ') ? header.slice(7).trim() : '';
}
exports.createSubmission = (0, error_1.asyncHandler)(async (req, res, _next) => {
    const parsed = createSchema.safeParse(req.body);
    if (!parsed.success) {
        throw ApiError_1.ApiError.badRequest(parsed.error.issues[0]?.message || 'Invalid input.');
    }
    const id = await contactService_1.contactService.create(parsed.data);
    (0, response_1.created)(res, { id });
});
exports.listSubmissions = (0, error_1.asyncHandler)(async (_req, res, _next) => {
    const submissions = await contactService_1.contactService.list();
    (0, response_1.ok)(res, submissions);
});
exports.getStats = (0, error_1.asyncHandler)(async (_req, res, _next) => {
    const stats = await contactService_1.contactService.getStats();
    (0, response_1.ok)(res, stats);
});
exports.updateStatus = (0, error_1.asyncHandler)(async (req, res, _next) => {
    const { id } = req.params;
    const parsed = statusSchema.safeParse(req.body);
    if (!parsed.success) {
        throw ApiError_1.ApiError.badRequest(parsed.error.issues[0]?.message || 'Invalid status.');
    }
    const token = getTokenFromHeader(req);
    const updated = await contactService_1.contactService.updateStatus(id, parsed.data.status, token);
    if (!updated)
        throw ApiError_1.ApiError.notFound('Submission not found or session invalid.');
    (0, response_1.ok)(res, { id, status: parsed.data.status });
});
exports.deleteSubmission = (0, error_1.asyncHandler)(async (req, res, _next) => {
    const { id } = req.params;
    const token = getTokenFromHeader(req);
    const removed = await contactService_1.contactService.remove(id, token);
    if (!removed)
        throw ApiError_1.ApiError.notFound('Submission not found or session invalid.');
    (0, response_1.ok)(res, { id, deleted: true });
});
//# sourceMappingURL=contactController.js.map