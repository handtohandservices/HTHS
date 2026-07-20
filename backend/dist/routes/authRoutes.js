"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.post('/signup', authController_1.signUp);
router.post('/signin', authController_1.signIn);
router.post('/signout', authController_1.signOut);
router.get('/me', auth_1.requireAuth, authController_1.me);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map