import { Router } from 'express';
const router = Router();

import userRoutes from './user.js'; // Import user routes

router.use('/user', userRoutes); // api/user/...

export default router;