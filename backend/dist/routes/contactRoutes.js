"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactController_1 = require("../controllers/contactController");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
// Public — anyone can submit the contact form
router.post('/', contactController_1.createSubmission);
// Admin-only — protected
router.get('/', auth_1.requireAuth, contactController_1.listSubmissions);
router.get('/stats', auth_1.requireAuth, contactController_1.getStats);
router.patch('/:id/status', auth_1.requireAuth, contactController_1.updateStatus);
router.delete('/:id', auth_1.requireAuth, contactController_1.deleteSubmission);
exports.default = router;
//# sourceMappingURL=contactRoutes.js.map