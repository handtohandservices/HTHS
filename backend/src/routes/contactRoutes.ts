import { Router } from 'express';
import {
  createSubmission,
  listSubmissions,
  getStats,
  updateStatus,
  deleteSubmission,
} from '../controllers/contactController';
import { requireAuth } from '../middlewares/auth';

const router = Router();

// Public — anyone can submit the contact form
router.post('/', createSubmission);

// Admin-only — protected
router.get('/', requireAuth, listSubmissions);
router.get('/stats', requireAuth, getStats);
router.patch('/:id/status', requireAuth, updateStatus);
router.delete('/:id', requireAuth, deleteSubmission);

export default router;
