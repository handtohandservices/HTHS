"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.me = exports.signOut = exports.signIn = exports.signUp = void 0;
const zod_1 = require("zod");
const authService_1 = require("../services/authService");
const error_1 = require("../middlewares/error");
const ApiError_1 = require("../utils/ApiError");
const response_1 = require("../utils/response");
const credentialsSchema = zod_1.z.object({
    email: zod_1.z.string().email('A valid email is required.'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters.'),
});
function getTokenFromHeader(req) {
    const header = req.headers['authorization'] || '';
    return header.startsWith('Bearer ') ? header.slice(7).trim() : '';
}
exports.signUp = (0, error_1.asyncHandler)(async (req, res, _next) => {
    const parsed = credentialsSchema.safeParse(req.body);
    if (!parsed.success) {
        throw ApiError_1.ApiError.badRequest(parsed.error.issues[0]?.message || 'Invalid input.');
    }
    try {
        const session = await authService_1.authService.signUp(parsed.data.email, parsed.data.password);
        (0, response_1.ok)(res, { admin_id: session.admin_id, email: session.email, token: session.token, expires_at: session.expires_at }, 201);
    }
    catch (err) {
        throw ApiError_1.ApiError.badRequest(err.message || 'An admin account with this email already exists.');
    }
});
exports.signIn = (0, error_1.asyncHandler)(async (req, res, _next) => {
    const parsed = credentialsSchema.safeParse(req.body);
    if (!parsed.success) {
        throw ApiError_1.ApiError.badRequest(parsed.error.issues[0]?.message || 'Invalid input.');
    }
    try {
        const session = await authService_1.authService.signIn(parsed.data.email, parsed.data.password);
        (0, response_1.ok)(res, { admin_id: session.admin_id, email: session.email, token: session.token, expires_at: session.expires_at });
    }
    catch (err) {
        throw ApiError_1.ApiError.unauthorized(err.message || 'Invalid email or password.');
    }
});
exports.signOut = (0, error_1.asyncHandler)(async (req, res, _next) => {
    const token = getTokenFromHeader(req);
    if (token)
        await authService_1.authService.signOut(token);
    (0, response_1.ok)(res, { signed_out: true });
});
exports.me = (0, error_1.asyncHandler)(async (req, res, _next) => {
    if (!req.admin)
        throw ApiError_1.ApiError.unauthorized();
    (0, response_1.ok)(res, { admin_id: req.admin.admin_id, email: req.admin.email });
});
const resetPasswordSchema = zod_1.z.object({
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters.'),
});
exports.resetPassword = (0, error_1.asyncHandler)(async (req, res, _next) => {
    const token = getTokenFromHeader(req);
    if (!token)
        throw ApiError_1.ApiError.unauthorized('No session token provided.');
    const parsed = resetPasswordSchema.safeParse(req.body);
    if (!parsed.success) {
        throw ApiError_1.ApiError.badRequest(parsed.error.issues[0]?.message || 'Invalid input.');
    }
    try {
        const success = await authService_1.authService.resetPassword(token, parsed.data.password);
        if (!success)
            throw ApiError_1.ApiError.notFound('Failed to reset password.');
        (0, response_1.ok)(res, { success: true });
    }
    catch (err) {
        if (err instanceof ApiError_1.ApiError)
            throw err;
        throw ApiError_1.ApiError.badRequest(err.message || 'Failed to reset password.');
    }
});
//# sourceMappingURL=authController.js.map