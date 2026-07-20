"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const env_1 = require("./config/env");
const routes_1 = __importDefault(require("./routes"));
const error_1 = require("./middlewares/error");
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({ origin: env_1.config.corsOrigin, credentials: true }));
app.use(express_1.default.json({ limit: '100kb' }));
app.use(express_1.default.urlencoded({ extended: true }));
if (!env_1.config.isProduction) {
    app.use((0, morgan_1.default)('dev'));
}
// Basic rate limiting on the API
app.use('/api', (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000,
    max: 120,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: { code: 'rate_limited', message: 'Too many requests, slow down.' } },
}));
app.get('/', (_req, res) => {
    res.json({ success: true, data: { name: 'Hand to Hand Services API', docs: '/api/health' } });
});
app.use('/api', routes_1.default);
app.use(error_1.notFoundHandler);
app.use(error_1.errorHandler);
const server = app.listen(env_1.config.port, () => {
    console.log(`[api] Hand to Hand Services API running on http://localhost:${env_1.config.port} (${env_1.config.nodeEnv})`);
});
const shutdown = (signal) => {
    console.log(`[api] ${signal} received, shutting down...`);
    server.close(() => process.exit(0));
};
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
exports.default = app;
//# sourceMappingURL=server.js.map