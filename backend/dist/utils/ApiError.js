"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    statusCode;
    code;
    constructor(statusCode, code, message) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        Object.setPrototypeOf(this, ApiError.prototype);
    }
    static badRequest(message, code = 'bad_request') {
        return new ApiError(400, code, message);
    }
    static unauthorized(message = 'Unauthorized') {
        return new ApiError(401, 'unauthorized', message);
    }
    static notFound(message = 'Not found') {
        return new ApiError(404, 'not_found', message);
    }
    static conflict(message) {
        return new ApiError(409, 'conflict', message);
    }
    static internal(message = 'Internal server error') {
        return new ApiError(500, 'internal_error', message);
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=ApiError.js.map