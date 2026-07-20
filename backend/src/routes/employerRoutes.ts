import { Router } from 'express';
import {
  createRequest,
  listRequests,
  getStats,
  updateStatus,
  deleteRequest,
  availableServices,
} from '../controllers/employerController';
import { requireAuth } from '../middlewares/auth';

const router = Router();

// Public — list available service categories (no auth needed)
router.get('/services', (_req, res) => {
  res.json({ success: true, data: availableServices });
});

// Public — submit a service request
router.post('/', createRequest);

// Admin-only
router.get('/', requireAuth, listRequests);
router.get('/stats', requireAuth, getStats);
router.patch('/:id/status', requireAuth, updateStatus);
router.delete('/:id', requireAuth, deleteRequest);

export default router;
