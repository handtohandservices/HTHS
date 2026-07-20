"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = exports.asyncHandler = void 0;
const ApiError_1 = require("../utils/ApiError");
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
exports.asyncHandler = asyncHandler;
const errorHandler = (err, _req, res, _next) => {
    if (err instanceof ApiError_1.ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            error: { code: err.code, message: err.message },
        });
    }
    console.error('[unhandled error]', err);
    return res.status(500).json({
        success: false,
        error: { code: 'internal_error', message: 'Internal server error' },
    });
};
exports.errorHandler = errorHandler;
const notFoundHandler = (_req, res) => {
    res.status(404).json({
        success: false,
        error: { code: 'not_found', message: 'Route not found' },
    });
};
exports.notFoundHandler = notFoundHandler;
//# sourceMappingURL=error.js.map