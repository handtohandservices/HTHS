"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employerController_1 = require("../controllers/employerController");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
// Public — list available service categories (no auth needed)
router.get('/services', (_req, res) => {
    res.json({ success: true, data: employerController_1.availableServices });
});
// Public — submit a service request
router.post('/', employerController_1.createRequest);
// Admin-only
router.get('/', auth_1.requireAuth, employerController_1.listRequests);
router.get('/stats', auth_1.requireAuth, employerController_1.getStats);
router.patch('/:id/status', auth_1.requireAuth, employerController_1.updateStatus);
router.delete('/:id', auth_1.requireAuth, employerController_1.deleteRequest);
exports.default = router;
//# sourceMappingURL=employerRoutes.js.map