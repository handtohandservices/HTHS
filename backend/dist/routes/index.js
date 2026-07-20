"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoutes_1 = __importDefault(require("./authRoutes"));
const contactRoutes_1 = __importDefault(require("./contactRoutes"));
const employeeRoutes_1 = __importDefault(require("./employeeRoutes"));
const employerRoutes_1 = __importDefault(require("./employerRoutes"));
const router = (0, express_1.Router)();
router.get('/health', (_req, res) => {
    res.json({ success: true, data: { status: 'ok', service: 'handtohand-api', version: '1.0.0' } });
});
router.use('/auth', authRoutes_1.default);
router.use('/contacts', contactRoutes_1.default);
router.use('/employees', employeeRoutes_1.default);
router.use('/employers', employerRoutes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map