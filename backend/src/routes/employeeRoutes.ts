import { Router } from 'express';
import {
  createApplication,
  uploadResume,
  listApplications,
  getStats,
  updateStatus,
  deleteApplication,
} from '../controllers/employeeController';
import { requireAuth } from '../middlewares/auth';

const router = Router();

// Public — submit an application (multipart/form-data with resume PDF)
router.post('/', uploadResume, createApplication);

// Admin-only
router.get('/', requireAuth, listApplications);
router.get('/stats', requireAuth, getStats);
router.patch('/:id/status', requireAuth, updateStatus);
router.delete('/:id', requireAuth, deleteApplication);

export default router;
