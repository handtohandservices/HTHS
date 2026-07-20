"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employeeController_1 = require("../controllers/employeeController");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
// Public — submit an application (multipart/form-data with resume PDF)
router.post('/', employeeController_1.uploadResume, employeeController_1.createApplication);
// Admin-only
router.get('/', auth_1.requireAuth, employeeController_1.listApplications);
router.get('/stats', auth_1.requireAuth, employeeController_1.getStats);
router.patch('/:id/status', auth_1.requireAuth, employeeController_1.updateStatus);
router.delete('/:id', auth_1.requireAuth, employeeController_1.deleteApplication);
exports.default = router;
//# sourceMappingURL=employeeRoutes.js.map