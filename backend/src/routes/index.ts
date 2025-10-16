import { Router } from 'express';
import v1Routes from '@/routes/v1';

const router = Router();

/**
 * @summary API Version routing
 * @description Main router that manages API versioning
 */
router.use('/v1', v1Routes);

export default router;
