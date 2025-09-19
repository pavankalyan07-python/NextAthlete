import { Router } from 'express';
import { signUp } from '../controllers/authController.js'; // Use .js for ESM
const router = Router();
router.post('/signup', signUp);
export default router;
