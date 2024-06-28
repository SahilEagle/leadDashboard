import { Router } from 'express';
const router = Router();

import userRoutes from './user.js'; // Import user routes
import visitorRoutes from './visitor.js'

router.use('/user', userRoutes); // api/user/...
router.use('/visitors', visitorRoutes); // api/visitor/...

export default router;