import { Router } from 'express';
import authRoutes from './authRoutes';
import contactRoutes from './contactRoutes';
import employeeRoutes from './employeeRoutes';
import employerRoutes from './employerRoutes';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ success: true, data: { status: 'ok', service: 'handtohand-api', version: '1.0.0' } });
});

router.use('/auth', authRoutes);
router.use('/contacts', contactRoutes);
router.use('/employees', employeeRoutes);
router.use('/employers', employerRoutes);

export default router;
