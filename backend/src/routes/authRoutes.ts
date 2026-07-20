import { Router } from 'express';
import { signUp, signIn, signOut, me } from '../controllers/authController';
import { requireAuth } from '../middlewares/auth';

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/signout', signOut);
router.get('/me', requireAuth, me);

export default router;
