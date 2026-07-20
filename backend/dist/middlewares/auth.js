"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
const supabase_1 = require("../config/supabase");
const ApiError_1 = require("../utils/ApiError");
async function requireAuth(req, _res, next) {
    const header = req.headers['authorization'] || '';
    const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
    if (!token) {
        return next(ApiError_1.ApiError.unauthorized('Missing or invalid Authorization header.'));
    }
    const { data, error } = await supabase_1.supabase.rpc('admin_verify_session', {
        p_token: token,
    });
    if (error || !data || (Array.isArray(data) && data.length === 0)) {
        return next(ApiError_1.ApiError.unauthorized('Session is invalid or expired.'));
    }
    const admin = Array.isArray(data) ? data[0] : data;
    if (!admin?.admin_id || !admin?.email) {
        return next(ApiError_1.ApiError.unauthorized('Session is invalid or expired.'));
    }
    req.admin = { admin_id: admin.admin_id, email: admin.email };
    next();
}
//# sourceMappingURL=auth.js.map